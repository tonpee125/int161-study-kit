import db from './configs-$id/db-config.js';
try { const [rows] = await db.query('SELECT 1 AS connected'); console.log('MySQL connected', rows); } catch(error) { console.error(error.code, error.message); process.exitCode=1; } finally { await db.end(); }
