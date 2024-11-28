import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axiosConfig from "../apis/axiosConfig";
import DoctorCard from "../components/DoctorCard";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
console.log("baseUrl", baseUrl);
const SpecialtyFilterListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { specialtyId } = route.params;
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const getSpecialtyIdFilterList = async () => {
    try {
      const response = await axiosConfig.get(
        `/specialties/${specialtyId}/entities`,
        {
          params: {
            type: selectedType,
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (specialtyId) {
      getSpecialtyIdFilterList();
    }
  }, [specialtyId, selectedType]);
  console.log(specialtyId);

  // rating
  const renderStars = (averageRating) => {
    const stars = [];
    const fullStars = Math.floor(averageRating); // Số ngôi sao đầy
    const halfStar = averageRating % 1 !== 0; // Xác định có ngôi sao nửa không
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số ngôi sao rỗng

    // Thêm ngôi sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={18} color="#FCAF23" />
      );
    }

    // Thêm ngôi sao nửa (nếu có)
    if (halfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={18} color="#FCAF23" />
      );
    }

    // Thêm ngôi sao rỗng
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={18}
          color="#FCAF23"
        />
      );
    }

    return stars;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          alignItems: "center",
          gap: 10,
          flexDirection: "row",
          paddingHorizontal: 16,
          width: "100%",
          paddingTop: 16,
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          placeholder="Tìm kiếm cơ sở y tế"
          style={{
            flex: 1,
            padding: 9,
            borderWidth: 1,
            borderColor: "#0165FF",
            borderRadius: 10,
            paddingHorizontal: 15,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#0165FF",
            padding: 5,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Ionicons name="options-outline" size={24} color="#fff" />
          <Text style={{ color: "#fff" }}>Lọc</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 10,
          backgroundColor: "#fff",
          marginTop: 5,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 7,
            backgroundColor: selectedType === "all" ? "#0165FF" : "#fff",
            borderWidth: selectedType === "all" ? 0 : 0.7,
            borderColor: selectedType === "all" ? "transparent" : "#0165FF",
          }}
          onPress={() => setSelectedType("all")}
        >
          <Text style={{ color: selectedType === "all" ? "#fff" : "#0165FF" }}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 7,
            backgroundColor: selectedType === "hospital" ? "#0165FF" : "#fff",
            borderWidth: selectedType === "hospital" ? 0 : 0.7,
            borderColor:
              selectedType === "hospital" ? "transparent" : "#0165FF",
          }}
          onPress={() => setSelectedType("hospital")}
        >
          <Text
            style={{
              color: selectedType === "hospital" ? "#fff" : "#0165FF",
            }}
          >
            Bệnh viện
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 7,
            backgroundColor: selectedType === "doctor" ? "#0165FF" : "#fff",
            borderWidth: selectedType === "doctor" ? 0 : 0.7,
            borderColor: selectedType === "doctor" ? "transparent" : "#0165FF",
          }}
          onPress={() => setSelectedType("doctor")}
        >
          <Text
            style={{
              color: selectedType === "doctor" ? "#fff" : "#0165FF",
            }}
          >
            Bác sĩ
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ gap: 16, padding: 16 }}
        showsVerticalScrollIndicator={false}
        data={[...(data?.hospitals || []), ...(data?.doctors || [])]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 14,
              paddingVertical: 14,
              backgroundColor: "#fff",
              borderRadius: 14,
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 2 },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              // elevation: 3,
              borderWidth: 1,
              borderColor: "#E5E5E5",
              width: "100%",
              gap: 5,
            }}
            onPress={() => {
              if (item?.user_id) {
                navigation.navigate("DoctorDetail", {
                  id: item?.id,
                  specialtyId,
                });
              } else {
                navigation.navigate("SpecialtyDetailOfHospital", {
                  hospitalId: item,
                  specialtyId: specialtyId,
                });
              }
            }}
          >
            <View
              style={{
                justifyContent: "center",

                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 120,
                  borderRadius: 10,
                }}
                source={{
                  uri:
                    item?.user?.avatar || item?.avatar
                      ? `${baseUrl}${item?.user?.avatar || item?.avatar}`
                      : "https://thumbs.dreamstime.com/b/default-placeholder-doctor-half-length-portrait-photo-avatar-gray-color-119556416.jpg",
                }}
                resizeMode={item?.user?.avatar ? "cover" : "contain"}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: "column",

                  justifyContent: "space-between",
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: item?.user?.fullname ? "#000" : "#0165FF",
                    }}
                    numberOfLines={1}
                  >
                    {item?.user?.fullname || item?.hospitalSpecialty?.[0]?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "400",
                        color: item?.doctorSpecialty ? "#0165FF" : "#6B7280",
                        backgroundColor: item?.doctorSpecialty
                          ? "#DBEAFE"
                          : "transparent",
                        paddingHorizontal: item?.doctorSpecialty ? 5 : 0,
                        paddingVertical: 2,
                        borderRadius: 5,
                        marginTop: item?.doctorSpecialty ? 5 : 0,
                      }}
                      numberOfLines={1}
                    >
                      {item?.doctorSpecialty
                        ?.map(
                          (specialty) =>
                            specialty?.hospitalSpecialty?.specialty?.name
                        )
                        .filter((name) => name) // Lọc ra những tên hợp lệ (không null/undefined)
                        .join(" - ") || // Nối các tên bằng dấu gạch ngang
                        item?.name}
                    </Text>
                  </View>
                </View>
                <View>
                  {/* Giá khám */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",

                      paddingVertical: 2,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "#1F2937", fontSize: 12 }}>
                      Giá khám:
                    </Text>
                    <Text style={{ color: "#0165FC" }}>
                      {`${Number(
                        item?.doctorSpecialty?.[0]?.consultation_fee ||
                          item?.hospitalSpecialty?.[0]?.consultation_fee
                      ).toLocaleString("vi-VN")} VNĐ`}
                    </Text>
                  </View>
                  {/* Đánh giá */}
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        {(item?.averageRating &&
                          item?.averageRating > 0 &&
                          renderStars(item?.averageRating)) ||
                          renderStars(5)}
                      </View>
                      <Text style={{ fontSize: 12, color: "#000" }}>
                        {item?.averageRating && item?.averageRating > 0
                          ? item?.averageRating
                          : ""}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: "#6B7280" }}>
                      {item?.totalComments && item?.totalComments > 0
                        ? `${item?.totalComments} Phản hồi`
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* <TouchableOpacity
              style={{
                marginTop: 10,
                borderRadius: 8,
                backgroundColor: "#DBEAFE",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 680,
                  color: "#0165FC",
                  textAlign: "center",
                }}
              >
                Đặt lịch khám
              </Text>
            </TouchableOpacity> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SpecialtyFilterListScreen;
