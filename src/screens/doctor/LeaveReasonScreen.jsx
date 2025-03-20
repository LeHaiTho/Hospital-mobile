import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import axiosConfig from "../../apis/axiosConfig";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const LeaveReasonScreen = () => {
  const navigation = useNavigation();
  const [checkedWorkplace, setCheckedWorkplace] = useState(null);

  const [showPicker, setShowPicker] = useState({
    fromTime: false,
    fromDate: false,
    toTime: false,
    toDate: false,
  });
  const [mode, setMode] = useState("date");

  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    workplace: null,
    fromTime: moment(new Date()).format("HH:mm"),
    fromDate: moment(new Date()).format("DD/MM/YYYY"),
    toTime: moment(new Date()).format("HH:mm"),
    toDate: moment(new Date()).format("DD/MM/YYYY"),
  });

  const showDatePicker = (field) => {
    setShowPicker((prev) => ({ ...prev, [field]: true }));
    setMode("date");
  };

  const showTimePicker = (field) => {
    setShowPicker((prev) => ({ ...prev, [field]: true }));
    setMode("time");
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === "workplace") {
      setCheckedWorkplace(value);
    }
  };
  const handleDateChange = (event, selectedDate, field) => {
    setShowPicker((prev) => ({ ...prev, [field]: false }));

    if (selectedDate) {
      const formattedValue = field.includes("Time")
        ? moment(selectedDate).format("HH:mm")
        : moment(selectedDate).format("DD/MM/YYYY");

      setFormData((prevData) => ({
        ...prevData,
        [field]: formattedValue,
      }));
    }
  };

  const showPickerHandler = (field) => {
    setShowPicker((prev) => ({ ...prev, [field]: true }));
  };

  const [hospitalList, setHospitalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getHospitalList = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get(
        "/doctor-schedules/doctor/get-workplace"
      );
      setHospitalList(response.data);
      if (response.data.length === 1) {
        setFormData((prevData) => ({
          ...prevData,
          workplace: response.data[0].id,
        }));
      }
    } catch (error) {
      console.log("Error getting hospital list:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHospitalList();
  }, []);
  console.log(formData.workplace);
  const handleSubmit = async () => {
    try {
      const response = await axiosConfig.post(
        "/doctor-unavailable-times/create",
        formData
      );
      navigation.replace("TimeOffList");
    } catch (error) {
      console.log("Error creating doctor unavailable time:", error);
    }
  };
  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color="#0165FC" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={{
              padding: 20,
              backgroundColor: "#fff",
              gap: 20,
            }}
          >
            <View style={{ gap: 20, paddingBottom: 100 }}>
              {/* Tiêu đề */}
              <View style={{ gap: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tiêu đề </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <TextInput
                  placeholder="Nhập lý do"
                  placeholderTextColor="#999"
                  style={{
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderColor: "#E0E0E0",
                    color: "#000",
                  }}
                  onChangeText={(value) => handleInputChange("title", value)}
                  value={formData.title}
                />
              </View>
              <View style={{ gap: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Nơi làm việc</Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <View
                  style={{
                    gap: 10,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderColor: "#E0E0E0",
                    borderRadius: 10,
                    paddingHorizontal: 3,
                  }}
                >
                  {hospitalList.length > 1 &&
                    hospitalList?.map((item) => {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}
                          onPress={() =>
                            handleInputChange("workplace", item.id)
                          }
                        >
                          <RadioButton
                            value={item.id}
                            status={
                              checkedWorkplace === item.id
                                ? "checked"
                                : "unchecked"
                            }
                            uncheckedColor="#888"
                            color="#0165FC"
                          />
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  {hospitalList.length === 1 && (
                    <Text style={{ paddingHorizontal: 10 }}>
                      {hospitalList[0].name}
                    </Text>
                  )}
                </View>
              </View>
              {/* Date picker */}
              <View style={{ gap: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Thời gian nghỉ </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <View
                  style={{
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 20,
                      }}
                    >
                      <Text>Từ lúc</Text>
                      <TouchableOpacity
                        onPress={() => showPickerHandler("fromTime")}
                      >
                        <Text>{formData.fromTime}</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 10,
                        gap: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Từ ngày</Text>
                      <TouchableOpacity
                        onPress={() => showPickerHandler("fromDate")}
                      >
                        <Text>{formData.fromDate}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 10,
                        gap: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Đến lúc</Text>
                      <TouchableOpacity
                        onPress={() => showPickerHandler("toTime")}
                      >
                        <Text>{formData.toTime}</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 10,
                        gap: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Đến ngày</Text>
                      <TouchableOpacity
                        onPress={() => showPickerHandler("toDate")}
                      >
                        <Text>{formData.toDate}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {showPicker.fromTime && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="spinner"
                    onChange={(event, date) =>
                      handleDateChange(event, date, "fromTime")
                    }
                  />
                )}

                {showPicker.fromDate && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) =>
                      handleDateChange(event, date, "fromDate")
                    }
                  />
                )}

                {showPicker.toTime && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="spinner"
                    onChange={(event, date) =>
                      handleDateChange(event, date, "toTime")
                    }
                  />
                )}

                {showPicker.toDate && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) =>
                      handleDateChange(event, date, "toDate")
                    }
                  />
                )}
              </View>

              {/* Lý do */}
              <View style={{ gap: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Lý do </Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <TextInput
                  placeholder="Nhập lý do"
                  placeholderTextColor="#999"
                  style={{
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderColor: "#E0E0E0",
                    color: "#000",
                    textAlignVertical: "top",
                  }}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(value) => handleInputChange("reason", value)}
                  value={formData.reason}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              position: "absolute",
              bottom: 0,
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10, // Increase the shadow height for more elevation
              },
              shadowOpacity: 0.9, // Increase opacity to make it darker
              shadowRadius: 15, // Increase radius for a larger blur effect
              elevation: 10, // Higher elevation for Android
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#0165FC",
                padding: 15,
                borderRadius: 100,
                width: "100%",
                alignItems: "center",
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                Gửi lịch nghỉ
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default LeaveReasonScreen;
