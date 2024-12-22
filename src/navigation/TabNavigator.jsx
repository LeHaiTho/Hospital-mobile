import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NotificationScreen from "../screens/NotificationScreen";
import CustomerProfileScreen from "../screens/CustomerProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, Text } from "react-native";
import MedicalHistoryScreen from "../screens/MedicalHistoryScreen";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={{
          tabBarLabel: "Hồ sơ",
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="folder-multiple-plus"
              color={color}
              size={size}
            />
          ),
          headerShown: true,
          headerTitle: "Hồ sơ bệnh nhân",
          headerTitleStyle: {
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: "#0165FF",
            height: 100,
          },

          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,

          headerRight: () => (
            <TouchableOpacity
              style={{
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 6,
                backgroundColor: "#0165FF",
              }}
              onPress={() => console.log("Tạo mới")}
            >
              <Ionicons name="person-add" size={20} color="#fff" />
              <Text style={{ color: "#fff" }}>Tạo mới</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="AppointmentScreen"
        options={{
          tabBarLabel: "Lịch hẹn",
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),

          headerShown: true,
          headerTitle: "Lịch hẹn",
          headerTitleStyle: {
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={AppointmentScreen}
      />
      <Tab.Screen
        name="Notification"
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          headerShown: true,
          headerTitle: "Thông báo",
          headerTitleStyle: {
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={NotificationScreen}
      />
      {/* <Tab.Screen
        name="MedicalHistory"
        component={MedicalHistoryScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "Lịch sử",
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Hồ sơ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerTitle: "Hồ sơ cá nhân",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ffffff",
            elevation: 0,
          },
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
