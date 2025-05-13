import React from "react";
import DoctorInfo from "../components/DoctorInfo";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Divider, RadioButton } from "react-native-paper";
import Stats from "../components/Stats";
import Review from "../components/Review";
import BookAppointment from "../components/BookAppointment";
import { useState, useEffect } from "react";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import axiosConfig from "../apis/axiosConfig";

const DoctorDetail = ({ route }) => {
  const { id, hospitalId, specialtyId } = route.params || {};
  const [doctor, setDoctor] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("selectedHospital", selectedHospital);
  console.log("hospitalId", hospitalId);
  // lấy bệnh viện theo chuyên khoa và bác sĩ

  console.log(id, hospitalId, specialtyId);

  // fetch doctor
  const getDoctorDetail = async () => {
    try {
      setIsLoading(true);
      const res = await axiosConfig.get(`/doctors/${id}`);
      setDoctor(res?.data?.doctorDetail);
      console.log("doctorDetail", res?.data?.doctorDetail);
      if (specialtyId) {
        setSelectedSpecialty(specialtyId);
      } else if (res?.data?.doctorDetail?.specialties.length == 1) {
        setSelectedSpecialty(res?.data?.doctorDetail?.specialties[0]?.id);
      } else {
        setSelectedSpecialty(res?.data?.doctorDetail?.specialties?.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDoctorDetail();
  }, [id]);
  // dùng chuyên khoa và bác sĩ để lấy bệnh viện
  const fetchHospitalBySpecialtyAndDoctor = async () => {
    try {
      const response = await axiosConfig.get(
        `/hospital-specialties/${selectedSpecialty}/${doctor.id}/get-hospital-by-specialty-and-doctor-id`
      );
      setHospitals(response?.data);
      console.log("hospitals", response.data);
      if (response?.data?.length == 1) {
        setSelectedHospital(response?.data[0].hospitalSpecialty.hospital.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hospitalId) {
      setSelectedHospital(hospitalId);
    } else if (selectedSpecialty && doctor) {
      fetchHospitalBySpecialtyAndDoctor();
    }
  }, [selectedSpecialty, hospitalId]);

  console.log("selectedHospital", selectedHospital);
  console.log("selectedSpecialty", selectedSpecialty);
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: 10,
          flexGrow: 1,
          marginBottom: 50,
        }}
      >
        {isLoading ? (
          <View
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <ActivityIndicator size="large" color="#0165FC" />
            <Text
              style={{
                color: "#797979",
                fontSize: 12,
              }}
            >
              Đang tải...
            </Text>
          </View>
        ) : (
          <>
            <DoctorInfo doctor={doctor} />
            <Divider
              style={{
                width: "100%",
                borderWidth: 0.1,
                borderColor: "#E0E0E0",
                marginVertical: 10,
              }}
            />
            {/* Stats  */}
            <Stats />

            {/* Bác sĩ thuộc chuyên khoa - bệnh viện */}
            {doctor?.specialties?.length > 1 && (
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "bold" }}>Chọn chuyên khoa</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {doctor?.specialties.map((specialty) => (
                    <TouchableOpacity
                      key={specialty?.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                        padding: 5,
                        borderRadius: 5,
                        flex: 1,
                      }}
                      onPress={() => setSelectedSpecialty(specialty?.id)}
                    >
                      <RadioButton
                        value={specialty?.id}
                        status={
                          selectedSpecialty === specialty?.id
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => setSelectedSpecialty(specialty?.id)}
                        uncheckedColor="#888"
                        color="#0165FC"
                      />
                      <Text style={{ color: "#000" }}>{specialty?.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* bện viện radio */}
            {hospitals?.length > 1 && (
              <View>
                {hospitals?.map((hospital) => (
                  <TouchableOpacity
                    key={hospital.hospitalSpecialty.hospital.id}
                    style={{
                      backgroundColor: "#D3E6FF",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      setSelectedHospital(
                        hospital.hospitalSpecialty.hospital.id
                      )
                    }
                  >
                    <RadioButton
                      value={hospital.hospitalSpecialty.hospital.id}
                      status={
                        selectedHospital ==
                        hospital.hospitalSpecialty.hospital.id
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        setSelectedHospital(
                          hospital.hospitalSpecialty.hospital.id
                        )
                      }
                      uncheckedColor="#888"
                      color="#0165FC"
                    />
                    <Text>{hospital.hospitalSpecialty.hospital.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Book Appointment */}
            <BookAppointment
              doctor={doctor}
              selectedSpecialty={selectedSpecialty}
              selectedHospital={selectedHospital}
            />
            {/* About */}
            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  fontWeight: 700,
                  color: "#1F2937",
                  textAlign: "left",
                }}
              >
                Thông tin bác sĩ
              </Text>
              <View>
                <Text style={{}} numberOfLines={isExpanded ? null : 3}>
                  {doctor?.description}
                </Text>
                <TouchableOpacity
                  style={{ color: "#0165FC", textDecorationLine: "underline" }}
                  onPress={() => setIsExpanded(!isExpanded)}
                >
                  <Text
                    style={{
                      color: "#0165FC",
                      textDecorationLine: "underline",
                    }}
                  >
                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Review */}
              <Review doctor={doctor} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DoctorDetail;
