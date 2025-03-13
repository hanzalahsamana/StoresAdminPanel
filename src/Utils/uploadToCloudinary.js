export const uploadToCloudinary = async (imageFile) => {
    const cloudName = 'duaxitxph';
    const uploadPreset = 'ezq9j3bi';

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', uploadPreset);
    
    // Ensure GIFs remain animated
    if (imageFile.type === "image/gif") {
        formData.append('flags', 'animated'); 
        formData.append('resource_type', 'image'); 
    }

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to upload image: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url;
};

export const uploadImagesToCloudinary = async (images) => {
    const uploadPromises = images.map(uploadToCloudinary);
    return Promise.all(uploadPromises);
};


