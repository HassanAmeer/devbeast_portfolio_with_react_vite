// Commented out - used by getLivedbsToken which is disabled
// import { db, mainCollection, adminCollectionId } from '../config/fbconfig';
// import { doc, getDoc } from 'firebase/firestore';

interface DeviceInfo {
    full: string;
}

export const getDeviceName = (): DeviceInfo => {
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

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Get the appropriate storage folder name based on file type
 * Uses environment variables for folder configuration
 */
export const getFolderNameByType = (fileType: string): string => {
    const folderMap: Record<string, string> = {
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
// let cachedLivedbsToken: string | null = null;

// const getLivedbsToken = async (): Promise<string> => {
//     if (cachedLivedbsToken) return cachedLivedbsToken;

//     // Default from env
//     let token = import.meta.env.ENV_LIVEDBS_TOKEN || '37160f2e00721d906831565829ae1de7';

//     try {
//         // Try to fetch from Admin Settings (General)
//         const docRef = doc(db, mainCollection, adminCollectionId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             if (data.livedbsToken && data.livedbsToken.trim() !== '') {
//                 token = data.livedbsToken;
//             }
//         }
//     } catch (error) {
//         console.warn('Failed to fetch dynamic LivedbsToken, using default.', error);
//     }

//     cachedLivedbsToken = token;
//     return token;
// };

/**
 * Upload a base64 encoded file to the server
 * @param base64 - The base64 encoded file data
 * @param token - API token for authentication
 * @param folder_name - Folder name or file type
 * @param _is_secret - Whether the file should be private (reserved for future use)
 * @param setLoader - Optional loader state setter
 * @param signal - Optional abort signal for cancellation
 * @param onProgress - Optional progress callback (0-1 range)
 * @param fileType - Optional file type to auto-determine folder
 * @returns The URL of the uploaded file
 */
export const uploadFileByBase64 = async (
    base64: string,
    _token: string | null = null,
    folder_name: string = import.meta.env.ENV_LIVEDBS_DEFAULT_FOLDER || 'uploads',
    _is_secret: boolean = true,
    setLoader: ((loading: boolean) => void) | false = false,
    signal: AbortSignal | null = null,
    onProgress: ((progress: number) => void) | null = null,
    fileType: string | null = null
): Promise<string> => {
    // Determine token dynamically if not provided
    // if (!token) {
    //     token = await getLivedbsToken();
    // }
    // If fileType is provided, use it to determine the folder name from env variables
    if (fileType) {
        folder_name = getFolderNameByType(fileType);
    }

    try {
        if (setLoader) setLoader(true);

        // 1. Clean the Base64 string
        const cleanBase64 = base64.replace(/^data:.*?;base64,/, '');

        const totalLength = cleanBase64.length;
        // Check if file is small enough for simple upload (less than 1MB)
        const ONE_MB = 512 * 1024;

        if (totalLength < ONE_MB) {
            console.log(`File size (${totalLength} bytes) is < 1MB. Using simple upload.`);

            // For small files, call progress immediately at 100%
            if (onProgress) {
                onProgress(1);
            }

            const payload = {
                folder_name,
                is_secret: '1',
                file_base64: cleanBase64
            };

            const response = await fetch(import.meta.env.VITE_LIVEDBS_URL_BASE64, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + import.meta.env.VITE_LIVEDBS_TOKEN
                },
                body: JSON.stringify(payload),
                signal: signal || undefined
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
            const CHUNK_SIZE = (import.meta.env.ENV_LIVEDBS_CHUNK_SIZE || 512) * 1024; // 512KB chunks

            const totalChunks = Math.ceil(totalLength / CHUNK_SIZE);
            const fileId = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);

            console.log(`Starting Chunked Upload: ${totalChunks} chunks for File ID: ${fileId}`);

            let finalResult: { success: boolean; link?: string; message?: string } | null = null;

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
                    is_secret: '1',
                    file_id: fileId,
                    chunk_index: i,
                    total_chunks: totalChunks,
                    chunk_data: chunkData
                };

                // Report progress
                if (onProgress) {
                    onProgress((i + 1) / totalChunks);
                }

                const response = await fetch(import.meta.env.VITE_LIVEDBS_URL_BASE64_CHUNKS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + import.meta.env.VITE_LIVEDBS_TOKEN
                    },
                    body: JSON.stringify(payload),
                    signal: signal || undefined
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

    } catch (error: any) {
        console.error('Upload failed:', error.message);
        throw error;
    } finally {
        if (setLoader) setLoader(false);
    }
};
