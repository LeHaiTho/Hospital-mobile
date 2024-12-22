import { FontAwesome, Entypo, EvilIcons } from "@expo/vector-icons";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../../apis/axiosConfig";
const PackagesScreen = () => {
  const navigation = useNavigation();
  const [selectedPackage, setSelectedPackage] = useState(24);
  const [packageTypes, setPackageTypes] = useState([]);

  const fetchPackageTypes = async () => {
    try {
      const response = await axiosConfig.get("/subscriptions/getPackage");
      setPackageTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPackageTypes();
  }, []);
  console.log(packageTypes);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            backgroundColor: "#fff",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <EvilIcons
            name="close"
            size={24}
            color="#0165FC"
            style={{ alignSelf: "flex-end" }}
            onPress={() => navigation.goBack()}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0165FC" }}>
            HỎI RIÊNG BÁC SĨ
          </Text>
          <Text style={{ color: "#797979", textAlign: "center" }}>
            Mỗi lượt chat sẽ được sử dụng trong vòng 24h kể từ khi bác sĩ bắt
            đầu trả lời
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 16,
              marginVertical: 20,
            }}
          >
            {packageTypes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "40%",
                  backgroundColor:
                    selectedPackage === item.id ? "#D3E6FF" : "#fff",
                  borderRadius: 10,
                  borderWidth: selectedPackage === item.id ? 2 : 1,
                  borderColor:
                    selectedPackage === item.id ? "#0165FC" : "#E5E5E5",
                  paddingHorizontal: 10,
                  paddingVertical: 30,
                  gap: 10,
                }}
                onPress={() => {
                  setSelectedPackage(item.id);
                  console.log(selectedPackage);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: selectedPackage === item.id ? "#0165FC" : "#797979",
                  }}
                >
                  {item?.duration === 24 ? "1 lượt" : "2 lượt"}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  {`${Number(item?.price).toLocaleString("vi-VN")} VNĐ`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ gap: 10, paddingVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Đặc quyền tại LHT MED
            </Text>
            <Text style={{ color: "#0165FC", fontWeight: "bold" }}>
              Chat riêng với bác sĩ 24H
            </Text>

            <Text style={{}}>
              <FontAwesome
                name="check-square-o"
                size={24}
                color="#0165FC"
                style={{
                  alignSelf: "center",
                }}
              />
              Cho phép bạn kết nối với bác sĩ chuyên khoa bằng hình thức chat
              trực tuyến 1-1
            </Text>

            <Text style={{}}>
              <FontAwesome name="check-square-o" size={24} color="#0165FC" />
              <Text style={{ textAlign: "justify" }}>
                LHT MED cam kết bảo mật tuyệt đối thông tin người dùng bao gồm:
                Họ và tên, hình ảnh đại diện, chỉ hiển thị tuổi, giới tính người
                hỏi. Chỉ bác sĩ mới có thể đọc được nội dung trong phiên chat.
              </Text>
            </Text>
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
            height: 10, // Increase the shadow height for more elevation
          },
          shadowOpacity: 0.9, // Increase opacity to make it darker
          shadowRadius: 15, // Increase radius for a larger blur effect
          elevation: 10, // Higher elevation for Android
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
          onPress={() =>
            navigation.navigate("PaymentPackage", {
              packageId: selectedPackage,
              price: packageTypes.find((item) => item.id === selectedPackage)
                ?.price,
            })
          }
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            MUA GÓI
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PackagesScreen;
