import db from '../configs-$id/db-config.js';
export async function findAll(){const [rows]=await db.query('SELECT * FROM actor ORDER BY actor_id');return rows;}
export async function findOne(id){const [rows]=await db.query('SELECT * FROM actor WHERE actor_id=?',[id]);return rows[0] || null;}
export async function create(data){const [result]=await db.query('INSERT INTO actor SET ?',[data]);return findOne(result.insertId);}
export async function update(id,data){await db.query('UPDATE actor SET ? WHERE actor_id=?',[data,id]);return findOne(id);}
export async function remove(id){await db.query('DELETE FROM actor WHERE actor_id=?',[id]);}
