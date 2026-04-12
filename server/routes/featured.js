// const router = require('express').Router();
// const multer = require('multer');
// const FeaturedMedia = require('../models/FeaturedMedia');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// // Submit pet for featuring
// router.post('/', upload.array('media', 5), async (req, res) => {
//   try {
//     const { petName, breed, caption } = req.body;
//     const files = req.files.map(f => f.path);
//     const doc = await FeaturedMedia.create({ petName, breed, caption, files });
//     res.status(201).json({ success: true, id: doc._id });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get ALL submissions (admin)
// router.get('/', async (req, res) => {
//   const data = await FeaturedMedia.find().sort({ submittedAt: -1 });
//   res.json(data);
// });

// // Get only featured (homepage)
// router.get('/active', async (req, res) => {
//   const data = await FeaturedMedia.find({ featured: true }).sort({ submittedAt: -1 });
//   res.json(data);
// });

// // Admin: toggle featured status
// router.patch('/:id/feature', async (req, res) => {
//   try {
//     const doc = await FeaturedMedia.findByIdAndUpdate(
//       req.params.id,
//       { featured: req.body.featured },
//       { new: true }
//     );
//     res.json(doc);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Admin: delete a submission
// router.delete('/:id', async (req, res) => {
//   try {
//     await FeaturedMedia.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;











const router = require('express').Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const FeaturedMedia = require('../models/FeaturedMedia');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'velvetpaw', allowed_formats: ['jpg','jpeg','png','webp','mp4','mov'] },
});

const upload = multer({ storage });

router.post('/', upload.array('media', 5), async (req, res) => {
  try {
    const { petName, breed, caption } = req.body;
    const files = req.files.map(f => f.path); // Cloudinary URL
    const doc = await FeaturedMedia.create({ petName, breed, caption, files });
    res.status(201).json({ success: true, id: doc._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
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