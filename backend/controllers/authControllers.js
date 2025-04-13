import db from '../models/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await db('users').insert({ username, password: hashed });
    res.status(201).json({ message: 'User created' });
  } catch {
    res.status(400).json({ message: 'Username exists' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db('users').where({ username }).first();

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
  res.json({ token });
};
