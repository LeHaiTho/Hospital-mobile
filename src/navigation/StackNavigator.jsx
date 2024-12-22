import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import CustomerNavigator from "./CustomerNavigator";
import DoctorNavigator from "./doctorNavigator/DoctorNavigator";
const Stack = createStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user && user?.role?.name === "customer" ? (
        <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
      ) : user && (user?.role?.name === "doctor" || user?.role === "doctor") ? (
        <Stack.Screen name="DoctorNavigator" component={DoctorNavigator} />
      ) : (
        <Stack.Screen name="CustomerNavigator" component={CustomerNavigator} />
      )}
    </Stack.Navigator>
  );
};
export default StackNavigator;
