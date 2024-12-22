import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Search from "../../components/Search";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { TouchableOpacity, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Dimensions } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const DoctorHomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);

  const banners = [
    require("../../../assets/banners/banner-1.png"),
    require("../../../assets/banners/banner-2.jpg"),
    require("../../../assets/banners/banner-3.png"),
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ backgroundColor: "#fff", gap: 10 }}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: "10%",
            backgroundColor: "#0165FC",
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={40}
              style={{ backgroundColor: "#fff" }}
              source={{ uri: `${BASE_URL}${user?.avatar}` }}
            />
            <View>
              <Text style={{ fontWeight: "500", color: "#fff" }}>Xin chào</Text>
              <Text style={{ fontWeight: "500", color: "#fff" }}>
                {`Bác sĩ ${user?.fullname.toUpperCase()}`}
              </Text>
            </View>
          </View>

          <Search />
        </View>

        <View>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={2}
            data={banners}
            showPagination={true}
            paginationActiveColor="#0165FC"
            paginationDefaultColor="#D9D9D9"
            paginationStyleItem={{
              width: 7,
              height: 7,
              borderRadius: 100,
              marginHorizontal: 5,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: Dimensions.get("window").width,
                  height: 160,
                  paddingHorizontal: 16,
                }}
              >
                <Image
                  source={item}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              marginBottom: 10,
              marginTop: 16,
              borderRadius: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              paddingVertical: 14,
              paddingHorizontal: 14,
              backgroundColor: "#fff",
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 1 },
              // shadowOpacity: 0.2,
              // shadowRadius: 2,
              // elevation: 3,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#E5E5E5",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: "25%",
                gap: 5,
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("DoctorSchedule")}
            >
              <Image
                source={require("../../../assets/menu/hospital-book.png")}
                style={{ width: "80%", height: 50 }}
                resizeMode="center"
              />
              <Text
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Lịch làm việc
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "25%",
                gap: 5,
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("ChatList")}
            >
              <Image
                source={require("../../../assets/menu/communication.png")}
                style={{ width: "80%", height: 50 }}
                resizeMode="center"
              />
              <Text
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Hỗ trợ 24/7
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "25%",
                gap: 5,
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("CommunityList")}
            >
              <Image
                source={require("../../../assets/menu/medical-report.png")}
                style={{ width: "80%", height: 50 }}
                resizeMode="center"
              />
              <Text
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Cộng đồng hỏi đáp
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "25%",
                gap: 5,
                flex: 1,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("TimeOffList")}
            >
              <Image
                source={require("../../../assets/menu/hospital-book.png")}
                style={{ width: "80%", height: 50 }}
                resizeMode="center"
              />
              <Text
                style={{
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Đơn xin nghỉ phép
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorHomeScreen;
