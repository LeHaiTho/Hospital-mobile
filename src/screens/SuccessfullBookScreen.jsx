import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
const SuccessfullBookScreen = ({ route }) => {
  const { appointmentId } = route.params;
  const navigation = useNavigation();
  const [appointmentDetail, setAppointmentDetail] = useState(null);

  const getAppointmentDetail = async () => {
    try {
      const response = await axiosConfig.get(
        `/appointments/get-appointment-by-id/${appointmentId}`
      );
      setAppointmentDetail(response?.data?.appointmentDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointmentDetail();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Ionicons name="checkmark-circle" size={130} color="#0165FC" />
        <Text style={styles.title}>Booking Confirmed!</Text>

        <View style={styles.detailsContainer}>
          <Text>Bạn đã đặt lịch hẹn thành công với bác sĩ</Text>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {appointmentDetail?.doctor?.fullname}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                gap: 10,
              }}
            >
              <FontAwesome name="user" size={24} color="#0165FC" />
              <Text>{appointmentDetail?.patient?.fullname}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Foundation name="dollar-bill" size={24} color="#0165FC" />
              <Text>100.000 VNĐ</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Ionicons name="calendar" size={24} color="#0165FC" />
              <Text>
                {moment(appointmentDetail?.appointment_date).format(
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
              <AntDesign name="clockcircle" size={24} color="#0165FC" />
              <Text>
                {`${moment(
                  appointmentDetail?.appointmentSlot?.start_time,
                  "HH:mm"
                ).format("HH:mm")} - ${moment(
                  appointmentDetail?.appointmentSlot?.end_time,
                  "HH:mm"
                ).format("HH:mm")}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
            height: 10,
          },
          shadowOpacity: 0.9,
          shadowRadius: 15,
          elevation: 10,
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
          onPress={() =>
            navigation.navigate("AppointmentDetail", { appointmentId })
          }
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            Xem chi tiết lịch hẹn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            padding: 15,
            borderRadius: 100,
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Text style={{ color: "#0165FC" }}>Trở về trang chủ</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

export default SuccessfullBookScreen;
