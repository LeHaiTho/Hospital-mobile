import { View, Text, ScrollView } from "react-native";
import { TextInput, Image, Avatar, Button } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SocialMediaButton from "../components/SocialMediaButton";
import axiosConfig from "../apis/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import axios from "axios";
const LoginScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { user } = useSelector((state) => state.auth);
  const { redirectTo, doctor, selectedDate, slot, selectedHospital } =
    route.params || {};
  const handleLogin = async () => {
    try {
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
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* logo */}
        <View
          style={{
            paddingVertical: 40,
            alignItems: "center",
          }}
        >
          <Avatar.Image
            style={{
              marginBottom: 25,
            }}
            size={100}
            source={{
              uri: "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg",
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Chào mừng bạn trở lại.
          </Text>
          <Text style={{ fontSize: 16, color: "gray" }}>
            Hãy đăng nhập để tiếp tục
          </Text>
        </View>

        {/* form */}
        <View style={{ gap: 20, paddingVertical: 20 }}>
          <TextInput
            placeholder="Tên đăng nhập/Số điện thoại"
            mode="outlined"
            outlineColor="#D1D5DB"
            clearTextOnFocus
            outlineStyle={{ borderRadius: 12, borderWidth: 0.5 }}
            placeholderTextColor="#A7ABD9"
            activeOutlineColor="#D1D5DB"
            left={<TextInput.Icon icon="account" color="#A7ABD9" />}
            style={{
              height: 50,
            }}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholderTextColor="#A7ABD9"
            placeholder="Mật khẩu"
            mode="outlined"
            textColor="black"
            outlineColor="#D1D5DB"
            activeOutlineColor="#D1D5DB"
            outlineStyle={{ borderRadius: 12, borderWidth: 0.5 }}
            left={<TextInput.Icon icon="lock" color="#A7ABD9" />}
            secureTextEntry
            right={<TextInput.Icon icon="eye" color="#A7ABD9" />}
            style={{ height: 50 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {/* login with otp */}
          <Text
            style={{
              textAlign: "right",
              color: "#0165FC",
              fontSize: 16,
              fontStyle: "italic",
            }}
          >
            Đăng nhập bằng tin nhắn OTP
          </Text>
          <Button
            mode="contained"
            buttonColor="#0165FC"
            style={{
              paddingVertical: 5,
              borderRadius: 50,
              height: 50,
            }}
            onPress={handleLogin}
          >
            Đăng nhập
          </Button>
        </View>

        {/* social media login */}
        <View
          style={{
            gap: 20,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text>Or login with</Text>
          <SocialMediaButton />
        </View>

        {/* forgot password and sign up */}
        <View style={{ justifyContent: "center", paddingVertical: 20 }}>
          <Button textColor="#0165FC">Quên mật khẩu?</Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Bạn không có tài khoản?</Text>
            <Button
              textColor="#0165FC"
              onPress={() => navigation.navigate("SignUp")}
            >
              Đăng ký
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
