// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { RadioButton } from "react-native-paper";
// import { FontAwesome } from "@expo/vector-icons";
// const CancelBookingScreen = () => {
//   const [checked, setChecked] = useState("1");

//   return (
//     <>
//       <KeyboardAwareScrollView
//         style={{ flex: 1, backgroundColor: "#fff" }}
//         keyboardShouldPersistTaps="handled"
//         extraScrollHeight={100} // Tăng khoảng cách cuộn lên
//       >
//         <View style={styles.container}>
//           <Text style={styles.title}>Bạn hủy lịch hẹn vì lý do gì?</Text>

//           {[
//             "Thay đổi lịch hẹn khác",
//             "Thời tiết không tốt",
//             "Không thể điều chỉnh lịch trình cá nhân",
//             "Lý do khác",
//           ].map((reason, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.option,
//                 checked === (index + 1).toString() && styles.selectedOption,
//               ]}
//               onPress={() => setChecked((index + 1).toString())}
//             >
//               <RadioButton
//                 value={(index + 1).toString()}
//                 status={
//                   checked === (index + 1).toString() ? "checked" : "unchecked"
//                 }
//                 color="#0165FC"
//               />
//               <Text>{reason}</Text>
//             </TouchableOpacity>
//           ))}

//           <View style={styles.separator} />

//           <Text style={styles.inputLabel}>Khác:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Lý do khác (tối đa 100 ký tự)"
//             maxLength={100}
//             placeholderTextColor="#ABABAB"
//             multiline={true}
//           />
//         </View>
//       </KeyboardAwareScrollView>

//       {/* Nút ở dưới cùng */}
//       <View
//         style={{
//           width: "100%",
//           backgroundColor: "#fff",
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//         }}
//       >
//         <View
//           style={{
//             backgroundColor: "#fff",
//             width: "100%",
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             gap: 10,
//             alignItems: "center",
//             justifyContent: "center",
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 10,
//             },
//             shadowOpacity: 0.9,
//             shadowRadius: 15,
//             elevation: 10,
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               padding: 15,
//               borderRadius: 100,
//               width: "100%",
//               alignItems: "center",
//               backgroundColor: "#0165FC",
//               flexDirection: "row",
//               gap: 10,
//               justifyContent: "center",
//             }}
//             onPress={() => setVisible(true)}
//           >
//             <FontAwesome name="send" size={18} color="#FFF" />
//             <Text style={{ color: "#FFF" }}>Gửi đánh giá</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   option: {
//     borderRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     padding: 10,
//   },
//   selectedOption: {
//     backgroundColor: "#E0E0E0",
//   },
//   separator: {
//     height: 1,
//     backgroundColor: "#E5E5E5",
//     marginVertical: 10,
//   },
//   inputLabel: {
//     marginBottom: 10,
//   },
//   input: {
//     backgroundColor: "transparent",
//     padding: 10,
//     borderRadius: 10,
//     textAlignVertical: "top",
//     height: 100,
//     borderWidth: 1,
//     borderColor: "#E5E5E5",
//   },
// });

// export default CancelBookingScreen;

import React, { useCallback, useRef, useMemo, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton } from "react-native-paper";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
const CancelBookingScreen = ({ route }) => {
  // hooks
  const sheetRef = useRef(null);
  const navigation = useNavigation();
  const [checked, setChecked] = useState("1");
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const { appointmentId } = route.params;

  // variables
  const snapPoints = useMemo(() => [], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    if (index === -1) {
      setIsSheetVisible(false); // Đặt trạng thái khi BottomSheet đóng
    } else {
      setIsSheetVisible(true); // Đặt trạng thái khi BottomSheet mở
    }
  }, []);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleOke = async () => {};
  console.log(appointmentId);
  const handleAccept = async () => {
    try {
      const res = await axiosConfig.patch(
        `appointments/cancel-appointment/${appointmentId}`
      );
      if (res.status === 200) {
        handleClosePress();
        Toast.show({
          text1: "Yêu cầu hủy lịch hẹn đã gửi thành công",
          type: "success",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator", screen: "AppointmentScreen" }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // render
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: "#fff" }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={100} // Tăng khoảng cách cuộn lên
        >
          <View style={styles.container}>
            <Text style={styles.title}>Bạn hủy lịch hẹn vì lý do gì?</Text>

            {[
              "Thay đổi lịch hẹn khác",
              "Thời tiết không tốt",
              "Không thể điều chỉnh lịch trình cá nhân",
              "Lý do khác",
            ].map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  checked === (index + 1).toString() && styles.selectedOption,
                ]}
                onPress={() => setChecked((index + 1).toString())}
              >
                <RadioButton
                  value={(index + 1).toString()}
                  status={
                    checked === (index + 1).toString() ? "checked" : "unchecked"
                  }
                  color="#0165FC"
                />
                <Text>{reason}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.separator} />

            <Text style={styles.inputLabel}>Khác:</Text>
            <TextInput
              style={styles.input}
              placeholder="Lý do khác (tối đa 100 ký tự)"
              maxLength={100}
              placeholderTextColor="#ABABAB"
              multiline={true}
            />
          </View>
        </KeyboardAwareScrollView>
        {/* Overlay when BottomSheet is visible */}
        {isSheetVisible && <View style={styles.overlay} />}
        {/* Nút ở dưới cùng */}
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
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
                padding: 15,
                borderRadius: 100,
                width: "100%",
                alignItems: "center",
                backgroundColor: "#0165FC",
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
              onPress={handleSnapPress}
            >
              <FontAwesome name="send" size={18} color="#FFF" />
              <Text style={{ color: "#FFF" }}>Yêu cầu hủy lịch hẹn</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={true}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
        >
          <BottomSheetView
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#F20000",
                  fontWeight: "600",
                  fontSize: 16,
                  flex: 1,
                  transform: [{ translateX: 10 }],
                }}
              >
                Hủy lịch hẹn
              </Text>
              <EvilIcons
                name="close"
                size={24}
                color="#000"
                onPress={handleClosePress}
              />
            </View>

            <Text
              style={{ color: "#ABABAB", textAlign: "center", fontSize: 14 }}
            >
              Bạn có chắc chắn muốn hủy lịch hẹn này không?
            </Text>
            <View style={{ flexDirection: "row", gap: 15, marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: "#D3E6FF",
                  borderRadius: 100,
                  flex: 1,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
                }}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: "#0165FC", textAlign: "center" }}>
                  Quay lại
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor: "#0165FC",
                  borderRadius: 100,
                  flex: 1,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
                }}
                onPress={handleAccept}
              >
                <Text style={{ color: "#D3E6FF", textAlign: "center" }}>
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
  },
  selectedOption: {
    backgroundColor: "#E0E0E0",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 10,
  },
  inputLabel: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
    height: 100,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default CancelBookingScreen;
