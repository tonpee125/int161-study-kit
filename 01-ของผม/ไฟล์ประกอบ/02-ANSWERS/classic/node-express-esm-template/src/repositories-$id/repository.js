import db from '../configs-$id/db-config.js';
export async function office(id){const [r]=await db.query('SELECT * FROM offices WHERE officeCode=?',[id]);return r[0] || null;}
export async function productline(id){const [r]=await db.query('SELECT * FROM productlines WHERE productLine=?',[id]);return r[0] || null;}
export async function createLine(data){await db.query('INSERT INTO productlines SET ?',[data]);return productline(data.productLine);}
export async function employee(id){const [r]=await db.query('SELECT * FROM employees WHERE employeeNumber=?',[id]);return r[0] || null;}
export async function updateEmployee(id,data){await db.query('UPDATE employees SET ? WHERE employeeNumber=?',[data,id]);return employee(id);}
export async function customer(id){const [r]=await db.query('SELECT * FROM customers WHERE customerNumber=?',[id]);return r[0] || null;}
export async function removeCustomer(id){await db.query('DELETE FROM customers WHERE customerNumber=?',[id]);}
export async function payment(customerNumber,checkNumber){const [r]=await db.query('SELECT * FROM payments WHERE customerNumber=? AND checkNumber=?',[customerNumber,checkNumber]);return r[0] || null;}
export async function createPayment(data){await db.query('INSERT INTO payments SET ?',[data]);return payment(data.customerNumber,data.checkNumber);}
