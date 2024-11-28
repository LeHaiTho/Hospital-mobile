import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import { View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DoctorCard from "../components/DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../components/Search";
import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../apis/axiosConfig";
import axios from "axios";

const DoctorList = () => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getAllDoctor = async () => {
      const res = await axiosConfig.get("/doctors/all");
      setDoctors(res.data.doctorList);
    };
    getAllDoctor();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        gap: 20,
      }}
    >
      <View style={{ paddingHorizontal: 4 }}>
        <Search
          placeholder="Tìm kiếm bác sĩ"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 16,
          paddingHorizontal: 4,
          paddingTop: 16,
        }}
      >
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorList;
