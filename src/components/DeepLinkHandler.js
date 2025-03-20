import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useEffect } from "react";

const DeepLinkHandler = () => {
  const navigation = useNavigation(); // Sử dụng useNavigation trong component con

  const handleDeepLink = (event) => {
    const { queryParams } = Linking.parse(event.url); // Không cần lấy path nữa
    console.log("Query Params:", queryParams);

    if (queryParams.resultCode === "0") {
      console.log("Payment Success!");
      // Điều hướng tới màn hình thành công
      const extraData = JSON.parse(queryParams.extraData);
      const appointmentId = extraData.appointment;
      navigation.navigate("AppointmentDetail", {
        appointmentId: appointmentId.id,
      });
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
