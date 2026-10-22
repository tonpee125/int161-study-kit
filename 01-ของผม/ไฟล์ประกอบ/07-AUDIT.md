# ตรวจเทมเพลตครูจริงก่อนทำคำตอบ
## สิ่งที่คงเดิม
ชื่อsrc/app.jsและไฟล์genericทั้งหกโฟลเดอร์-$id; package.jsonและlockfileเดิมทุกไบต์; ESM; route→service→repository
apiResponse(res,data,pagination=null,status=200) ตำแหน่งพารามิเตอร์ตรงครู; queryParser() เป็นmiddleware factory; mapperเป็นdefaultclass
ชุดคำตอบไม่เพิ่มserver.js ไม่สร้างcreateApp ไม่เพิ่มdependency

## สิ่งที่ครูเว้นไว้/จุดที่ต้องแก้ตามโจทย์
- app.js errorhandlerว่าง ทำให้errorไม่มีresponse ต้องเติม
- route GETยังตอบข้อความplaceholder; PUTไม่ส่งid/body; POST/DELETEยังไม่ได้statusตามโจทย์
- repository TABLE_NAME/primaryKeyเป็นplaceholder; createใช้data.productLine จึงใช้กับautoIDไม่ได้โดยไม่แก้
- serviceยังไม่ส่งpagination/viewครบ และยังไม่จัด404ก่อนmap
- pagination offsetใช้pageSizeดิบแม้limitถูกcap ต้องคำนวณจากlimitจริง
- mapper.maps ใช้if(totalItems) ทำtotal0หาย ต้องตรวจ!==undefined
- api-responseต้นฉบับไม่มีtimestamp; จะเพิ่มหรือไม่ขึ้นกับสเปกจริง
- test-service.jsมีtop-levelลบรหัส26และimportoffice-service.jsที่ไม่มี ไม่ใช้เป็นentry

## ไฟล์เพิ่มที่จำเป็น
middlewares-$id/error-handler.js: AppErrorและhandlerให้ใช้propertyชุดเดียวกัน
Sakilaเพิ่มactor-repository.js/actor-service.js/actor-route.jsเพื่อทำresourceที่สองโดยไม่ทับcountry
ทุกไฟล์เพิ่ม/แก้แสดงในHOW-TOและCHANGES.diffของแต่ละชุด

## ความต่างของสัญญาresponse
Sakila: GET/PUT raw,POST result,DELETE204; FK409เป็นการปรับปรุงจากบทสอนที่ยังได้500
Week6: status/data/error,DELETEลูกค้า200พร้อมข้อความ
Week8: success/data/timestamp,DTO7/13ช่อง,DELETEสินค้า204
ห้ามผสมhelperคนละชุด; คัดชุดตามสเปก ไม่ถือว่าJSONของtemplateเป็นข้อสอบจริงที่ตายตัว
