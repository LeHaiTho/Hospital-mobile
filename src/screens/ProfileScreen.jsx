import * as React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Title,
  Paragraph,
  List,
  Divider,
  IconButton,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#ffffff" }}>
      {user ? (
        <View
          style={{
            alignItems: "center",
            paddingVertical: 20,
            backgroundColor: "#ffffff",
            gap: 10,
          }}
        >
          {/* Avatar & Name */}
          <Avatar.Image
            size={100}
            source={{
              uri: user.avatar
                ? `${BASE_URL}${user.avatar}`
                : "https://supercharge.info/images/avatar-placeholder.png",
            }}
            style={{ backgroundColor: "transparent", position: "relative" }}
          />

          <Title style={{ fontSize: 20, fontWeight: "bold" }}>
            {user.fullname ?? user.username}
          </Title>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            paddingVertical: 20,
            backgroundColor: "#ffffff",
            gap: 10,
          }}
        >
          {/* Avatar & Name */}
          <Avatar.Image
            size={100}
            source={{
              uri: "https://supercharge.info/images/avatar-placeholder.png",
            }}
            style={{ backgroundColor: "transparent", position: "relative" }}
          />

          <Title>Khách</Title>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              backgroundColor: "#EFF6FF",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#0165FC" }}>Đăng nhập/Đăng ký</Text>
          </TouchableOpacity>
        </View>
      )}

      <View>
        <TouchableOpacity
          style={{
            borderBottomWidth: 0.9,
            borderBottomColor: "#ECECEC",
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="person-outline" color="#0165FC" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>Hồ sơ cá nhân</Text>
          </View>
          <Ionicons name="chevron-forward" color="#0165FC" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Hồ sơ cá nhân")}
          style={{
            borderBottomWidth: 0.9,
            borderBottomColor: "#ECECEC",
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="card-outline" color="#0165FC" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              Phương thức thanh toán
            </Text>
          </View>
          <Ionicons name="chevron-forward" color="#0165FC" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Hồ sơ cá nhân")}
          style={{
            borderBottomWidth: 0.9,
            borderBottomColor: "#ECECEC",
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="heart-outline" color="#0165FC" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>Yêu thích</Text>
          </View>
          <Ionicons name="chevron-forward" color="#0165FC" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Hồ sơ cá nhân")}
          style={{
            borderBottomWidth: 0.9,
            borderBottomColor: "#ECECEC",
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="help-circle-outline" color="#0165FC" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              Trung tâm trợ giúp
            </Text>
          </View>
          <Ionicons name="chevron-forward" color="#0165FC" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Hồ sơ cá nhân")}
          style={{
            borderBottomWidth: 0.9,
            borderBottomColor: "#ECECEC",
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="document-outline" color="#0165FC" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              Chính sách bảo mật
            </Text>
          </View>
          <Ionicons name="chevron-forward" color="#0165FC" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Hồ sơ cá nhân")}
          style={{
            borderBottomWidth: 0.9,
            borderBottomColor: "#ECECEC",
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="settings-outline" color="#0165FC" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>Cài đặt</Text>
          </View>
          <Ionicons name="chevron-forward" color="#0165FC" size={20} />
        </TouchableOpacity>
        {user && (
          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
              navigation.navigate("Login");
            }}
            style={{
              borderBottomWidth: 0.9,
              borderBottomColor: "#ECECEC",
              paddingHorizontal: 10,
              paddingVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="log-out-outline" color="#0165FC" size={20} />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>Đăng xuất</Text>
            </View>
            <Ionicons name="chevron-forward" color="#0165FC" size={20} />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
