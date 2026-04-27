# Lưu trữ đề xuất triển khai web app online

Tài liệu này lưu lại kế hoạch đưa web app **Tài Chính Cá Nhân Plus / Ví Thông Minh** lên online để dễ kiểm soát quá trình triển khai.

---

## 1. Phương án triển khai đề xuất

### Đề xuất chính

Sử dụng mô hình:

```txt
Frontend + Next.js API Routes: Vercel
Authentication + Database: Firebase Authentication + Firestore
Source Control: GitHub
Domain: Vercel domain miễn phí hoặc domain riêng
```

### Lý do chọn Vercel

Vì ứng dụng hiện tại đang dùng **Next.js**, có cấu trúc:

```txt
src/app/api/...
src/app/dashboard/...
src/lib/firebase/...
src/lib/db/firestore-adapter.ts
```

Ứng dụng không chỉ là static site mà còn có **API routes**, nên Vercel là lựa chọn phù hợp hơn Firebase Hosting đơn thuần.

Ưu điểm:

- Hỗ trợ Next.js rất tốt.
- Deploy nhanh từ GitHub.
- API routes hoạt động trực tiếp.
- Tự động build khi push code.
- Có preview link cho từng lần thay đổi.
- Dễ cấu hình environment variables.
- Có thể gắn domain riêng sau này.

---

## 2. Giai đoạn 1 — Chuẩn bị production

### 2.1. Kiểm tra build local

Đã chạy trong thư mục app:

```bash
npm run lint
npm run build
```

Kết quả:

- [x] Không lỗi ESLint.
- [x] Không lỗi TypeScript.
- [x] App build được production bundle.

Ghi chú:

- Build đã thành công với `Exit code: 0`.
- Next.js có cảnh báo về nhiều `package-lock.json` trong workspace. Đây chưa phải lỗi chặn deploy, nhưng có thể xử lý sau bằng cách cấu hình `turbopack.root` hoặc dọn lockfile không cần thiết.

---

### 2.2. Chuẩn hóa file `.env.local`

Ứng dụng Firebase thường cần các biến môi trường sau.

#### Biến dùng phía client

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

#### Biến dùng phía server/admin

```env
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

> Quan trọng: `FIREBASE_PRIVATE_KEY` không được commit lên GitHub.

Nếu private key có ký tự xuống dòng dạng `\n`, code server nên xử lý như sau:

```ts
privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
```

---

### 2.3. Kiểm tra Firebase Authorized Domains

Trong Firebase Console:

```txt
Authentication > Settings > Authorized domains
```

Sau khi deploy cần thêm domain production, ví dụ:

```txt
your-app.vercel.app
```

Nếu dùng domain riêng:

```txt
taichinhcanhanplus.vn
www.taichinhcanhanplus.vn
```

Nếu không thêm domain, Firebase Auth trên production có thể bị lỗi đăng nhập.

---

### 2.4. Cấu hình Firestore Security Rules

Nguyên tắc production:

> Người dùng chỉ được đọc/ghi dữ liệu của chính họ.

Rules gợi ý nếu dữ liệu nằm dưới path `/users/{userId}/...`:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> Lưu ý: rules thực tế cần khớp với cấu trúc collection hiện tại của app.

---

## 3. Giai đoạn 2 — Đưa code lên GitHub

Nếu project chưa có GitHub repo, nên tạo repo riêng, ví dụ:

```txt
TaiChinhCaNhanPlus
```

Sau đó push source code lên GitHub.

Vì app nằm trong thư mục:

```txt
taichinhcanhanplus-app
```

Khi deploy cần nhớ cấu hình đúng thư mục gốc trên Vercel.

### 3.1. Kiểm tra `.gitignore`

Đảm bảo `.gitignore` có các dòng:

```gitignore
.env
.env.local
.env*.local
.next
node_modules
```

Không commit:

- Firebase private key.
- Service account JSON.
- File môi trường local.
- Thư mục build `.next`.
- `node_modules`.

---

## 4. Giai đoạn 3 — Deploy lên Vercel

### 4.1. Import project

Vào:

```txt
https://vercel.com/new
```

Chọn GitHub repository của app.

---

### 4.2. Cấu hình Root Directory

Vì app nằm trong:

```txt
taichinhcanhanplus-app
```

Trong Vercel cần đặt:

```txt
Root Directory: taichinhcanhanplus-app
```

---

### 4.3. Build settings

Vercel thường tự nhận Next.js. Nếu cần cấu hình thủ công:

```txt
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

---

### 4.4. Thêm Environment Variables trên Vercel

Trong Vercel:

```txt
Project Settings > Environment Variables
```

Thêm toàn bộ biến:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

Sau khi thêm/chỉnh env, cần redeploy project.

