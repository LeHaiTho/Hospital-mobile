import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import moment from "moment";

const ResultDetails = ({ route }) => {
  const { appointment, detailedExamResult } = route?.params;

  console.log("detailedExamResult in ResultDetails:", detailedExamResult);

  if (!detailedExamResult) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0165FC" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 15,
        padding: 15,
        backgroundColor: "#fff",
      }}
    >
      {/* II. Lý do khám */}
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
          II. LÝ DO KHÁM
        </Text>
        <View
          style={{
            padding: 12,
            backgroundColor: "#fafafa",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Text style={{ lineHeight: 20 }}>
            {detailedExamResult?.patientInfo?.reasonForExam ||
              "Chưa có thông tin"}
          </Text>
        </View>
      </View>

      {/* III. Tiểu sử bệnh */}
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
          III. TIỂU SỬ BỆNH
        </Text>
        <View
          style={{
            padding: 12,
            backgroundColor: "#fafafa",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Text style={{ lineHeight: 20 }}>
            {detailedExamResult?.medical_history || "Chưa có thông tin"}
          </Text>
        </View>
      </View>

      {/* IV. Quá trình bệnh lý */}
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
          IV. QUÁ TRÌNH BỆNH LÝ
        </Text>
        <View
          style={{
            padding: 12,
            backgroundColor: "#fafafa",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Text style={{ lineHeight: 20 }}>
            {detailedExamResult?.disease_progression || "Chưa có thông tin"}
          </Text>
        </View>
      </View>

      {/* V. Khám lâm sàng */}
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
          V. KHÁM LÂM SÀNG
        </Text>

        {/* V.1. Toàn thân */}
        <View
          style={{
            padding: 12,
            backgroundColor: "#fafafa",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>
            1. Toàn thân:
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <View style={{ minWidth: "45%" }}>
              <Text style={{ fontWeight: "bold" }}>Mạch: </Text>
              <Text>{detailedExamResult?.clinicalExam?.pulse}</Text>
            </View>
            <View style={{ minWidth: "45%" }}>
              <Text style={{ fontWeight: "bold" }}>Nhiệt độ: </Text>
              <Text>{detailedExamResult?.clinicalExam?.temperature}</Text>
            </View>
            <View style={{ minWidth: "45%" }}>
              <Text style={{ fontWeight: "bold" }}>Huyết áp: </Text>
              <Text>
                {detailedExamResult?.clinicalExam?.bloodPressure || "N/A"}
              </Text>
            </View>
            <View style={{ minWidth: "45%" }}>
              <Text style={{ fontWeight: "bold" }}>Da: </Text>
              <Text>{detailedExamResult?.clinicalExam?.skin || "N/A"}</Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={{ fontWeight: "bold" }}>Niêm mạc: </Text>
              <Text>
                {detailedExamResult?.clinicalExam?.mucousMembrane || "N/A"}
              </Text>
            </View>
          </View>

          {/* V.2. Cơ quan */}
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#333",
                marginBottom: 5,
              }}
            >
              2. Cơ quan:
            </Text>
            <Text style={{ lineHeight: 20 }}>
              {detailedExamResult?.clinicalExam?.organExamination ||
                "Chưa có thông tin"}
            </Text>
          </View>
        </View>
      </View>

      {/* VII. Chuẩn đoán */}
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
          VII. CHUẨN ĐOÁN
        </Text>
        <View
          style={{
            padding: 12,
            backgroundColor: "#fafafa",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Text style={{ lineHeight: 20, fontWeight: "500" }}>
            {detailedExamResult?.diagnosis || "Chưa có chẩn đoán"}
          </Text>
        </View>
      </View>

      {/* VIII. Hướng điều trị */}
      <View style={{ gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0165FF" }}>
          VIII. HƯỚNG ĐIỀU TRỊ
        </Text>
        <View
          style={{
            padding: 12,
            backgroundColor: "#fafafa",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#e0e0e0",
          }}
        >
          <Text style={{ lineHeight: 20 }}>
            {detailedExamResult?.treatment_direction ||
              "Chưa có hướng điều trị"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResultDetails;
