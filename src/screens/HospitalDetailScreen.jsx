import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import moment from "moment";
import "moment/locale/vi";
import { Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DoctorCard from "../components/DoctorCard";
import Stats from "../components/Stats";
import Review from "../components/Review";
import RenderHtml from "react-native-render-html";
import axiosConfig from "../apis/axiosConfig";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const initialLayout = { width: Dimensions.get("window").width };
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const HospitalDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const navigation = useNavigation();
  console.log("id", id);
  // get specialties
  const getSpecialties = async () => {
    try {
      const res = await axiosConfig.get(`/specialties/list-by-hospital`, {
        params: { hospitalId: id },
      });
      setSpecialties(res?.data?.specialties);
    } catch (error) {
      console.log(error);
    }
  };

  const getHospitalDetail = async () => {
    try {
      const res = await axiosConfig.get(`/hospitals/detail/${id}`);
      setHospital(res.data.hospital);
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctorsList = async () => {
    try {
      const res = await axiosConfig.get(`/doctors/all`, {
        params: {
          hospital_id: id,
        },
      });
      setDoctors(res.data.doctorList);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(hospital);

  useEffect(() => {
    if (id) {
      getHospitalDetail();
      getDoctorsList();
    }
  }, [id]);
  useEffect(() => {
    if (id && index === 1) {
      getSpecialties();
    }
  }, [index]);
  // useEffect(() => {
  //   if (index === 3) {
  //     getReviews();
  //   }
  // }, [index]);

  const fakeReviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 4,
      createdAt: "2024-11-11",
      comment:
        "Bệnh viện này rất tốt, bác sĩ rất tận tâm và chuyên nghiệp . Tôi rất hài lòng với dịch vụ của bệnh viện 🥰😍😘🤩🙂🤗.",
    },
    {
      id: 2,
      user: "Nguyễn Văn A",
      rating: 4,
      createdAt: "2024-01-01",
      comment:
        "Bệnh viện này rất tốt, bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ của bệnh viện.",
    },
    {
      id: 3,
      user: "Nguyễn Văn A",
      rating: 4,
      createdAt: "2024-01-01",
      comment:
        "Bệnh viện này rất tốt, bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ của bệnh viện.",
    },
    {
      id: 4,
      user: "Nguyễn Văn A",
      rating: 4,
      createdAt: "2024-01-01",
      comment:
        "Bệnh viện này rất tốt, bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ của bệnh viện.",
    },
    {
      id: 5,
      user: "Nguyễn Văn A",
      rating: 4,
      createdAt: "2024-01-01",
      comment:
        "Bệnh viện này rất tốt, bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ của bệnh viện.",
    },
    {
      id: 6,
      user: "Nguyễn Văn A",
      rating: 4,
      createdAt: "2024-01-01",
      comment:
        "Bệnh viện này rất tốt, bác sĩ rất tận tâm và chuyên nghiệp. Tôi rất hài lòng với dịch vụ của bệnh viện.",
    },
  ];
  const Introduction = () => (
    <View style={{ paddingHorizontal: 15, paddingVertical: 12 }}>
      <Text style={{ fontWeight: "bold", color: "#0165FF" }}>
        Giới thiệu bệnh viện
      </Text>
      <RenderHtml
        source={{ html: hospital?.description || "" }}
        contentWidth={width}
      />
    </View>
  );

  const Specialties = () => (
    <View
      style={{
        gap: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        paddingBottom: 20,
      }}
    >
      <Text style={{ fontWeight: "500", color: "#0165FF" }}>
        Chuyên khoa của bệnh viện
      </Text>

      {specialties?.map((item) => (
        <TouchableOpacity
          key={item?.id}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "#fff",
            borderRadius: 14,
            // shadowColor: "#000",
            // shadowOffset: { width: 0, height: 2 },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
            // elevation: 1,
            borderWidth: 1,
            borderColor: "#DBEAFE",
            width: "100%",
            gap: 10,
            flexDirection: "row",
          }}
          onPress={() =>
            navigation.navigate("SpecialtyDetailOfHospital", {
              hospitalId: hospital,
              specialtyId: item?.specialty?.id,
            })
          }
        >
          <Image
            source={{
              uri: `${BASE_URL}${item?.image}`,
            }}
            style={{ width: 100, height: "auto", borderRadius: 8 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={{ fontWeight: "500" }} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={{ color: "gray", fontSize: 12 }} numberOfLines={2}>
              {`${item?.description}`}
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text style={{ fontStyle: "italic" }}>Giá khám:</Text>
              <Text style={{ color: "#0165FF" }}>
                {`${Number(item?.consultation_fee).toLocaleString(
                  "vi-VN"
                )} VNĐ`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  const Doctors = () => (
    <View style={{ paddingHorizontal: 15, paddingVertical: 12, gap: 15 }}>
      <Text style={{ fontWeight: "bold", color: "#0165FF" }}>
        Bác sĩ của bệnh viện
      </Text>
      <View style={{ gap: 10 }}>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor?.id} doctor={doctor} hospitalId={id} />
        ))}
      </View>
    </View>
  );

  const Reviews = () => (
    <View style={{ paddingHorizontal: 15, paddingVertical: 12 }}>
      <Text style={{ fontWeight: "bold", color: "#0165FF" }}>
        Phản hồi của bệnh nhân
      </Text>
      <View style={{}}>
        {fakeReviews?.map((rating) => (
          <View
            key={rating.id}
            style={{
              borderWidth: 1,
              borderColor: "#E5E5E5",
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Avatar.Image
                  size={40}
                  source={{
                    uri:
                      rating?.avatar ||
                      "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
                  }}
                />
                <Text style={{ fontWeight: 700, color: "#1F2937" }}>
                  {rating?.user}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text
                    style={{
                      color: "#6B7280",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {rating?.rating}
                  </Text>
                </View>
                <Text style={{ color: "#6B7280", fontSize: 12 }}>
                  {moment(rating?.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{ color: "#6B7280", paddingVertical: 10 }}
                numberOfLines={3}
              >
                {rating?.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity>
        <Text
          style={{
            color: "#0165FC",
            textDecorationLine: "underline",
            textAlign: "center",
          }}
        >
          Xem thêm đánh giá
        </Text>
      </TouchableOpacity>
    </View>
  );

  const routes = [
    {
      title: "Giới thiệu",
      component: <Introduction />,
    },
    {
      title: "Dịch vụ",
      component: <Specialties specialties={specialties} />,
    },
    {
      title: "Bác sĩ",
      component: <Doctors />,
    },
    {
      title: "Đánh giá",
      component: <Reviews />,
    },
  ];
  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {/* Phần đầu trang */}
        <View style={{}}>
          <Image
            source={{
              uri: `${BASE_URL}${hospital?.banner}`,
            }}
            style={{ width: "100%", height: 200 }}
          />
          <View style={{ padding: 20, gap: 5 }}>
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{ fontWeight: "500", color: "#0165FF", fontSize: 16 }}
              >
                {hospital?.name}
              </Text>
            </View>

            <Text style={{ color: "gray", fontSize: 12, flex: 1 }}>
              {`Địa chỉ: ${hospital?.address}`}
            </Text>
            {/* RATING */}

            <Stats data={1} />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#fff",
              justifyContent: "space-between",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              paddingTop: 10,
              paddingHorizontal: 16,

              elevation: 1,
            }}
          >
            {routes.map((route, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  borderBottomWidth: 2,
                  borderColor: index === i ? "#0165FF" : "transparent",

                  paddingBottom: 7,
                }}
                onPress={() => setIndex(i)}
              >
                <Text
                  style={{
                    fontWeight: index === i ? "700" : "400",
                    color: "#000",
                  }}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flex: 1 }}>{routes[index].component}</View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HospitalDetailScreen;
