import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const DoctorInfo = ({ doctor, isAppointmentDetail }) => {
  const displayDoctorInfo = isAppointmentDetail ? doctor?.doctor : doctor;
  console.log({ ...displayDoctorInfo });
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        gap: 15,
        backgroundColor: "#fff",
      }}
    >
      <Avatar.Image
        size={100}
        source={{
          uri: displayDoctorInfo?.avatar
            ? `${baseUrl}${displayDoctorInfo?.avatar}`
            : "https://thumbs.dreamstime.com/b/default-placeholder-doctor-half-length-portrait-photo-avatar-gray-color-119556416.jpg",
        }}
        style={{
          resizeMode: "cover",
        }}
      />

      <View
        style={{
          flex: 2,
          flexDirection: "column",
          gap: 5,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "black",
            }}
          >
            {displayDoctorInfo?.fullname}
          </Text>
          {displayDoctorInfo?.specialties && (
            <Text style={{ fontSize: 12, color: "#6B7280" }}>
              {displayDoctorInfo?.specialties
                ?.map((specialty) => specialty.name)
                .join(" - ")}
            </Text>
          )}
        </View>

        <Text
          style={{
            flex: 1,
          }}
        >
          Giá khám:
          <Text style={{ color: "#0165FC", fontWeight: "500" }}>
            {` ${Number(displayDoctorInfo?.consultation_fee[0]).toLocaleString(
              "vi-VN"
            )} VNĐ`}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default DoctorInfo;
