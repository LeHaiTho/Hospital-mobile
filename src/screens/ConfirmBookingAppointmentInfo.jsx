import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  EvilIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar, Card, IconButton, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ToastConfig from "../utils/toastConfig";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axiosConfig from "../apis/axiosConfig";
import moment from "moment";
import Toast from "react-native-toast-message";

const ConfirmBookingAppointmentInfo = ({ route }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [doctorObject, setDoctorObject] = useState();
  const [focusReasonForVisit, setFocusReasonForVisit] = useState(false);
  // Hàm để thay đổi trạng thái
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
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
  console.log("doctor", doctor);

  console.log("slot", slot);
  console.log("selectedDate", selectedDate);
  console.log("doctor", doctor);
  console.log("isDoctorSpecial", isDoctorSpecial);
  console.log("selectedSpecialty", selectedSpecialty);
  console.log("specialtyDetail", specialtyDetail);

  // console.log("profile", profile);
  const getDoctorName = async () => {
    try {
      const res = await axiosConfig.get(
        `/doctors/get-doctor-by-id/${doctor?.doctor_id}`
      );
      setDoctorObject(res?.data?.doctor);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("doctorObject", doctorObject);
  useEffect(() => {
    if (doctor?.doctor_id) {
      getDoctorName();
    }
  }, [doctor?.doctor_id]);
  console.log(
    "selectedHospital.hospitalSpecialty",
    selectedHospital.hospitalSpecialty
  );
  console.log(
    "doctor?.consultation_fee?.[0]?.toLocaleString('vi-VN')",
    doctor?.consultation_fee?.[0]?.toLocaleString("vi-VN")
  );
  console.log(
    "selectedHospital?.hospitalSpecialty?.[0]?.consultation_fee?.toLocaleString('vi-VN')",
    selectedHospital?.hospitalSpecialty?.[0]?.consultation_fee?.toLocaleString(
      "vi-VN"
    )
  );
  console.log("slot", slot?.slot_id);
  const formatDataSlot = (data) => {
    const { id, slot_id } = data;
    if (id) {
      return data;
    } else if (slot_id) {
      return {
        end_time: data.end_time,
        start_time: data.start_time,
        id: data.slot_id,
      };
    }
    return data;
  };

  const handleConfirmBookingAppointment = () => {
    if (reasonForVisit.trim() === "") {
      Toast.show({
        text1: "Vui lòng điền lý do khám *",
        type: "error",

        text1Style: {
          fontSize: 14,
          color: "#F20000",
        },
      });
      setFocusReasonForVisit(true);
    } else {
      // console.log({
      //   // doctor: doctorObject || doctor,
      //   // selectedDate: moment(selectedDate, "YYYY-MM-DD", true).isValid()
      //   //   ? selectedDate
      //   //   : moment(selectedDate, "DD/MM/YYYY", true).format("YYYY-MM-DD"),
      //   slot: formatDataSlot(slot),
      //   doctor: doctorObject || doctor,
      //   // selectedHospital,
      //   // selectedSpecialty,
      //   // reasonForVisit,
      // });
      navigation.navigate("InfoPayment", {
        profile,
        doctor: doctorObject || doctor,
        selectedDate: moment(selectedDate, "YYYY-MM-DD", true).isValid()
          ? selectedDate
          : moment(selectedDate, "DD/MM/YYYY", true).format("YYYY-MM-DD"),
        slot: formatDataSlot(slot),
        selectedHospital,
        selectedSpecialty,
        reasonForVisit,
        isDoctorSpecial,
        specialtyDetail,
      });
    }
  };

  return (
    <>
      <KeyboardAwareScrollView style={{ flex: 1 }} extraScrollHeight={1000}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#0165FC",
            paddingHorizontal: 20,
            paddingBottom: 8,
            justifyContent: "space-between",
          }}
        >
          {/* Điểm đầu tiên */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 7,
                borderRadius: 100,
                backgroundColor: "#fff",
              }}
            >
              <Fontisto name="doctor" size={24} color="#0165FC" />
            </View>
          </View>
          <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 7,
                borderRadius: 100,
                backgroundColor: "#fff",
              }}
            >
              <FontAwesome5 name="user-alt" size={24} color="#0165FC" />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
            <View
              style={{
                padding: 4,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "white",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 100,
                }}
              >
                <AntDesign name="checkcircle" size={24} color="#0165FC" />
              </View>
            </View>
            <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
          </View>
          {/* Điểm cuối */}
          <View>
            <Entypo name="wallet" size={24} color="lightgray" />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 10,
            gap: 10,
            paddingBottom: 150,
          }}
        >
          <View
            style={{
              gap: 5,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0165FC",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {doctor?.hospitals?.find(
                (hospital) => hospital.id === selectedHospital
              )?.name || selectedHospital?.name}
            </Text>
            <Text style={{ color: "#797979" }}>
              {doctor?.hospitals?.find(
                (hospital) => hospital.id === selectedHospital
              )?.address || selectedHospital?.address}
            </Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Thông tin bệnh nhân</Text>
            <Card
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <Card.Content>
                <View style={{ gap: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <FontAwesome5 name="user-alt" size={20} color="#0165FF" />
                      <Text>{profile?.fullname?.toUpperCase()}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <FontAwesome5
                        name="phone-alt"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>{profile?.phone}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <FontAwesome5
                        name="birthday-cake"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>
                        {moment(profile?.date_of_birth).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 18,
                      }}
                    >
                      <FontAwesome5
                        name="map-marker-alt"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000", width: "90%" }}>
                        {profile?.address}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Thông tin bác sĩ</Text>
            <Card
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <Card.Content>
                <View style={{ gap: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <FontAwesome6
                        name="user-doctor"
                        size={20}
                        color="#0165FF"
                      />
                      <Text>
                        {doctor?.fullname || doctorObject?.user?.fullname}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <FontAwesome
                        name="stethoscope"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>
                        {/* {doctor?.specialties?.find(
                          (specialty) => specialty.id === selectedSpecialty
                        )?.name ||
                          specialtyDetail ||
                          selectedHospital?.hospitalSpecialty[0]?.specialty
                            ?.name} */}
                        {doctor?.specialties?.find(
                          (specialty) => specialty.id === selectedSpecialty
                        )?.name ||
                          specialtyDetail ||
                          selectedHospital?.hospitalSpecialty[0]?.specialty
                            ?.name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 13,
                      }}
                    >
                      <FontAwesome
                        name="calendar-check-o"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>
                        {`${
                          selectedDate &&
                          moment(selectedDate, "DD/MM/YYYY", true).isValid()
                            ? selectedDate
                            : moment(selectedDate || new Date()).format(
                                "DD/MM/YYYY"
                              )
                        } - (${moment(slot?.start_time, "HH:mm:ss").format(
                          "HH:mm"
                        )} - ${moment(slot?.end_time, "HH:mm:ss").format(
                          "HH:mm"
                        )})`}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Entypo name="wallet" size={20} color="#0165FF" />
                      <Text style={{ color: "#000", fontWeight: "bold" }}>
                        {`${Number(
                          selectedHospital?.hospitalSpecialty?.[0]
                            ?.consultation_fee || doctor?.consultation_fee?.[0]
                        ).toLocaleString("vi-VN")} VNĐ`}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={{ gap: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Lý do khám </Text>
              <Text style={{ color: "#F20000" }}>*</Text>
            </View>
            <Card
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <Card.Content>
                <View style={{ gap: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                        width: "100%",
                      }}
                    >
                      <TextInput
                        placeholder="Nhập lý do khám"
                        placeholderTextColor="#999"
                        style={{
                          backgroundColor: "#fff",
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          borderRadius: 10,
                          borderColor:
                            reasonForVisit.trim() === ""
                              ? "#F20000"
                              : "#E0E0E0",
                          color: "#000",
                          width: "100%",
                          textAlignVertical: "top",
                        }}
                        multiline={true}
                        numberOfLines={4}
                        value={reasonForVisit}
                        onChangeText={(value) => setReasonForVisit(value)}
                        onFocus={() => {
                          setFocusReasonForVisit(false);
                        }}
                        onBlur={() => {
                          if (reasonForVisit.trim() === "") {
                            setFocusReasonForVisit(true);
                          } else {
                            setFocusReasonForVisit(false);
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View
            style={{
              gap: 5,
              backgroundColor: "rgba(248, 210, 205, 0.53)",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 12, color: "#F20000", lineHeight: 18 }}>
              Trong thời gian quy định, nếu quý khách hủy phiếu đăng ký khám sẽ
              được hoàn lại tiền khám và các dịch vụ đặt thêm.(Không bao gồm phí
              tiện ích)
            </Text>
          </View>
        </ScrollView>

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              width: "100%",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Tiền khám</Text>
            <Text
              style={{ fontWeight: "bold", color: "#0165FC", fontSize: 16 }}
            >
              {`${Number(
                selectedHospital?.hospitalSpecialty?.[0]?.consultation_fee ||
                  doctor?.consultation_fee?.[0]
              ).toLocaleString("vi-VN")} VNĐ`}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#0165FC",
              padding: 15,
              borderRadius: 100,
              width: "100%",
              alignItems: "center",
            }}
            onPress={handleConfirmBookingAppointment}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ConfirmBookingAppointmentInfo;
