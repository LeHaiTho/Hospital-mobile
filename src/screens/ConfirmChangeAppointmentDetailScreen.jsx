import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  EvilIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, IconButton, FAB } from "react-native-paper";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axiosConfig from "../apis/axiosConfig";
import moment from "moment";
import { Modal, Portal } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const ConfirmChangeAppointmentDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { appointment, doctor } = route.params || {};
  const sheetRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [visible, setVisible] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  console.log("doctor", doctor);
  console.log("appointment", appointment);
  const requestBody = {
    original_appointment_id: appointment?.id,
    doctor_id: doctor?.doctor?.doctor?.id,
    user_id: appointment?.patient?.id,
    familyMember_id: appointment?.member?.id || null,
    hospital_id: appointment?.hospital?.id,
    doctorSchedule_id: doctor?.slot?.doctorSchedule?.id,
    appointmentSlot_id: doctor?.slot?.id,
    specialty_id: appointment?.specialty.id,
    reason_for_visit: appointment?.reason,
    appointment_date: appointment?.doctorSchedule?.date,
    payment_status: appointment?.payment_status,
    payment_method: appointment?.payment_method,
  };

  const handleSubmit = async () => {
    console.log("requestBody", requestBody);
    try {
      const res = await axiosConfig.post(
        "/appointments/change-appointment",
        requestBody
      );
      if (res.data.newChangeAppointment) {
        setAppointmentId(res.data.newChangeAppointment.id);
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("appointmentId", appointmentId);
  const handleOke = () => {
    setVisible(false);
    navigation.navigate("AppointmentDetail", {
      appointmentId,
    });
  };
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    handleClosePress();
  };
  return (
    <>
      <View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 10,
            gap: 10,
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0165FC",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {appointment?.hospital?.name}
            </Text>
            <Text style={{ color: "#797979", fontSize: 12 }}>
              {appointment?.hospital?.address}
            </Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Thông tin bệnh nhân</Text>
            <Card
              // key={profile.id}
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
                      alignItems: "center",
                      gap: 16,
                    }}
                  >
                    <FontAwesome5 name="user-alt" size={20} color="#0165FF" />
                    <Text>
                      {appointment?.member?.fullname ||
                        appointment?.patient?.fullname}
                    </Text>
                  </View>

                  {/* Hiển thị các thông tin chi tiết dựa vào trạng thái mở rộng */}

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
                      <Text style={{ color: "#000" }}>
                        {appointment?.member?.phone ||
                          appointment?.patient?.phone}
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
                      <FontAwesome5
                        name="birthday-cake"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>
                        {moment(
                          appointment?.member?.date_of_birth ||
                            appointment?.patient?.date_of_birth
                        ).format("DD/MM/YYYY")}
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
                      <FontAwesome5
                        name="map-marker-alt"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000", width: "90%" }}>
                        {appointment?.member?.address ||
                          appointment?.patient?.address}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
                      Lý do khám:
                    </Text>
                    <Text style={{ color: "#000" }}>{appointment?.reason}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Hẹn bác sĩ mới</Text>
            <Card
              // key={profile.id}
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
                      <Text>{doctor?.doctor?.doctor?.user?.fullname}</Text>
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
                      <Text style={{ color: "#000" }}>
                        {doctor?.doctor?.doctor?.user?.phone}
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
                        width: "100%",
                      }}
                    >
                      <FontAwesome5
                        name="birthday-cake"
                        size={20}
                        color="#0165FF"
                      />
                      <Text
                        style={{
                          color: "#000",

                          width: "90%",
                        }}
                      >
                        {`${moment(doctor?.slot?.doctorSchedule?.date).format(
                          "DD/MM/YYYY"
                        )} (${moment(doctor?.slot?.start_time, "HH:mm").format(
                          "HH:mm"
                        )} - ${moment(doctor?.slot?.end_time, "HH:mm").format(
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
                        gap: 16,
                      }}
                    >
                      <Entypo name="wallet" size={20} color="#0165FF" />
                      <Text style={{ color: "#000", fontWeight: "bold" }}>
                        {`${
                          doctor?.doctor?.consultation_fee.split(".")[0]
                        } VNĐ`}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: "#ff2000",
                    }}
                  >
                    Việc thay đổi không cần thanh toán lại!
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </View>

          <View
            style={{
              gap: 5,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <AntDesign name="checkcircle" size={16} color="#08DB57" />
            <Text style={{ fontSize: 12, color: "#797979", width: "90%" }}>
              Tôi đồng ý thay đổi lịch khám với bác sĩ mới, với các thông tin
              trên tôi xác nhận thông tin đã đúng.
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
          <TouchableOpacity
            style={{
              backgroundColor: "#0165FC",
              padding: 15,
              borderRadius: 100,
              width: "100%",
              alignItems: "center",
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: "#FFF",
                fontWeight: "bold",
              }}
            >
              XÁC NHẬN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          contentContainerStyle={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            marginHorizontal: 50,
            marginTop: -50,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <LottieView
              source={require("../../assets/animation/Animation - 1729791618285.json")}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#0165FC" }}
            >
              Dời lịch hẹn thành công!
            </Text>
            <Text
              style={{
                color: "#ABABAB",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Hy vọng bạn sẽ có một buổi khám tốt đẹp với bác sĩ mới!
            </Text>
            <TouchableOpacity
              style={{
                padding: 12,
                borderRadius: 100,
                backgroundColor: "#0165FC",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
              onPress={handleOke}
            >
              <Text style={{ color: "#fff" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default ConfirmChangeAppointmentDetailScreen;
