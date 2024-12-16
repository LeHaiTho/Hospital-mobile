import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Speciality from "../components/Speciality";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar, Badge } from "react-native-paper";
import Search from "../components/Search";
import moment from "moment";
import DoctorCard from "../components/DoctorCard";

import { Dimensions } from "react-native";
import HospitalCard from "../components/HospitalCard";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenWidth = Dimensions.get("window").width;
import { useDispatch, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [notification, setNotification] = useState(10);
  const [specialties, setSpecialties] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentNeedChange, setAppointmentNeedChange] = useState([]);
  const dispatch = useDispatch();

  // lấy những lịch hẹn cần cảnh báo dời lịch
  const getAppointmentNeedChange = async () => {
    try {
      const resData = await axiosConfig.get(
        "/appointments/get-appointment-need-change"
      );
      setAppointmentNeedChange(resData.data.appointmentNeedChange);
    } catch (error) {
      console.log(error);
    }
  };
  // lấy ra những cuộc hẹn sắp tới
  const getAppointmentSoon = async () => {
    try {
      const resData = await axiosConfig.get("/appointments/soon");
      setAppointments(resData.data.appointmentSoon);
    } catch (error) {
      console.log(error);
    }
  };

  const getHospitalsList = async () => {
    try {
      const res = await axiosConfig.get("/hospitals/get-list");
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctorsList = async () => {
    try {
      const res = await axiosConfig.get("/doctors/all");
      setDoctors(res.data.doctorList);
    } catch (error) {
      console.log(error);
    }
  };
  const getSpecialtiesList = async () => {
    try {
      const res = await axiosConfig.get("/specialties/list");
      setSpecialties(res.data.specialties);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    "specialtiesdddddddddddddddddddddddddddddddddddddddddddddddd",
    specialties
  );
  console.log(
    "appointmentdddddddddddddddddddddddddddddddddddddddddddddddd",
    appointments
  );
  console.log(
    "doctorsdddddddddddddddddddddddddddddddddddddddddddddddddddd",
    doctors
  );
  useEffect(() => {
    if (
      user &&
      (user?.role?.name === "customer" || user?.role === "customer")
    ) {
      getAppointmentSoon();
      getAppointmentNeedChange();
    }
  }, [user]);
  useEffect(() => {
    getHospitalsList();
    getDoctorsList();
    getSpecialtiesList();
  }, []);

  console.log("user", user?.role);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="#0165FC" />
            <Text
              style={{ fontSize: 16, fontWeight: "bold" }}
              onPress={() => navigation.navigate("WebviewPayment")}
            >
              Vị trí hiện tại
            </Text>
            <Ionicons name="chevron-down" size={24} color="#000" />
          </View>

          {/* notification */}
          <TouchableOpacity style={{ position: "relative" }}>
            <Ionicons
              name="notifications"
              color="black"
              size={25}
              style={{
                padding: 5,
                borderRadius: 100,
              }}
              onPress={() => navigation.navigate("LocationExampleScreen")}
            />
            {notification > 0 && (
              <Badge
                size={15}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "red",
                }}
              >
                {notification}
              </Badge>
            )}
          </TouchableOpacity>
        </View>

        {/* search */}
        <View style={{ paddingHorizontal: 16 }}>
          <Search />
        </View>
        {/* test hỏi cộng đồng */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("CommunityList")}>
          <Text>test hỏi cộng đồng</Text>
        </TouchableOpacity> */}
        {/* lịch hẹn cần thay đổi gấp */}
        {appointmentNeedChange?.length > 0 && (
          <View style={{ marginTop: 10, paddingHorizontal: 16 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Đề xuất thay đổi
              </Text>
              <TouchableOpacity>
                <FontAwesome name="warning" size={24} color="#FCAF23" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginVertical: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 16,
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChangeAppointmentDetail", {
                    appointmentNeedChange: appointmentNeedChange[0],
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View style={{ gap: 5 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: 12,
                        }}
                      >
                        Thay đổi lịch hẹn
                      </Text>
                      <Entypo name="dot-single" size={24} color="#f20000" />
                      <Text style={{ color: "#f20000", fontSize: 12 }}>
                        {`Lịch hẹn ${moment(
                          appointmentNeedChange[0].appointment_date
                        ).format("DD/MM/YYYY")}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        {`Mã phiếu khám ${appointmentNeedChange[0].appointment_code} tại bệnh viện ${appointmentNeedChange[0].hospital.name}. Bác sĩ ${appointmentNeedChange[0].doctor.user.fullname} vì lí do đột xuất cần`}{" "}
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#0165FC",
                            fontStyle: "italic",
                            textDecorationLine: "underline",
                          }}
                          onPress={() => {
                            navigation.navigate("ChangeAppointmentDetail", {
                              appointmentNeedChange: appointmentNeedChange[0],
                            });
                          }}
                        >
                          Thay đổi lịch hẹn
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* upcomming schedule */}
        {appointments?.length > 0 && (
          <View style={{ marginTop: 10, paddingHorizontal: 16 }}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Lịch hẹn sắp tới
                </Text>
                <Text style={{ fontSize: 12, color: "#f20000" }}>
                  ({appointments.length})
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("AppointmentScreen")}
              >
                <Text
                  style={{
                    color: "#0165FC",
                  }}
                >
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>

            {/* card comming schedule */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AppointmentDetail", {
                  appointmentId: appointments[0].id,
                });
              }}
              style={{
                marginVertical: 10,
                backgroundColor: "#0165FC",
                borderRadius: 10,
                padding: 16,
                justifyContent: "space-between",
                gap: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={50}
                  source={{
                    uri: `${baseUrl}${appointments[0]?.doctor?.avatar}`,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#ffff",
                      fontSize: 16,
                    }}
                  >
                    {appointments[0].doctor.fullname}
                  </Text>
                  <Text style={{ color: "#ffff", fontSize: 14 }}>
                    {appointments[0].specialty.name}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  backgroundColor: "#0858D1",
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons name="calendar-outline" size={20} color="#ffff" />
                  <Text style={{ color: "#ffff" }}>
                    {moment(appointments[0].doctorSchedule.date).format(
                      "DD/MM/YYYY"
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <AntDesign name="clockcircleo" size={20} color="#ffff" />
                  <Text style={{ color: "#ffff" }}>
                    {`${moment(
                      appointments[0].appointmentSlot.start_time,
                      "HH:mm:ss"
                    ).format("HH:mm")} - ${moment(
                      appointments[0].appointmentSlot.end_time,
                      "HH:mm:ss"
                    ).format("HH:mm")}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            marginBottom: 10,
            marginTop: 16,
            borderRadius: 10,
            marginHorizontal: 17,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 14,
            paddingHorizontal: 14,
            backgroundColor: "#fff",
            // shadowColor: "#000",
            // shadowOffset: { width: 0, height: 1 },
            // shadowOpacity: 0.2,
            // shadowRadius: 2,
            // elevation: 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#E5E5E5",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: "25%",
              gap: 5,
              flex: 1,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("HospitalList")}
          >
            <Image
              source={require("../../assets/menu/hospital-book.png")}
              style={{ width: "80%", height: 50 }}
              resizeMode="center"
            />
            <Text
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Đặt lịch tại bệnh viện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "25%",
              gap: 5,
              flex: 1,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("CommunityList")}
          >
            <Image
              source={require("../../assets/menu/communication.png")}
              style={{ width: "80%", height: 50 }}
              resizeMode="center"
            />
            <Text
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Cộng đồng hỏi đáp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "25%",
              gap: 5,
              flex: 1,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("MedicalHistory")}
          >
            <Image
              source={require("../../assets/menu/medical-report.png")}
              style={{ width: "80%", height: 50 }}
              resizeMode="center"
            />
            <Text
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Kết quả khám
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "25%",
              gap: 5,
              flex: 1,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ListDoctorOnline")}
          >
            <Image
              source={require("../../assets/menu/hospital-book.png")}
              style={{ width: "80%", height: 50 }}
              resizeMode="center"
            />
            <Text
              style={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Hỏi riêng bác sĩ
            </Text>
          </TouchableOpacity>
        </View>
        {/* speciality */}
        <View style={{ marginVertical: 10 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Chuyên khoa
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("SpecialtyList")}
            >
              <Text
                style={{
                  color: "#0165FC",
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
            data={specialties}
            renderItem={({ item, index }) => (
              <Speciality
                key={index}
                specialty={item}
                onPress={() =>
                  navigation.navigate("SpecialtyFilterList", {
                    specialtyId: item.id,
                  })
                }
              />
            )}
          />
        </View>

        {/* hospital */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 16,
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Cơ sở y tế</Text>

          <TouchableOpacity onPress={() => navigation.navigate("HospitalList")}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Chat")}> */}
            <Text
              style={{
                color: "#0165FC",
              }}
            >
              Xem tất cả
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}
        >
          {hospitals?.map((hospital, index) => (
            <HospitalCard
              compact
              key={index}
              hospital={hospital}
              onPress={() =>
                navigation.navigate("HospitalDetail", { id: hospital.id })
              }
            />
          ))}
        </ScrollView>

        {/* doctor */}
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Các bác sĩ nổi bật
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("DoctorList")}>
              <Text
                style={{
                  color: "#0165FC",
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 15,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
            data={doctors}
            renderItem={({ item, index }) => (
              <DoctorCard key={index} doctor={item} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
