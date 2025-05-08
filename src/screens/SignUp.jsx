import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
// import { TextInput, Image, Avatar, Button } from "react-native-paper";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosConfig from "../apis/axiosConfig";
import { login } from "../redux/authSlice";
import { APP_NAME } from "../utils/constants";

const SignUp = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  GoogleSignin.configure({
    webClientId:
      "909616392538-ofbrf2mbi0cr9ops1sls8gnv9cdif35h.apps.googleusercontent.com",
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  const onGoogleButtonPres = async () => {
    // Đăng nhập lại
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();
    const signInResult = await GoogleSignin.signIn();
    // console.log("signInResult", signInResult.data.user);
    let idToken = signInResult.idToken || signInResult?.data?.idToken;
    // if (!idToken) throw new Error("No ID token found");
    if (!idToken) return null;
    await GoogleSignin.configure({});
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Đăng nhập với Firebase
    const user_sign_in = await auth().signInWithCredential(googleCredential);

    try {
      setLoading(true);
      const response = await axiosConfig.post(`/auth/google-sign-in`, {
        ...signInResult?.data?.user,
      });
      const { user, token } = response?.data;
      dispatch(login({ user, token }));
      navigation.replace("CustomerNavigator");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handle sign up
  const handleSignUp = async () => {
    try {
      if (!form.fullName || !form.username || !form.password) {
        Alert.alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      setLoading(true);
      const response = await axiosConfig.post(`/auth/register-new-patient`, {
        fullName: form.fullName,
        username: form.username,
        password: form.password,
      });
      console.log("response", response);
      const { user, token } = response?.data;

      dispatch(login({ user, token }));
      navigation.replace("CustomerNavigator");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // return (
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingTop: "20%",
          gap: 20,
        }}
      >
        <View style={{ gap: 5 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
          >
            Chào mừng bạn đến với
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#0165FC",
            }}
          >
            {APP_NAME}
          </Text>
          <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>
            Hãy đăng ký tài khoản để trải nghiệm những dịch vụ chăm sóc sức khỏe
            tốt nhất.
          </Text>
        </View>

        <View style={{ gap: 10, width: "100%" }}>
          <View style={{ width: "100%", gap: 5 }}>
            <Text style={{ fontWeight: "600" }}>Họ và tên</Text>
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
                placeholder="Nhập họ và tên"
                placeholderTextColor="#808080"
                style={{ flex: 1 }}
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
              />
              {form.fullName && (
                <TouchableOpacity
                  onPress={() => setForm({ ...form, fullName: "" })}
                >
                  <Ionicons name="close-outline" size={20} color="#808080" />
                </TouchableOpacity>
              )}
            </View>
          </View>
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
              <FontAwesome6 name="user-large" size={18} color="#808080" />
              <TextInput
                placeholder="Email hoặc số điện thoại"
                placeholderTextColor="#808080"
                style={{ flex: 1 }}
                value={form.username}
                onChangeText={(text) => setForm({ ...form, username: text })}
              />
              {form.username && (
                <TouchableOpacity
                  onPress={() => setForm({ ...form, username: "" })}
                >
                  <Ionicons name="close-outline" size={20} color="#808080" />
                </TouchableOpacity>
              )}
            </View>
          </View>
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
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#808080"
                style={{ flex: 1 }}
                secureTextEntry={!isShowPassword}
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
              <TouchableOpacity
                onPress={() => setIsShowPassword(!isShowPassword)}
              >
                <Ionicons
                  name={isShowPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#808080"
                />
              </TouchableOpacity>
              {form.password && (
                <TouchableOpacity
                  onPress={() => setForm({ ...form, password: "" })}
                >
                  <Ionicons name="close-outline" size={20} color="#808080" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text
            style={{
              color: "#0165FC",
              textAlign: "right",
              width: "100%",
              textDecorationLine: "underline",
            }}
          >
            Quên mật khẩu?
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#0165FC",
            padding: 10,
            borderRadius: 100,
            width: "100%",
          }}
          onPress={handleSignUp}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Đăng ký
          </Text>
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
          <View style={{ flex: 1, height: 0.5, backgroundColor: "#808080" }} />
          <Text style={{ color: "#808080" }}>hoặc Đăng ký bằng </Text>
          <View style={{ flex: 1, height: 0.5, backgroundColor: "#808080" }} />
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
            onPress={() => onGoogleButtonPres()}
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
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#0165FC" }}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
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
      )}
    </View>
  );
};

export default SignUp;
