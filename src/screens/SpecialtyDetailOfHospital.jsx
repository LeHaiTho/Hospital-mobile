import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import BookAppointment from "../components/BookAppointment";
import axiosConfig from "../apis/axiosConfig";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const base_url = process.env.EXPO_PUBLIC_API_URL;
const SpecialtyDetailOfHospital = ({ route }) => {
  const navigation = useNavigation();
  const { specialtyId, hospitalId } = route.params || {};
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [specialtyDetail, setSpecialtyDetail] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const getSpecialtyDetailOfHospital = async () => {
    try {
      const response = await axiosConfig.get("/specialties/detail", {
        params: { hospitalId: hospitalId?.id || hospitalId, specialtyId },
      });
      setSpecialtyDetail(response?.data?.specialty);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (hospitalId?.id || (hospitalId && specialtyId)) {
      getSpecialtyDetailOfHospital();
    }
  }, [hospitalId?.id, specialtyId, hospitalId]);
  // console.log("specialtyDetail", specialtyDetail?.image);
  const getDoctorSchedule = async () => {
    try {
      const response = await axiosConfig.get(
        "doctor-schedules/doctor/get-schedule-by-specialty-and-hospital",
        {
          params: {
            specialtyID: specialtyId,
            hospitalID: hospitalId?.id || hospitalId,
          },
        }
      );
      setDoctorSchedule(response?.data);
      setSelectedDate(Object.keys(response?.data)[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if ((specialtyId && hospitalId?.id) || hospitalId) {
      getDoctorSchedule();
    }
  }, [specialtyId, hospitalId?.id, hospitalId]);
  const handleBookAppointment = (slot) => {
    if (user) {
      navigation.navigate("CustomerProfileBooking", {
        fromBooking: true,
        doctor: slot?.doctors?.[0],
        selectedDate,
        slot,
        selectedHospital: hospitalId,
        selectedSpecialty: specialtyId,
        isDoctorSpecial: false,
        specialtyDetail: specialtyDetail?.specialty?.name,
        consultationFee:
          specialtyDetail?.consultation_fee ||
          hospitalId?.hospitalSpecialty?.[0]?.consultation_fee,
      });
    }
  };

  const isTimeSlotPassed = (date, time) => {
    const now = moment();
    const slotDateTime = moment(`${date} ${time}`, "DD/MM/YYYY HH:mm:ss");
    return now.isAfter(slotDateTime);
  };

  return (
    <ScrollView contentContainerStyle={{ gap: 8 }}>
      <Image
        source={{
          uri: specialtyDetail?.image
            ? `${base_url}${specialtyDetail?.image}`
            : `${base_url}${hospitalId?.hospitalSpecialty?.[0]?.image}`,
        }}
        resizeMode="cover"
        style={{ width: "100%", height: 200 }}
      />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
            fontSize: 16,
            textTransform: "uppercase",
          }}
        >
          {specialtyDetail?.name || hospitalId?.hospitalSpecialty?.[0]?.name}
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>
          {hospitalId?.name}
        </Text>
        <Text style={{ fontWeight: "bold", color: "#0165FC" }}>
          {`${Number(
            specialtyDetail?.consultation_fee ||
              hospitalId?.hospitalSpecialty?.[0]?.consultation_fee
          ).toLocaleString()} VNĐ`}
        </Text>
        <View>
          <Text style={{ fontWeight: "bold", color: "#1F2937" }}>
            Mô tả dịch vụ
          </Text>
          <Text style={{ textAlign: "justify" }}>
            {specialtyDetail?.description ||
              hospitalId?.hospitalSpecialty?.[0]?.description}
          </Text>
        </View>
      </View>
      {Object.keys(doctorSchedule).length > 0 ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#0165FC" }}>
            Lịch khám
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>Đặt lịch khám</Text>
            <View>
              <Text style={{ fontWeight: 600 }}>Ngày khám</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingVertical: 10,
                }}
              >
                {Object.keys(doctorSchedule).map((item, index) => {
                  const isDateInPast = moment(item, "DD/MM/YYYY").isBefore(
                    moment(),
                    "day"
                  );

                  return (
                    <TouchableOpacity
                      key={index}
                      buttonColor="transparent"
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 8,
                        borderColor:
                          selectedDate === item ? "#0165FC" : "#B6B9BE",
                        backgroundColor:
                          selectedDate === item ? "#0165FC" : "transparent",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 2,
                        marginRight: 10,
                        opacity: isDateInPast ? 0.5 : 1,
                      }}
                      onPress={() => !isDateInPast && setSelectedDate(item)}
                      disabled={isDateInPast}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color:
                            selectedDate === item && !isDateInPast
                              ? "#fff"
                              : "#000",
                          opacity: isDateInPast ? 0.5 : 1,
                        }}
                      >
                        {item}
                      </Text>
                      <Text
                        style={{
                          fontWeight: 700,
                          color:
                            selectedDate === item && !isDateInPast
                              ? "#fff"
                              : "#000",
                          opacity: isDateInPast ? 0.5 : 1,
                        }}
                      >
                        {moment(item, "DD/MM/YYYY")
                          .format("dddd")
                          .charAt(0)
                          .toUpperCase() +
                          moment(item, "DD/MM/YYYY").format("dddd").slice(1)}
                      </Text>
                      {isDateInPast && (
                        <Text style={{ color: "#9CA3AF", fontSize: 8 }}>
                          Đã qua
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* time */}

              <View style={{ marginTop: 10, gap: 5 }}>
                <Text>Thời gian khám</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {doctorSchedule[selectedDate]?.map((item) => {
                    const isPassed = isTimeSlotPassed(
                      selectedDate,
                      item?.start_time
                    );

                    return (
                      <TouchableOpacity
                        key={item?.slot_id}
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
                        onPress={() => !isPassed && handleBookAppointment(item)}
                        disabled={isPassed}
                      >
                        <Text style={{ color: isPassed ? "#9CA3AF" : "#000" }}>
                          {`${moment(item?.start_time, "HH:mm:ss").format(
                            "HH:mm"
                          )} - ${moment(item?.end_time, "HH:mm:ss").format(
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
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ padding: 16, backgroundColor: "#fff" }}>
          <Text
            style={{
              fontWeight: 600,
              color: "#0165FC",
              letterSpacing: 1.5,
              textAlign: "center",
            }}
          >
            Hiện tại chưa có lịch khám, vui lòng quay lại sau!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SpecialtyDetailOfHospital;
