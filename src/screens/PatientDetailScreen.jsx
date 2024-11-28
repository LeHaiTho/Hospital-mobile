import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ProfileInfo from "../components/ProfileInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";
import axiosConfig from "../apis/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";
const PatientDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { doctor, selectedDate, slot, selectedHospital, selectedSpecialty } =
    route.params;

  const [userInfo, setUserInfo] = useState({
    fullname: "",
    phone: "",
    address: "",
  });
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  console.log("selectedSpecialty", selectedSpecialty);
  const handleProfileChange = (newInfo) => {
    setUserInfo(newInfo);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        fullname: userInfo.fullname,
        phone: userInfo.phone,
        address: userInfo.address,
        date_of_birth: userInfo.date_of_birth,
        gender: userInfo.gender,
        reasonForVisit,
        selectedPaymentMethod,
        doctor,
        hospital: selectedHospital,
        specialty: selectedSpecialty,
        slot,
        selectedDate,
      };
      const res = await axiosConfig.post(
        "/appointments/create-appointment",
        requestBody
      );
      const appointmentInfo = res.data.newAppointment;
      console.log("res", appointmentInfo);
      navigation.navigate("SuccessfullBook", {
        appointmentId: appointmentInfo.id,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingB: 50,
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 18 }}>
        Thông tin bệnh nhân
      </Text>
      <ProfileInfo onChange={handleProfileChange} />
      <View style={{ marginTop: 20 }}>
        <Text>Mô tả triệu chứng:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            textAlignVertical: "top",
          }}
          value={reasonForVisit}
          onChangeText={(text) => setReasonForVisit(text)}
          multiline
          numberOfLines={4}
        />
        <View>
          <Text>Phương thức thanh toán</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setSelectedPaymentMethod("cash")}
            >
              <RadioButton
                value="cash"
                status={
                  selectedPaymentMethod == "cash" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedPaymentMethod("cash")}
                uncheckedColor="#888"
                color="#0165FC"
              />
              <Text>Thanh toán trực tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setSelectedPaymentMethod("e-wallet")}
            >
              <RadioButton
                value="e-wallet"
                status={
                  selectedPaymentMethod == "e-wallet" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedPaymentMethod("e-wallet")}
                uncheckedColor="#888"
                color="#0165FC"
              />
              <Text>Ví điện tử</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#0165E1",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Gửi</Text>
        </TouchableOpacity>
      </View>

      <Text>Ngày khám: {selectedDate}</Text>
      <Text>
        Thời gian khám:
        {`${moment(slot.start_time, "HH:mm:ss").format("HH:mm")} - ${moment(
          slot.end_time,
          "HH:mm:ss"
        ).format("HH:mm")}`}
      </Text>
      <Text>Bác sĩ: {doctor.fullname}</Text>
      <Text>
        Bệnh viện:
        {
          doctor.hospitals.find((hospital) => hospital.id === selectedHospital)
            ?.name
        }
      </Text>
      <Text>
        Chuyên khoa:
        {
          doctor.specialties.find(
            (specialty) => specialty.id === selectedSpecialty
          )?.name
        }
      </Text>
    </ScrollView>
  );
};

export default PatientDetailScreen;
