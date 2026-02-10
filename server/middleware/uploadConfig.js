const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'portfolio',
            resource_type: 'auto',
            public_id: file.originalname.split('.')[0] + '-' + Date.now(), // detailed filename
            access_mode: 'public', // Explicitly public
        };
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
