const router = require('express').Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const FeaturedMedia = require('../models/FeaturedMedia');


// 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Temp debug — remove after fixing
console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING",
});
// 





// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: { folder: 'velvetpaw', allowed_formats: ['jpg','jpeg','png','webp','mp4','mov'] },
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'velvetpaw',
    resource_type: 'auto',  // handles images AND videos
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov'],
  },
});

const upload = multer({ storage });

router.post('/', upload.array('media', 5), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { petName, breed, caption } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const files = req.files.map(f => f.secure_url || f.path);

    const doc = await FeaturedMedia.create({
      petName,
      breed,
      caption,
      files
    });

    res.status(201).json({ success: true, id: doc._id });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const data = await FeaturedMedia.find().sort({ submittedAt: -1 });
  res.json(data);
});

router.get('/active', async (req, res) => {
  const data = await FeaturedMedia.find({ featured: true }).sort({ submittedAt: -1 });
  res.json(data);
});

router.patch('/:id/feature', async (req, res) => {
  try {
    const doc = await FeaturedMedia.findByIdAndUpdate(
      req.params.id, { featured: req.body.featured }, { new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await FeaturedMedia.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;