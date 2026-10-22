import db from '../configs-$id/db-config.js';
export async function brands(){const [r]=await db.query('SELECT * FROM brands ORDER BY id');return r;}
export async function brand(id){const [r]=await db.query('SELECT * FROM brands WHERE id=?',[id]);return r[0] || null;}
export async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
export async function findAll(pagination){
 const sql='SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id ORDER BY p.id';
 const [rows]=pagination ? await db.query(sql+' LIMIT ? OFFSET ?',[pagination.limit,pagination.offset]) : await db.query(sql);
 const [[{total}]]=await db.query('SELECT COUNT(*) AS total FROM products');rows.totalItems = Number(total);return rows;
}
export async function create(data){const [result]=await db.query('INSERT INTO products SET ?',[data]);return findOne(result.insertId);}
export async function update(id,data){await db.query('UPDATE products SET ? WHERE id=?',[data,id]);return findOne(id);}
export async function remove(id){await db.query('DELETE FROM products WHERE id=?',[id]);}
