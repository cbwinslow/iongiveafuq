import { Router } from 'express';
import { pool } from '../db.js';
import path from 'path';
import express from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const q = (req.query.search || '').toString();
  let result;
  if (q) {
    result = await pool.query(
      'SELECT * FROM artwork WHERE title ILIKE $1 OR $1 = ANY(tags)',
      [`%${q}%`]
    );
  } else {
    result = await pool.query('SELECT * FROM artwork ORDER BY id');
  }
  res.json(result.rows);
});

export default router;
