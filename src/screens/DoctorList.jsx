import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import { View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DoctorCard from "../components/DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
import { ActivityIndicator } from "react-native";

const DoctorList = () => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        setLoading(true);
        const res = await axiosConfig.get("/doctors/all");
        setDoctors(res.data.doctorList);
        setFilteredDoctors(res.data.doctorList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllDoctor();
  }, []);

  // Hàm tìm kiếm bác sĩ theo tên hoặc chuyên khoa
  const handleSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      // Nếu ô tìm kiếm trống, hiển thị tất cả bác sĩ
      setFilteredDoctors(doctors);
      return;
    }

    // Lọc bác sĩ theo tên hoặc chuyên khoa
    const searchText = text.toLowerCase().trim();
    console.log(doctors);
    const filtered = doctors.filter((doctor) => {
      try {
        console.log(doctor?.fullname);
        // Tìm theo tên bác sĩ
        const doctorName = (doctor?.fullname || "").toLowerCase();
        if (doctorName.includes(searchText)) {
          return true;
        }

        // Tìm theo chuyên khoa
        if (Array.isArray(doctor?.specialties)) {
          for (const specialty of doctor.specialties) {
            const specialtyName = (specialty?.name || "").toLowerCase();
            if (specialtyName.includes(searchText)) {
              return true;
            }
          }
        }

        return false;
      } catch (error) {
        console.log("Lỗi khi lọc bác sĩ:", error);
        return false;
      }
    });

    setFilteredDoctors(filtered);
  };
  console.log(filteredDoctors);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 16,
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 10,
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          placeholder="Tìm kiếm bác sĩ"
          style={{
            flex: 1,
            padding: 9,
            borderWidth: 1,
            borderColor: "#0165FF",
            borderRadius: 10,
            paddingHorizontal: 15,
          }}
          value={search}
          onChangeText={handleSearch}
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
        >
          <Ionicons name="options-outline" size={24} color="#fff" />
          <Text style={{ color: "#fff" }}>Lọc</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0165FF" />
          <Text style={{ marginTop: 10 }}>Đang tải danh sách bác sĩ...</Text>
        </View>
      ) : filteredDoctors.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Không tìm thấy bác sĩ phù hợp</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 16,
            paddingHorizontal: 4,
            paddingTop: 16,
          }}
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DoctorList;
