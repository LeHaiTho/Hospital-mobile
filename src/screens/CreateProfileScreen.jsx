import { Entypo, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Portal,
  Modal,
  Alert,
} from "react-native";
import LottieView from "lottie-react-native";
import { RadioButton } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Search from "../components/Search";
import axios from "axios";
import { Fontisto } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosConfig from "../apis/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
const { height: screenHeight } = Dimensions.get("window");

const CreateProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const {
    fromBooking,
    doctor,
    selectedDate,
    slot,
    selectedHospital,
    selectedSpecialty,
    isDoctorSpecial,
    specialtyDetail,
    data,
    fromScanner,
  } = route.params || {};
  const [isQR, setIsQR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: true,
    email: "",
    address: "",
    identificationCard: "",
    relationship: fromBooking ? "myself" : "myself",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Xử lý thay đổi input
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      handleInputChange("dateOfBirth", formattedDate);
    }
  };

  // Xử lý khi người dùng nhấn nút quay lại
  const handleGoBack = () => {
    // Nếu đến từ scanner, hiển thị cảnh báo
    if (fromScanner) {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc muốn quay lại? Thông tin đã quét sẽ bị mất.",
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Đồng ý",
            onPress: () => {
              if (fromBooking) {
                navigation.navigate("CustomerProfileBooking", {
                  fromBooking,
                  doctor,
                  selectedDate,
                  slot,
                  selectedHospital,
                  selectedSpecialty,
                  isDoctorSpecial,
                  specialtyDetail,
                });
              } else {
                navigation.goBack();
              }
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = async () => {
    try {
      // Kiểm tra các trường bắt buộc
      const requiredFields = {
        name: "Họ và tên",
        phone: "Số điện thoại",
        dateOfBirth: "Ngày sinh",
        gender: "Giới tính",
        email: "Email",
        address: "Địa chỉ",
        relationship: "Hồ sơ khám bệnh",
      };

      // Tìm các trường bị thiếu
      const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !formData[key] && formData[key] !== false)
        .map(([, label]) => label);

      // Kiểm tra định dạng email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = formData.email && emailRegex.test(formData.email);

      // Kiểm tra định dạng số điện thoại (10 số, bắt đầu bằng 0)
      const phoneRegex = /^0\d{9}$/;
      const isValidPhone = formData.phone && phoneRegex.test(formData.phone);

      // Kiểm tra định dạng ngày sinh
      const isValidDate =
        formData.dateOfBirth &&
        moment(formData.dateOfBirth, "YYYY-MM-DD", true).isValid();

      if (missingFields.length > 0) {
        Toast.show({
          text1: "Thiếu thông tin",
          text2: `Vui lòng điền: ${missingFields.join(", ")}`,
          type: "error",
        });
        return;
      }

      if (!isValidEmail) {
        Toast.show({
          text1: "Email không hợp lệ",
          text2: "Vui lòng nhập email đúng định dạng",
          type: "error",
        });
        return;
      }

      if (!isValidPhone) {
        Toast.show({
          text1: "Số điện thoại không hợp lệ",
          text2: "Vui lòng nhập số điện thoại 10 số bắt đầu bằng 0",
          type: "error",
        });
        return;
      }

      if (!isValidDate) {
        Toast.show({
          text1: "Ngày sinh không hợp lệ",
          text2: "Vui lòng chọn ngày sinh hợp lệ",
          type: "error",
        });
        return;
      }

      // Chuẩn bị dữ liệu gửi lên server
      const submitData = { ...formData };

      // Xử lý identificationCard: nếu là chuỗi rỗng thì gán null
      if (
        !submitData.identificationCard ||
        submitData.identificationCard.trim() === ""
      ) {
        submitData.identificationCard = null;
      }

      // Nếu là family member, loại bỏ identificationCard khỏi dữ liệu
      if (submitData.relationship === "other") {
        delete submitData.identificationCard;
      }

      // Gửi dữ liệu lên server
      const res = await axiosConfig.put(
        `/users/create-profile/${user.id}`,
        submitData
      );

      if (res.status === 200) {
        if (fromBooking) {
          navigation.replace("CustomerProfileBooking", {
            fromBooking: true,
            doctor,
            selectedDate,
            slot,
            selectedHospital,
            selectedSpecialty,
            isDoctorSpecial,
            specialtyDetail,
          });
          Toast.show({
            text1: "Tạo hồ sơ thành công",
            type: "success",
          });
        } else {
          navigation.replace("TabNavigator", {
            screen: "CustomerProfile",
            params: {
              fromBooking: false,
            },
          });
          Toast.show({
            text1: "Tạo hồ sơ thành công",
            type: "success",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi khi tạo hồ sơ",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (data) {
      try {
        const dataArray = data.split("|");
        // Xử lý dữ liệu từ CCCD
        const cccdData = {
          name: dataArray[2] || "", // Tên
          dateOfBirth: dataArray[3]
            ? moment(dataArray[3], "DD/MM/YYYY").format("YYYY-MM-DD")
            : "",
          gender: dataArray[4] === "Nam" ? true : false, // Giới tính
          address: dataArray[5] || "", // Địa chỉ chi tiết
          identificationCard: dataArray[0] || "", // Số CMND
        };

        setFormData((prev) => ({
          ...prev,
          ...cccdData,
        }));
        setIsQR(true);
      } catch (error) {
        console.log("Error parsing CCCD data:", error);
        Toast.show({
          text1: "Lỗi",
          text2: "Không thể đọc dữ liệu từ CCCD",
          type: "error",
        });
      }
    }
  }, [data]);

  return (
    <GestureHandlerRootView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Entypo name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo hồ sơ bệnh nhân</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Họ và tên </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                isQR && styles.disabledInput,
                formData.name && styles.filledInput,
              ]}
              placeholder="Nhập họ và tên"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              editable={!isQR}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Số điện thoại </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              style={[styles.input, formData.phone && styles.filledInput]}
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Email </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              style={[styles.input, formData.email && styles.filledInput]}
              placeholder="Nhập email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Ngày sinh </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              disabled={isQR}
            >
              <TextInput
                style={[
                  styles.input,
                  isQR && styles.disabledInput,
                  formData.dateOfBirth && styles.filledInput,
                ]}
                placeholder="DD/MM/YYYY"
                value={
                  formData.dateOfBirth
                    ? moment(formData.dateOfBirth).format("DD/MM/YYYY")
                    : ""
                }
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={
                  formData.dateOfBirth
                    ? new Date(formData.dateOfBirth)
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Giới tính </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  isQR && styles.disabledRadio,
                  formData.gender === true && styles.selectedRadio,
                ]}
                onPress={() => handleInputChange("gender", true)}
                disabled={isQR}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.gender === true && styles.selectedRadioText,
                  ]}
                >
                  Nam
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  isQR && styles.disabledRadio,
                  formData.gender === false && styles.selectedRadio,
                ]}
                onPress={() => handleInputChange("gender", false)}
                disabled={isQR}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.gender === false && styles.selectedRadioText,
                  ]}
                >
                  Nữ
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Địa chỉ </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <TextInput
              style={[
                styles.textArea,
                isQR && styles.disabledInput,
                formData.address && styles.filledInput,
              ]}
              placeholder="Nhập địa chỉ đầy đủ"
              value={formData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              multiline
              numberOfLines={3}
              editable={!isQR}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Hồ sơ khám bệnh </Text>
              <Text style={styles.required}>*</Text>
            </View>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  formData.relationship === "myself" && styles.selectedRadio,
                ]}
                onPress={() => handleInputChange("relationship", "myself")}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.relationship === "myself" &&
                      styles.selectedRadioText,
                  ]}
                >
                  Cho bản thân
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  formData.relationship === "other" && styles.selectedRadio,
                ]}
                onPress={() => handleInputChange("relationship", "other")}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.relationship === "other" &&
                      styles.selectedRadioText,
                  ]}
                >
                  Cho người thân
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Tạo hồ sơ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  formContainer: {
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
  },
  required: {
    color: "red",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#E0E0E0",
    color: "#000",
  },
  textArea: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#E0E0E0",
    color: "#000",
    textAlignVertical: "top",
    minHeight: 100,
  },
  disabledInput: {
    backgroundColor: "#E0E0E0",
    borderColor: "#797979",
  },
  filledInput: {
    borderColor: "#0165FC",
  },
  radioGroup: {
    flexDirection: "row",
    gap: 10,
  },
  radioButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#E0E0E0",
    flex: 1,
    alignItems: "center",
  },
  disabledRadio: {
    backgroundColor: "#E0E0E0",
    borderColor: "#797979",
  },
  selectedRadio: {
    borderColor: "#0165FC",
  },
  radioText: {
    color: "#000",
  },
  selectedRadioText: {
    color: "#0165FC",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#0165FC",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
