import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import WebView from "react-native-webview";
import axiosConfig from "../apis/axiosConfig";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(BASE_URL);
const ResultDetails = ({ route }) => {
  const [medicalHistoryDetail, setMedicalHistoryDetail] = useState(null);
  const { appointment } = route?.params;

  const getMedicalHistoryDetail = async () => {
    const res = await axiosConfig.get(
      `medical-histories/get-medical-history-detail/${appointment?.id}`
    );
    setMedicalHistoryDetail(res?.data?.medicalHistory);
  };

  useEffect(() => {
    getMedicalHistoryDetail();
  }, [appointment]);
  console.log(appointment?.specialty.name);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 20 }}>
      <ScrollView contentContainerStyle={{ gap: 5, padding: 15 }}>
        {medicalHistoryDetail && (
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}
            >
              Chỉ số sức khỏe cá nhân
            </Text>
            <View
              style={{
                gap: 5,
                paddingBottom: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#0165FF",
              }}
            >
              <View
                style={{
                  gap: 5,
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  backgroundColor: "#D3E6FF",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#0165FF",
                    flex: 3,
                  }}
                >
                  Tên chỉ số
                </Text>

                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#0165FF",
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  Giá trị
                </Text>
              </View>

              <View
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
                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Cân nặng
                  </Text>
                </View>

                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {`${medicalHistoryDetail?.healthCheckInfos[0]?.weight} kg`}
                </Text>
              </View>
              <View
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
                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Chiều cao
                  </Text>
                </View>

                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {`${medicalHistoryDetail?.healthCheckInfos[0]?.height} cm`}
                </Text>
              </View>
              <View
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
                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Nhịp tim
                  </Text>
                </View>

                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {`${medicalHistoryDetail?.healthCheckInfos[0]?.heart_rate} bpm`}
                </Text>
              </View>
              <View
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
                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Huyết áp
                  </Text>
                </View>

                <Text
                  style={{
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {`${medicalHistoryDetail?.healthCheckInfos[0]?.blood_pressure} mmHg`}
                </Text>
              </View>
            </View>
          </View>
        )}
        {medicalHistoryDetail?.examResults?.map((item) => (
          <View
            style={{
              gap: 5,
              marginTop: 10,
              marginBottom: -70,
            }}
            key={item?.id}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
            >
              Kết quả khám
            </Text>
            <View style={{ gap: 5, flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Chuyên khoa:</Text>
              <Text>{appointment?.specialty?.name}</Text>
            </View>
            <View style={{ gap: 5, flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Chuẩn đoán: </Text>
              <Text style={{ flex: 1 }}>{item?.findings}</Text>
            </View>
            <View style={{ gap: 5, flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Kết quả: </Text>
              <Text style={{ flex: 1 }}>{item?.recommendation}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold" }}>Lời khuyên:</Text>
              <Text style={{ lineHeight: 20, textAlign: "justify" }}>
                {item?.description}
              </Text>
            </View>
          </View>
        ))}
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={{
              uri: `https://evomed.vn/_wiki_content/hdsd/KhamBenhVaQuanLyThongTinYKhoa/images/image20.png`,
            }}
            style={{ width: "100%", height: 500 }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultDetails;
