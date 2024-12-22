import { Alert, StyleSheet } from "react-native";
// import HomeScreen from "./screens/HomeScreen";
// import LoginScreen from "./screens/LoginScreen";
// import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
// import SignUp from "./screens/SignUp";
// import DoctorDetail from "./screens/DoctorDetail";
// import HospitalList from "./screens/HospitalList";
// import DoctorList from "./screens/DoctorList";
import StackNavigator from "./src/navigation/StackNavigator";
// import DoctorNavigator from "./src/navigation/doctorNavigator/DoctorNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import axiosConfig from "./src/apis/axiosConfig";
import { setUserInfo } from "./src/redux/authSlice";
import { store } from "./src/redux/store";
// import { Platform } from "react-native";
// import { getToken } from "./firebase/firebaseConfig";
// import { logout } from ".";
// import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { initializeSocket, socket } from "./src/utils/socket";
import ToastConfig from "./src/utils/toastConfig";

// test deep linking
// import * as Linking from "expo-linking";

const Base_URL = process.env.EXPO_PUBLIC_API_URL;
const UserInfoFetcher = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const fetchUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axiosConfig.get("/auth/user-info");
        console.log("user vừa vào app", response.data.user.role.name);

        // Gửi token khi connect serve
        dispatch(setUserInfo(response?.data?.user));
        initializeSocket(token);
      }

      return () => {
        if (socket) {
          socket.disconnect();
          console.log("disconnect socket");
        }
      };
    } catch (error) {
      console.log("error", error);
    }
  };

  // Lắng nghe sự kiện khi có thông báo
  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    // Lấy Expo Push Token
    const token = (await Notifications.getExpoPushTokenAsync()).data;

    // Lưu expo push token vào async storage
    await AsyncStorage.setItem("expoPushToken", token);

    // Lưu token vào database
    if (user) {
      const expoPushToken = await AsyncStorage.getItem("expoPushToken");
      try {
        const response = await axiosConfig.post("/push-tokens/create", {
          pushToken: expoPushToken,
        });
      } catch (error) {
        console.log("error", error);
      }
    }

    return token;
  };

  useEffect(() => {
    fetchUserInfo();
  }, [dispatch]); // Thêm dispatch vào dependency array
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [user]);

  return null;
};

const App = () => {
  // useEffect(() => {
  //   // Hàm xử lý khi ứng dụng được mở bằng URL
  //   const handleDeepLink = (event) => {
  //     const url = event.url; // URL đầy đủ được mở
  //     console.log("URL nhận được:", url);

  //     // Phân tích URL để lấy thông tin
  //     const path = url.split("://")[1]; // Lấy phần "paymentsuccess"
  //     if (path === "paymentsuccess") {
  //       // Alert.alert("Thông báo", "Thanh toán thành công!");
  //       // xử lý khi thanh toán thành công
  //       // mở màn hình home
  //       navigation.navigate("TabNavigator");
  //     }
  //   };

  //   // Lắng nghe sự kiện mở URL
  //   Linking.addEventListener("url", handleDeepLink);

  //   // Kiểm tra nếu ứng dụng đã được mở bằng URL
  //   Linking.getInitialURL().then((url) => {
  //     if (url) handleDeepLink({ url });
  //   });

  //   // Dọn dẹp listener khi component bị unmount
  //   return () => {
  //     Linking.removeEventListener("url", handleDeepLink);
  //   };
  // }, []);
  // Cấu hình hiển thị thông báo
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <UserInfoFetcher />
          <StackNavigator />
          <Toast config={ToastConfig} />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
