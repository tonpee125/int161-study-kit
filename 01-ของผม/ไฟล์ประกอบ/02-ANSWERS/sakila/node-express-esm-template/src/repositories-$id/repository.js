import db from '../configs-$id/db-config.js';
export async function findAll(){const [rows]=await db.query('SELECT * FROM country ORDER BY country_id');return rows;}
export async function findOne(id){const [rows]=await db.query('SELECT * FROM country WHERE country_id=?',[id]);return rows[0] || null;}
export async function create(data){const [result]=await db.query('INSERT INTO country SET ?',[data]);return findOne(result.insertId);}
export async function update(id,data){await db.query('UPDATE country SET ? WHERE country_id=?',[data,id]);return findOne(id);}
export async function remove(id){await db.query('DELETE FROM country WHERE country_id=?',[id]);}
