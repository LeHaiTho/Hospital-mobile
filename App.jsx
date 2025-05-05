import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import axiosConfig from "./src/apis/axiosConfig";
import DeepLinkHandler from "./src/components/DeepLinkHandler";
import StackNavigator from "./src/navigation/StackNavigator";
import { setUserInfo } from "./src/redux/authSlice";
import { store } from "./src/redux/store";
import { initializeSocket, socket } from "./src/utils/socket";
import ToastConfig from "./src/utils/toastConfig";

// test deep linking

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
          <DeepLinkHandler />
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
