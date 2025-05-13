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

export default function ScannerProfileScreen({ route }) {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermission = permission?.granted;

  // Lấy các tham số từ route
  const {
    fromBooking,
    doctor,
    selectedDate,
    slot,
    selectedHospital,
    selectedSpecialty,
    isDoctorSpecial,
    specialtyDetail,
  } = route.params || {};

  // nếu chưa cấp quyền thì yêu cầu cấp quyền
  if (!isPermission) {
    requestPermission();
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (data) {
      // Chuyển tất cả các tham số cùng với dữ liệu scan được sang màn hình CreateProfile
      navigation.replace("CreateProfile", {
        data,
        fromBooking,
        doctor,
        selectedDate,
        slot,
        selectedHospital,
        selectedSpecialty,
        isDoctorSpecial,
        specialtyDetail,
        fromScanner: true, // Đánh dấu là đến từ scanner
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

      {/* Thêm nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
