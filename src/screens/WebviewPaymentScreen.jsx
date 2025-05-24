import React, { useState, useRef, useEffect } from "react";
import { View, ActivityIndicator, BackHandler, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";

const WebviewPaymentScreen = ({ route }) => {
  const { paymentUrl, appointmentId, fromBookingFlow } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  // Xử lý khi người dùng nhấn nút back
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc muốn hủy thanh toán này?",
          [
            { text: "Không", style: "cancel", onPress: () => {} },
            {
              text: "Có",
              style: "destructive",
              onPress: () => {
                // Quay về trang chủ
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: "TabNavigator", params: { screen: "Home" } },
                  ],
                });
              },
            },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  // Xử lý khi URL thay đổi
  const handleNavigationStateChange = async (navState) => {
    // Kiểm tra URL callback sau khi thanh toán
    if (navState.url.includes("payment_success=true")) {
      try {
        // Cập nhật trạng thái thanh toán thành công
        await axiosConfig.patch(
          `/appointments/update-payment-status/${appointmentId}`,
          {
            payment_status: "completed",
          }
        );

        // Thanh toán thành công, chuyển đến trang chi tiết lịch hẹn
        navigation.reset({
          index: 1,
          routes: [
            {
              name: "TabNavigator",
              params: { screen: "Home" },
            },
            {
              name: "AppointmentDetail",
              params: { appointmentId, fromBookingFlow: true },
            },
          ],
        });
      } catch (error) {
        console.error("Error updating payment status:", error);
        // Vẫn chuyển hướng ngay cả khi có lỗi
        navigation.reset({
          index: 1,
          routes: [
            {
              name: "TabNavigator",
              params: { screen: "Home" },
            },
            {
              name: "AppointmentDetail",
              params: { appointmentId, fromBookingFlow: true },
            },
          ],
        });
      }
    } else if (navState.url.includes("payment_success=false")) {
      try {
        // Cập nhật trạng thái thanh toán thất bại và hủy lịch hẹn
        await axiosConfig.patch(
          `/appointments/cancel-appointment/${appointmentId}`,
          {
            reason: "Thanh toán thất bại",
            cancelledBy: "user",
          }
        );

        // Thanh toán thất bại
        Alert.alert(
          "Thanh toán thất bại",
          "Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: "TabNavigator", params: { screen: "Home" } },
                  ],
                });
              },
            },
          ]
        );
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator", params: { screen: "Home" } }],
        });
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        // onLoadStart={() => setIsLoading(true)}
        // onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {/* {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <ActivityIndicator size="large" color="#0165FC" />
        </View>
      )} */}
    </View>
  );
};

export default WebviewPaymentScreen;