---

## 5. Giai đoạn 4 — Sau khi deploy thành công

Sau khi Vercel build thành công, app sẽ có URL dạng:

```txt
https://ten-app.vercel.app
```

### 5.1. Thêm domain vào Firebase Auth

Firebase Console:

```txt
Authentication > Settings > Authorized domains
```

Thêm domain Vercel:

```txt
ten-app.vercel.app
```

Nếu dùng domain riêng, thêm tiếp:

```txt
taichinhcanhanplus.vn
www.taichinhcanhanplus.vn
```

---

### 5.2. Checklist kiểm thử chức năng

Sau deploy, cần test các chức năng sau:

- [ ] Đăng ký tài khoản mới.
- [ ] Đăng nhập.
- [ ] Đăng xuất.
- [ ] Dashboard load dữ liệu đúng user.
- [ ] Thêm giao dịch.
- [ ] Xem danh sách giao dịch.
- [ ] Xem chi tiết giao dịch.
- [ ] Xem ví.
- [ ] Xem ngân sách.
- [ ] Xem báo cáo.
- [ ] Đăng nhập bằng user khác và kiểm tra không thấy dữ liệu user cũ.

---

### 5.3. Kiểm tra Firestore

Trong Firebase Console:

```txt
Firestore Database > Data
```

Cần xác nhận:

- Dữ liệu được ghi đúng user.
- Không bị ghi chung vào dữ liệu global/mock.
- Các collection đúng với adapter Firestore hiện tại.

---

## 6. Giai đoạn 5 — Domain riêng

Nếu muốn chuyên nghiệp hơn, có thể mua/gắn domain riêng, ví dụ:

```txt
taichinhcanhanplus.vn
```

Trong Vercel:

```txt
Project > Settings > Domains
```

Sau đó cấu hình DNS theo hướng dẫn của Vercel.

Sau khi domain hoạt động, thêm domain đó vào Firebase Auth Authorized Domains.

---

## 7. Phương án thay thế

### Firebase App Hosting

Có thể cân nhắc nếu muốn toàn bộ nằm trong hệ sinh thái Firebase:

```txt
Firebase App Hosting
Firebase Authentication
Firestore
Cloud Logging
Cloud Functions nếu cần
```

### Vì sao chưa ưu tiên phương án này?

Với trạng thái hiện tại của app, Vercel vẫn phù hợp hơn vì:

- Deploy Next.js nhanh hơn.
- Debug build/runtime dễ hơn.
- Tài liệu và cộng đồng Next.js trên Vercel ổn định hơn.
- Phù hợp với giai đoạn phát triển hiện tại.

---

## 8. Thứ tự triển khai đề xuất

### Bước 1 — Production readiness

- [ ] Chạy `npm run lint`.
- [ ] Chạy `npm run build`.
- [ ] Sửa toàn bộ lỗi build/lint nếu có.

### Bước 2 — Rà soát Firebase env

Kiểm tra các file:

```txt
src/lib/firebase/client.ts
src/lib/firebase/admin.ts
.env.local
```

Mục tiêu:

- Client Firebase dùng `NEXT_PUBLIC_*`.
- Firebase Admin dùng biến server-only.
- Không hardcode secret trong source code.

### Bước 3 — Tạo tài liệu deploy chi tiết

Nên tạo thêm file:

```txt
docs/deploy-vercel.md
```

Nội dung gồm:

- Cách tạo GitHub repo.
- Cách import vào Vercel.
- Danh sách env variables cần thêm.
- Cách cấu hình Firebase Authorized Domains.
- Checklist kiểm thử sau deploy.

### Bước 4 — Deploy lên Vercel

- [ ] Import GitHub repo vào Vercel.
- [ ] Set Root Directory là `taichinhcanhanplus-app`.
- [ ] Thêm Environment Variables.
- [ ] Deploy.
- [ ] Lấy URL production.

### Bước 5 — Cấu hình Firebase Auth sau deploy

- [ ] Thêm domain Vercel vào Authorized Domains.
- [ ] Test đăng ký/đăng nhập.
- [ ] Test API authenticated.

### Bước 6 — Kiểm thử dữ liệu user-specific

- [ ] User A tạo dữ liệu.
- [ ] User B đăng nhập.
- [ ] User B không thấy dữ liệu của User A.
- [ ] Firestore rules không cho truy cập trái phép.

---

## 9. Kết luận

Phương án triển khai được đề xuất:

```txt
Vercel cho Next.js app
Firebase cho Auth + Firestore
GitHub cho source control
Domain riêng sau khi app ổn định
```

Đây là hướng nhanh nhất để đưa app online, đồng thời vẫn đủ chuẩn production cho giai đoạn đầu.
