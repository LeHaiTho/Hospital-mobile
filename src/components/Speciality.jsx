import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const Speciality = ({ specialty, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 7,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Các view bên trong ScrollView */}
      <View style={{ alignItems: "center", justifyContent: "center", gap: 5 }}>
        <View
          style={{
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#DBEAFE",
            padding: 10,
            borderRadius: 100,
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: `${BASE_URL}${specialty?.photo}`,
            }}
            style={{
              resizeMode: "contain",
              backgroundColor: 0,
            }}
          />
        </View>
        <Text
          style={{
            fontWeight: "300",
            width: 75, // Chiều rộng cố định để giới hạn text
            textAlign: "center",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {specialty?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Speciality;
