import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axiosConfig from "../apis/axiosConfig";
const BookAppointment = ({
  doctor,
  selectedSpecialty,
  selectedHospital,
  doctorSche,
}) => {
  const navigation = useNavigation();
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const { user } = useSelector((state) => state.auth);
  const [dates, setDates] = useState([]);
  // const [selectedHospital, setSelectedHospital] = useState(null);

  // fetch hospital by specialty and doctor
  const fetchDates = async () => {
    try {
      const response = await axiosConfig.get(
        `/doctor-schedules/doctor/${doctor?.id}/get-dates/?hospitalId=${selectedHospital}`
      );
      setDates(response?.data);
      setSelectedDate(response?.data[0]);
      console.log("vừa fetch");
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("doctorSche", doctorSche);
  console.log("selectedSpecialty", selectedSpecialty);
  console.log("selectedHospital", selectedHospital);
  useEffect(() => {
    if (doctor && selectedHospital) {
      fetchDates();
    }
  }, [doctor, selectedHospital]);

  useEffect(() => {
    if (selectedDate && selectedHospital && doctor) {
      fetchDoctorSchedule();
    }
  }, [selectedDate, selectedHospital, doctor]);

  console.log("selectedDate", selectedDate);
  const fetchDoctorSchedule = async () => {
    try {
      const response = await axiosConfig.get(
        `/doctor-schedules/doctor/${doctor?.id}/get-slots?hospitalId=${selectedHospital}&date=${selectedDate}`
      );
      setDoctorSchedule(response?.data);
      console.log("response", response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleBookAppointment = (slot) => {
    if (user) {
      navigation.navigate("CustomerProfileBooking", {
        fromBooking: true,
        doctor,
        selectedDate,
        slot,
        selectedHospital,
        selectedSpecialty,
        isDoctorSpecial: true,
      });
    } else {
      navigation.navigate("Login", {
        redirectTo: "PatientDetail",
        doctor,
        selectedDate,
        slot,
        selectedHospital,
        selectedSpecialty,
      });
    }
  };
  console.log("doctor", doctor);
  console.log("doctorSchedule", doctorSchedule);
  return (
    // selectedHospital && (
    doctorSchedule && (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 700 }}>Đặt lịch khám</Text>
        <View>
          <Text style={{ fontWeight: 600 }}>Ngày khám</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              paddingVertical: 10,
            }}
          >
            {dates?.map((date, index) => (
              <TouchableOpacity
                key={index}
                buttonColor="transparent"
                style={{
                  backgroundColor:
                    selectedDate === date ? "#0165FC" : "transparent",
                  borderColor:
                    selectedDate === date ? "#0165FC" : "transparent",
                  borderWidth: 0.5,
                  borderRadius: 8,
                  borderColor: selectedDate === date ? "#0165FC" : "#B6B9BE",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 2,
                  marginRight: 10,
                }}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: selectedDate === date ? "#fff" : "#000",
                  }}
                >
                  {moment(date).format("DD/MM/YYYY")}
                </Text>
                <Text
                  style={{
                    color: selectedDate === date ? "#fff" : "#000",
                    fontWeight: 700,
                  }}
                >
                  {moment(date).format("dddd").charAt(0).toUpperCase() +
                    moment(date).format("dddd").slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* time */}
          {doctorSchedule && (
            <View style={{ marginTop: 10, gap: 5 }}>
              <Text>Thời gian khám</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {doctorSchedule?.map((item) =>
                  item?.shifts?.map((shift) =>
                    shift?.appointmentSlots?.map((slot) => (
                      <TouchableOpacity
                        key={slot?.id}
                        buttonColor="transparent"
                        style={{
                          backgroundColor: "#EEEEEE",
                          borderColor: "#EEEEEE",
                          borderWidth: 0.5,
                          borderRadius: 6,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          marginRight: 10,
                        }}
                        onPress={() => handleBookAppointment(slot)}
                      >
                        <Text style={{ color: "#000" }}>{`${moment(
                          slot?.start_time,
                          "HH:mm:ss"
                        ).format("HH:mm")} - ${moment(
                          slot?.end_time,
                          "HH:mm"
                        ).format("HH:mm")}`}</Text>
                      </TouchableOpacity>
                    ))
                  )
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    )
  );
};

export default BookAppointment;
