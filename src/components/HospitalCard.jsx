import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const base_url = process.env.EXPO_PUBLIC_API_URL;
const HospitalCard = ({ compact, onPress, hospital }) => {
  return (
    <TouchableOpacity
      style={{
        width: compact ? width * 0.6 : "100%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 15,
        gap: 5,
      }}
      onPress={onPress}
    >
      <View style={{ flex: 1, borderRadius: 15 }}>
        <Image
          source={{
            uri: hospital?.banner
              ? `${base_url}${hospital.banner}`
              : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg",
          }}
          resizeMode="cover"
          style={{
            height: compact ? 120 : 150, // Thay đổi chiều cao hình ảnh
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 2,
          gap: 2,
        }}
      >
        {/* Hiển thị tên bệnh viện */}
        <View
          style={{
            flexDirection: "column",
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: compact ? 12 : 14, fontWeight: "bold" }}>
            {hospital?.name}
          </Text>

          {compact && (
            <>
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  alignItems: "center",
                  flex: 1,
                }}
                numberOfLines={2}
              >
                {hospital?.address}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{ fontWeight: "500", color: "#FCAF23", fontSize: 12 }}
                >
                  4.8
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="star" size={18} color="#FCAF23" />
                </View>
              </View>
            </>
          )}
        </View>

        {!compact && (
          <View style={{ gap: 1, paddingBottom: 5 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "gray",
                  alignItems: "center",
                  flex: 1,
                }}
                numberOfLines={2}
              >
                {hospital?.address}
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
              {hospital?.distance ? (
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <MaterialCommunityIcons
                    name="social-distance-2-meters"
                    size={18}
                    color="#0165FC"
                  />
                  <Text style={{ fontSize: 12, color: "#B5B5B5" }}>
                    {`${hospital?.distance} km`}
                  </Text>
                </View>
              ) : null}
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text
                  style={{ fontWeight: "500", color: "#FCAF23", fontSize: 12 }}
                >
                  4.8
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="star" size={18} color="#FCAF23" />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HospitalCard;
