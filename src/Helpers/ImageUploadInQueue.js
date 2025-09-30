export const ImageUploadInQueue = (event, setPendingUploads) => {
  const files = Array.from(event.target.files);

  const MAX_SIZE = 20 * 1024 * 1024; // 5 MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  const validImages = files.filter((file) => {
    const isValidType = allowedTypes.includes(file.type);
    const isValidSize = file.size <= MAX_SIZE;
    return isValidType && isValidSize;
  });

  const newUploads = validImages.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
    status: 'uploading',
  }));

  setPendingUploads((prev) => [...newUploads, ...prev]);
};