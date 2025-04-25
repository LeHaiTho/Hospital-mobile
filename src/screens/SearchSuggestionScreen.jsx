import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";
import { FlatList } from "react-native";

// Lịch sử tìm kiếm
const dataHistory = [
  { id: 1, name: "Cơ xương khớp" },
  { id: 2, name: "Tim mạch" },
  { id: 3, name: "Tiêu hóa" },
  { id: 4, name: "Thần kinh" },
  { id: 5, name: "Da liễu" },
];

// Triệu chứng phổ biến
const dataCommonIllnesses = [
  { id: 1, name: "Đau đầu" },
  { id: 2, name: "Trẻ ấm sốt" },
  { id: 3, name: "Đau lưng đau cột sống" },
  { id: 4, name: "Mụn trứng cá" },
  { id: 5, name: "Sốt xuất huyết" },
];

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const SearchSuggestionScreen = () => {
  const navigation = useNavigation();
  const [specialties, setSpecialties] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchText, setSearchText] = useState(""); // Text người dùng nhập
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  console.log(searchResults?.specialties);
  const getSpecialtiesList = async () => {
    try {
      const res = await axiosConfig.get("/specialties/list");
      setSpecialties(res.data.specialties);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(searchResults?.hospitals?.[0]);
  // Lấy lịch sử tìm kiếm từ AsyncStorage
  const getSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log("Error fetching search history:", error);
    }
  };
  // Cập nhật lịch sử tìm kiếm
  const updateSearchHistory = async (specialty) => {
    const updatedHistory = [
      specialty,
      ...searchHistory.filter((item) => item.id !== specialty.id),
    ];
    setSearchHistory(updatedHistory);

    try {
      await AsyncStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.log("Error saving search history:", error);
    }
  };
  console.log("kết quả", searchText && searchResults);
  // Xóa lịch sử tìm kiếm theo id
  // const deleteSearchHistory = async (item) => {
  //   const updatedHistory = searchHistory.filter((i) => i.id !== item.id);
  //   setSearchHistory(updatedHistory);
  //   try {
  //     // Lưu danh sách cập nhật vào AsyncStorage
  //     await AsyncStorage.setItem(
  //       "searchHistory",
  //       JSON.stringify(updatedHistory)
  //     );
  //     console.log("History updated successfully");
  //   } catch (error) {
  //     console.log("Error updating search history:", error);
  //   }
  // };
  useEffect(() => {
    getSpecialtiesList();
    getSearchHistory();
  }, []);
  const debouncedSearch = debounce(async (text) => {
    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosConfig.get(`/search`, {
        params: {
          text,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 1000);
  const handleSearch = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "blue",
            paddingTop: 40,
            alignItems: "center",
            backgroundColor: "#fff",
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 10,
              paddingVertical: 5,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EvilIcons name="search" size={24} color="#000" />
            <TextInput
              placeholder="Tìm chuyên khoa, cơ sở y tế"
              value={searchText}
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
        </View>
        {searchResults?.hospitals?.length === 0 &&
        searchResults?.specialties?.length === 0 &&
        searchResults?.hospitalSpecialties?.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không tìm thấy kết quả phù hợp
          </Text>
        ) : searchText.trim() === "" ? (
          <>
            <View style={{ padding: 10, backgroundColor: "#fff" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 14,
                }}
              >
                Lịch sử tìm kiếm
              </Text>
              {
                // Lặp lại các item trong mảng
                searchHistory?.slice(0, 5)?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderBottomColor: "#ccc",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onPress={() => {
                        navigation.navigate("SpecialtyFilterList", {
                          specialtyId: item.id,
                        });
                      }}
                    >
                      <Text>{item.name}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "gray",
                            fontSize: 12,
                          }}
                        >
                          chuyên khoa
                        </Text>
                        <TouchableOpacity>
                          <EvilIcons name="close" size={20} color="black" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
            {/* chuyên khoa gợi ý */}
            <View style={{ padding: 10, backgroundColor: "#fff" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 14,
                }}
              >
                Gợi ý chuyên khoa
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {specialties.slice(0, 5).map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        borderBottomColor: "#ccc",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "25%",
                        padding: 5,
                        alignSelf: "flex-start",
                      }}
                      onPress={() => {
                        updateSearchHistory(item);
                        navigation.navigate("SpecialtyFilterList", {
                          specialtyId: item.id,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: `${BASE_URL}${item.photo}` }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 20,
                          backgroundColor: "#DBEAFE",
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 14,
                }}
              >
                Triệu chứng phổ biến
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {dataCommonIllnesses.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        borderBottomColor: "#ccc",
                        alignItems: "center",
                        flexDirection: "row",
                        borderWidth: 0.5,
                        borderColor: "#ccc",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 100,
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              gap: 10,
            }}
          >
            {searchResults?.hospitals?.length > 0 && (
              <View style={{ padding: 10, backgroundColor: "#fff" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 14,
                  }}
                >
                  Cơ sở y tế
                </Text>
                {searchResults?.hospitals?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderBottomColor: "#ccc",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 10,
                      }}
                      onPress={() => {
                        navigation.navigate("HospitalDetail", {
                          id: item.id,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: `${BASE_URL}${item.banner}` }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 20,
                          backgroundColor: "#DBEAFE",
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>{item.name}</Text>
                        <Text style={{ color: "gray", fontSize: 12 }}>
                          {item.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            {searchResults?.specialties?.length > 0 && (
              <View style={{ padding: 10, backgroundColor: "#fff" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 14,
                  }}
                >
                  Chuyên khoa
                </Text>
                {searchResults?.specialties?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderBottomColor: "#ccc",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 10,
                      }}
                      onPress={() => {
                        navigation.navigate("SpecialtyFilterList", {
                          specialtyId: item.id,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: `${BASE_URL}${item.photo}` }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 20,
                          backgroundColor: "#DBEAFE",
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            {searchResults?.hospitalSpecialties?.length > 0 && (
              <View style={{ padding: 10, backgroundColor: "#fff" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 14,
                  }}
                >
                  Dịch vụ
                </Text>
                {searchResults?.hospitalSpecialties?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderBottomColor: "#ccc",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onPress={() => {
                        navigation.navigate("SpecialtyDetailOfHospital", {
                          hospitalId: item.hospital_id,
                          specialtyId: item.specialty_id,
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flex: 1,
                          gap: 10,
                        }}
                      >
                        <Image
                          source={{ uri: `${BASE_URL}${item.image}` }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 20,
                            backgroundColor: "#DBEAFE",
                          }}
                        />
                        <Text
                          style={{
                            flex: 1,
                            fontWeight: "500",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <EvilIcons name="chevron-right" size={20} color="#000" />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchSuggestionScreen;
