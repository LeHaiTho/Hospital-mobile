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
import ChangeAppointmentDetail from "../screens/ChangeAppointmentDetail";
const Stack = createStackNavigator();
import { useNavigation } from "@react-navigation/native";
import RecommendedSystemScreen from "../screens/RecommendedSystemScreen";
import ConfirmChangeAppointmentDetailScreen from "../screens/ConfirmChangeAppointmentDetailScreen";
import WebviewPaymentScreen from "../screens/WebviewPaymentScreen";
import MedicalHistoryDetailScreen from "../screens/MedicalHistoryDetailScreen";
import ResultDetails from "../screens/ResultDetails";
import ResultImageScreen from "../screens/ResultImageScreen";
import CommunityListScreen from "../screens/community/CommunityListScreen";
import CreateQuestion from "../screens/community/CreateQuestion";
import SpecialtyFilterListScreen from "../screens/SpecialtyFilterListScreen";
import SpecialtyDetailOfHospital from "../screens/SpecialtyDetailOfHospital";
import MedicalHistoryScreen from "../screens/MedicalHistoryScreen";
import ChatScreen from "../screens/chat/ChatScreen";
const CustomerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreateQuestion"
        component={CreateQuestion}
        options={{
          headerShown: true,
          headerTitle: "Đặt câu hỏi",
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
        name="SpecialtyFilterList"
        component={SpecialtyFilterListScreen}
      />
      <Stack.Screen
        name="SpecialtyDetailOfHospital"
        component={SpecialtyDetailOfHospital}
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
        name="MedicalHistoryDetail"
        component={MedicalHistoryDetailScreen}
      />
      <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
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
      <Stack.Screen name="WebviewPayment" component={WebviewPaymentScreen} />
      <Stack.Screen
        name="FilterHospitalScreen"
        component={FilterHospitalScreen}
      />
      <Stack.Screen name="ResultDetails" component={ResultDetails} />
      <Stack.Screen
        name="InfoPayment"
        component={InfoPaymentScreen}
        options={{
          headerShown: true,
          headerTitle: "Thông tin thanh toán",
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
        name="RecommendedSystem"
        component={RecommendedSystemScreen}
      />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Tạo hồ sơ",
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
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Chọn hồ sơ",
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
        name="ScannerProfile"
        component={ScannerProfileScreen}
        options={{ headerShown: false, headerTitle: "Quét mã QR" }}
      />

      <Stack.Screen
        name="ConfirmInfo"
        component={ConfirmInfoScreen}
        options={{
          headerShown: true,
          headerTitle: "Xác nhận thông tin",
          headerTitleStyle: {
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: "#0165FC",
            height: 100,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }}>
              <FontAwesome name="trash-o" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HospitalDetail"
        component={HospitalDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "Thông tin bệnh viện",
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
        name="SpecialtyList"
        component={SpecialtyListScreen}
        options={{
          headerShown: true,
          headerTitle: "Chuyên khoa dành cho bạn",
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
        name="ConfirmBookingAppointmentInfo"
        component={ConfirmBookingAppointmentInfo}
        options={{
          headerShown: true,
          headerTitle: "Xác nhận thông tin",
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
        name="Rating"
        component={RatingScreen}
        options={{
          headerShown: true,
          headerTitle: "Đánh giá",
          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="CancelBooking"
        component={CancelBookingScreen}
        options={{
          headerShown: true,
          headerTitle: "Hủy lịch hẹn",
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
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{
          headerShown: true,
          headerTitle: "Phiếu khám bệnh",
          headerTitleStyle: {
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 30 }}
              onPress={() => navigation.navigate("TabNavigator")}
            >
              <Ionicons name="home-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DoctorDetail"
        component={DoctorDetail}
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
          statusBarStyle: "light",
          statusBarColor: "#0165FC",
        }}
      />

      <Stack.Screen
        name="HospitalList"
        component={HospitalList}
        options={{
          headerShown: true,
          headerTitle: "Cơ sở y tế",
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
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
      <Stack.Screen
        name="SuccessfullBook"
        component={SuccessfullBookScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ResultImage" component={ResultImageScreen} />
      <Stack.Screen
        name="ChangeAppointmentDetail"
        component={ChangeAppointmentDetail}
      />
      <Stack.Screen
        name="ConfirmChangeAppointmentDetail"
        component={ConfirmChangeAppointmentDetailScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
