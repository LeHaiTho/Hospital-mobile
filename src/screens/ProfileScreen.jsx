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

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);
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
              uri: "data:image/jpeg;base64,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",
            }}
            style={{ backgroundColor: "transparent", position: "relative" }}
          />

          <Title style={{ fontSize: 20, fontWeight: "bold" }}>
            {user.name ?? user.username}
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
              console.log("user", user);
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
