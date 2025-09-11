import { Router } from 'express';
import Folder from '../models/Folder.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/create', auth, async (req, res) => {
  const { name, parent } = req.body;
  const folder = new Folder({ name, parent: parent || null, user: req.user._id });
  await folder.save();
  res.json(folder);
});

router.get('/', auth, async (req, res) => {
  const folders = await Folder.find({ user: req.user._id });
  res.json(folders);
});
router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  const folders = await Folder.find({
    user: req.user._id,
    name: { $regex: query, $options: 'i' }
  });
  res.json(folders);
});
export default router;
