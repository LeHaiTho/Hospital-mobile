import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { EvilIcons, FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { socket } from "../../utils/socket";
import axiosConfig from "../../apis/axiosConfig";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const ListDoctorOnlineScreen = () => {
  const navigation = useNavigation();

  const [listDoctorOnline, setListDoctorOnline] = useState([]);

  const getDoctorsOnline = async () => {
    socket.emit("get-doctors", async (doctorsOnline) => {
      console.log("doctorsOnline", doctorsOnline);

      if (doctorsOnline.length > 0) {
        try {
          const res = await axiosConfig.post(`doctors/all-online`, {
            doctorsOnline,
          });

          setListDoctorOnline(res.data.doctorList);
        } catch (error) {
          console.log("error", error);
        }
      }
    });
  };
  useEffect(() => {
    getDoctorsOnline();
    return () => {
      if (socket) {
        socket.off("get-doctors");
      }
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "column",
          gap: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#E5E5E5",
          borderRadius: 10,
        }}
      >
        <View style={{ gap: 10, flexDirection: "row" }}>
          <View style={{ position: "relative", width: 60, height: 60 }}>
            <Avatar.Image
              size={60}
              source={{ uri: `${baseUrl}${item.avatar}` }}
              style={{
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#E5E5E5",
              }}
            />
            <Octicons
              name="dot-fill"
              size={26}
              color="#51B370"
              style={{
                position: "absolute",
                bottom: -5,
                right: 5,
              }}
            />
          </View>

          <View>
            <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              {item.fullname}
            </Text>
            {item?.hospital?.map((hospital, index) => (
              <Text key={index} style={{ fontSize: 12 }}>
                {hospital.name}
              </Text>
            ))}
            {item?.specialties?.map((speciality, index) => (
              <Text key={index} style={{ color: "#0165FC" }}>
                {speciality.name}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              backgroundColor: "#E5E5E5",
              padding: 5,
              borderRadius: 5,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="calendar" size={16} color="#0165FC" />
            <Text style={{ fontSize: 12, textAlign: "center" }}>5</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              backgroundColor: "#E5E5E5",
              padding: 5,
              borderRadius: 5,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="star" size={16} color="#FCAF23" />
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              {item.averageRating > 0 ? item.averageRating : 5}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#E5E5E5",
              borderRadius: 5,
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={{ color: "#0165FC" }}>Xem hồ sơ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#0165FC",
              borderRadius: 5,
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              flexDirection: "row",
              gap: 5,
            }}
            onPress={() =>
              navigation.navigate("Chat", {
                doctorId: item.id,
                doctorName: item.fullname,
                doctorAvatar: item.avatar,
              })
            }
          >
            <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
            <Text style={{ color: "#fff" }}>Bắt đầu chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ backgroundColor: "#fff", flex: 1, padding: 16, gap: 16 }}>
        <View
          style={{
            padding: 14,
            backgroundColor: "#DBEAFE",
            borderRadius: 10,
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: "#0165FC",
          }}
        >
          <View
            style={{
              gap: 5,
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "flex-start",

              flex: 1,
            }}
          >
            <Text style={{ fontWeight: "500" }}>Bạn đang có</Text>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              0 lượt chat
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#0165FC",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("Packages")}
          >
            <Text
              style={{ color: "#fff", fontWeight: "500", textAlign: "center" }}
            >
              Chat ngay
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 10, flex: 1 }}>
          <Text style={{ fontWeight: "500" }}>Bác sĩ đang trực tuyến</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={listDoctorOnline}
            renderItem={renderItem}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 10,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListDoctorOnlineScreen;
