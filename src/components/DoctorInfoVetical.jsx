import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const DoctorInfoVetical = ({ doctor, hospitalId }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("DoctorDetail", { id: doctor.id, hospitalId });
  };
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: "column",
          gap: 10,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: "#ccc",
          opacity: pressed ? 0.5 : 1,
          width: 170,
          paddingVertical: 10,
        },
      ]}
      onPress={handlePress}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: `${BASE_URL}${doctor.avatar}` }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 100,
          }}
        />
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
          backgroundColor: "#DBEAFE",
          paddingHorizontal: 10,
          paddingVertical: 3,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ color: "#0165FC", fontSize: 12 }}>
            {doctor.averageRating}
          </Text>
          <Ionicons name="star" size={12} color="#0165FC" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ color: "#0165FC" }}>{doctor.totalComments}</Text>
          <FontAwesome5 name="user-friends" size={12} color="#0165FC" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 10, gap: 4 }}>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "700",
            color: "#0165FC",
          }}
        >
          {doctor.fullname}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: "#6B7280",
            borderRadius: 5,
            alignSelf: "flex-start",
          }}
        >
          {doctor.specialties.map((specialty) => specialty.name).join(" - ")}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <FontAwesome name="money" size={15} color="#0165FC" />
          <Text style={{ color: "#0165FC", fontWeight: "500" }}>
            {`${Number(doctor?.consultation_fee[0]).toLocaleString(
              "vi-VN"
            )} VNĐ`}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 5,
            borderRadius: 8,
            backgroundColor: "#0165FC",
            padding: 10,
          }}
          onPress={handlePress}
        >
          <Text style={{ fontWeight: 600, color: "#fff", textAlign: "center" }}>
            Đặt lịch khám
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default DoctorInfoVetical;

const styles = StyleSheet.create({});
