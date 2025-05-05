import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axiosConfig from "../apis/axiosConfig";
import HospitalCard from "../components/HospitalCard";
const HERE_API_KEY = "te9pF-AZqdY4Dez0jND9_-Eh_Xpe7DWthoixEhgtmeE";
const HospitalList = () => {
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [address, setAddress] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get
  const getHospitalsList = async () => {
    try {
      setIsLoading(true);
      const res = await axiosConfig.get("/hospitals/list-for-mobile");
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // get provinces
  const getProvinces = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
      setProvinces(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHospitalsList();
    getProvinces();
  }, []);

  const handleSearch = async (text) => {
    setSearch(text);
    try {
      setIsLoading(true);
      const res = await axiosConfig.get("/hospitals/filter", {
        params: { name: text, province: selectedProvince },
      });
      setHospitals(res.data.hospital);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleProvincePress = async (province) => {
    if (selectedProvince === province.name) {
      setSelectedProvince(null);
      getHospitalsList();
      return;
    } else {
      setSelectedProvince(province.name);
      try {
        const res = await axiosConfig.get("/hospitals/filter", {
          params: { province: province.name },
        });
        console.log(res.data.hospital);
        setHospitals(res.data.hospital);
      } catch (error) {
        console.log(error);
      }
    }
    handleClosePress();
  };

  const sheetRef = useRef(null);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(1);
  }, []);
  const handleSheetChange = useCallback((index) => {}, []);
  const snapPoint = useMemo(() => ["80%"]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Bạn chưa cấp quyền truy cập vị trí");
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    // nếu cance
    setLocation(userLocation);
    fetchAddressFromCoordinates(
      userLocation.coords.latitude,
      userLocation.coords.longitude
    );
    try {
      const res = await axiosConfig.get("/hospitals/near-by", {
        params: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
      });
      setHospitals(res.data.hospitalsNearBy);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(hospitals);

  // hàm reverse gecoding để lấy địa chỉ từ tọa độ
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=vi-VN&apiKey=${HERE_API_KEY}`
      );
      const data = await res.json();
      setAddress(data?.items[0]?.address?.label);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: "#fff",
          gap: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 10,
            flexDirection: "row",
            paddingHorizontal: 2,
            width: "100%",
          }}
        >
          <TextInput
            placeholder="Tìm kiếm cơ sở y tế"
            style={{
              flex: 1,
              padding: 9,
              borderWidth: 1,
              borderColor: "#0165FF",
              borderRadius: 10,
              paddingHorizontal: 15,
            }}
            value={search}
            onChangeText={(text) => handleSearch(text)}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#0165FF",
              padding: 5,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={handleSnapPress}
          >
            <Ionicons name="options-outline" size={24} color="#fff" />
            <Text style={{ color: "#fff" }}>Lọc</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={requestLocationPermission}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 2,
          }}
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={18}
            color="#0165FF"
            style={{
              backgroundColor: "#0165FF1A",
              padding: 10,
              borderRadius: 4,
            }}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ color: "#0165FF", fontWeight: "500" }}>
              Gần vị trí của bạn
            </Text>
            <Text style={{ color: "#666", fontSize: 12 }} numberOfLines={1}>
              {address || "Cho phép truy cập vị trí của bạn"}
            </Text>
          </View>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator size="large" color="#0165FF" />
        ) : hospitals.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              gap: 15,
              paddingVertical: 5,
              borderRadius: 10,
              paddingHorizontal: 3,
            }}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            showsVerticalScrollIndicator={false}
            data={hospitals}
            renderItem={({ item, index }) => (
              <HospitalCard
                key={index}
                hospital={item}
                onPress={() =>
                  navigation.navigate("HospitalDetail", { id: item.id })
                }
              />
            )}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Không tìm thấy cơ sở y tế nào</Text>
          </View>
        )}
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
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
            }}
          >
            Tỉnh thành phố
          </Text>
          <TouchableOpacity onPress={handleClosePress}>
            <EvilIcons name="close" size={29} color="#000" />
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
          {provinces?.map((province, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                borderColor:
                  selectedProvince === province.name ? "#0165FF" : "#E0E0E0",
                color: "#000",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => handleProvincePress(province)}
            >
              <Text>{province.name}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default HospitalList;
