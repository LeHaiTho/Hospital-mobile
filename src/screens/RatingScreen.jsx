import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity, Platform } from "react-native";
import StartRating from "../components/StartRating";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
const RatingScreen = ({ route }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { appointment } = route.params;
  console.log(appointment);
  const handleOke = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleSendRating = async () => {
    try {
      const response = await axiosConfig.post("/ratings/create", {
        appointment_id: appointment.id,
        rating,
        comment,
      });
      setVisible(true);
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#0165FC" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: "#0165FC" }}></View>
        <View
          style={{
            flex: 1,
            height: "80%",
            width: "100%",
            backgroundColor: "#fff",
            alignItems: "center",
            flexDirection: "column",
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            bottom: 0,
          }}
        >
          <View
            style={{
              alignItems: "center",
              top: -55,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center", // Đảm bảo căn giữa theo chiều dọc
                padding: 5,
                height: 150,
                width: 150,
                backgroundColor: "#fff",
                borderRadius: 100,
              }}
            >
              <Image
                style={{
                  width: "100%", // Đặt bằng 100% để chiếm hết không gian của View
                  height: "100%", // Đặt bằng 100% để chiếm hết không gian của View
                  borderRadius: 100, // Giữ tròn ảnh (nửa của chiều cao hoặc chiều rộng)
                }}
                source={{
                  uri: "https://www.fvhospital.com/wp-content/uploads/2022/07/tien-si-bac-si-nguyen-thanh-tung.jpg",
                }}
              />
            </View>

            <View
              style={{
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {appointment?.doctor?.fullname}
              </Text>

              <Text style={{ color: "#ABABAB" }}>
                {appointment?.specialty?.name}
              </Text>
            </View>
          </View>
          <StartRating
            initialRating={rating}
            onRatingChange={setRating}
            onCommentChange={setComment}
          />
        </View>
      </KeyboardAwareScrollView>
      {/* Nút ở dưới cùng */}
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.9,
            shadowRadius: 15,
            elevation: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 15,
              borderRadius: 100,
              width: "100%",
              alignItems: "center",
              backgroundColor: "#0165FC",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
            }}
            onPress={handleSendRating}
          >
            <FontAwesome name="send" size={18} color="#FFF" />
            <Text style={{ color: "#FFF" }}>Gửi đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          contentContainerStyle={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            marginHorizontal: 50,
            marginTop: -50,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <LottieView
              source={require("../../assets/animation/Animation - 1729791618285.json")}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#0165FC" }}
            >
              Đánh giá thành công!
            </Text>
            <Text
              style={{
                color: "#ABABAB",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Mọi ý kiến đóng góp của bạn sẽ giúp chúng tôi cải thiện chất lượng
              và dịch vụ!
            </Text>
            <TouchableOpacity
              style={{
                padding: 12,
                borderRadius: 100,
                backgroundColor: "#0165FC",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
              onPress={handleOke}
            >
              <Text style={{ color: "#fff" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default RatingScreen;