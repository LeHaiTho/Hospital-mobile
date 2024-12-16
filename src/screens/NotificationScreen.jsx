import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import Notification from "../components/Notification";
import axiosConfig from "../apis/axiosConfig";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getNotifications = async () => {
    try {
      setIsRefreshing(true);
      const response = await axiosConfig.get(
        "/notifications/get-notifications"
      );
      setNotifications(response.data.notificationDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleMarkAsRead = async () => {
    await getNotifications(); // Gọi lại danh sách thông báo
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={getNotifications}
        />
      }
    >
      <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        <Text style={{ fontSize: 16, color: "#000" }}>Hôm nay</Text>
      </View>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}
      <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        <Text style={{ fontSize: 16, color: "#000" }}>Tuần này</Text>
      </View>
      {/*  */}
    </ScrollView>
  );
};

export default NotificationScreen;
