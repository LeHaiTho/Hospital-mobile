import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DoctorScheduleScreen from "../../screens/DoctorScheduleScreen";
import DetailScheduleDate from "../../screens/DetailScheduleDate";
import ProfileScreen from "../../screens/ProfileScreen";
import DoctorHomeScreen from "../../screens/doctor/DoctorHomeScreen";
import LeaveReasonScreen from "../../screens/doctor/LeaveReasonScreen";
import TimeOffListScreen from "../../screens/doctor/TimeOffListScreen";
const Tab = createBottomTabNavigator();
const DoctorTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DoctorHome"
        component={DoctorHomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DoctorSchedule"
        component={DoctorScheduleScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="DetailScheduleDate" component={DetailScheduleDate} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="TimeOffList" component={TimeOffListScreen} />
    </Tab.Navigator>
  );
};

export default DoctorTabNavigator;
