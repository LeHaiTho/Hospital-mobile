import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import axiosConfig from "../../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";
import Toast, { ErrorToast } from "react-native-toast-message";
const CreateQuestion = () => {
  const navigation = useNavigation();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [specialtyList, setSpecialtyList] = useState([]);
  const [specialty, setSpecialty] = useState(null);
  const [focusSpecialty, setFocusSpecialty] = useState(false);
  const [focusContent, setFocusContent] = useState(false);
  const sheetRef = useRef(null);
  const getListSpecialty = async () => {
    try {
      const response = await axiosConfig.get("/specialties/list-to-select");
      setSpecialtyList(response.data.specialties);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(specialtyList);
  useEffect(() => {
    getListSpecialty();
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(1);
  }, []);
  const handleSheetChange = useCallback((index) => {
    if (index === 0) {
      handleClosePress();
    }
  }, []);
  const snapPoint = useMemo(() => ["75%", "100%"]);

  const handleSelectSpecialty = (item) => {
    setSpecialty(item);
    handleClosePress();
  };
  // handle sumbit
  // Handle submit
  const handleSubmit = async () => {
    if (content.trim() === "") {
      setFocusContent(true);
      Toast.show({
        type: "error",
        text1: "Vui lòng nhập nội dung",
      });
      return;
    } else if (!specialty) {
      setFocusSpecialty(true);
      Toast.show({
        type: "error",
        text1: "Vui lòng chọn chuyên khoa",
      });
      return;
    } else {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("specialtyId", specialty?.id);
      formData.append("isAnonymous", isAnonymous ? "true" : "false");
      if (image) {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName,
          type: image.mimeType,
        });
      }

      try {
        // const response = await fetch("http://192.168.1.9:3000/questions/add", {
        //   method: "POST",
        //   body: formData,
        // });
        const response = await axiosConfig.post("/questions/add", formData);
        console.log(response);
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Câu hỏi của bạn đã được tạo thành công",
          });
          setTimeout(() => {
            navigation.reset({
              index: 1,
              routes: [
                { name: "TabNavigator", params: { screen: "Home" } },
                { name: "CommunityList" },
              ],
            });
          }, 500);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // cấp quyền truy cập ảnh
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Bạn cần cấp quyền truy cập thư viện ảnh.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // cấp quyền truy cập camera
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Bạn cần cấp quyền truy cập camera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFD994",
              alignItems: "center",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Checkbox
              status={isAnonymous ? "checked" : "unchecked"}
              onPress={() => setIsAnonymous(!isAnonymous)}
              color="#0165FC"
              style={{ backgroundColor: "#0165FC" }}
            />
            <Text style={{ flex: 1 }}>
              Câu hỏi của bạn sẽ được chia sẽ với cộng đồng với chế độ ẩn danh
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: focusSpecialty ? "#FF0000" : "#E7E7E7",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={handleSnapPress}
          >
            <View style={{ flexDirection: "column" }}>
              <Text>Chuyên khoa</Text>
              <Text
                style={{
                  fontWeight: specialty ? "500" : "normal",
                  color: specialty ? "#000" : "#808080",
                  fontSize: specialty ? 14 : 12,
                }}
              >
                {specialty?.name || "Vui lòng chọn chuyên khoa"}
              </Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: "#F5F5F5",
              textAlignVertical: "top",
              borderWidth: focusContent ? 1 : 0,
              borderColor: focusContent ? "#FF0000" : "#E7E7E7",
            }}
            numberOfLines={3}
            multiline={true}
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholder="Nhập nội dung câu hỏi:
          (Vui lòng nhập nội dung câu hỏi để chúng tôi có thể trả lời chính xác hơn về triệu chứng, vấn đề cần tư vấn, đơn thuốc kết quả xét nghiệm, vui lòng kèm ảnh đầy đủ phía dưới)"
          />
          {image && (
            <View style={{ gap: 10, paddingHorizontal: 16 }}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: "100%", height: 170, borderRadius: 10 }}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setImage(null)}
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  marginTop: 15,
                  marginRight: 30,
                }}
              >
                <EvilIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",

                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={handlePickImage}
            >
              <FontAwesome name="image" size={24} color="#0165FC" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={handleTakePhoto}
            >
              <FontAwesome name="camera" size={24} color="#0165FC" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "#0165FC", fontWeight: "500" }}>Gửi</Text>
            <Ionicons name="send" size={24} color="#0165FC" />
          </TouchableOpacity>
        </View>
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
              textAlign: "center",
              flex: 1,
            }}
          >
            Chọn chuyên khoa
          </Text>
          <TouchableOpacity onPress={handleClosePress}>
            <EvilIcons name="close" size={24} color={"#000"} />
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
          {specialtyList?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 18,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
              onPress={() => handleSelectSpecialty(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CreateQuestion;

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// const CreateQuestion = () => {
//   const [images, setImages] = useState([]);

//   const handlePickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       alert("Bạn cần cấp quyền truy cập thư viện ảnh.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true, // chỉ cho phép nhiều hình với EAS
//       selectionLimit: 5,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     console.log(result);
//     if (!result.canceled) {
//       setImages((prev) => [...prev, result.assets[0]]);
//     }
//   };

//   const handleTakePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       alert("Bạn cần cấp quyền sử dụng camera.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImages((prev) => [...prev, result.assets[0]]);
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Hiển thị danh sách ảnh */}
//       <ScrollView
//         horizontal
//         contentContainerStyle={{ padding: 10, gap: 10 }}
//         showsHorizontalScrollIndicator={false}
//       >
//         {images.map((image, index) => (
//           <Image
//             key={index}
//             source={{ uri: image.uri }}
//             style={{ width: 100, height: 100, borderRadius: 8 }}
//           />
//         ))}
//       </ScrollView>

//       {/* Nút thêm ảnh */}
//       <TouchableOpacity onPress={handlePickImage} style={{ margin: 10 }}>
//         <Text>Chọn ảnh từ thư viện</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleTakePhoto} style={{ margin: 10 }}>
//         <Text>Chụp ảnh</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CreateQuestion;
