import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { BarCodeScanner, CameraView, useCameraPermissions } from "expo-camera";
import { Overlay } from "../components/Overlay";
import { useNavigation } from "@react-navigation/native";

export default function ScannerProfileScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermission = permission?.granted;

  // nếu chưa cấp quyền thì yêu cầu cấp quyền
  if (!isPermission) {
    requestPermission();
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (data) {
      navigation.replace("CreateProfile", {
        data,
      });
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarCodeScanned}
      />
      <Overlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
