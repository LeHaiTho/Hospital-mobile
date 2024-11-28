import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const WebviewPaymentScreen = ({ route }) => {
  const { paymentUrl } = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    console.log("cbi chuyen URl");
  }, [paymentUrl]);
  return (
    <>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        style={{ flex: 1 }}
        onNavigationStateChange={(event) => {
          console.log("event", event.url);
        }}
      />
    </>
  );
};

export default WebviewPaymentScreen;
