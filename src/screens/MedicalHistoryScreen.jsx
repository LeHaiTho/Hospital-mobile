import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const MedicalHistoryScreen = () => {
  const [allProfilesOfUser, setAllProfilesOfUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [appointmentCompleted, setAppointmentCompleted] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // lấy thông tin user và tất cả thành viên trong gia đình
  const getAllProfileOfUser = async () => {
    try {
      setIsLoading(true);
      const res = await axiosConfig.get("users/get-profile");
      setAllProfilesOfUser(res?.data);
      setSelectedProfile(res?.data?.profile);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // lấy lịch hẹn đã hoàn thành theo id

  const getAppointmentCompletedById = async () => {
    try {
      setIsLoading(true);
      // kiểm tra có phải chính chủ

      const res = await axiosConfig.get(
        `/appointments/get-appointment-completed-by-id/${selectedProfile?.id}`
      );

      setAppointmentCompleted(res?.data?.appointment);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(appointmentCompleted);
  useEffect(() => {
    if (selectedProfile) {
      getAppointmentCompletedById();
    }
  }, [selectedProfile]);

  useEffect(() => {
    if (user) {
      getAllProfileOfUser();
    } else {
      navigation.replace("Login");
    }
  }, [navigation]);
  console.log(
    "appointmentCompleted",
    appointmentCompleted?.[0]?.doctor?.user?.fullname
  );
  console.log(allProfilesOfUser);
  console.log(appointmentCompleted);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Khi người dùng nhấn nút back của thiết bị, reset về Home
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator", params: { screen: "Home" } }],
        });
        return true; // Ngăn không cho hành vi mặc định của nút back
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#fff" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: 90,
              backgroundColor: "#fff",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedProfile(allProfilesOfUser?.profile);
                setAppointmentCompleted(null);
              }}
              style={{
                borderWidth: 3,
                borderColor:
                  selectedProfile?.id === allProfilesOfUser?.profile?.id
                    ? "#0165FF"
                    : "#ECECEC",
                padding: 1,
                backgroundColor: "#fff",
                borderRadius: 100,
              }}
            >
              <Image
                source={{
                  uri:
                    selectedProfile?.avatar ||
                    "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
                }}
                style={{ width: 65, height: 65, borderRadius: 100 }}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              style={{ fontSize: 12, textAlign: "center" }}
            >
              {allProfilesOfUser?.profile?.fullname || "Chính tôi"}
            </Text>
          </View>
          {allProfilesOfUser?.getMembersOfUser?.map((member) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedProfile(member);
              }}
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: 100,
                gap: 10,
                backgroundColor: "#fff",
              }}
              key={member?.id}
            >
              <View
                style={{
                  borderWidth: 3,
                  borderColor:
                    selectedProfile?.id === member?.id ? "#0165FF" : "#ECECEC",
                  padding: 1,
                  backgroundColor: "#fff",
                  borderRadius: 100,
                }}
              >
                <Image
                  source={{
                    uri:
                      member?.avatar ||
                      "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
                  }}
                  style={{ width: 65, height: 65, borderRadius: 100 }}
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    textAlign: "left",
                  }}
                >
                  {member?.fullname}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
              numberOfLines={2}
            >
              {selectedProfile?.fullname}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {selectedProfile?.date_of_birth
                ? `${moment(selectedProfile?.date_of_birth).format(
                    "DD/MM/YYYY"
                  )} - ${
                    new Date().getFullYear() -
                    moment(selectedProfile?.date_of_birth).year()
                  } tuổi`
                : "Không có thông tin"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              flex: 1,

              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome
                name="heartbeat"
                style={{
                  backgroundColor: "pink",
                  padding: 5,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size={20}
                color="#f20000"
              />
              <Text style={{ fontSize: 12 }}>Theo dõi SK</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome
                name="cloud-upload"
                style={{
                  backgroundColor: "#00C49F",
                  padding: 5,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size={20}
                color="#fff"
              />
              <Text style={{ fontSize: 12 }}>Thêm hồ sơ</Text>
            </View>
          </View>
        </View>
        {/*  scroll tháng */}
      </View>
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" color="#0165FC" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      ) : appointmentCompleted?.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <Text>Không tìm thấy lịch sử khám bệnh</Text>
        </View>
      ) : appointmentCompleted?.length > 0 ? (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <FlatList
            data={appointmentCompleted}
            contentContainerStyle={{
              gap: 15,
              marginTop: 10,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: "#fff",
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 15,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#ECECEC",
                }}
                key={item?.id}
              >
                <TouchableOpacity
                  key={item?.id}
                  style={{ gap: 10, flexDirection: "row" }}
                  onPress={() => {
                    navigation.navigate("MedicalHistoryDetail", {
                      appointment: item,
                      selectedProfile,
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        color: "rgba(1, 101, 255, 0.5)",
                      }}
                    >
                      {moment(item?.appointment_date).format("DD")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#0165FF",
                        fontWeight: "bold",
                      }}
                    >
                      {moment(item?.appointment_date).format("MM/YYYY")}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      justifyContent: "space-between",

                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 5,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        {item?.hospital?.name}
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        Mã: {item?.appointment_code}
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {item?.specialty?.name}
                      </Text>
                    </View>
                    <FontAwesome name="angle-right" size={20} color="#0165FF" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Không tìm thấy lịch sử khám bệnh</Text>
        </View>
      )}
    </View>
  );
};

export default MedicalHistoryScreen;
