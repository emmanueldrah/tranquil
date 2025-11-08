export const getFirstValidImage = (images: any): string => {
  // Handle string that might be JSON array
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        return getFirstValidImage(parsed);
      }
    } catch {
      // Not JSON, treat as single image string
    }
    // Check if it's a valid image URL
    if (images.trim() && (images.startsWith('/') || images.startsWith('http'))) {
      return images;
    }
  } else if (Array.isArray(images)) {
    for (const img of images) {
      if (typeof img === 'string' && img.trim() && (img.startsWith('/') || img.startsWith('http'))) {
        return img;
      }
    }
  }
  return '/images/placeholder.jpg';
};
