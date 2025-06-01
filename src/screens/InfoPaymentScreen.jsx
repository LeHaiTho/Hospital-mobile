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
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar, Card, IconButton, FAB } from "react-native-paper";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axiosConfig from "../apis/axiosConfig";
import moment from "moment";
import { Modal, Portal } from "react-native-paper";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { APP_NAME } from "../utils/constants";

const InfoPaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { appointment } = route.params || {};
  const [expanded, setExpanded] = useState(false);
  const sheetRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [visible, setVisible] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [focusPaymentMethod, setFocusPaymentMethod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);
  const handleSheetChange = useCallback((index) => {}, []);
  const snapPoint = useMemo(() => ["50%", "65%"]);

  // Hàm để thay đổi trạng thái
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const {
    profile,
    doctor,
    selectedDate,
    slot,
    selectedHospital,
    selectedSpecialty,
    reasonForVisit,
    isDoctorSpecial,
    specialtyDetail,
    consultationFee,
  } = route.params || {};
  const requestBody = {
    profile,
    // doctor: doctor?.doctor_id,
    doctor: doctor || doctorName,
    selectedDate,
    reasonForVisit,
    slot,
    selectedHospital,
    selectedSpecialty,
    paymentMethod,
    isDoctorSpecial,
    consultationFee:
      consultationFee ||
      selectedHospital?.hospitalSpecialty?.[0]?.consultation_fee ||
      doctor?.consultation_fee?.[0],
  };
  console.log("requestBody", requestBody);
  const handleSubmit = async () => {
    if (paymentMethod) {
      try {
        setIsLoading(true);

        if (paymentMethod === "e-wallet") {
          const res = await axiosConfig.post(
            "/appointments/create-appointment",
            {
              ...requestBody,
              isZaloPay: true,
            }
          );

          const appointmentId = res.data.newAppointment.id;

          const paymentRes = await axiosConfig.post(
            "/payments/create-payment",
            {
              appointment: {
                ...res.data.newAppointment,
                amount: Number(res.data.newAppointment.price),
              },
            }
          );

          console.log("requestBody", requestBody);
          // Chuyển đến trang thanh toán ZaloPay
          navigation.navigate("WebviewPayment", {
            paymentUrl: paymentRes.data.data.order_url,
            appointmentId,
            fromBookingFlow: true,
          });
        } else if (paymentMethod === "cash") {
          // Nếu thanh toán bằng tiền mặt, tạo lịch hẹn bình thường
          const res = await axiosConfig.post(
            "/appointments/create-appointment",
            requestBody
          );

          const appointmentId = res.data.newAppointment.id;

          // Chuyển đến trang chi tiết lịch hẹn
          navigation.reset({
            index: 1,
            routes: [
              {
                name: "TabNavigator",
                params: { screen: "Home" },
              },
              {
                name: "AppointmentDetail",
                params: { appointmentId, fromBookingFlow: true },
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          text1: "Lỗi",
          text2: "Đã xảy ra lỗi khi tạo lịch hẹn",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Toast.show({
        text1: "Vui lòng chọn phương thức thanh toán",
        type: "error",
        text1Style: {
          fontSize: 14,
          color: "#F20000",
        },
      });
      setFocusPaymentMethod(true);
    }
  };

  const handleOke = () => {
    setVisible(false);
    navigation.reset({
      index: 1,
      routes: [
        {
          name: "TabNavigator",
          params: { screen: "Home" },
        },
        {
          name: "AppointmentDetail",
          params: { appointmentId, fromBookingFlow: true },
        },
      ],
    });
  };
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    handleClosePress();
  };
  return (
    <>
      <GestureHandlerRootView>
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
                padding: 7,
                borderRadius: 100,
                backgroundColor: "#fff",
              }}
            >
              <Fontisto name="doctor" size={24} color="#0165FC" />
            </View>
          </View>
          <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                padding: 7,
                borderRadius: 100,
                backgroundColor: "#fff",
              }}
            >
              <FontAwesome5 name="user-alt" size={24} color="#0165FC" />
            </View>
          </View>
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
                <AntDesign name="checkcircle" size={24} color="#0165FC" />
              </View>
            </View>
            <View style={{ width: 50, height: 2, backgroundColor: "#fff" }} />
          </View>
          {/* Điểm cuối */}
          <View>
            <Entypo name="wallet" size={24} color="lightgray" />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 10,
            gap: 10,
            paddingBottom: 150,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#0165FC",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {doctor?.hospitals?.find(
                (hospital) => hospital.id === selectedHospital
              )?.name || selectedHospital?.name}
            </Text>
            <Text style={{ color: "#797979", fontSize: 12 }}>
              {doctor?.hospitals?.find(
                (hospital) => hospital.id === selectedHospital
              )?.address || selectedHospital?.address}
            </Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Thông tin bệnh nhân</Text>
            <Card
              key={profile.id}
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <Card.Content>
                <View style={{ gap: 10 }}>
                  <TouchableOpacity
                    onPress={toggleExpanded}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <FontAwesome5 name="user-alt" size={20} color="#0165FF" />
                      <Text>{profile.fullname.toUpperCase()}</Text>
                    </View>
                    <FontAwesome5
                      name={expanded ? "chevron-up" : "chevron-down"} // Mũi tên lên/xuống tùy vào trạng thái
                      size={20}
                      color="#0165FF"
                    />
                  </TouchableOpacity>

                  {/* Hiển thị các thông tin chi tiết dựa vào trạng thái mở rộng */}
                  {expanded && (
                    <>
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
                            {moment(profile.date_of_birth).format("DD/MM/YYYY")}
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
                          <Text style={{ color: "#000", width: "90%" }}>
                            {profile.address}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text
                          style={{ fontWeight: "bold", fontStyle: "italic" }}
                        >
                          Lý do khám:
                        </Text>
                        <Text style={{ color: "#000" }}>{reasonForVisit}</Text>
                      </View>
                    </>
                  )}
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Thông tin bác sĩ</Text>
            <Card
              // key={profile.id}
              style={{
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
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
                      <FontAwesome5 name="user-alt" size={20} color="#0165FF" />
                      <Text>{doctor?.fullname || doctor?.user?.fullname}</Text>
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
                        name="phone-alt"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>
                        <Text style={{ color: "#000" }}>
                          {doctor?.specialties?.find(
                            (specialty) => specialty.id === selectedSpecialty
                          )?.name ||
                            specialtyDetail ||
                            selectedHospital?.hospitalSpecialty[0]?.specialty
                              ?.name}
                        </Text>
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
                        name="birthday-cake"
                        size={20}
                        color="#0165FF"
                      />
                      <Text style={{ color: "#000" }}>
                        {`${
                          selectedDate &&
                          moment(selectedDate, "DD/MM/YYYY", true).isValid()
                            ? selectedDate
                            : moment(selectedDate || new Date()).format(
                                "DD/MM/YYYY"
                              )
                        } - (${moment(slot?.start_time, "HH:mm:ss").format(
                          "HH:mm"
                        )} - ${moment(slot?.end_time, "HH:mm:ss").format(
                          "HH:mm"
                        )})`}
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
                      <Entypo name="wallet" size={28} color="#0165FF" />
                      <Text style={{ color: "#000", fontWeight: "bold" }}>
                        {`${Number(
                          consultationFee ||
                            selectedHospital?.hospitalSpecialty?.[0]
                              ?.consultation_fee ||
                            doctor?.consultation_fee?.[0]
                        ).toLocaleString("vi-VN")} VNĐ`}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>

          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Phương thức thanh toán</Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingVertical: 12,
                borderRadius: 10,
                borderColor:
                  !paymentMethod && focusPaymentMethod ? "#f20000" : "#0165FC",
                color: "#000",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 20,
              }}
              onPress={handleSnapPress}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Entypo name="wallet" size={24} color="#0165FC" />
                <Text style={{ color: "#000" }}>
                  {paymentMethod === "cash"
                    ? "Thanh toán tại cơ sở y tế"
                    : paymentMethod === "e-wallet"
                    ? "Thanh toán ví điện tử ZaloPay"
                    : "Chọn phương thức"}
                </Text>
              </View>
              <Entypo name="chevron-small-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              gap: 5,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Tiền khám</Text>
              <Text>
                {`${Number(
                  consultationFee ||
                    selectedHospital?.hospitalSpecialty?.[0]
                      ?.consultation_fee ||
                    doctor?.consultation_fee?.[0]
                ).toLocaleString("vi-VN")} VNĐ`}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Phí tiện ích + TGTT</Text>
              <Text>0 VNĐ</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold" }}>Tổng tiền</Text>
              <Text style={{ fontWeight: "bold", color: "#0165FC" }}>
                {`${Number(
                  consultationFee ||
                    selectedHospital?.hospitalSpecialty?.[0]
                      ?.consultation_fee ||
                    doctor?.consultation_fee?.[0]
                ).toLocaleString("vi-VN")} VNĐ`}
              </Text>
            </View>
          </View>

          <View
            style={{
              gap: 10,

              padding: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <AntDesign name="checkcircle" size={20} color="#08DB57" />
            <Text style={{ fontSize: 12, color: "#797979", width: "90%" }}>
              Tôi đồng ý phí tiện ích để sử dụng dịch vụ đặt khám, thanh toán
              viện phí, tra cứu kết quả khám và các tính năng tiện lợi khác trên
              nền tảng hệ thống {APP_NAME}, đây không phải là dịch vụ bắt buộc
              bởi cơ sở y tế.
            </Text>
          </View>
        </ScrollView>
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
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
              flex: 1,
            }}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator
                color="#fff"
                size="small"
                style={{ flex: 1 }}
              />
            ) : (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {isLoading ? "Đang xử lý..." : "Thanh toán"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoint}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          backgroundStyle={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          style={{
            paddingHorizontal: 20,
            gap: 10,
          }}
          onClose={handleClosePress}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
                flex: 1,
              }}
            >
              Phương thức thanh toán
            </Text>
            <TouchableOpacity onPress={handleClosePress}>
              <Fontisto name="close-a" size={20} color={"#000"} />
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView
            ref={sheetRef}
            onChange={handleSheetChange}
            enablePanDownToClose={true}
            index={-1}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 50,
            }}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => {
                handlePaymentMethod("cash");
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={require("../../assets/hospital (2).png")}
              />
              <Text>Thanh toán tại cơ sở y tế</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => {
                handlePaymentMethod("e-wallet");
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png",
                }}
              />
              <Text>Thanh toán ví điện tử ZaloPay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => {
                handlePaymentMethod("e-wallet");
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s",
                }}
              />
              <Text>Thanh toán ví điện tử VNPAY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => {
                handlePaymentMethod("e-wallet");
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri: "https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg",
                }}
              />
              <Text>Thanh toán ví điện tử Momo</Text>
            </TouchableOpacity>
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
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
              Đặt lịch hẹn thành công!
            </Text>
            <Text
              style={{
                color: "#ABABAB",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Chúc bạn có thời gian trải nghiệm dịch vụ vui vẻ.
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

export default InfoPaymentScreen;
