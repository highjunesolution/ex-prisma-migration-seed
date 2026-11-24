# Prisma Migrations Lab

<p align="center">
  <strong>เรียนรู้ Database Migration, Prisma Client และ Data Seeding ด้วย Prisma ORM และ SQL Server</strong>
</p>

<p align="center">
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-6.19.3-2D3748?logo=prisma&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-%3E%3D18.18-339933?logo=node.js&logoColor=white">
  <img alt="SQL Server" src="https://img.shields.io/badge/Database-SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white">
  <img alt="Module system" src="https://img.shields.io/badge/JavaScript-CommonJS-F7DF1E?logo=javascript&logoColor=black">
</p>

---

โปรเจกต์ตัวอย่างสำหรับฝึก workflow การเปลี่ยนแปลง Database Schema อย่างเป็นระบบ ตั้งแต่การออกแบบ Model, สร้างและตรวจสอบ SQL Migration, Generate Prisma Client ไปจนถึง Seed ข้อมูลเริ่มต้นแบบรันซ้ำได้

## สารบัญ

- [ภาพรวมโปรเจกต์](#ภาพรวมโปรเจกต์)
- [เป้าหมายการเรียนรู้](#เป้าหมายการเรียนรู้)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
- [โครงสร้างไฟล์](#โครงสร้างไฟล์)
- [การติดตั้งและเริ่มใช้งาน](#การติดตั้งและเริ่มใช้งาน)
- [การตั้งค่า Database](#การตั้งค่า-database)
- [Prisma Schema](#prisma-schema)
- [Migrations](#migrations)
- [Seed Data](#seed-data)
- [คำสั่งที่ใช้บ่อย](#คำสั่งที่ใช้บ่อย)
- [ข้อควรระวัง](#ข้อควรระวัง)

## ภาพรวมโปรเจกต์

Repository นี้เป็น lab ขนาดเล็กสำหรับทดลอง workflow พื้นฐานของ Prisma

| ส่วน | หน้าที่ |
| --- | --- |
| Prisma Schema | กำหนดโครงสร้าง database และ model |
| Prisma Migrate | เก็บประวัติการเปลี่ยนแปลง schema เป็น SQL migration |
| Prisma Client | ใช้เชื่อมต่อและ query database จาก Node.js |
| Seed Script | เพิ่มข้อมูลตัวอย่างลงตาราง `User` |
| `app.js` | ไฟล์ตัวอย่างสำหรับรัน Node.js แบบง่าย |

## เป้าหมายการเรียนรู้

หลังจบ Lab นี้ คุณควรสามารถ:

- ออกแบบ Model และ Datasource ใน `schema.prisma`
- สร้าง Migration ใหม่จากการเปลี่ยนแปลง Schema
- อ่านและตรวจสอบ SQL ที่ Prisma สร้างก่อนนำไปใช้งาน
- แยกความแตกต่างระหว่าง `migrate dev` และ `migrate deploy`
- Generate และเรียกใช้ Prisma Client จาก Custom Output Path
- Seed ข้อมูลแบบ idempotent ด้วย `upsert`
- จัดการ `DATABASE_URL` โดยไม่ Commit Secret ลง Repository

## เทคโนโลยีที่ใช้

| Technology | Version / Detail |
| --- | --- |
| Node.js | ต้องใช้ `>=18.18` สำหรับ Prisma Client เวอร์ชันนี้ |
| JavaScript | CommonJS |
| Prisma | `^6.19.3` |
| `@prisma/client` | `^6.19.3` |
| Database | SQL Server |

## สิ่งที่ต้องเตรียม

- Node.js 18.18 ขึ้นไป และ npm
- SQL Server ที่เชื่อมต่อได้ พร้อม Database สำหรับใช้ทดลอง
- User ของ SQL Server ที่มีสิทธิ์สร้างและแก้ไข Table ใน Database ดังกล่าว
- Terminal เช่น PowerShell, Command Prompt หรือ Bash

## โครงสร้างไฟล์

```text
.
├── app.js
├── package.json
├── package-lock.json
├── prisma.config.ts
├── .env.example
├── .gitignore
└── prisma/
    ├── prisma.js
    ├── schema.prisma
    ├── seed.prisma.js
    └── migrations/
        ├── migration_lock.toml
        ├── 20260626062225_initial/
        ├── 20260626064425_user_updatednull/
        ├── 20260626064659_user_add_email/
        └── 20260626075634_user_add_password/
```

## การติดตั้งและเริ่มใช้งาน

### 1. Clone Repository

```powershell
git clone https://github.com/highjunesolution/ex-prisma-migration-seed.git lab21-prisma-migrations
Set-Location lab21-prisma-migrations
```

### 2. ติดตั้ง Dependencies

```powershell
npm ci
```

### 3. สร้างไฟล์ `.env`

```powershell
Copy-Item .env.example .env
```

จากนั้นแก้ค่า `DATABASE_URL` ให้ตรงกับ SQL Server ของคุณ

### 4. ตรวจสอบ Prisma Schema

```powershell
npx prisma validate
```

### 5. รัน Migrations

```powershell
npx prisma migrate dev
```

### 6. Generate Prisma Client

```powershell
npx prisma generate
```

### 7. Seed ข้อมูลเริ่มต้น

```powershell
npx prisma db seed
```

### 8. รันไฟล์ตัวอย่าง

```powershell
node app.js
```

ผลลัพธ์ที่คาดหวัง

```text
Hello World
```

## การตั้งค่า Database

โปรเจกต์นี้ใช้ environment variable ชื่อ `DATABASE_URL` สำหรับเชื่อมต่อ SQL Server

```env
DATABASE_URL="sqlserver://localhost:1433;database=DATABASENAME;user=USERNAME;password=PASSWORD;trustServerCertificate=true;encrypt=true"
```

| ค่า | ความหมาย |
| --- | --- |
| `localhost:1433` | host และ port ของ SQL Server |
| `DATABASENAME` | ชื่อ database |
| `USERNAME` | username สำหรับเชื่อมต่อ |
| `PASSWORD` | password สำหรับเชื่อมต่อ |
| `trustServerCertificate=true` | อนุญาตให้ trust certificate ใน local/dev environment |
| `encrypt=true` | เปิดการเข้ารหัส connection |

> ไฟล์ `.env` ถูก ignore ไว้ใน `.gitignore` แล้ว ไม่ควร commit connection string จริงขึ้น repository

> [!TIP]
> หาก username หรือ password มีอักขระพิเศษ ให้ตรวจสอบการ encode ค่าใน connection string ก่อนเชื่อมต่อ

## Prisma Schema

ไฟล์ schema หลักอยู่ที่ `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}
```

จุดสำคัญของ config นี้คือ Prisma Client จะถูก generate ไปที่ `generated/prisma` แทน path เริ่มต้น โดยไฟล์ `prisma/prisma.js` ซึ่งอยู่ภายในโฟลเดอร์ `prisma` จึง import Client ด้วย relative path ต่อไปนี้:

```js
const { PrismaClient } = require("../generated/prisma")
```

### Model: `User`

| Field | Type | Constraint / Default | คำอธิบาย |
| --- | --- | --- | --- |
| `id` | `Int` | `@id`, `@default(autoincrement())` | Primary key |
| `fname` | `String` | required | ชื่อ |
| `lname` | `String` | required | นามสกุล |
| `email` | `String?` | `@unique` | อีเมล ใช้เป็น unique key |
| `password` | `String?` | optional | รหัสผ่าน |
| `createdAt` | `DateTime` | `@default(now())` | เวลาที่สร้างข้อมูล |
| `updatedAt` | `DateTime?` | `@updatedAt` | เวลาที่อัปเดตข้อมูลล่าสุด |

## Migrations

Migrations ทั้งหมดถูกเก็บไว้ที่ `prisma/migrations`

| Migration | รายละเอียด |
| --- | --- |
| `20260626062225_initial` | สร้างตาราง `User` พร้อม `id`, `fname`, `lname`, `createdAt`, `updatedAt` |
| `20260626064425_user_updatednull` | ปรับ `updatedAt` ให้เป็น nullable |
| `20260626064659_user_add_email` | เพิ่ม column `email` และ unique constraint `User_email_key` |
| `20260626075634_user_add_password` | เพิ่ม column `password` |

เมื่อต้องการแก้ schema ให้แก้ `prisma/schema.prisma` แล้วสร้าง migration ใหม่

```powershell
npx prisma migrate dev --name describe_your_change
```

## Seed Data

ไฟล์ seed อยู่ที่ `prisma/seed.prisma.js` และถูก config ไว้ใน `prisma.config.ts`

```ts
seed: "node prisma/seed.prisma.js"
```

ข้อมูลตั้งต้นที่ seed script เพิ่มเข้า database

| fname | lname | email |
| --- | --- | --- |
| Jirayu | Suriwan | `demo@example.com` |
| Steven | Gerrard | `steven@liver.com` |

Seed script ใช้ `prisma.user.upsert` โดยค้นหาจาก `email` ถ้ามีข้อมูลเดิมอยู่แล้วจะไม่สร้างซ้ำ ถ้าไม่พบข้อมูลจะสร้าง record ใหม่

```powershell
npx prisma db seed
```

## คำสั่งที่ใช้บ่อย

| Command | ใช้ทำอะไร |
| --- | --- |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma validate` | ตรวจสอบความถูกต้องของ Schema และ Configuration |
| `npx prisma migrate dev` | รัน migration ใน local development |
| `npx prisma migrate dev --name migration_name` | สร้าง migration ใหม่ |
| `npx prisma migrate deploy` | Deploy migrations ไปยัง environment อื่น |
| `npx prisma migrate status` | ตรวจสอบสถานะ migration |
| `npx prisma db seed` | รัน seed script |
| `npx prisma studio` | เปิด Prisma Studio เพื่อดู/แก้ข้อมูลผ่าน UI |
| `node app.js` | รันไฟล์ตัวอย่าง |

## ไฟล์สำคัญ

| File | รายละเอียด |
| --- | --- |
| `package.json` | ระบุ dependencies และ project metadata |
| `prisma.config.ts` | config ของ Prisma CLI, schema path, migration path และ seed command |
| `prisma/schema.prisma` | schema หลักของ Prisma |
| `prisma/prisma.js` | สร้างและ export Prisma Client instance |
| `prisma/seed.prisma.js` | script สำหรับ seed ข้อมูลตัวอย่าง |
| `.env.example` | ตัวอย่าง connection string สำหรับ SQL Server |
| `.gitignore` | ignore `node_modules`, `.env` และ `generated/prisma` |

## ข้อควรระวัง

- ต้องมี SQL Server และ database ที่เข้าถึงได้จาก `DATABASE_URL`
- ต้องรัน `npx prisma generate` ก่อนใช้ `prisma/prisma.js`
- โฟลเดอร์ `generated/prisma` ถูก ignore จึงต้อง generate ใหม่หลัง clone project
- `email` เป็น unique ถ้า database เดิมมี email ซ้ำ migration อาจ fail
- `package.json` ยังไม่มี script สำหรับ `start` หรือ `seed` โดยตรง
- test script ปัจจุบันยังเป็นค่า default คือ `Error: no test specified`
- ฟิลด์ `password` ใน Lab นี้เป็นเพียงส่วนหนึ่งของ Schema; ระบบจริงต้อง Hash Password ก่อนบันทึกเสมอ

## Workflow แนะนำ

1. แก้ model ใน `prisma/schema.prisma`
2. สร้าง migration ใหม่

```powershell
npx prisma migrate dev --name describe_your_change
```

3. ตรวจไฟล์ SQL ใน `prisma/migrations`
4. Generate Prisma Client

```powershell
npx prisma generate
```

5. ทดสอบ query หรือรัน seed กับ database local

> [!IMPORTANT]
> ควร Commit ทั้ง `schema.prisma` และไฟล์ใน `prisma/migrations` เพื่อให้ทีมและทุก Environment ใช้ลำดับการเปลี่ยนแปลง Schema เดียวกัน แต่ไม่ควรแก้ Migration ที่ถูกนำไปใช้แล้ว ให้สร้าง Migration ใหม่สำหรับการเปลี่ยนแปลงครั้งถัดไป

## License

โปรเจกต์นี้ใช้ license แบบ `ISC` ตามที่ระบุใน `package.json`
