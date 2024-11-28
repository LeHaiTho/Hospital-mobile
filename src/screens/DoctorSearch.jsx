import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../components/Search";
import DoctorList from "../components/DoctorList";
const DoctorSearch = () => {
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <Search placeholder={"Tìm kiếm bác sĩ"} />
      <DoctorList />
    </SafeAreaView>
  );
};

export default DoctorSearch;
