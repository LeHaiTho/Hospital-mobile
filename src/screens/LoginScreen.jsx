import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../apis/axiosConfig";
import { login } from "../redux/authSlice";
const LoginScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { redirectTo, doctor, selectedDate, slot, selectedHospital } =
    route.params || {};
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await axiosConfig.post("/auth/login", {
        username,
        password,
      });

      const { user, token } = res.data;
      dispatch(login({ user, token }));

      if (redirectTo) {
        // Nếu có redirectTo, chuyển hướng đến màn hình chỉ định kèm các tham số
        navigation.replace(redirectTo, {
          doctor,
          selectedDate,
          slot,
          selectedHospital,
        });
      } else if (user?.role?.name === "doctor") {
        navigation.replace("DoctorNavigator");
      } else {
        // Nếu không có redirectTo, chuyển đến màn hình chính hoặc mặc định
        navigation.replace("CustomerNavigator");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingTop: "50%",
          gap: 20,
        }}
      >
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#0165FC",
            }}
          >
            LHT MED
          </Text>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Chào mừng bạn trở lại.
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              Hãy đăng nhập để tiếp tục
            </Text>
          </View>
          <View style={{ gap: 10, width: "100%" }}>
            <View style={{ width: "100%", gap: 5 }}>
              <Text style={{ fontWeight: "600" }}>Tên đăng nhập</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 0.6,
                  borderColor: "#808080",
                  borderRadius: 100,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  width: "100%",
                }}
              >
                <FontAwesome6 name="user-pen" size={18} color="#808080" />
                <TextInput
                  placeholder="Nhập tên đăng nhập"
                  placeholderTextColor="#808080"
                  style={{ flex: 1 }}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
                {username && (
                  <TouchableOpacity onPress={() => setUsername("")}>
                    <Ionicons name="close-outline" size={20} color="#808080" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={{ gap: 10, width: "100%" }}>
            <View style={{ width: "100%", gap: 5 }}>
              <Text style={{ fontWeight: "600" }}>Mật khẩu</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderWidth: 0.6,
                  borderColor: "#808080",
                  borderRadius: 100,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  width: "100%",
                }}
              >
                <FontAwesome6 name="lock" size={18} color="#808080" />
                <TextInput
                  placeholder="**************"
                  placeholderTextColor="#808080"
                  style={{ flex: 1 }}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!isShowPassword}
                />

                <TouchableOpacity
                  onPress={() => setIsShowPassword(!isShowPassword)}
                  style={{ paddingRight: 10 }}
                >
                  <Feather
                    name={isShowPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#808080"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              backgroundColor: "#0165FC",
              borderRadius: 100,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "#fff" }}>Đăng nhập</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              paddingHorizontal: 40,
            }}
          >
            <View
              style={{ flex: 1, height: 0.5, backgroundColor: "#808080" }}
            />
            <Text style={{ color: "#808080" }}>hoặc Đăng nhập với </Text>
            <View
              style={{ flex: 1, height: 0.5, backgroundColor: "#808080" }}
            />
          </View>
          <View style={{ gap: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderWidth: 0.4,
                borderColor: "#808080",
                borderRadius: 100,
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/ggle.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderWidth: 0.4,
                borderColor: "#808080",
                borderRadius: 100,
                padding: 10,
              }}
            >
              <Image
                source={require("../../assets/facebook.jpg")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text>Bạn không có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ color: "#0165FC" }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color="#0165FC" />
        </View>
      ) : null}
    </View>
  );
};

export default LoginScreen;
