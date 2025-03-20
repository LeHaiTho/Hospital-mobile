import React from "react";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import DoctorDetail from "../screens/DoctorDetail";
import HospitalList from "../screens/HospitalList";
import DoctorList from "../screens/DoctorList";
import LoginScreen from "../screens/LoginScreen";
import PatientDetailScreen from "../screens/PatientDetailScreen";
import SuccessfullBookScreen from "../screens/SuccessfullBookScreen";
import CancelBookingScreen from "../screens/CancelBookingScreen";
import AppointmentDetail from "../screens/AppointmentDetail";
import RatingScreen from "../screens/RatingScreen";
import SpecialtyListScreen from "../screens/SpecialtyListScreen";
import HospitalDetailScreen from "../screens/HospitalDetailScreen";
// import FilterHospitalScreen from "../screens/FilterHospitalScreen";
import SearchSuggestionScreen from "../screens/SearchSuggestionScreen";
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
import ListDoctorOnlineScreen from "../screens/chat/ListDoctorOnlineScreen";
import PackagesScreen from "../screens/chat/PackagesScreen";
import PaymentPackageScreen from "../screens/chat/PaymentPackageScreen";
import ChatListScreen from "../screens/chat/ChatListScreen";
import SignUp from "../screens/SignUp";
import ChatBotScreen from "../screens/chat/ChatBotScreen";
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
        options={{
          headerShown: true,
          headerTitle: "Khám dịch vụ",
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
        name="SpecialtyDetailOfHospital"
        component={SpecialtyDetailOfHospital}
        options={{
          headerShown: true,
          headerTitle: "Thông tin dịch vụ",
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
        options={{
          headerShown: true,
          headerTitle: "Kết quả",
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
        name="SearchSuggestion"
        component={SearchSuggestionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistoryScreen}
        options={{
          headerShown: true,
          headerTitle: "Lịch sử khám bệnh",
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
        name="WebviewPayment"
        component={WebviewPaymentScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="FilterHospitalScreen"
        component={FilterHospitalScreen}
      /> */}
      <Stack.Screen
        name="ResultDetails"
        component={ResultDetails}
        options={{
          headerShown: true,
          headerTitle: "Kết quả chi tiết",
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
        name="CustomerProfileBooking"
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
              onPress={() =>
                navigation.replace("TabNavigator", { screen: "Home" })
              }
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
          headerTitle: "Thông tin bác sĩ",

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
      <Stack.Screen
        name="DoctorList"
        component={DoctorList}
        options={{
          headerShown: true,
          headerTitle: "Bác sĩ tư vấn khám",
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

      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
      <Stack.Screen
        name="SuccessfullBook"
        component={SuccessfullBookScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResultImage"
        component={ResultImageScreen}
        options={{
          headerShown: true,
          headerTitle: "Chuẩn đoán hình ảnh",
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
        name="ChangeAppointmentDetail"
        component={ChangeAppointmentDetail}
        options={{
          headerShown: true,
          headerTitle: "Yêu cầu dời lịch",
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
        name="ConfirmChangeAppointmentDetail"
        component={ConfirmChangeAppointmentDetailScreen}
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
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
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
        name="ListDoctorOnline"
        component={ListDoctorOnlineScreen}
        options={{
          headerShown: true,
          headerTitle: "Hỏi riêng bác sĩ",
          headerTitleStyle: {
            fontSize: 17,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("ChatList")}
            >
              <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#0165FC",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentPackage"
        component={PaymentPackageScreen}
        options={{
          headerShown: true,
          headerTitle: "Thanh toán",
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
        name="ChatList"
        component={ChatListScreen}
        options={{
          headerShown: true,
          headerTitle: "Tin nhắn",
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
        name="ChatBot"
        component={ChatBotScreen}
        options={{
          headerShown: true,
          headerTitle: "Trợ lý bác sĩ",
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
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
