import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { Divider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosConfig from "../apis/axiosConfig";

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

  // State cho modal, dữ liệu form, và profile hiển thị
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: profile?.fullname || "",
    date_of_birth: profile?.date_of_birth
      ? new Date(profile.date_of_birth)
      : new Date(),
    gender: profile?.gender ? "true" : "false",
    identity_card: profile?.identity_card || "",
    phone: profile?.phone || "",
    email: profile?.email || "",
    address: profile?.address || "",
    relationship: profile?.relationship || "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile); // State để cập nhật giao diện

  // Cập nhật formData khi profile thay đổi
  useEffect(() => {
    setFormData({
      fullname: profile?.fullname || "",
      date_of_birth: profile?.date_of_birth
        ? new Date(profile.date_of_birth)
        : new Date(),
      gender: profile?.gender ? "true" : "false",
      identity_card: profile?.identity_card || "",
      phone: profile?.phone || "",
      email: profile?.email || "",
      address: profile?.address || "",
      relationship: profile?.relationship || "",
    });
    setUpdatedProfile(profile);
  }, [profile]);

  // Thiết lập headerRight
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => {
            console.log("Profile ID:", profile?.id);
            setModalVisible(true);
          }}
        >
          <AntDesign name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, profile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Xử lý chọn ngày sinh
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      handleInputChange("date_of_birth", selectedDate);
    }
  };

  // Xử lý lưu form và gọi API
  const handleSave = async () => {
    const dataToSend = {
      fullname: formData.fullname,
      date_of_birth: moment(formData.date_of_birth).format("YYYY-MM-DD"),
      gender: formData.gender === "true",
      identity_card: formData.identity_card,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      // ...(formData.relationship && { relationship: formData.relationship }),
      relationship: formData.relationship,
    };

    try {
      let response;
      if (formData.relationship) {
        // Cập nhật FamilyMember
        response = await axiosConfig.patch(
          `/users/update-family-member/${profile.id}`,
          dataToSend
        );
      } else {
        // Cập nhật hồ sơ chính
        response = await axiosConfig.patch(
          `/users/update-user-profile`,
          dataToSend
        );
      }

      // Cập nhật profile hiển thị
      setUpdatedProfile({
        ...updatedProfile,
        ...dataToSend,
        id: profile.id, // Giữ nguyên id
      });
      setModalVisible(false);
      Alert.alert("Thành công", "Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.sectionTitle}>Thông tin bệnh nhân</Text>
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
            <Text style={{ textAlign: "left" }}>
              {updatedProfile?.fullname}
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
            <Text>Ngày sinh</Text>
            <Text style={{ textAlign: "left" }}>
              {updatedProfile?.date_of_birth
                ? moment(updatedProfile?.date_of_birth).format("DD/MM/YYYY")
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
            <Text style={{ textAlign: "left" }}>
              {updatedProfile?.gender === true ? "Nam" : "Nữ"}
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
            <Text style={{ textAlign: "left" }}>
              {updatedProfile?.identity_card
                ? updatedProfile?.identity_card
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
            <Text>Điện thoại</Text>
            <Text style={{ textAlign: "left" }}>{updatedProfile?.phone}</Text>
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
            <Text style={{ textAlign: "left" }}>{updatedProfile?.email}</Text>
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
              {updatedProfile?.address}
            </Text>
          </View>
          <Divider style={styles.divider} />
        </ScrollView>
      </View>

      {/* Modal chỉnh sửa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chỉnh sửa hồ sơ</Text>
            <ScrollView
              style={{ maxHeight: "80%" }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.label}>Họ và tên</Text>
              <TextInput
                style={styles.input}
                value={formData.fullname}
                onChangeText={(text) => handleInputChange("fullname", text)}
                placeholder="Nhập họ và tên"
              />

              <Text style={styles.label}>Ngày sinh</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>
                  {moment(formData.date_of_birth).format("DD/MM/YYYY")}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.date_of_birth}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}

              <Text style={styles.label}>Giới tính</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    formData.gender === "true" && styles.genderButtonSelected,
                  ]}
                  onPress={() => handleInputChange("gender", "true")}
                >
                  <Text
                    style={
                      formData.gender === "true"
                        ? styles.genderTextSelected
                        : styles.genderText
                    }
                  >
                    Nam
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    formData.gender === "false" && styles.genderButtonSelected,
                  ]}
                  onPress={() => handleInputChange("gender", "false")}
                >
                  <Text
                    style={
                      formData.gender === "false"
                        ? styles.genderTextSelected
                        : styles.genderText
                    }
                  >
                    Nữ
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Điện thoại</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                placeholder="Nhập email"
                keyboardType="email-address"
              />

              <Text style={styles.label}>Địa chỉ</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) => handleInputChange("address", text)}
                placeholder="Nhập địa chỉ"
              />
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#000" }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0165FC",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={handleSave}
              >
                <Text style={{ color: "#fff" }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.9,
          shadowRadius: 15,
          elevation: 10,
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
                profile: updatedProfile, // Dùng profile đã cập nhật
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
            <Text style={{ color: "#FFF" }}>Đặt lịch hẹn</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  genderButtonSelected: {
    backgroundColor: "#0165FC",
    borderColor: "#0165FC",
  },
  genderText: {
    fontSize: 16,
    color: "#333",
  },
  genderTextSelected: {
    fontSize: 16,
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    // Xóa backgroundColor: "red" để tránh lỗi giao diện
  },
});
