# 1-dars: Minimal Node.js Backend Structure

Bu loyihada ataylab sodda structure ishlatildi:

- `index.js`
  Serverni ishga tushiradi.
- `src/app.js`
  Express app yaratadi va route'larni ulaydi.
- `src/routes/`
  URL yo'llarni saqlaydi.
- `src/controllers/`
  Request va response bilan ishlaydi.
- `src/services/`
  Asosiy business logic shu yerda bo'ladi.
- `src/utils/`
  Qayta ishlatiladigan oddiy helper function'lar.

## Oqim qanday ishlaydi

1. Client `GET /users` yuboradi.
2. Route controller'ni chaqiradi.
3. Controller service'dan data oladi.
4. Service natijani qaytaradi.
5. Controller response yuboradi.

## Nega bunday bo'ldik

Hammasini bitta faylda yozsak backend tez chalkashadi.
Shuning uchun vazifalarni bo'lib tashlaymiz:

- route: qaysi URL
- controller: request/response
- service: logika
- utils: yordamchi function

## Birinchi task

Quyidagini o'zing yozishga harakat qil:

1. `GET /users/:id` endpoint qo'sh.
2. Service ichida `getUserById(id)` function yoz.
3. Agar user topilmasa `404` qaytarsin.

## Ikkinchi task

Quyidagini keyin qilamiz:

1. `DELETE /users/:id`
2. `PUT /users/:id`

## Test uchun requestlar

### GET users

`GET http://localhost:3000/users`

### POST user

`POST http://localhost:3000/users`

Body:

```json
{
  "name": "Vali",
  "email": "vali@example.com"
}
```

# 2-dars: Auth Nima va Qaerda Nima Yoziladi

Bu darsda soddalashtirilgan auth oqimi qo'shildi:

- `POST /auth/register`
- `POST /auth/login`

## Auth oqimi

1. Client register yoki login request yuboradi.
2. Route controller'ga yuboradi.
3. Controller body'dan kerakli field'larni oladi.
4. Service userni tekshiradi va logikani bajaradi.
5. Utils ichidagi yordamchi function'lar ishlatiladi.
6. Controller foydalanuvchiga response qaytaradi.

## Auth ichida route nima qiladi

Route faqat endpoint'ni controller bilan bog'laydi:

- `POST /auth/register`
- `POST /auth/login`

Route ichida odatda katta logika yozilmaydi.

## Auth ichida controller nima qiladi

Controller:

- `req.body` dan data oladi
- bo'sh field bor-yo'qligini tekshiradi
- service function'ni chaqiradi
- `201`, `200`, `400`, `401`, `409` kabi status qaytaradi

Controller HTTP'ni biladi.

## Auth ichida service nima qiladi

Service:

- email oldin bor-yo'qligini tekshiradi
- password'ni tayyorlaydi
- userni saqlaydi
- login paytida email/password'ni tekshiradi
- token tayyorlaydi

Service biznes logikani biladi.

## Utils nima uchun kerak

Bu darsda 2 ta helper bor:

- `hash.util.js`
- `token.util.js`

Hozir ular juda sodda ishlaydi, chunki maqsad tushunish.
Real loyihada:

- `hashPassword` uchun `bcrypt`
- `generateToken` uchun `jsonwebtoken`

ishlatiladi.

## Muhim eslatma

Hozirgi auth o'quv uchun yozildi, production uchun emas.
Chunki:

- haqiqiy database yo'q
- haqiqiy JWT yo'q
- password haqiqiy hash qilinmagan

Lekin layer'lar to'g'ri ajratilgan.

## Test requestlar

### Register

`POST http://localhost:3000/auth/register`

```json
{
  "name": "Vali",
  "email": "vali@example.com",
  "password": "123456"
}
```

### Login

`POST http://localhost:3000/auth/login`

```json
{
  "email": "vali@example.com",
  "password": "123456"
}
```

## Senga task

Quyidagini o'zing yozishga harakat qil:

1. `GET /auth/me` endpoint qo'sh.
2. Token'dan user id olish uchun alohida helper yoz.
3. Login bo'lgan user ma'lumotini qaytar.

Bu task orqali keyingi darsda middleware'ga o'tamiz.
