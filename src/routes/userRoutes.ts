import express from 'express';
import { creatUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const userId = await creatUser(req.body);
    res.status(201).json({ userId });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

router.get('/', async (_req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await getUserById(Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

router.put('/:id', async (req, res) => {
  await updateUser(Number(req.params.id), req.body);
  res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
  await deleteUser(Number(req.params.id));
  res.sendStatus(204);
});

export default router;