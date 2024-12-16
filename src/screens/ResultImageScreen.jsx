import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axiosConfig from "../apis/axiosConfig";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const ResultImageScreen = ({ route }) => {
  const { appointment } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [medicalHistoryDetail, setMedicalHistoryDetail] = useState(null);
  const getMedicalHistoryDetail = async () => {
    try {
      setIsLoading(true);
      const res = await axiosConfig.get(
        `medical-histories/get-medical-history-detail/${appointment?.id}`
      );
      setMedicalHistoryDetail(res?.data?.medicalHistory);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (appointment) {
      setIsLoading(true);
      getMedicalHistoryDetail();
    }
  }, [appointment]);
  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0165FC" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ padding: 10 }}
          contentContainerStyle={{ gap: 10 }}
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
      )}
    </>
  );
};

export default ResultImageScreen;
