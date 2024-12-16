import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text, ScrollView } from "react-native";
import axiosConfig from "../../apis/axiosConfig";
import moment from "moment";

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E7E7E7",
      }}
    >
      <View
        style={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <Text numberOfLines={1}>{item.title}</Text>
        <Text numberOfLines={1} style={{ fontSize: 12, color: "#828282" }}>
          {item.reason}
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
              backgroundColor:
                item.status === "pending"
                  ? "#E5F2FF"
                  : item.status === "approved"
                    ? "#EAF7EF"
                    : "#FFF4E6",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                color:
                  item.status === "pending"
                    ? "#0165FF"
                    : item.status === "approved"
                      ? "#27AE60"
                      : "#EB5757",
              }}
            >
              {item.status === "pending"
                ? "Chờ duyệt"
                : item.status === "approved"
                  ? "Đã duyệt"
                  : "Đã từ chối"}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 12,
              color: "#828282",
            }}
          >
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const TimeOffListScreen = () => {
  const [doctorUnavailableTimeList, setDoctorUnavailableTimeList] = useState(
    []
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getDoctorUnavailableTimeList();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getDoctorUnavailableTimeList();
    setIsRefreshing(false);
  };
  const getDoctorUnavailableTimeList = async () => {
    try {
      const response = await axiosConfig.get(
        "/doctor-unavailable-times/get-list"
      );
      const realData = response.data.doctorUnavailableTime;

      // Tạo dữ liệu giả
      // const fakeData = Array.from({ length: 10 }, (_, i) => ({
      //   id: 100 + i,
      //   doctor_id: 48,
      //   hospital_id: 15,
      //   title: `Lịch nghỉ giả ${i + 1}`,
      //   unavailable_start_date: "2024-11-11T08:00:00.000Z",
      //   unavailable_end_date: "2024-11-11T16:00:00.000Z",
      //   reason: `Lý do nghỉ giả ${i + 1}`,
      //   is_active: null,
      //   status:
      //     i % 3 === 0 ? "approved" : i % 3 === 1 ? "pending" : "cancelled",
      //   createdAt: "2024-11-08T07:42:02.171Z",
      //   updatedAt: "2024-11-08T07:42:02.171Z",
      // }));

      // Kết hợp dữ liệu thật và dữ liệu giả
      setDoctorUnavailableTimeList([...realData]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={{ gap: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            Danh sách đề xuất
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <FontAwesome name="calendar" size={24} color="#000" />
            <Ionicons name="filter-outline" size={29} color="#000" />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E7E7E7",
            }}
          >
            <Text>Đề xuất của tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E7E7E7",
            }}
          >
            <Text>Gửi đến tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E7E7E7",
            }}
          >
            <Text>Đang theo dõi</Text>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <FlatList
            data={doctorUnavailableTimeList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </View>
    </View>
  );
};

export default TimeOffListScreen;
