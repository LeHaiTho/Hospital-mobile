import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DoctorInfo from "../components/DoctorInfo";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
import { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import { Barcode } from "expo-barcode-generator";
import { APP_NAME } from "../utils/constants";

const AppointmentDetail = ({ route }) => {
  const navigation = useNavigation();
  const { appointmentId, fromBookingFlow } = route.params || {
    fromBookingFlow: false,
  };
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAppointmentDetail = async () => {
    try {
      const response = await axiosConfig.get(
        `/appointments/get-appointment-by-id/${appointmentId}`
      );
      setAppointmentDetail(response?.data?.appointmentDetail);
      console.log(response?.data?.appointmentDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointmentDetail();
  }, []);

  useLayoutEffect(() => {
    if (fromBookingFlow) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "TabNavigator", params: { screen: "Home" } }],
              });
            }}
          >
            <Ionicons name="home-outline" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, fromBookingFlow]);

  return (
    <>
      {appointmentDetail ? (
        <>
          <ScrollView
            style={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingBottom: 100, marginBottom: 15 }}>
              <View
                style={{
                  gap: 10,
                  backgroundColor: "#fff",

                  paddingVertical: 10,
                  borderRadius: 10,
                  paddingTop: 20,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#88888888",
                    gap: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    PHIẾU KHÁM BỆNH
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {appointmentDetail?.hospital?.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        color: "#797979",
                      }}
                    >
                      {appointmentDetail?.hospital?.address}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      justifyContent: "space-between",
                      marginTop: 10,
                      alignItems: "center",
                      paddingHorizontal: 20,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        Mã phiếu khám:
                      </Text>
                      <Text style={{ fontSize: 14, color: "#797979" }}>
                        {appointmentDetail?.appointment_code}
                      </Text>
                      {/*  */}
                      {appointmentDetail && (
                        <Barcode
                          value={appointmentDetail?.appointment_code}
                          options={{
                            format: "CODE128",
                            width: 1,
                            height: 70,
                            displayValue: false,
                          }}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#0165FC",
                        justifyContent: "center",

                        marginRight: 20,
                      }}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        Giờ khám:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#0165FC",
                        }}
                      >
                        {`${moment(
                          appointmentDetail?.appointmentSlot?.start_time,
                          "HH:mm:ss"
                        ).format("HH:mm")} - ${moment(
                          appointmentDetail?.appointmentSlot?.end_time,
                          "HH:mm:ss"
                        ).format("HH:mm")}`}
                      </Text>
                    </View>
                  </View>
                  {(appointmentDetail?.status === "confirmed" &&
                    appointmentDetail?.payment_status === "pending") ||
                    (appointmentDetail?.status === "pending" &&
                      appointmentDetail?.payment_status === "pending" && (
                        <View
                          style={{
                            gap: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                            paddingHorizontal: 20,
                          }}
                        >
                          <Text
                            style={{
                              color: "#13DC5F",
                              fontWeight: "600",
                              backgroundColor: "#CDF8DD",
                              paddingHorizontal: 10,
                              paddingVertical: 8,
                              borderRadius: 10,
                            }}
                          >
                            Đặt khám thành công
                          </Text>
                          <Text
                            style={{
                              color: "#f20000",
                              textAlign: "center",
                            }}
                          >
                            Số tiền phải thanh toán:
                            {Number(
                              appointmentDetail?.appointmentFee
                            ).toLocaleString()}
                            VNĐ đã bao gồm phí khám + phí tiện ích
                          </Text>
                        </View>
                      ))}
                  {appointmentDetail?.status === "confirmed" &&
                    appointmentDetail?.payment_status === "paid" && (
                      <View
                        style={{
                          gap: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                          paddingHorizontal: 20,
                        }}
                      >
                        <Text
                          style={{
                            color: "#13DC5F",
                            fontWeight: "600",
                            backgroundColor: "#CDF8DD",
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderRadius: 10,
                          }}
                        >
                          Đặt khám thành công
                        </Text>
                        <Text
                          style={{
                            color: "#13DC5F",
                            textAlign: "center",
                            fontStyle: "italic",
                          }}
                        >
                          Đã thanh toán
                        </Text>
                      </View>
                    )}
                  {appointmentDetail?.status === "cancelled" && (
                    <View
                      style={{
                        gap: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: "#f20000",
                          fontWeight: "600",
                          backgroundColor: "#F8D2CD",
                          paddingHorizontal: 10,
                          paddingVertical: 8,
                          borderRadius: 10,
                        }}
                      >
                        Đã hủy phiếu khám
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    gap: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderColor: "#88888888",
                    borderStyle: "dashed",
                  }}
                >
                  {appointmentDetail?.status === "cancelled" && (
                    <Text
                      style={{
                        color: "#f20000",
                        textAlign: "center",
                        paddingHorizontal: 20,
                      }}
                    >
                      Phiếu khám này không được tiếp nhận tại cơ sở y tế
                    </Text>
                  )}
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      Chuyên khoa:
                    </Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {appointmentDetail?.specialty?.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Mã phiếu:</Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {appointmentDetail?.appointment_code}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Ngày khám:</Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {moment(appointmentDetail?.doctorSchedule?.date).format(
                        "DD/MM/YYYY"
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Thời gian khám: </Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {`${moment(
                        appointmentDetail?.appointmentSlot?.start_time,
                        "HH:mm"
                      ).format("HH:mm")} - ${moment(
                        appointmentDetail?.appointmentSlot?.end_time,
                        "HH:mm"
                      ).format("HH:mm")}`}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Phí khám:</Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {`${Number(
                        appointmentDetail?.appointmentFee
                      ).toLocaleString()} VNĐ`}
                    </Text>
                  </View>

                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Hình thức khám:</Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      Không BHYT
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Bệnh nhân:</Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {appointmentDetail?.member?.fullname ||
                        appointmentDetail?.patient?.fullname}
                    </Text>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ flex: 1 }}>Ngày sinh:</Text>
                    <Text style={{ fontWeight: "bold", flex: 1 }}>
                      {moment(
                        appointmentDetail?.member?.date_of_birth ||
                          appointmentDetail?.patient?.date_of_birth
                      ).format("DD/MM/YYYY")}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    gap: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderColor: "#88888888",
                    borderStyle: "dashed",
                  }}
                >
                  <Text style={{ textAlign: "justify" }}>
                    Quý bệnh nhân vui lòng đến quầy tiếp nhận tại sảnh để được
                    tiếp đón. Quý bệnh nhân cần hỗ trợ vui lòng liên hệ tổng đài
                    CSKH 1900 459
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <FontAwesome6
                      name="phone-volume"
                      size={24}
                      color="#0165FC"
                    />
                    <View>
                      <Text style={{ fontWeight: "bold", color: "#0165FC" }}>
                        Gọi 1900 459
                      </Text>
                      <Text>để được hỗ trợ tốt hơn</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#0165FC" }}>
                    Bản quyền thuộc {APP_NAME}
                  </Text>
                </View>
              </View>
              {(appointmentDetail?.status === "confirmed" ||
                appointmentDetail?.status === "pending") &&
                appointmentDetail?.payment_status === "pending" && (
                  <>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#F8D2CD",
                        padding: 15,
                        borderRadius: 10,
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 15,
                      }}
                      onPress={() => {
                        navigation.navigate("CancelBooking", {
                          appointmentId,
                        });
                      }}
                    >
                      <AntDesign name="close" size={20} color="#F20000" />
                      <Text style={{ color: "#F20000" }}>Hủy phiếu </Text>
                    </TouchableOpacity>
                    <View
                      style={{ marginTop: 15, flexDirection: "row", gap: 10 }}
                    >
                      <AntDesign name="infocirlce" size={18} color="#f20000" />
                      <Text style={{ color: "#f20000", flex: 1 }}>
                        Trong thời gian quy định nếu quý khách hủy phiếu khám sẽ
                        được hoàn tiền khám và các dịch vụ đặt thêm (không bao
                        gồm phí tiện ích)
                      </Text>
                    </View>
                  </>
                )}
            </View>
          </ScrollView>
          <View
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
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
                  backgroundColor: "#EFF6FF",
                  paddingVertical: 15,
                  borderRadius: 100,
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                }}
              >
                <AntDesign name="download" size={18} color="#0165FC" />
                <Text style={{ color: "#0165FC", fontWeight: "bold" }}>
                  Tải xuống
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0165FC" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      )}
    </>
  );
};

export default AppointmentDetail;
