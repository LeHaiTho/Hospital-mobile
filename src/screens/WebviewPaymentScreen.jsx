import React, { useEffect } from "react";
import { View, Text, Button, SafeAreaView, Linking } from "react-native";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const WebviewPaymentScreen = ({ route }) => {
  const { paymentUrl } = route.params;
  const navigation = useNavigation();

  const handleNavigationStateChange = (event) => {
    console.log("Nav state change:", event.url);

    if (event.url.startsWith("hospital-lht://paymentsuccess")) {
      navigation.replace("PaymentSuccessScreen");
    }
  };

  useEffect(() => {
    console.log("cbi chuyen URl");
  }, [paymentUrl]);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default WebviewPaymentScreen;
