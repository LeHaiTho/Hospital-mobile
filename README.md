## 📋 Yêu cầu hệ thống

- **Node.js** phiên bản 18 trở lên
- **npm** hoặc **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio** (cho Android) hoặc **Xcode** (cho iOS)
- **Expo Go** app trên điện thoại để test

## 🚀 Hướng dẫn cài đặt

### 1. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Cấu hình môi trường

#### 2.1 Lấy địa chỉ IP của máy tính

Mở **Command Prompt (CMD)** và chạy lệnh:

```cmd
ipconfig
```

Tìm dòng **IPv4 Address** trong phần **Wireless LAN adapter Wi-Fi** hoặc **Ethernet adapter**, ví dụ:
```
IPv4 Address. . . . . . . . . . . : 192.168.1.100
```

#### 2.2 Tạo file .env

Tạo file `.env` trong thư mục gốc của mobile và thêm cấu hình:

```env
# Thay đổi IP address theo kết quả từ ipconfig
EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api

# Cấu hình Firebase (tùy chọn)
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

> **⚠️ Lưu ý quan trọng**: 
> - Thay thế `192.168.1.100` bằng địa chỉ IP thực tế của máy bạn
> - Đảm bảo máy tính và điện thoại cùng kết nối một mạng
> - Server backend phải đang chạy trên port 5000

### 3. Cấu hình Firebase (Tùy chọn)

Nếu sử dụng Firebase cho push notification:

1. Tải file `google-services.json` từ Firebase Console
2. Đặt file này trong thư mục gốc của mobile
3. Cập nhật cấu hình trong `.env`

## 🏃‍♂️ Chạy ứng dụng

### Khởi động development server

```bash
npm start
# hoặc
expo start
```