import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, FlatList } from "react-native";
import axiosConfig from "../apis/axiosConfig";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const ResultImageScreen = ({ route }) => {
  const { appointment } = route?.params;
  const [medicalHistoryDetail, setMedicalHistoryDetail] = useState(null);
  const getMedicalHistoryDetail = async () => {
    try {
      const res = await axiosConfig.get(
        `medical-histories/get-medical-history-detail/${appointment?.id}`
      );
      setMedicalHistoryDetail(res?.data?.medicalHistory);
    } catch (error) {}
  };
  useEffect(() => {
    getMedicalHistoryDetail();
  }, [appointment]);
  return (
    <FlatList
      style={{ gap: 10 }}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      data={medicalHistoryDetail?.imagingDiagnostics}
      renderItem={({ item }) => (
        <View>
          <Image
            source={{
              uri: `${BASE_URL}${item?.file_url}`,
            }}
            style={{ width: 400, height: 400 }}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};

export default ResultImageScreen;
