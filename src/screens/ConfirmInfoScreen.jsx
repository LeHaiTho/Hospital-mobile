import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Appbar, Divider } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmInfoScreen({ route }) {
  const navigation = useNavigation();
  const {
    profile,
    doctor,
    selectedDate,
    slot,
    selectedHospital,
    selectedSpecialty,
    isDoctorSpecial,
    specialtyDetail,
  } = route.params || {};

  console.log("selectedHospital", selectedHospital);
  console.log("isDoctorSpecial", isDoctorSpecial);
  console.log("specialtyDetail", specialtyDetail);
  console.log("slot", slot);
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
        >
          <Text style={styles.sectionTitle}>Thông tin bệnh nhân</Text>
          {/* Patient Information */}
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Họ và tên</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              {profile?.fullname}
            </Text>
          </View>
          <Divider style={styles.divider} />
          {/* <View
          style={{
            gap: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <Text>Mã bệnh nhân</Text>
          <Text
            style={{
              textAlign: "left",
            }}
          >
            MP-2410188HEKCQ
          </Text>
        </View>
        <Divider style={styles.divider} /> */}
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Ngày sinh</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              {profile?.date_of_birth
                ? moment(profile?.date_of_birth).format("DD/MM/YYYY")
                : "Chưa cập nhật"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Giới tính</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              {profile?.gender === true ? "Nam" : "Nữ"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Căn cước công dân</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              {profile?.identity_card}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Mã bảo hiểm y tế</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              Chưa cập nhật
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Điện thoại</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              {profile?.phone}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Email</Text>
            <Text
              style={{
                textAlign: "left",
              }}
            >
              {profile?.email}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View
            style={{
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Địa chỉ</Text>
            <Text
              style={{
                textAlign: "right",
                flex: 1,
                marginLeft: 50,
              }}
            >
              {profile?.address}
            </Text>
          </View>
          <Divider style={styles.divider} />
          {/* Barcode */}

          {/* Buttons
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.homeButton]}>
            <Text style={styles.buttonText}>TRANG CHỦ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.editButton]}>
            <Text style={styles.buttonText}>CHỈNH SỬA</Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 10,
          position: "absolute",
          bottom: 0,
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10, // Increase the shadow height for more elevation
          },
          shadowOpacity: 0.9, // Increase opacity to make it darker
          shadowRadius: 15, // Increase radius for a larger blur effect
          elevation: 10, // Higher elevation for Android
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {slot ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#0165FC",
              padding: 15,
              borderRadius: 100,
              width: "100%",
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("ConfirmBookingAppointmentInfo", {
                profile,
                doctor,
                selectedDate,
                slot,
                selectedHospital,
                selectedSpecialty,
                isDoctorSpecial,
                specialtyDetail,
              })
            }
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              Đặt lịch hẹn
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF",
              padding: 15,
              borderRadius: 100,
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("TabNavigator")}
          >
            <Text style={{ color: "#0165FC" }}>Trở về trang chủ</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    <Divider style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#2196F3",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 4,
  },
  barcodeContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#2196F3",
  },
  editButton: {
    backgroundColor: "#FFC107",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
