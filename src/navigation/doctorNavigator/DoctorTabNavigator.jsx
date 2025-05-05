import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DoctorScheduleScreen from "../../screens/DoctorScheduleScreen";
import DetailScheduleDate from "../../screens/DetailScheduleDate";
import ProfileScreen from "../../screens/ProfileScreen";
import DoctorHomeScreen from "../../screens/doctor/DoctorHomeScreen";
import LeaveReasonScreen from "../../screens/doctor/LeaveReasonScreen";
import TimeOffListScreen from "../../screens/doctor/TimeOffListScreen";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const DoctorTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DoctorHome"
        component={DoctorHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LeaveReason"
        component={LeaveReasonScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="file-text" size={size} color={color} />
          ),
          title: "Đơn nghỉ",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "500",
          },
          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Thông tin cá nhân",
          headerTitleStyle: {
            fontSize: 17,
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-md" size={size} color={color} />
          ),

          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default DoctorTabNavigator;
