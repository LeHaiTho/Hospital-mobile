import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Text, View } from "react-native";

const ScheduleAppointment = ({ appointmentDetail }) => {
  return (
    <View style={{ paddingVertical: 10, gap: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Ionicons name="calendar-outline" size={24} color="#797979" />
          <Text style={{ color: "#797979" }}>Ngày khám</Text>
        </View>
        <Text style={{ fontWeight: "500" }}>
          {moment(appointmentDetail?.doctorSchedule?.date).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 7,
          }}
        >
          <FontAwesome6 name="door-open" size={24} color="#797979" />
          <Text style={{ color: "#797979" }}>Phòng khám</Text>
        </View>
        <Text style={{ fontWeight: "500" }}>C1 - 101</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <MaterialIcons name="access-alarm" size={24} color="#797979" />
          <Text style={{ color: "#797979" }}>Thời gian</Text>
        </View>
        <Text style={{ fontWeight: "500" }}>
          {`${moment(
            appointmentDetail?.appointmentSlot?.start_time,
            "HH:mm"
          ).format("HH:mm")} - ${moment(
            appointmentDetail?.appointmentSlot?.end_time,
            "HH:mm"
          ).format("HH:mm")} (${
            appointmentDetail?.doctorSchedule?.slot_duration
          } phút)`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <FontAwesome6 name="stethoscope" size={24} color="#797979" />
          <Text style={{ color: "#797979" }}>Khám chuyên khoa</Text>
        </View>
        <Text style={{ fontWeight: "500" }}>
          {appointmentDetail?.specialty?.name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <FontAwesome name="money" size={24} color="#797979" />
          <Text style={{ color: "#797979" }}>Trạng thái thanh toán</Text>
        </View>
        <Text style={{ color: "#5CE27A", fontStyle: "italic" }}>
          {appointmentDetail?.payment_status === "pending"
            ? "Chưa thanh toán"
            : "Đã thanh toán"}
        </Text>
      </View>
    </View>
  );
};

export default ScheduleAppointment;
