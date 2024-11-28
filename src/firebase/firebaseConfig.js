// // firebase.js
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

// // Cấu hình Firebase của bạn
// const firebaseConfig = {
//   apiKey: "AIzaSyBqnftp4TEEuKyIfn9gImBvpfBbXGDgmUI",
//   authDomain: "hospital-lht.firebaseapp.com",
//   projectId: "hospital-lht",
//   storageBucket: "hospital-lht.appspot.com",
//   messagingSenderId: "730153175086",
//   appId: "1:730153175086:web:eb4582704230e7eecff7bf",
//   measurementId: "G-GF0MW8RVB2",
// };

// // Khởi tạo Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // Hàm để lấy FCM token
// export const requestFCMToken = async () => {
//   try {
//     const token = await getToken(messaging, {
//       vapidKey: "YOUR_VAPID_KEY", // Thay bằng VAPID key của bạn
//     });
//     console.log("FCM Token:", token);
//     return token;
//   } catch (error) {
//     console.error("Error getting FCM token:", error);
//     return null;
//   }
// };
