import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const MedicalHistoryDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { appointment, selectedProfile } = route?.params;
  const [explain, setExplain] = useState(false);
  const [prescriptionDetail, setPrescriptionDetail] = useState(null);
  const handleExplain = () => {
    setExplain(!explain);
  };

  const getMedicalHistoryDetail = async () => {
    try {
      const res = await axiosConfig.get(
        `medical-histories/get-prescription-detail/${appointment?.id}`
      );
      setPrescriptionDetail(res?.data?.prescription?.prescriptionItems);
    } catch (error) {}
  };
  useEffect(() => {
    getMedicalHistoryDetail();
  }, [appointment]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ padding: 15 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            paddingHorizontal: 5,
            alignItems: "flex-start",
            paddingVertical: 5,
            flex: 1,
          }}
        >
          <Image
            source={{
              uri: "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/21/476/avatar-shin-cute-4.jpg",
            }}
            style={{ width: 65, height: 65, marginTop: 5 }}
          />
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "flex-start",
              flex: 2,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {selectedProfile?.fullname}
            </Text>
            <Text style={{ fontSize: 12 }}>Mã BN: {selectedProfile?.id}</Text>
            <Text style={{ fontSize: 12 }}>
              {`Giới tính: ${
                selectedProfile?.gender === "male" ? "Nam" : "Nữ"
              }`}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {`Điện thoại: ${selectedProfile?.phone || "chưa cập nhật"}`}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {`Ngày sinh: ${moment(selectedProfile?.date_of_birth).format(
                "DD/MM/YYYY"
              )}`}
            </Text>
            <Text style={{ fontSize: 12, flex: 1 }} numberOfLines={2}>
              {`Địa chỉ: ${selectedProfile?.province || "chưa cập nhật"}`}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png",
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
            {appointment?.hospital?.name}
          </Text>
          <Text style={{ fontSize: 12, color: "#666" }}>
            {`Ngày khám: ${moment(appointment?.date).format(
              "DD/MM/YYYY"
            )} - ${moment(
              appointment?.appointmentSlot?.start_time,
              "HH:mm:ss"
            ).format("HH:mm")} - ${moment(
              appointment?.appointmentSlot?.end_time,
              "HH:mm:ss"
            ).format("HH:mm")}`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#666",
              flex: 1,
            }}
            numberOfLines={2}
          >
            {`Địa chỉ: ${appointment?.hospital?.address}`}
          </Text>
        </View>
        <View style={{ gap: 15, padding: 5 }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 1 },
              // shadowOpacity: 0.2,
              // shadowRadius: 2,
              // elevation: 2,
              borderWidth: 1,
              borderColor: "#D3E6FF",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
              onPress={() =>
                navigation.navigate("ResultDetails", {
                  appointment,
                })
              }
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <FontAwesome name="files-o" size={20} color="#0165FF" />
                <Text style={{ color: "#0165FF", fontWeight: "bold" }}>
                  Kết quả khám
                </Text>
              </View>
              <FontAwesome name="angle-right" size={25} color="#0165FF" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 1 },
              // shadowOpacity: 0.2,
              // shadowRadius: 2,
              // elevation: 2,
              borderWidth: 1,
              borderColor: "#D3E6FF",
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "space-between",
              }}
              onPress={() =>
                navigation.navigate("ResultImage", {
                  appointment,
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <FontAwesome name="file-image-o" size={20} color="#0165FF" />
                <Text
                  style={{ color: "#0165FF", fontWeight: "bold" }}
                  numberOfLines={1}
                >
                  Kết quả CĐHA và thăm dò theo dõi
                </Text>
              </View>
              <FontAwesome name="angle-right" size={25} color="#0165FF" />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                backgroundColor: explain ? "#0165FF" : "#fff",
                borderRadius: 10,
                // shadowColor: "#000",
                // shadowOffset: { width: 0, height: 1 },
                // shadowOpacity: 0.2,
                // shadowRadius: 2,
                // elevation: 2,
                borderBottomLeftRadius: explain ? 0 : 10,
                borderBottomRightRadius: explain ? 0 : 10,
                borderWidth: explain ? 0 : 1,
                borderColor: "#D3E6FF",
              }}
              onPress={handleExplain}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <FontAwesome
                  name="list-alt"
                  size={20}
                  color={explain ? "#fff" : "#0165FF"}
                />
                <Text
                  style={{
                    color: explain ? "#fff" : "#0165FF",
                    fontWeight: "bold",
                  }}
                >
                  Đơn thuốc
                </Text>
              </View>
              <FontAwesome
                name={explain ? "angle-down" : "angle-right"}
                size={25}
                color={explain ? "#fff" : "#0165FF"}
              />
            </TouchableOpacity>
            {/* click mở view */}
            {explain && (
              <View
                style={{
                  gap: 5,

                  paddingBottom: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    gap: 5,
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                    backgroundColor: "#D3E6FF",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#0165FF",
                      flex: 3,
                    }}
                  >
                    Tên thuốc
                  </Text>

                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#0165FF",
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    SL
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#0165FF",
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    DL
                  </Text>
                </View>
                {prescriptionDetail?.map((item) => (
                  <View
                    key={item?.id}
                    style={{
                      gap: 5,
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <View style={{ flex: 3, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {item?.medicate_name}
                      </Text>
                      <Text style={{ fontSize: 12, color: "#666" }}>
                        {item?.instructions}
                      </Text>
                    </View>

                    <Text
                      style={{
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      {item?.dosage}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      {item?.quantity}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalHistoryDetailScreen;
