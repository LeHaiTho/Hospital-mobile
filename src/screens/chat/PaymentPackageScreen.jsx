import { Entypo, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import axiosConfig from "../../apis/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const PaymentPackageScreen = ({ route }) => {
  const { packageId, price } = route.params || {};
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  console.log(packageId, price);
  console.log(user);
  const handleSubmit = async () => {
    try {
      const paymentRes = await axiosConfig.post(
        "/payments/createPackagePayment",
        {
          package: {
            id: packageId,
            price: Number(price),
            user_id: user.id,
          },
        }
      );
      console.log("sasjdslakjlk", paymentRes.data);
      navigation.navigate("WebviewPayment", {
        paymentUrl: paymentRes.data.payUrl,
      });
    } catch (error) {}
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 10, gap: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 16,
            }}
          >
            <View style={{ gap: 5 }}>
              <Text>Dịch vụ</Text>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Chat riêng với bác sĩ 24H
              </Text>
            </View>
            <Text>{`${Number(price).toLocaleString("vi-VN")} VNĐ`}</Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Text>Mã ưu đãi</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <MaterialCommunityIcons
                  name="ticket-percent"
                  size={26}
                  color="#FCAF23"
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#FCAF23",
                    padding: 2,
                    paddingHorizontal: 10,
                    borderRadius: 2,
                  }}
                >
                  <Text style={{ color: "#FCAF23", fontWeight: "bold" }}>
                    Nhập mã ưu đãi
                  </Text>
                </View>
              </View>
              <EvilIcons name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                alignItems: "center",
                padding: 16,
              }}
            >
              <Text>Phương thức thanh toán</Text>
              <EvilIcons name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#E2E8F0",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 16,
                backgroundColor: "#fff",
                gap: 10,
              }}
            >
              <View
                style={{
                  gap: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Tổng tiền</Text>
                <Text>{`${Number(price).toLocaleString("vi-VN")} VNĐ`}</Text>
              </View>
              <View
                style={{
                  gap: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Tổng thanh toán</Text>
                <Text style={{ fontWeight: "bold", color: "red" }}>
                  {`${Number(price).toLocaleString("vi-VN")} VNĐ`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 10,
          position: "absolute",
          bottom: 0,
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
            backgroundColor: "#0165FC",
            padding: 15,
            borderRadius: 100,
            width: "100%",
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            THANH TOÁN
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentPackageScreen;
