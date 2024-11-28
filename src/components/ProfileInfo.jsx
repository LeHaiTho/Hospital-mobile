import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

const ProfileInfo = ({ onChange }) => {
  // Sử dụng một state duy nhất để lưu tất cả các giá trị input và lỗi
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    fullname: user?.fullname || "",
    phone: user?.phone || "",
    address: user?.address || "",
    date_of_birth: user?.date_of_birth || "",
    gender: user?.gender || "",
  });
  console.log("user", user);

  const [errors, setErrors] = useState({}); // Lưu các lỗi khi validate

  // Hàm cập nhật state cho các input
  const handleInputChange = (name, value) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  };

  // Hàm validate input
  const validateInputs = () => {
    let newErrors = {};
    let valid = true;

    if (form.fullname.trim() === "") {
      newErrors.fullname = "Họ và tên không được để trống";
      valid = false;
    }

    if (!/^\d{10,11}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
      valid = false;
    }

    if (form.address.trim() === "") {
      newErrors.address = "Địa chỉ không được để trống";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Hàm submit form
  const handleSubmit = () => {
    if (validateInputs()) {
      console.log("form", form);
    }
  };

  return (
    <View>
      <View style={{ gap: 10, marginBottom: 20 }}>
        <Text style={{ fontWeight: "600" }}>Họ và tên</Text>
        <TextInput
          placeholder="Nhập họ và tên"
          mode="outlined"
          value={form.fullname}
          onChangeText={(text) => handleInputChange("fullname", text)}
          outlineStyle={{
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 5,
          }}
          style={{
            padding: 0,
            fontSize: 14,
            fontWeight: "400",
            backgroundColor: "#fff",
          }}
          placeholderTextColor="#A7ABD9"
        />
        {errors.fullname && (
          <Text style={{ color: "red" }}>{errors.fullname}</Text>
        )}
      </View>

      {/* Input Số điện thoại */}
      <View style={{ gap: 10 }}>
        <Text style={{ fontWeight: "600" }}>Số điện thoại</Text>
        <TextInput
          placeholder="Nhập số điện thoại"
          mode="outlined"
          value={form.phone}
          onChangeText={(text) => handleInputChange("phone", text)}
          keyboardType="numeric"
          outlineStyle={{
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 5,
          }}
          style={{
            padding: 0,
            fontSize: 14,
            fontWeight: "400",
            backgroundColor: "#fff",
          }}
          placeholderTextColor="#A7ABD9"
        />
        {errors.phone && <Text style={{ color: "red" }}>{errors.phone}</Text>}
      </View>

      {/* Input Địa chỉ */}
      <View style={{ gap: 10 }}>
        <Text style={{ fontWeight: "600" }}>Địa chỉ</Text>
        <TextInput
          placeholder="Nhập địa chỉ"
          mode="outlined"
          value={form.address}
          onChangeText={(text) => handleInputChange("address", text)}
          outlineStyle={{
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 5,
          }}
          style={{
            padding: 0,
            fontSize: 14,
            fontWeight: "400",
            backgroundColor: "#fff",
          }}
          placeholderTextColor="#A7ABD9"
        />
        {errors.address && (
          <Text style={{ color: "red" }}>{errors.address}</Text>
        )}
      </View>
    </View>
  );
};

export default ProfileInfo;
