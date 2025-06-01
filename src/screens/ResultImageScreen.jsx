import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ResultImageScreen = ({ route }) => {
  const { appointment, detailedExamResult } = route?.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("detailedExamResult in ResultImageScreen:", detailedExamResult);

  const testResults = detailedExamResult?.testResults || [];

  // Filter only image files
  const imageResults = testResults.filter(
    (result) =>
      result.file_type === "image" ||
      result.file_url?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)
  );

  const handleImagePress = (item) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const renderImageItem = ({ item }) => {
    const imageUrl = item.file_url?.startsWith("http")
      ? item.file_url
      : `${BASE_URL}${item.file_url}`;

    return (
      <TouchableOpacity
        style={{
          marginBottom: 15,
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        onPress={() => handleImagePress(item)}
      >
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: screenWidth - 40,
              height: 250,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 15,
              padding: 5,
            }}
          >
            <FontAwesome name="expand" size={16} color="#fff" />
          </View>
        </View>

        <View style={{ paddingHorizontal: 5 }}>
          {item.description && (
            <View
              style={{
                backgroundColor: "#f8f9fa",
                padding: 10,
                borderRadius: 6,
                borderLeftWidth: 3,
                borderLeftColor: "#0165FF",
              }}
            >
              <Text style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
                Mô tả:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  lineHeight: 18,
                  color: "#333",
                }}
              >
                {item.description}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (!detailedExamResult) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0165FC" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (imageResults.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <FontAwesome name="file-image-o" size={60} color="#ccc" />
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          Không có kết quả CĐHA và thăm dò theo dõi
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#999",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Chưa có ảnh kết quả xét nghiệm nào được tải lên
        </Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          padding: 15,
          backgroundColor: "#f5f5f5",
          flex: 1,
          paddingVertical: 10,
        }}
        data={imageResults}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        ListHeaderComponent={
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#0165FF",
                textAlign: "center",
              }}
            >
              Kết quả CĐHA và thăm dò theo dõi
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {imageResults.length} ảnh kết quả
            </Text>
          </View>
        }
      />

      {/* Full Screen Image Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 20,
              padding: 10,
            }}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome name="times" size={24} color="#fff" />
          </TouchableOpacity>

          {selectedImage && (
            <>
              <Image
                source={{
                  uri: selectedImage.file_url?.startsWith("http")
                    ? selectedImage.file_url
                    : `${BASE_URL}${selectedImage.file_url}`,
                }}
                style={{
                  width: screenWidth - 20,
                  height: screenHeight - 200,
                }}
                resizeMode="contain"
              />

              {selectedImage.description && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 50,
                    left: 20,
                    right: 20,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {selectedImage.file_name || "Kết quả xét nghiệm"}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 13,
                      lineHeight: 18,
                    }}
                  >
                    {selectedImage.description}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

export default ResultImageScreen;
