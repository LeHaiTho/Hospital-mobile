import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import axios from "axios";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const DeepLinkHandler = () => {
  const navigation = useNavigation(); // Sử dụng useNavigation trong component con

  const handleDeepLink = async (event) => {
    const { queryParams } = Linking.parse(event.url); // Không cần lấy path nữa
    console.log("Query Params:", queryParams);

    if (queryParams.status === "1") {
      console.log("Payment Success!");

      // Điều hướng tới màn hình thành công
      const appointmentId = queryParams.apptransid.split("_")[1];
      try {
        const response = await axios.patch(
          `${baseUrl}/appointments/update-appointment-status-after-payment/${appointmentId}`,
          { payment_status: "paid" }
        );
        console.log("response", response);
        if (response.status === 200) {
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
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Payment Failed!");
      // Điều hướng tới màn hình thất bại
    }
  };

  useEffect(() => {
    // Lắng nghe URL khi ứng dụng mở
    Linking.addEventListener("url", handleDeepLink);

    // Xử lý URL nếu ứng dụng mở bằng Deep Link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  return null;
};
export default DeepLinkHandler;
