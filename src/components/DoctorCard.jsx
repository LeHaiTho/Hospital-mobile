import React from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import { View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const DoctorCard = ({ doctor = null, hospitalId = null }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("DoctorDetail", { id: doctor.id, hospitalId });
  };
  console.log("hospitalId", hospitalId);
  const renderStars = (averageRating) => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={18} color="#FCAF23" />
      );
    }

    if (halfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={18} color="#FCAF23" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={18}
          color="#FCAF23"
        />
      );
    }

    return stars;
  };

  console.log(doctor?.averageRating);
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 14,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 15,
        width: "100%",
        gap: 5,
      }}
      onPress={handlePress}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          gap: 10,
        }}
      >
        <Image
          style={{
            width: 100,
            height: 120,
            borderRadius: 10,
          }}
          source={{
            uri: doctor?.avatar
              ? `${baseUrl}${doctor?.avatar}`
              : "https://thumbs.dreamstime.com/b/default-placeholder-doctor-half-length-portrait-photo-avatar-gray-color-119556416.jpg",
          }}
        />

        <View
          style={{
            flex: 2,
            flexDirection: "column",
            gap: 5,
          }}
        >
          <View
            style={{
              marginBottom: 5,
              paddingTop: 5,

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: "black",
              }}
            >
              {doctor?.fullname}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#6B7280",
                padding: 2,
                borderRadius: 5,
                alignSelf: "flex-start",
              }}
            >
              {doctor?.specialties
                .map((specialty) => specialty.name)
                .join(" - ")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ color: "#1F2937" }}>Giá khám:</Text>
            <Text style={{ color: "#0165FC", fontWeight: "600" }}>
              {`${Number(doctor?.consultation_fee[0]).toLocaleString(
                "vi-VN"
              )} VNĐ`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <View style={{ flexDirection: "row", gap: 5 }}>
                {renderStars(
                  doctor?.averageRating === "0.0" ? 5.0 : doctor?.averageRating
                )}
              </View>
              <Text style={{ fontSize: 12, color: "#000" }}>
                {doctor?.averageRating === "0.0"
                  ? "5.0"
                  : doctor?.averageRating}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>
              {doctor?.totalComments > 0 && `${doctor.totalComments} Phản hồi`}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderRadius: 8,
          backgroundColor: "#DBEAFE",
          padding: 10,
        }}
        onPress={handlePress}
      >
        <Text
          style={{ fontWeight: 680, color: "#0165FC", textAlign: "center" }}
        >
          Đặt lịch khám
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DoctorCard;
