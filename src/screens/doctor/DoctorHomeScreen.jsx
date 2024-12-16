import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Search from "../../components/Search";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
const DoctorHomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          marginVertical: 20,
          flex: 1,
          justifyContent: "flex-start",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={60}
          source={{ uri: "https://via.placeholder.com/150" }}
        />
        <View>
          <Text style={{ fontWeight: "500" }}>Xin chào</Text>
          <Text style={{ fontWeight: "500" }}>{user?.fullname}</Text>
        </View>
      </View>
      <Search />
      <View
        style={{
          marginVertical: 20,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 16,
          alignItems: "center",
          shadowColor: "#000",
          marginHorizontal: 2,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "20%",
          }}
          onPress={() => navigation.navigate("DoctorSchedule")}
        >
          <FontAwesome
            name="calendar"
            size={22}
            color="#0165FC"
            style={{
              padding: 15,
              backgroundColor: "#DBEAFE",
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            Lịch làm việc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "20%",
          }}
          onPress={() => navigation.navigate("LeaveReason")}
        >
          <FontAwesome
            name="times-rectangle"
            size={22}
            color="#0165FC"
            style={{
              padding: 15,
              backgroundColor: "#DBEAFE",
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            Xin nghỉ phép
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "20%",
          }}
          onPress={() => navigation.navigate("CommunityList")}
        >
          <MaterialCommunityIcons
            name="comment-edit"
            size={25}
            color="#0165FC"
            style={{
              padding: 13,
              backgroundColor: "#DBEAFE",
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 12, textAlign: "center" }} numberOfLines={2}>
            Cộng đồng hỏi đáp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "20%",
          }}
          onPress={() => navigation.navigate("ChatList")}
        >
          <FontAwesome
            name="calendar"
            size={22}
            color="#0165FC"
            style={{
              padding: 15,
              backgroundColor: "#DBEAFE",
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            Chat với bệnh nhân
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DoctorHomeScreen;
