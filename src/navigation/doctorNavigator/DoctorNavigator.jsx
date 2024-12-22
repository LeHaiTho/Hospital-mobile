import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { useNavigation } from "@react-navigation/native";
import DoctorTabNavigator from "./DoctorTabNavigator";
import LeaveReasonScreen from "../../screens/doctor/LeaveReasonScreen";
import LoginScreen from "../../screens/LoginScreen";
import CommunityListScreen from "../../screens/community/CommunityListScreen";
import ChatScreen from "../../screens/chat/ChatScreen";
import ChatListScreen from "../../screens/chat/ChatListScreen";
import DoctorScheduleScreen from "../../screens/DoctorScheduleScreen";
import TimeOffListScreen from "../../screens/doctor/TimeOffListScreen";

const DoctorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorTabNavigator"
        component={DoctorTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="CommunityList"
        component={CommunityListScreen}
        options={{
          headerShown: true,
          headerTitle: "Cộng đồng hỏi đáp",
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
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          headerShown: true,
          headerTitle: "Danh sách cuộc trò chuyện",
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
      />
      <Stack.Screen
        name="DoctorSchedule"
        component={DoctorScheduleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TimeOffList"
        component={TimeOffListScreen}
        options={{
          headerShown: true,
          headerTitle: "Đơn xin nghỉ phép",
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
      />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
