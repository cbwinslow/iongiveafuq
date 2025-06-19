import { readFileSync } from 'fs';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const sql = readFileSync(new URL('./schema.sql', import.meta.url)).toString();
await pool.query(sql);
await pool.end();
