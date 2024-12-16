import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { useNavigation } from "@react-navigation/native";
import DoctorTabNavigator from "./DoctorTabNavigator";
import LeaveReasonScreen from "../../screens/doctor/LeaveReasonScreen";
import TimeOffListScreen from "../../screens/doctor/TimeOffListScreen";
import LoginScreen from "../../screens/LoginScreen";
import CommunityListScreen from "../../screens/community/CommunityListScreen";
import ChatScreen from "../../screens/chat/ChatScreen";
import ChatListScreen from "../../screens/chat/ChatListScreen";

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
      <Stack.Screen
        name="LeaveReason"
        component={LeaveReasonScreen}
        options={{
          title: "Thông tin xin nghỉ",
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
      <Stack.Screen
        name="TimeOffList"
        component={TimeOffListScreen}
        options={{ title: "Lịch sử xin nghỉ" }}
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
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
