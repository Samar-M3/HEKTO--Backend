const multer = require('multer');
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;
const cloudinary = require('./cloudinary');

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => {
  const name = file.originalname.split('.').slice(0, -1).join('.');
  return `${Date.now()}-${name}`;
}
  },
});

// Multer instance – ✅ must be an object
const upload = multer({ storage });

module.exports = upload;
