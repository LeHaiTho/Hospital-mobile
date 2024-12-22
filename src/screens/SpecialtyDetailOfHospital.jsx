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
  // console.log(
  //   "hospitalIddffffffffffffffffffffffffffffffffff",
  //   route.params?.hospitalId.id
  // );
  // console.log("specialtyId", specialtyId);
  // lấy chi tiết chuyên khoa theo hospitalId và specialtyId
  // console.log("hospitalId", hospitalId);
  // console.log("specialtyId", specialtyId);
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
  // console.log(
  //   "hospitalId",
  //   hospitalId?.hospitalSpecialty?.filter(
  //     (item) => item.specialty_id === specialtyId
  //   )
  // );

  console.log("hospitalId", hospitalId);
  console.log("specialtyId", specialtyId);

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
  // console.log("specialtyId", specialtyId);

  // console.log("doctorSchedule", doctorSchedule);
  const handleBookAppointment = (slot) => {
    if (user) {
      navigation.navigate("CustomerProfile", {
        fromBooking: true,
        doctor: slot?.doctors?.[0],
        selectedDate,
        slot,
        selectedHospital: hospitalId,
        selectedSpecialty: specialtyId,
        isDoctorSpecial: false,
        specialtyDetail: specialtyDetail?.specialty?.name,
      });
    }
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
                {Object.keys(doctorSchedule).map((item, index) => (
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
                    }}
                    onPress={() => setSelectedDate(item)}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: selectedDate === item ? "#fff" : "#000",
                      }}
                    >
                      {item}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 700,
                        color: selectedDate === item ? "#fff" : "#000",
                      }}
                    >
                      {moment(item, "DD/MM/YYYY")
                        .format("dddd")
                        .charAt(0)
                        .toUpperCase() +
                        moment(item, "DD/MM/YYYY").format("dddd").slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* time */}

              <View style={{ marginTop: 10, gap: 5 }}>
                <Text>Thời gian khám</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {doctorSchedule[selectedDate]?.map((item) => (
                    <TouchableOpacity
                      key={item?.slot_id}
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
                      onPress={() => handleBookAppointment(item)}
                    >
                      <Text style={{ color: "#000" }}>
                        {`${moment(item?.start_time, "HH:mm:ss").format(
                          "HH:mm"
                        )} - ${moment(item?.end_time, "HH:mm:ss").format(
                          "HH:mm"
                        )}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
