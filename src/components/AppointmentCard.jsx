import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";
import LottieView from "lottie-react-native";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const AppointmentCard = ({ appointment }) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleOke = () => {
    setVisible(false);
    navigation.goBack();
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Đã xác nhận",
      color: "#0958d9",
      icon: "clock",
    },
    {
      value: "confirmed",
      label: "Đã xác nhận",
      color: "#0958d9",
      icon: "check",
    },
    { value: "cancelled", label: "Đã hủy", color: "#ea1515", icon: "cancel" },
    {
      value: "completed",
      label: "Đã khám xong",
      color: "#60ea15",
      icon: "check",
    },
  ];
  return (
    <>
      <TouchableOpacity
        style={{
          paddingHorizontal: 18,
          paddingVertical: 10,
          backgroundColor: "#fff",
          borderRadius: 14,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: "100%",
          gap: 5,
        }}
        onPress={() => {
          navigation.navigate("AppointmentDetail", {
            appointmentId: appointment.id,
            fromBookingFlow: false,
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
              {moment(appointment?.doctorSchedule?.date).format("DD/MM/YYYY")}
            </Text>
            <Text style={{ fontStyle: "italic", fontSize: 12 }}>
              {`(${moment(
                appointment?.appointmentSlot?.start_time,
                "HH:mm:ss"
              ).format("HH:mm")} - ${moment(
                appointment?.appointmentSlot?.end_time,
                "HH:mm:ss"
              ).format("HH:mm")})`}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text
              style={{
                color: statusOptions.find(
                  (status) => status.value === appointment?.status
                )?.color,
              }}
            >
              {
                statusOptions.find(
                  (status) => status.value === appointment?.status
                )?.label
              }
            </Text>
            <MaterialCommunityIcons
              name={
                statusOptions.find(
                  (status) => status.value === appointment?.status
                )?.icon
              }
              size={24}
              color={
                statusOptions.find(
                  (status) => status.value === appointment?.status
                )?.color
              }
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingVertical: 10,
            justifyContent: "space-between",
            borderTopWidth: 0.6,
            borderBottomWidth: 0.6,
            borderColor: "#ccc",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 125,
              borderRadius: 10,
              resizeMode: "cover",
            }}
            source={{
              uri: `${baseUrl}${appointment?.doctor?.avatar}`,
            }}
          />

          <View style={{ flex: 2, gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>
              {appointment?.doctor?.fullname}
            </Text>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              {/* <MaterialCommunityIcons
                name="map-marker-outline"
                color={"#0165FC"}
                size={24}
              /> */}
              <Text
                numberOfLines={2}
                style={{ color: "#797979", fontSize: 12 }}
              >
                {appointment?.hospital?.address}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Text style={{ color: "#797979" }}>Mã lịch hẹn: </Text>
              <Text
                style={{ color: "#0165FC", fontWeight: "bold", fontSize: 12 }}
              >
                {appointment?.appointment_code}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          {appointment?.status === "confirmed" && (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#0165FC",
                borderRadius: 100,
                flex: 1,
              }}
              onPress={() => {
                navigation.navigate("AppointmentDetail", {
                  appointmentId: appointment.id,
                  fromBookingFlow: false,
                });
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Chi tiết lịch hẹn
              </Text>
            </TouchableOpacity>
          )}
          {appointment?.status === "pending" ? (
            <>
              {/* <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#D3E6FF",
                  borderRadius: 100,
                  flex: 1,
                }}
                onPress={() => setVisible(true)}
              >
                <Text style={{ color: "#0165FC", textAlign: "center" }}>
                  Hủy lịch hẹn
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#D3E6FF",
                  borderRadius: 100,
                  flex: 1,
                }}
              >
                <Text style={{ color: "#0165FC", textAlign: "center" }}>
                  Xem chi tiết
                </Text>
              </TouchableOpacity>
            </>
          ) : appointment?.status === "cancelled" ? null : (
            <></>
          )}
          {appointment?.status === "completed" && (
            <>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#D3E6FF",
                  borderRadius: 100,
                  flex: 1,
                }}
              >
                <Text style={{ color: "#0165FC", textAlign: "center" }}>
                  Đặt lại lịch hẹn
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#0165FC",
                  borderRadius: 100,
                  flex: 1,
                }}
                onPress={() => {
                  navigation.navigate("Rating", { appointment });
                }}
              >
                <Text style={{ color: "#D3E6FF", textAlign: "center" }}>
                  Đánh giá bác sĩ
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
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
              Hủy lịch hẹn thành công!
            </Text>
            <Text
              style={{
                color: "#ABABAB",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
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

export default AppointmentCard;
