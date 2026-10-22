import db from '../configs-$id/db-config.js';

// ข้อ 2: อ่านแบรนด์ทั้งหมด
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task2 = (() => {
    async function brands(){const [r]=await db.query('SELECT * FROM brands ORDER BY id');return r;}
    return {brands};
})();

// ข้อ 3: อ่านแบรนด์รายตัว
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task3 = (() => {
    async function brand(id){const [r]=await db.query('SELECT * FROM brands WHERE id=?',[id]);return r[0] || null;}
    return {brand};
})();

// ข้อ 4: สินค้ารายการแบ่งหน้า Summary DTO
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task4 = (() => {
    async function findAll({limit,offset}){
     const [rows]=await db.query('SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?',[limit,offset]);
     const [[{total}]]=await db.query('SELECT COUNT(*) AS total FROM products');rows.totalItems = Number(total);return rows;
    }
    return {findAll};
})();

// ข้อ 5: รายละเอียดสินค้า JOIN Detail DTO
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task5 = (() => {
    async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}
    return {findOne};
})();

// ข้อ 6: เพิ่มสินค้า autoID UNIQUE FK
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task6 = (() => {
    async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}

    async function create(data){const [result]=await db.query('INSERT INTO products SET ?',[data]);return findOne(result.insertId);}
    return {findOne, create};
})();

// ข้อ 7: แก้สินค้าแบบส่งบางช่อง
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task7 = (() => {
    async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}

    async function update(id,data){await db.query('UPDATE products SET ? WHERE id=?',[data,id]);return findOne(id);}
    return {findOne, update};
})();

// ข้อ 8: ลบสินค้า204
// แยกขอบเขตของข้อนี้ ป้องกันชื่อฟังก์ชันซ้ำกับข้อก่อน
export const task8 = (() => {
    async function findOne(id){const [r]=await db.query('SELECT p.*,b.name AS brand_name FROM products p JOIN brands b ON b.id=p.brand_id WHERE p.id=?',[id]);return r[0] || null;}

    async function remove(id){await db.query('DELETE FROM products WHERE id=?',[id]);}
    return {findOne, remove};
})();
