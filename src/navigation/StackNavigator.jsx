import React from "react";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import DoctorDetail from "../screens/DoctorDetail";
import HospitalList from "../screens/HospitalList";
import DoctorList from "../screens/DoctorList";
import SignUp from "../screens/SignUp";
import LoginScreen from "../screens/LoginScreen";
import PatientDetailScreen from "../screens/PatientDetailScreen";
import SuccessfullBookScreen from "../screens/SuccessfullBookScreen";
import CancelBookingScreen from "../screens/CancelBookingScreen";
import AppointmentDetail from "../screens/AppointmentDetail";
import RatingScreen from "../screens/RatingScreen";
import SpecialtyListScreen from "../screens/SpecialtyListScreen";
import HospitalDetailScreen from "../screens/HospitalDetailScreen";
import FilterHospitalScreen from "../screens/FilterHospitalScreen";
import CustomerProfileScreen from "../screens/CustomerProfileScreen";
import ConfirmInfoScreen from "../screens/ConfirmInfoScreen";
import { TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import ScannerProfileScreen from "../screens/ScannerProfileScreen";
import ConfirmBookingAppointmentInfo from "../screens/ConfirmBookingAppointmentInfo";
import InfoPaymentScreen from "../screens/InfoPaymentScreen";
const Stack = createStackNavigator();
import { useNavigation } from "@react-navigation/native";
import DoctorScheduleScreen from "../screens/DoctorScheduleScreen";
import DetailScheduleDate from "../screens/DetailScheduleDate";
import { useSelector } from "react-redux";
import DoctorNavigator from "./doctorNavigator/DoctorNavigator";
import CustomerNavigator from "./CustomerNavigator";

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
