import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import axiosConfig from "../apis/axiosConfig";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
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

const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const ChangeAppointmentDetail = ({ route, navigation }) => {
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const sheetRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [appointmentNeedChangeDetail, setAppointmentNeedChangeDetail] =
    useState(null);
  const { appointmentNeedChange } = route.params;

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);
  const handleSheetChange = useCallback((index) => {}, []);
  const snapPoint = useMemo(() => ["50%", "100%"]);

  const getAppointmentNeedChangeDetail = async () => {
    try {
      const response = await axiosConfig.get(
        `/appointments/get-appointment-by-id/${appointmentNeedChange.id}`
      );
      setAppointmentNeedChangeDetail(response?.data?.appointmentDetail);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    "suggestedDoctors",
    suggestedDoctors[0]?.doctor?.doctor?.user?.avatar
  );
  const handleCancel = async () => {
    try {
      const res = await axiosConfig.patch(
        `appointments/cancel-appointment/${appointmentNeedChange.id}`
      );

      navigation.replace("TabNavigator", { screen: "TabNavigator" });
    } catch (error) {
      console.log(error);
    }
  };
  // get suggested doctors
  const getSuggestedDoctors = async () => {
    try {
      const response = await axiosConfig.post(
        `/appointments/suggest-appointment`,
        {
          appointmentNeedChange: appointmentNeedChangeDetail.id,
        }
      );
      setSuggestedDoctors(response?.data?.suggestedAppointments);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("suggestedDoctors", suggestedDoctors);
  useEffect(() => {
    if (appointmentNeedChangeDetail) {
      getSuggestedDoctors();
    }
  }, [appointmentNeedChangeDetail]);
  useEffect(() => {
    getAppointmentNeedChangeDetail();
  }, []);
  return (
    <GestureHandlerRootView>
      {appointmentNeedChangeDetail && (
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              gap: 10,
            }}
          >
            <View style={{ gap: 2, flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={{ fontSize: 12 }}>Mã phiếu:</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                    {appointmentNeedChange.appointment_code}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Text
                    style={{ color: "#0165FF", fontSize: 12 }}
                    onPress={() => {
                      navigation.navigate("AppointmentDetail", {
                        appointmentId: appointmentNeedChange.id,
                      });
                    }}
                  >
                    Xem chi tiết
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={16}
                    color="#0165FF"
                  />
                </View>
              </View>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                {appointmentNeedChangeDetail?.member?.fullname ||
                  appointmentNeedChangeDetail?.patient?.fullname}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#000",
                borderStyle: "dashed",
              }}
            ></View>
            <Text
              style={{
                color: "#0165FF",
                textTransform: "uppercase",
                fontSize: 16,
              }}
            >
              {appointmentNeedChangeDetail?.hospital?.name}
            </Text>
            <View style={{ gap: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Chuyên khoa:</Text>
                <Text>{appointmentNeedChangeDetail?.specialty?.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Ngày khám:</Text>
                <Text>
                  {moment(
                    appointmentNeedChangeDetail?.doctorSchedule?.date
                  ).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Giờ khám:</Text>
                <Text>
                  {`${moment(
                    appointmentNeedChangeDetail?.appointmentSlot?.start_time,
                    "HH:mm:ss"
                  ).format("HH:mm")} - ${moment(
                    appointmentNeedChangeDetail?.appointmentSlot?.end_time,
                    "HH:mm:ss"
                  ).format("HH:mm")}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Trạng thái:</Text>
                <Text style={{ color: "#FCAF23" }}>
                  {appointmentNeedChangeDetail?.status === "waiting"
                    ? "Chờ thay đổi"
                    : appointmentNeedChangeDetail?.status}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#000",
                borderStyle: "dashed",
              }}
            ></View>
          </View>
          <View
            style={{
              gap: 10,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 12, textAlign: "justify" }}>
                * Lịch hẹn của bạn cần thay đổi vì một số lý do khác. Xin lỗi vì
                sự bất tiện này. Nhầm hỗ trợ trải nghiệm tốt hơn cho bạn, hệ
                thống đưa các lựa chọn:
              </Text>
            </View>
            {suggestedDoctors.length > 0 && (
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#FCAF23",
                  borderRadius: 5,
                }}
                onPress={() => {
                  handleSnapPress();
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Hệ thống đề xuất
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
           style={{ padding: 10, backgroundColor: "#0165FF", borderRadius: 5 }}
         >
           <Text style={{ color: "#fff", textAlign: "center" }}>
             Đổi lại thông tin khám
           </Text>
         </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 5,
              }}
              onPress={handleCancel}
            >
              <Text
                style={{
                  color: "#FF4D4D",
                  textAlign: "center",
                  textDecorationLine: "underline",
                }}
              >
                Hủy phiếu khám
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
            Đề xuất lịch hẹn phù hợp
          </Text>
          <TouchableOpacity onPress={handleClosePress}>
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 12, textAlign: "center", color: "#ff2000" }}>
            * Hệ thống đề xuất các bác sĩ có kinh nghiệm chuyên khoa tương tự,
            đáp ứng yêu cầu của bạn.
          </Text>
        </View>
        <BottomSheetScrollView
          ref={sheetRef}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingHorizontal: 2,
          }}
          showsVerticalScrollIndicator={false}
        >
          {suggestedDoctors?.map((doctor, index) => (
            <View
              style={{
                marginVertical: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 16,
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
              key={index}
            >
              <TouchableOpacity style={{ gap: 15 }} key={doctor.id}>
                <View style={{ flexDirection: "row", gap: 15 }}>
                  <Image
                    source={{
                      uri:
                        `${baseUrl}${doctor?.doctor?.doctor?.user?.avatar}` ||
                        "https://png.pngtree.com/png-vector/20240208/ourmid/pngtree-doctor-and-health-care-png-image_11719602.png",
                    }}
                    style={{
                      width: 70,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#FFF7E0",
                          borderRadius: 5,
                          padding: 3,
                        }}
                      >
                        <MaterialIcons
                          name="check-circle"
                          size={18}
                          color="#FCAF23"
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#FCAF23",
                            marginLeft: 5,
                          }}
                        >
                          Bác sĩ giỏi
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontWeight: "bold" }}>
                      {doctor?.doctor?.doctor?.user?.fullname}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#888888" }}>
                      {appointmentNeedChangeDetail?.specialty?.name}
                    </Text>
                    <View style={{ gap: 5, flexDirection: "row" }}>
                      <Text style={{ fontSize: 12 }}>
                        {moment(
                          appointmentNeedChangeDetail?.doctorSchedule?.date
                        ).format("DD/MM/YYYY")}
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {`${moment(doctor?.slot?.start_time, "HH:mm:ss").format(
                          "HH:mm"
                        )} - ${moment(
                          doctor?.slot?.end_time,
                          "HH:mm:ss"
                        ).format("HH:mm")}`}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1,
                    gap: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("ConfirmChangeAppointmentDetail", {
                      appointment: appointmentNeedChangeDetail,
                      doctor: doctor,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "#0165FF",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    Chọn thay đổi với bác sĩ này
                  </Text>
                  <AntDesign name="doubleright" size={16} color="#0165FF" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default ChangeAppointmentDetail;
