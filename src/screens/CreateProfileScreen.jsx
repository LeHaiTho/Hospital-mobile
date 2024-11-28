import { Entypo, EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Portal,
  Modal,
} from "react-native";
import LottieView from "lottie-react-native";
import { RadioButton } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Search from "../components/Search";
import axios from "axios";
import { Fontisto } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosConfig from "../apis/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const { height: screenHeight } = Dimensions.get("window");
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
const CreateProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params || {};
  const { doctor, selectedDate, slot, selectedHospital, selectedSpecialty } =
    route.params || {};
  const sheetRefProvince = useRef(null);
  const sheetRefDistrict = useRef(null);
  const sheetRefWard = useRef(null);
  const [checked, setChecked] = useState("1");
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isQR, setIsQR] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const moment = require("moment");
  const [isFocus, setIsFocus] = useState(false);
  const [relationship, setRelationship] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFormData({ ...formData, dateOfBirth: currentDate.toISOString() });
    setDate(currentDate);
  };
  console.log(date.toLocaleDateString() === new Date().toLocaleDateString());
  // route params
  console.log(route.params);
  // form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: null,
    email: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    relationship: "",
  });

  const relationshipOptions = [
    { label: "Bản thân", value: "myself" },
    { label: "Bố", value: "father" },
    { label: "Mẹ", value: "mother" },
    { label: "Anh trai", value: "brother" },
    { label: "Chị gái", value: "sister" },
    { label: "Bạn bè", value: "friend" },
    { label: "Chồng", value: "husband" },
    { label: "Vợ", value: "wife" },
    { label: "Con", value: "child" },
    { label: "Ông bà", value: "grandparent" },
    { label: "Cháu", value: "grandchild" },
    { label: "Khác", value: "other" },
  ];

  // nếu là QR

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosConfig.put(
        `/users/create-profile/${user.id}`,
        formData
      );
      if (res.status === 200) {
        Toast.show({
          text1: "Tạo hồ sơ thành công",
          type: "success",
        });
        navigation.replace("CustomerProfile", {
          fromBooking: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // provinces
  const getProvinces = async () => {
    try {
      const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
      setProvinces(res.data?.data);
      setFormData((prev) => ({
        ...prev,
        province: "",
        district: "",
        ward: "",
      }));
      setDistricts([]);
      setWards([]);
    } catch (error) {
      console.log(error);
    }
  };

  // districts
  const getDistricts = async (id) => {
    try {
      console.log(id);
      setFormData((prev) => ({ ...prev, district: "", ward: "" }));
      const res = await axios.get(
        // `https://esgoo.net/api-tinhthanh/2/${selectedProvince?.id}.htm`
        `https://esgoo.net/api-tinhthanh/2/${id}.htm`
      );
      setDistricts(res.data?.data);
      setWards([]);
    } catch (error) {
      console.log(error);
    }
  };

  // wards
  const getWards = async (id) => {
    try {
      const res = await axios.get(
        // `https://esgoo.net/api-tinhthanh/3/${selectedDistrict?.id}.htm`
        `https://esgoo.net/api-tinhthanh/3/${id}.htm`
      );
      setWards(res.data?.data);
      // setSelectedWard(null);
      setFormData((prev) => ({ ...prev, ward: "" }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data) {
      const getScanData = async (data) => {
        const dataArray = data.split("|");
        const addressArray = dataArray[5].split(", ");
        const province = addressArray[addressArray.length - 1];
        const district = addressArray[addressArray.length - 2];
        const ward = addressArray[addressArray.length - 3];
        setFormData({
          ...formData,
          name: dataArray[2], // Tên
          dateOfBirth: moment(dataArray[3], "DD/MM/YYYY").format("YYYY-MM-DD"),
          gender: dataArray[4] === "Nam" ? true : false, // Giới tính
          province: province, // Tỉnh
          district: district, // Huyện
          ward: ward, // Phường
          address: dataArray[5], // Địa chỉ chi tiết
          identificationCard: dataArray[0], // Số CMND
        });
        setIsQR(true);
      };
      getScanData(data);
    } else {
      getProvinces();
    }
  }, []);
  console.log(formData);
  // Gọi API lấy quận/huyện khi selectedProvince thay đổi
  // useEffect(() => {
  //   if (selectedProvince) {
  //     getDistricts();
  //   }
  // }, [selectedProvince]);

  // // Gọi API lấy phường xã khi selectedDistrict thay đổi
  // useEffect(() => {
  //   if (selectedDistrict) {
  //     getWards();
  //   }
  // }, [selectedDistrict]);

  // variables
  const snapPointsProvince = useMemo(() => ["100%"]);
  const snapPointsDistrict = useMemo(() => ["100%"]);
  const snapPointsWard = useMemo(() => ["100%"]);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    if (index === -1) {
      setIsSheetVisible(false); // Đặt trạng thái khi BottomSheet đóng
    } else {
      setIsSheetVisible(true); // Đặt trạng thái khi BottomSheet mở
    }
  }, []);

  const handleSnapPress = useCallback(() => {
    sheetRefProvince.current?.snapToIndex(0);
  }, []);

  const handleSnapPressDistrict = useCallback(() => {
    sheetRefDistrict.current?.snapToIndex(0);
  }, []);

  const handleSnapPressWard = useCallback(() => {
    sheetRefWard.current?.snapToIndex(0);
  }, []);

  const handleClosePressProvince = useCallback(() => {
    sheetRefProvince.current?.close();
  }, []);

  const handleClosePressDistrict = useCallback(() => {
    sheetRefDistrict.current?.close();
  }, []);

  const handleClosePressWard = useCallback(() => {
    sheetRefWard.current?.close();
  }, []);

  // handle select province
  const handleSelectProvince = async (item) => {
    handleInputChange("province", item?.full_name);
    console.log("chuan bi lay district", item);
    getDistricts(item?.id);
    // setSelectedProvince(item);
    handleClosePressProvince();
  };
  // handle select district
  const handleSelectDistrict = async (item) => {
    handleInputChange("district", item?.full_name);
    getWards(item?.id);
    // setSelectedDistrict(item);
    handleClosePressDistrict();
  };
  // handle select ward
  const handleSelectWard = async (item) => {
    handleInputChange("ward", item?.full_name);
    // setSelectedWard(item);
    handleClosePressWard();
  };

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{
          padding: 20,
          backgroundColor: "#fff",
          gap: 20,
        }}
      >
        <View>
          <View style={{ gap: 20, paddingBottom: 100 }}>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Họ và tên (có dấu) </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TextInput
                placeholder="Nhập họ và tên"
                placeholderTextColor="#999"
                style={{
                  backgroundColor: isQR ? "#E0E0E0" : "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: isQR
                    ? "#797979"
                    : formData.name
                    ? "#0165FC"
                    : "#E0E0E0",
                  color: "#000",
                }}
                editable={!isQR}
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
              />
            </View>

            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Số điện thoại </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TextInput
                placeholder="0xxxxxxxxx"
                placeholderTextColor="#999"
                keyboardType="numeric"
                style={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: formData.phone ? "#0165FC" : "#E0E0E0",
                  color: "#000",
                }}
                value={formData.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
              />
            </View>
            <View
              style={{
                gap: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Ngày sinh </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 8,
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: isQR ? "#E0E0E0" : "#fff",
                      borderWidth: 1,
                      paddingHorizontal: 20,
                      width: "100%",
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderColor: isQR
                        ? "#797979"
                        : formData.dateOfBirth
                        ? "#0165FC"
                        : "#E0E0E0",
                      color: "#000",
                    }}
                    disabled={isQR}
                    onPress={() => setShow(true)}
                  >
                    {show && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={onChange}
                        maximumDate={new Date()}
                      />
                    )}
                    <Text>
                      {isQR
                        ? moment(formData.dateOfBirth).format("DD/MM/YYYY")
                        : date.toLocaleDateString() ===
                          new Date().toLocaleDateString()
                        ? "Chọn ngày sinh"
                        : date.toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ gap: 10, flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Giới tính </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                    onPress={() => handleInputChange("gender", true)}
                  >
                    <RadioButton
                      value="male"
                      status={formData.gender ? "checked" : "unchecked"}
                      uncheckedColor="#888"
                      color="#0165FC"
                    />
                    <Text>Nam</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                    onPress={() => handleInputChange("gender", false)}
                  >
                    <RadioButton
                      value="female"
                      status={
                        formData.gender == false ? "checked" : "unchecked"
                      }
                      uncheckedColor="#888"
                      color="#0165FC"
                    />
                    <Text>Nữ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Email (dùng để nhận phiếu khám bệnh)
                </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TextInput
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#999"
                style={{
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: formData.email ? "#0165FC" : "#E0E0E0",
                  color: "#000",
                }}
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
              />
            </View>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Hồ sơ khám bệnh </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "#0165FC" }]}
                placeholderStyle={{
                  color: "#888",
                  fontSize: 14,
                  paddingLeft: 10,
                }}
                selectedTextStyle={{
                  color: "#000",
                  fontSize: 14,
                  paddingLeft: 10,
                }}
                containerStyle={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                data={relationshipOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Chọn hồ sơ khám bệnh" : "..."}
                value={formData?.relationship}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  handleInputChange("relationship", item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Tỉnh/Thành phố </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: isQR ? "#E0E0E0" : "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: isQR
                    ? "#797979"
                    : formData.province
                    ? "#0165FC"
                    : "#E0E0E0",
                  color: "#000",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                disabled={isQR}
                onPress={handleSnapPress}
              >
                <Text style={{ color: formData.province ? "#000" : "#888" }}>
                  {formData.province || "Chọn tỉnh/thành phố"}
                </Text>
                <Entypo name="chevron-small-right" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Quận/Huyện </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: isQR ? "#E0E0E0" : "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: isQR
                    ? "#797979"
                    : formData.district
                    ? "#0165FC"
                    : "#E0E0E0",
                  color: "#000",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                disabled={isQR || !formData.province}
                onPress={handleSnapPressDistrict}
              >
                <Text style={{ color: formData.district ? "#000" : "#888" }}>
                  {formData.district === ""
                    ? "Chọn Quận/Huyện"
                    : formData.district}
                </Text>
                <Entypo name="chevron-small-right" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Phường/Xã </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: isQR ? "#E0E0E0" : "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: isQR
                    ? "#797979"
                    : formData.ward
                    ? "#0165FC"
                    : "#E0E0E0",
                  color: "#000",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                disabled={isQR || !formData.district}
                onPress={handleSnapPressWard}
              >
                <Text style={{ color: formData.ward ? "#000" : "#888" }}>
                  {formData.ward || "Chọn phường/xã"}
                </Text>
                <Entypo name="chevron-small-right" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Địa chỉ </Text>
                <Text style={{ color: "red" }}>*</Text>
              </View>
              <TextInput
                placeholder="Nhập địa chỉ"
                placeholderTextColor="#999"
                style={{
                  backgroundColor: isQR ? "#E0E0E0" : "#fff",
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderColor: isQR
                    ? "#797979"
                    : formData.address
                    ? "#0165FC"
                    : "#E0E0E0",
                  color: "#000",
                }}
                value={formData.address}
                onChangeText={(value) => handleInputChange("address", value)}
                editable={!isQR}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#0165FC",
                paddingVertical: 16,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "#fff" }}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRefProvince}
        snapPoints={snapPointsProvince}
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
        onClose={handleClosePressProvince}
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
            Chọn tỉnh/thành phố
          </Text>
          <TouchableOpacity onPress={handleClosePressProvince}>
            <EvilIcons name="close" size={26} color={"#000"} />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Search searchPlaceholder="Tìm kiếm tỉnh/thành phố" />
        </View>
        <BottomSheetScrollView
          ref={sheetRefProvince}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          contentContainerStyle={{
            gap: 6,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {provinces?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 18,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
              }}
              onPress={() => {
                handleSelectProvince(item);
                console.log(item);
              }}
            >
              <Text>{item?.full_name}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
      <BottomSheet
        ref={sheetRefDistrict}
        snapPoints={snapPointsDistrict}
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
        onClose={handleClosePressDistrict}
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
            Chọn quận/huyện
          </Text>
          <TouchableOpacity onPress={handleClosePressDistrict}>
            <EvilIcons name="close" size={26} color={"#000"} />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Search />
        </View>
        <BottomSheetScrollView
          ref={sheetRefDistrict}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          contentContainerStyle={{
            gap: 6,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {districts?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 18,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
              }}
              onPress={() => handleSelectDistrict(item)}
            >
              <Text>{item?.full_name}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
      <BottomSheet
        ref={sheetRefWard}
        snapPoints={snapPointsWard}
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
        onClose={handleClosePressWard}
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
            Chọn phường/xã
          </Text>
          <TouchableOpacity onPress={handleClosePressWard}>
            <EvilIcons name="close" size={26} color={"#000"} />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Search />
        </View>
        <BottomSheetScrollView
          ref={sheetRefWard}
          snapPoints={snapPointsWard}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          contentContainerStyle={{
            gap: 6,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {wards?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 16,
                borderRadius: 10,
                borderColor: "#E0E0E0",
                color: "#000",
              }}
              onPress={() => handleSelectWard(item)}
            >
              <Text>{item?.full_name}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CreateProfileScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
