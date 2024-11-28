import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  EvilIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Card, IconButton, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axiosConfig from "../apis/axiosConfig";
import moment from "moment";

const handleAddProfile = () => {
  console.log("add profile");
};

export default function CustomerProfileScreen({ route }) {
  const navigation = useNavigation();
  const { fromBooking } = route.params || {};
  const {
    doctor,
    selectedDate,
    slot,
    selectedHospital,
    selectedSpecialty,
    hospital,
    isDoctorSpecial,
    specialtyDetail,
  } = route.params || {};

  const [visible, setVisible] = useState(false);
  const sheetRef = useRef(null);
  const [checked, setChecked] = useState("1");
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [profiles, setProfiles] = useState([]);
  console.log("selectedHospital", selectedHospital?.specialty);
  console.log("selectedSpecialty", selectedSpecialty);
  console.log("specialtyDetail", specialtyDetail);
  useEffect(() => {
    const getProfiles = async () => {
      try {
        const res = await axiosConfig.get(`/users/get-profile`);
        const { profile, getMembersOfUser } = res.data;
        setProfiles([profile, ...getMembersOfUser]);
      } catch (error) {
        console.log(error);
      }
    };
    getProfiles();
  }, []);
  console.log("profiles", profiles);
  const snapPoints = useMemo(() => ["35%"], []);
  const handleSheetChange = useCallback((index) => {
    if (index === -1) {
      setIsSheetVisible(false); // Đặt trạng thái khi BottomSheet đóng
    } else {
      setIsSheetVisible(true); // Đặt trạng thái khi BottomSheet mở
    }
  }, []);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  console.log("fromBooking", fromBooking);
  // console.log(
  //   doctor,
  //   selectedDate,
  //   slot,
  //   selectedHospital,
  //   selectedSpecialty,
  //   hospital,
  //   isDoctorSpecial
  // );
  return (
    <>
      <GestureHandlerRootView>
        {/* Thanh Tiến Trình */}
        {fromBooking && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#0165FC",
              paddingHorizontal: 20,
              paddingBottom: 8,
              justifyContent: "space-between",
            }}
          >
            {/* Điểm đầu tiên */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  padding: 5,
                  borderRadius: 100,
                  backgroundColor: "#fff",
                }}
              >
                <Fontisto name="doctor" size={28} color="#0165FC" />
              </View>
            </View>

            {/* Điểm hiện tại */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
              <View
                style={{
                  padding: 4,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 100,
                  }}
                >
                  <FontAwesome5 name="user-alt" size={28} color="#0165FC" />
                </View>
              </View>
              <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
            </View>

            {/* Điểm chưa hoàn thành */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="checkcircle" size={28} color="lightgray" />
            </View>
            <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />

            {/* Điểm cuối */}
            <View>
              <Entypo name="wallet" size={28} color="lightgray" />
            </View>
          </View>
        )}
        {!fromBooking && (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              backgroundColor: "#DBEAFE",
              paddingHorizontal: 20,
              paddingVertical: 6,
              borderRadius: 4,
            }}
          >
            <AntDesign name="infocirlce" size={20} color="#0165FF" />
            <Text style={{ flex: 1, color: "#797979" }}>
              Vui lòng chọn 1 trong các hồ sơ bên dưới, hoặc chọn biểu tượng ở
              trên thêm hồ sơ người bệnh.
            </Text>
          </View>
        )}

        <View style={{ padding: 16, backgroundColor: "#fff", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 4,
              alignItems: "center",
            }}
          >
            {profiles.length > 0 && (
              <>
                <Text style={{ fontWeight: "500" }}>Hồ sơ đặt khám</Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                    backgroundColor: "#0165FF",
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 9,
                  }}
                  onPress={handleSnapPress}
                >
                  <FontAwesome5 name="user-plus" size={18} color="#fff" />
                  <Text style={{ color: "#fff" }}>Thêm</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingVertical: 5,
              gap: 20,
              paddingHorizontal: 5,
              paddingBottom: 100,
            }}
          >
            {profiles?.map((profile) => (
              <Card
                key={profile.id}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#fff",
                }}
                onPress={() =>
                  navigation.navigate("ConfirmInfo", {
                    profile,
                    doctor,
                    selectedDate,
                    slot,
                    selectedHospital,
                    selectedSpecialty,
                    isDoctorSpecial,
                    specialtyDetail,
                  })
                }
              >
                <Card.Content>
                  <View style={{ gap: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <FontAwesome5
                          name="user-alt"
                          size={20}
                          color="#0165FF"
                        />
                        <Text
                          style={{
                            fontWeight: "500",
                            color: "#0165FF",
                            textTransform: "uppercase",
                          }}
                        >
                          {profile.fullname}
                        </Text>
                      </View>
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color="#0165FF"
                        onPress={() => console.log("profile", profile.id)}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <FontAwesome5
                          name="phone-alt"
                          size={20}
                          color="#0165FF"
                        />
                        <Text style={{ color: "#000" }}>{profile.phone}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <FontAwesome5
                          name="birthday-cake"
                          size={20}
                          color="#0165FF"
                        />
                        <Text style={{ color: "#000" }}>
                          {moment(profile?.date_of_birth).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        <FontAwesome5
                          name="map-marker-alt"
                          size={20}
                          color="#0165FF"
                        />
                        <Text style={{ color: "#000" }}>
                          {profile.province}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>
        {isSheetVisible && <View style={styles.overlay} />}

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={true}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          backgroundStyle={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
          }}
        >
          <BottomSheetView
            style={{
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "600",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                Tạo hồ sơ bệnh nhân
              </Text>
              <TouchableOpacity onPress={handleClosePress}>
                <EvilIcons name="close" size={26} color={"#000"} />
              </TouchableOpacity>
            </View>

            <Text style={{ color: "#797979", textAlign: "center" }}>
              Bạn được phép tạo tối đa 10 hồ sơ (cá nhân và người thân trong gia
              đình)
            </Text>
            <View
              style={{
                flexDirection: "column",
                gap: 15,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#D3E6FF",
                  paddingVertical: 16,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("CreateProfile", {
                    doctor,
                    selectedDate,
                    slot,
                    selectedHospital,
                    selectedSpecialty,
                    isDoctorSpecial,
                    specialtyDetail,
                  })
                }
              >
                <Text style={{ color: "#0165FC", textAlign: "center" }}>
                  ĐĂNG KÝ HỒ SƠ MỚI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0165FC",
                  paddingVertical: 16,
                  borderRadius: 10,
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ScannerProfile")}
              >
                <AntDesign name="qrcode" size={20} color="#fff" />
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  QUÉT MÃ BHYT/CCCD
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FA",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  icon: {
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0165FC",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  completed: {
    backgroundColor: "white",
  },
  current: {
    borderColor: "white",
  },
  line: {
    width: 50,
    height: 2,
    backgroundColor: "#fff",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
