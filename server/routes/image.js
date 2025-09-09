// server/routes/image.js
import { Router } from 'express';
import multer from 'multer';
import Image from '../models/Image.js';
import auth from '../middlewares/auth.js';
import { imgUpload } from '../util.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', auth, upload.single('image'), async (req, res) => {
  const { name, folder } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Image required' });
  const imageUrl = await imgUpload(req.file, "image");
  const img = new Image({ name, imageUrl, folder, user: req.user._id });
  await img.save();
  res.json(img);
});

router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  const images = await Image.find({
    user: req.user._id,
    name: { $regex: query, $options: 'i' }
  });
  res.json(images);
});

router.get('/by-folder/:folderId', auth, async (req, res) => {
  const images = await Image.find({ user: req.user._id, folder: req.params.folderId });
  res.json(images);
});

export default router;
