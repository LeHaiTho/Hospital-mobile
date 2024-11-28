import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Search from "../components/Search";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const SpecialtyListScreen = () => {
  const [specialties, setSpecialties] = useState([]);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const getSpecialtiesList = async () => {
    try {
      const res = await axiosConfig.get("/specialties/list");
      setSpecialties(res.data.specialties);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecialtiesList();
  }, []);

  useEffect(() => {
    // Hàm tìm kiếm khi giá trị tìm kiếm thay đổi
    if (search) {
      const filtered = specialties.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(specialties); // Nếu không có gì để tìm, hiển thị tất cả dữ liệu
    }
  }, [search, specialties]);

  const handleClear = () => {
    setSearch(""); // Xóa giá trị tìm kiếm
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 18,
        paddingBottom: 16,
        backgroundColor: "#fff",
        paddingTop: 16,
        gap: 16,
      }}
    >
      <Search
        placeholder="Chuyên khoa cần tìm"
        value={search}
        onChangeText={setSearch}
        onClear={handleClear}
      />
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 20,
            paddingTop: 2,
            paddingHorizontal: 2,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item?.id}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: "100%",
                gap: 20,
                flexDirection: "row",
                backgroundColor: "#fff",
                // borderRadius: 10,
                // shadowColor: "#000",
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.1,
                // shadowRadius: 10,
                // elevation: 2,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#DBEAFE",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("SpecialtyFilterList", {
                  specialtyId: item.id,
                })
              }
            >
              <Image
                source={{
                  uri: `${BASE_URL}${item?.photo}`,
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 20,
                  backgroundColor: "#DBEAFE",
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "400" }}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text
          style={{ textAlign: "center", color: "#f20000", fontStyle: "italic" }}
        >
          Không tìm thấy chuyên khoa, vui lòng thử lại
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 2,
  },
  specialtyContainer: {
    width: "40%", // Đảm bảo mỗi item chiếm khoảng 30% chiều rộng
    alignItems: "center",
    gap: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#797979",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    backgroundColor: "#DBEAFE",
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  specialtyText: {
    marginTop: 8,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default SpecialtyListScreen;
