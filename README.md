# 📱 Hospital Management Mobile App - Medcare

Ứng dụng di động quản lý bệnh viện được phát triển bằng React Native Expo, cho phép bệnh nhân đặt lịch khám, quản lý hồ sơ sức khỏe và tương tác với bác sĩ.

## 📋 Yêu cầu hệ thống

- **Node.js** phiên bản 18 trở lên
- **npm** hoặc **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio** (cho Android) hoặc **Xcode** (cho iOS)
- **Expo Go** app trên điện thoại để test

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
git clone https://github.com/LeHaiTho/Hospital-mobile.git
cd Hospital-mobile
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Cấu hình môi trường

#### 3.1 Lấy địa chỉ IP của máy tính

Mở **Command Prompt (CMD)** và chạy lệnh:

```cmd
ipconfig
```

Tìm dòng **IPv4 Address** trong phần **Wireless LAN adapter Wi-Fi** hoặc **Ethernet adapter**, ví dụ:
```
IPv4 Address. . . . . . . . . . . : 192.168.1.100
```

#### 3.2 Tạo file .env

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
> - Đảm bảo máy tính và điện thoại cùng kết nối một mạng WiFi
> - Server backend phải đang chạy trên port 5000

### 4. Cấu hình Firebase (Tùy chọn)

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

## 🔧 Cấu trúc thư mục

```
mobile/
├── src/
│   ├── apis/              # API configurations
│   ├── components/        # Reusable components
│   ├── navigation/        # Navigation setup
│   ├── redux/            # Redux store và slices
│   ├── screens/          # Screen components
│   │   ├── auth/         # Authentication screens
│   │   ├── chat/         # Chat screens
│   │   ├── community/    # Community screens
│   │   └── doctor/       # Doctor screens
│   ├── store/            # Redux store configuration
│   └── utils/            # Utility functions
├── assets/               # Images, fonts, icons
├── App.jsx              # Main app component
├── package.json         # Dependencies
├── app.json            # Expo configuration
└── .env                # Environment variables
```

