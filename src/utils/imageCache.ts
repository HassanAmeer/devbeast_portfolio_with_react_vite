/**
 * 1 .  
 * Preloads images by creating Image objects and setting their src.
 * This ensures images are cached in the browser for faster subsequent loads.
 * @param urls Array of image URLs to preload
 */
export const preloadImages = (urls: string[]): void => {
    urls.forEach(url => {
        if (url && url.trim() !== '') {
            const img = new Image();
            img.src = url;
        }
    });
};

/**
 * 2 .
 * Preloads project images from an array of projects.
 * Extracts the first image from each project's projectImages array.
 * @param projects Array of project objects with projectImages property
 */
export const preloadProjectImages = (projects: { projectImages: string[] }[]): void => {
    const imageUrls = projects
        .map(project => project.projectImages?.[0])
        .filter(url => url && url.trim() !== '');
    preloadImages(imageUrls);
};