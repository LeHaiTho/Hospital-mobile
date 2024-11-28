import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, PaperProvider } from "react-native-paper";
import SignUp from "./screens/SignUp";
import DoctorDetail from "./screens/DoctorDetail";
import HospitalList from "./screens/HospitalList";
import DoctorList from "./screens/DoctorList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from "./navigation/StackNavigator";
import DoctorNavigator from "./navigation/doctorNavigator/DoctorNavigator";
import { store } from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./redux/authSlice";
import { useEffect, useState, useRef } from "react";
import axiosConfig from "./apis/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getToken } from "./firebase/firebaseConfig";
import { logout } from "./redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const UserInfoFetcher = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const fetchUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axiosConfig.get("/auth/user-info");
        console.log("user vừa vào app", response.data.user.role.name);
        dispatch(setUserInfo(response?.data?.user));
      } else {
        console.log("token không tồn tại");
      }
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
          <UserInfoFetcher />
          <StackNavigator />
          <Toast />
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
