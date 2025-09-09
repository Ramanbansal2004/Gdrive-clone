import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dvywxqtka',
  api_key: '796883636591216',
  api_secret: 'piFrmS2PogLkrvTdb7Xk-3Akh0c',
});
export const imgUpload = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer); // send buffer
  });
};