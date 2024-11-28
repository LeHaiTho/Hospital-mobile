import { View, Text, ScrollView } from "react-native";
import { TextInput, Image, Avatar, Button } from "react-native-paper";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SocialMediaButton from "../components/SocialMediaButton";
import { useNavigation } from "@react-navigation/native";
const SignUp = () => {
  const navigation = useNavigation();
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
            Chào mừng bạn đến với HealthCare.
          </Text>
          <Text style={{ fontSize: 16, color: "gray" }}>
            Hãy đăng ký để tiếp tục
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
          />

          <Button
            mode="contained"
            buttonColor="#0165FC"
            style={{
              paddingVertical: 5,
              borderRadius: 50,
              height: 50,
            }}
          >
            Đăng ký
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

        {/* login and sign up */}
        <View style={{ justifyContent: "center", paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Bạn đã </Text>
            <Button
              textColor="#0165FC"
              onPress={() => navigation.navigate("Login")}
            >
              Đăng nhập
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
