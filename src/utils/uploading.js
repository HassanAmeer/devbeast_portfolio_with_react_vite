import { db, mainCollection, adminCollectionId } from '../config/fbconfig';
import { doc, getDoc } from 'firebase/firestore';

export const getDeviceName = () => {
    const userAgent = navigator.userAgent;
    let browser = "Unknown Browser";
    if (userAgent.indexOf("Firefox") > -1) {
        browser = "Mozilla Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        browser = "Samsung Internet";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browser = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        browser = "Microsoft Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        browser = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browser = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Apple Safari";
    }

    return {
        full: `${browser} on ${navigator.platform}`
    };
};

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Get the appropriate storage folder name based on file type
 * Uses environment variables for folder configuration
 * @param {string} fileType - The type of file (profile, image, video, audio, document, wallpaper, sticker, notification)
 * @returns {string} - The folder name from environment variables
 */
export const getFolderNameByType = (fileType) => {
    const folderMap = {
        'profile': import.meta.env.ENV_STORAGE_PROFILE_IMAGES || 'profile_images',
        'image': import.meta.env.ENV_STORAGE_CHAT_IMAGES || 'chat_images',
        'video': import.meta.env.ENV_STORAGE_CHAT_VIDEOS || 'chat_videos',
        'audio': import.meta.env.ENV_STORAGE_CHAT_AUDIOS || 'chat_audios',
        'document': import.meta.env.ENV_STORAGE_CHAT_DOCUMENTS || 'chat_documents',
        'file': import.meta.env.ENV_STORAGE_CHAT_DOCUMENTS || 'chat_documents',
        'wallpaper': import.meta.env.ENV_STORAGE_WALLPAPERS || 'wallpapers',
        'sticker': import.meta.env.ENV_STORAGE_STICKERS || 'stickers',
        'notification': import.meta.env.ENV_STORAGE_NOTIFICATION_IMAGES || 'notification_images',
    };

    return folderMap[fileType] || import.meta.env.ENV_STORAGE_CHAT_DOCUMENTS || 'chat_documents';
};

// Cache for the token to avoid repeated Firestore fetches
let cachedLivedbsToken = null;

const getLivedbsToken = async () => {
    if (cachedLivedbsToken) return cachedLivedbsToken;

    // Default from env
    let token = import.meta.env.ENV_LIVEDBS_TOKEN || '37160f2e00721d906831565829ae1de7';

    try {
        // Try to fetch from Admin Settings (General)
        const docRef = doc(db, mainCollection, adminCollectionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.livedbsToken && data.livedbsToken.trim() !== '') {
                token = data.livedbsToken;
            }
        }
    } catch (error) {
        console.warn('Failed to fetch dynamic LivedbsToken, using default.', error);
    }

    cachedLivedbsToken = token;
    return token;
};





/**
 * Upload a base64 encoded file to the server
 * @param {string} base64 - The base64 encoded file data
 * @param {string} token - API token for authentication
 * @param {string} folder_name - Folder name or file type (profile, image, video, audio, document, wallpaper, sticker, notification)
 * @param {boolean} is_secret - Whether the file should be private
 * @param {function} setLoader - Optional loader state setter
 * @param {AbortSignal} signal - Optional abort signal for cancellation
 * @param {function} onProgress - Optional progress callback
 * @param {string} fileType - Optional file type to auto-determine folder (overrides folder_name if provided)
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadFileByBase64 = async (
    base64,
    token = null,
    folder_name = import.meta.env.ENV_LIVEDBS_DEFAULT_FOLDER,
    is_secret = true,
    setLoader = false,
    signal = null,
    onProgress = null,
    fileType = null // New parameter to auto-determine folder
) => {
    // Determine token dynamically if not provided
    if (!token) {
        token = await getLivedbsToken();
    }
    // If fileType is provided, use it to determine the folder name from env variables
    if (fileType) {
        folder_name = getFolderNameByType(fileType);
    }
    const deviceInfo = getDeviceName();
    let from_device_name = deviceInfo.full;

    try {
        if (setLoader) setLoader(true);

        // 1. Clean the Base64 string
        // console.log('1. Original base64 length:', base64.length);
        const cleanBase64 = base64.replace(/^data:.*?;base64,/, '');
        // console.log('2. Clean base64 length:', cleanBase64.length);

        const totalLength = cleanBase64.length;
        // Check if file is small enough for simple upload (less than 1MB)
        const ONE_MB = 1024 * 1024;

        if (totalLength < ONE_MB) {
            console.log(`File size (${totalLength} bytes) is < 1MB. Using simple upload.`);

            const payload = {
                folder_name,
                is_secret: '1', // Hardcoded as per chunked logic
                file_base64: cleanBase64
            };

            const response = await fetch(import.meta.env.ENV_LIVEDBS_URL_BASE64,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(payload),
                    signal: signal
                });

            const result = await response.json();
            console.log('Simple Upload Result:', result);

            if (result.success && result.link) {
                return result.link;
            } else {
                throw new Error(result.message || "Simple upload failed");
            }

        } else {
            // 2. Prepare for Chunking (> 1MB)
            const CHUNK_SIZE = import.meta.env.ENV_LIVEDBS_CHUNK_SIZE * 1024 || 512 * 1024; // 512KB chunks

            const totalChunks = Math.ceil(totalLength / CHUNK_SIZE);
            const fileId = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9); // Unique ID for this upload

            console.log(`Starting Chunked Upload: ${totalChunks} chunks for File ID: ${fileId}`);

            let finalResult = null;

            // 3. Loop through chunks
            for (let i = 0; i < totalChunks; i++) {
                // Check for cancellation before each chunk
                if (signal && signal.aborted) {
                    throw new DOMException('Upload cancelled', 'AbortError');
                }

                const start = i * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, totalLength);
                const chunkData = cleanBase64.substring(start, end);

                const payload = {
                    folder_name,
                    // is_secret: is_secret ? "1" : "0",
                    is_secret: '1',
                    // is_secret: '0',
                    file_id: fileId,
                    chunk_index: i,
                    total_chunks: totalChunks,
                    chunk_data: chunkData
                };

                // console.log(`Uploading chunk ${i + 1}/${totalChunks}...`);

                if (onProgress) {
                    onProgress((i + 1) / totalChunks);
                }

                const response = await fetch(import.meta.env.ENV_LIVEDBS_URL_BASE64_CHUNKS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(payload),
                    signal: signal // Pass signal to fetch
                });

                const result = await response.json();

                if (!result.success) {
                    throw new Error(`Chunk ${i} failed: ` + (result.message || "Unknown error"));
                }

                // The last chunk will return the final file link
                if (i === totalChunks - 1) {
                    finalResult = result;
                }
            }

            console.log('Upload Complete! Result:', finalResult);

            if (finalResult && finalResult.link) {
                return finalResult.link;
            } else {
                console.log("uploadFileByBase64 failed: No link returned in final chunk");
                return "";
            }
        }

    } catch (error) {
        console.error('Upload failed:', error.message);
        throw error;
    } finally {
        if (setLoader) setLoader(false);
    }
};