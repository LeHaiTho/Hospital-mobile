import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
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
  isTimeSlotPassed,
}) => {
  const navigation = useNavigation();
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const { user } = useSelector((state) => state.auth);
  const [dates, setDates] = useState([]);

  // Fetch danh sách ngày có lịch
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

  // Fetch chi tiết lịch khám theo ngày
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

  // Check if a date is in the past
  const isDateInPast = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  console.log("doctor", doctor);
  console.log("doctorSchedule", doctorSchedule);
  console.log("selectedDate", selectedDate);

  return (
    doctorSchedule && (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 700 }}>Đặt lịch khám</Text>
        <View>
          {/* Chọn ngày khám */}
          <Text style={{ fontWeight: 600 }}>Ngày khám</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 10 }}
          >
            {dates?.map((date, index) => {
              const isPastDate = isDateInPast(date);

              return (
                <TouchableOpacity
                  key={index}
                  buttonColor="transparent"
                  style={{
                    backgroundColor:
                      selectedDate === date && !isPastDate
                        ? "#0165FC"
                        : "transparent",
                    borderWidth: 0.5,
                    borderRadius: 8,
                    borderColor:
                      selectedDate === date && !isPastDate
                        ? "#0165FC"
                        : "#B6B9BE",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 2,
                    marginRight: 10,
                    opacity: isPastDate ? 0.5 : 1,
                  }}
                  onPress={() => !isPastDate && setSelectedDate(date)}
                  disabled={isPastDate}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color:
                        selectedDate === date && !isPastDate ? "#fff" : "#000",
                      opacity: isPastDate ? 0.5 : 1,
                    }}
                  >
                    {moment(date).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{
                      color:
                        selectedDate === date && !isPastDate ? "#fff" : "#000",
                      fontWeight: 700,
                      opacity: isPastDate ? 0.5 : 1,
                    }}
                  >
                    {moment(date).format("dddd").charAt(0).toUpperCase() +
                      moment(date).format("dddd").slice(1)}
                  </Text>
                  {isPastDate && (
                    <Text style={{ color: "#9CA3AF", fontSize: 8 }}>
                      Đã qua
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Thời gian khám */}
          {doctorSchedule && (
            <View style={{ marginTop: 10, gap: 5 }}>
              <Text>Thời gian khám</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {doctorSchedule?.length > 0 &&
                doctorSchedule.some((item) =>
                  item?.shifts?.some(
                    (shift) => shift?.appointmentSlots?.length > 0
                  )
                ) ? (
                  doctorSchedule.map((item) =>
                    item?.shifts?.map((shift) =>
                      shift?.appointmentSlots?.map((slot) => {
                        const formattedDate =
                          moment(selectedDate).format("DD/MM/YYYY");
                        const isPassed =
                          isTimeSlotPassed &&
                          isTimeSlotPassed(formattedDate, slot?.start_time);

                        return (
                          <TouchableOpacity
                            key={slot?.id}
                            buttonColor="transparent"
                            style={{
                              backgroundColor: isPassed ? "#E5E5E5" : "#EEEEEE",
                              borderColor: "#EEEEEE",
                              borderWidth: 0.5,
                              borderRadius: 6,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              marginRight: 10,
                              opacity: isPassed ? 0.5 : 1,
                            }}
                            onPress={() =>
                              !isPassed && handleBookAppointment(slot)
                            }
                            disabled={isPassed}
                          >
                            <Text
                              style={{ color: isPassed ? "#9CA3AF" : "#000" }}
                            >
                              {`${moment(slot?.start_time, "HH:mm:ss").format(
                                "HH:mm"
                              )} - ${moment(slot?.end_time, "HH:mm").format(
                                "HH:mm"
                              )}`}
                            </Text>
                            {isPassed && (
                              <Text style={{ color: "#9CA3AF", fontSize: 10 }}>
                                Đã qua
                              </Text>
                            )}
                          </TouchableOpacity>
                        );
                      })
                    )
                  )
                ) : (
                  <Text style={{ color: "#FF0000" }}>Không có lịch khám</Text>
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
