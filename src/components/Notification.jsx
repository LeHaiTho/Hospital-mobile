import React from "react";
import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/vi";
import { TouchableOpacity } from "react-native";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";

const Notification = ({ notification, onMarkAsRead }) => {
  const navigation = useNavigation();
  const handleClick = async (url) => {
    const extractId = (url) => {
      const match = url.match(/\/(\d+)$/); // Tìm số ở cuối chuỗi
      return match ? match[1] : null;
    };

    const id = extractId(url);

    // Đánh dấu thông báo là đã đọc nếu nó chưa được đọc
    if (notification.status === "unread") {
      await markNotificationAsRead(notification.id);
      onMarkAsRead(); // Gọi hàm cập nhật thông báo
    }

    navigation.navigate("AppointmentDetail", { appointmentId: id });
    console.log(notification.status);
  };

  const markNotificationAsRead = async (id) => {
    try {
      await axiosConfig.patch(`/notifications/mark-as-read/${id}/read`);
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: notification.status === "read" ? "#fff" : "#EFF6FF",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E5EA",
        gap: 16,
        flex: 1,
      }}
      onPress={() => handleClick(notification?.url)}
    >
      <View
        style={{
          padding: 16,
          borderRadius: 100,
          backgroundColor: notification.status === "read" ? "#fff" : "#CDF8DD",
        }}
      >
        <Ionicons name="calendar-outline" size={24} color="#04DA54" />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "500" }} numberOfLines={1}>
            {notification?.title}
          </Text>
        </View>
        <Text numberOfLines={3} style={{ color: "#ABABAB" }}>
          {notification?.body}
        </Text>
      </View>
      <Text style={{ color: "#ABABAB", alignSelf: "flex-start", fontSize: 12 }}>
        {moment(notification.createdAt).fromNow()}
      </Text>
    </TouchableOpacity>
  );
};

export default Notification;
