// import React, { useState } from 'react';

// export const VedioUploader = () => {
//     const [videoFile, setVideoFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [videoUrl, setVideoUrl] = useState('');

//     const uploadToCloudinary = async (file) => {
//         const cloudName = 'duaxitxph';
//         const uploadPreset = 'ezq9j3bi';

//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', uploadPreset);

//         const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Failed to upload file: ${errorData.message || response.statusText}`);
//         }

//         const data = await response.json();
//         return data.secure_url;
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith('video/')) {
//             setVideoFile(file);
//         } else {
//             alert('Please select a valid video file.');
//         }
//     };

//     const handleUpload = async () => {
//         if (!videoFile) {
//             alert('No video file selected.');
//             return;
//         }

//         setUploading(true);
//         try {
//             const url = await uploadToCloudinary(videoFile);
//             setVideoUrl(url);
//             alert('Video uploaded successfully!');
//         } catch (error) {
//             alert('Failed to upload video.');
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>Upload Video</h2>
//             <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileChange}
//                 disabled={uploading}
//             />
//             <button onClick={handleUpload} disabled={uploading || !videoFile}>
//                 {uploading ? 'Uploading...' : 'Upload Video'}
//             </button>

//             {videoUrl && (
//                 <div>
//                     <h3>Uploaded Video:</h3>
//                     <video controls width="500">
//                         <source src={videoUrl} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                     <p>Video URL: <a href={videoUrl} target="_blank" rel="noopener noreferrer">{videoUrl}</a></p>
//                 </div>
//             )}
//         </div>
//     );
// };
