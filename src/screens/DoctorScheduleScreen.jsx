// // import React from "react";
// // import { View } from "react-native";
// // import { Calendar } from "react-native-big-calendar";
// // import { Dimensions } from "react-native";

// // const { width } = Dimensions.get("window");
// // const height = Dimensions.get("window").height;
// // const DoctorScheduleScreen = () => {
// //   const events = [
// //     {
// //       title: "lịch khám",
// //       start: new Date(2024, 10, 6, 10, 0), // 2024-11-06 10:00
// //       end: new Date(2024, 10, 6, 10, 30), // 2024-11-06 11:30
// //     },
// //     {
// //       title: "Meeting with team",
// //       start: new Date(2024, 10, 6, 10, 30), // 2024-11-06 10:00
// //       end: new Date(2024, 10, 6, 11, 0), // 2024-11-06 11:30
// //     },
// //     {
// //       title: "Code review",
// //       start: new Date(2024, 10, 7, 14, 0), // 2024-11-07 14:00
// //       end: new Date(2024, 10, 7, 14, 30), // 2024-11-07 15:00
// //     },
// //     {
// //       title: "Workout",
// //       start: new Date(2024, 10, 8, 6, 30), // 2024-11-08 06:30
// //       end: new Date(2024, 10, 8, 7, 0), // 2024-11-08 07:30
// //     },
// //   ];
// //   return (
// //     <View>
// //       {/* <Calendar
// //         events={events}
// //         hideNowIndicator
// //         mode="day"
// //         selectedDate="2024-11-06"
// //         onPressEvent={(event) => alert(`Selected event: ${event.title}`)}
// //         bodyContainerStyle={{
// //           backgroundColor: "white",
// //         }}

// //         height={height}
// //         rowHeight={50}
// //         headerComponent={() => (
// //           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
// //             Weekly Schedule
// //           </Text>
// //         )}
// //         eventCellStyle={{
// //           backgroundColor: "#0165e1",
// //           borderRadius: 5,
// //           height: 50,
// //           hourRowHeight: 50,
// //         }}
// //         headerContainerStyle={{
// //           backgroundColor: "#f5f5f5",
// //           height: 70,
// //         }}
// //       /> */}
// //       <Calendar
// //         mode="week"
// //         allDayEventCellStyle={{
// //           backgroundColor: "red",
// //           height: 200,
// //         }}
// //         calendarCellStyle={{
// //           backgroundColor: "red",
// //           height: 200,
// //         }}
// //         events={events}
// //         height={600}
// //         showAllDayEventCell={true}
// //       />
// //     </View>
// //   );
// // };

// // export default DoctorScheduleScreen;

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Calendar } from "react-native-big-calendar";
// import dayjs from "../apis/vi";
// import axiosConfig from "../apis/axiosConfig";

// const DoctorScheduleScreen = () => {
//   const [doctorSchedule, setDoctorSchedule] = useState([]);
//   const getDoctorSchedule = async () => {
//     try {
//       const response = await axiosConfig.get(
//         "doctor-schedules/doctor/get-schedule"
//       );
//       const data = response?.data || [];

//       // Chuyển đổi dữ liệu từ API thành events
//       const formattedEvents = data.flatMap((day) => {
//         return day.shifts.flatMap((shift) => {
//           return shift.appointmentSlots.map((slot) => {
//             const date = new Date(day.date);
//             const [startHour, startMinute] = slot.start_time.split(":");
//             const [endHour, endMinute] = slot.end_time.split(":");

//             return {
//               title: "",
//               start: new Date(
//                 date.getFullYear(),
//                 date.getMonth(),
//                 date.getDate(),
//                 parseInt(startHour),
//                 parseInt(startMinute)
//               ),
//               end: new Date(
//                 date.getFullYear(),
//                 date.getMonth(),
//                 date.getDate(),
//                 parseInt(endHour),
//                 parseInt(endMinute)
//               ),
//             };
//           });
//         });
//       });

//       setDoctorSchedule(formattedEvents);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(doctorSchedule);

//   useEffect(() => {
//     getDoctorSchedule();
//   }, []);
//   // const events = [
//   //   {
//   //     title: "Bệnh viện trung ương",
//   //     start: new Date(2024, 10, 6, 7, 30),
//   //     end: new Date(2024, 10, 6, 8, 0),
//   //   },
//   //   {
//   //     title: "Bệnh viện trung ương",
//   //     start: new Date(2024, 10, 6, 8, 0),
//   //     end: new Date(2024, 10, 6, 8, 30),
//   //   },
//   //   {
//   //     title: "Bệnh viện trung ương",
//   //     start: new Date(2024, 10, 6, 9, 30),
//   //     end: new Date(2024, 10, 6, 10, 0),
//   //   },
//   //   {
//   //     title: "Bệnh viện trung ương",
//   //     start: new Date(2024, 10, 6, 10, 0),
//   //     end: new Date(2024, 10, 6, 10, 30),
//   //   },
//   //   {
//   //     title: "Bệnh viện trung ương",
//   //     start: new Date(2024, 10, 6, 10, 30),
//   //     end: new Date(2024, 10, 6, 11, 0),
//   //   },
//   //   {
//   //     title: "Bệnh viện Trung ương Quân đội 108",
//   //     start: new Date(2024, 10, 6, 11, 0),
//   //     end: new Date(2024, 10, 6, 11, 30),
//   //   },
//   //   {
//   //     title: "Code Review",
//   //     start: new Date(2024, 10, 7, 14, 0),
//   //     end: new Date(2024, 10, 7, 14, 30),
//   //   },
//   //   {
//   //     title: "Workout",
//   //     start: new Date(2024, 10, 8, 6, 30),
//   //     end: new Date(2024, 10, 8, 7, 0),
//   //   },
//   // ];

//   return (
//     <Calendar
//       events={doctorSchedule}
//       date="2024-11-06"
//       mode="week"
//       locale="vi"
//       hourStyle={{
//         height: 100, // Làm cho chữ in đậm
//         fontSize: 14, // Tùy chỉnh kích thước chữ
//         color: "#333", // Tùy chỉnh màu chữ
//         height: 100,
//       }}
//       minHour={7}
//       maxHour={18}
//       bodyContainerStyle={{
//         backgroundColor: "#fff",
//         height: "100%",
//       }}
//       eventCellStyle={{
//         borderBottomWidth: 2,
//         borderBottomLeftRadius: 4,
//         borderBottomRightRadius: 4,
//         borderColor: "#fff",
//       }}
//       calendarCellStyle={{
//         height: 130,
//       }}
//       hourRowHeight={130}
//       headerContainerStyle={{
//         height: 70,
//       }}
//       dayHeaderStyle={{
//         height: 200,
//         position: "relative",
//         zIndex: 1000,
//         top: 0,
//         borderBottomWidth: 1,
//         borderBottomColor: "#fff",
//       }}
//       showAllDayEventCell={true}
//       dayHeaderHighlightColor="blue"
//       onPressDateHeader={(date) => {
//         console.log(date);
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   calendar: {
//     flex: 1,
//     height: 500, // Adjust the calendar height as needed
//   },
// });

// export default DoctorScheduleScreen;

// import { Calendar } from "react-native-big-calendar";
// import { View, Text } from "react-native";

// const events = [
//   {
//     title: "1",
//     start: new Date(2024, 11, 9, 7, 0),
//     end: new Date(2024, 11, 9, 11, 0),
//   },
//   {
//     title: "2",
//     start: new Date(2024, 11, 8, 13, 0),
//     end: new Date(2024, 11, 8, 17, 0),
//   },
//   {
//     title: "3",
//     start: new Date(2024, 11, 10, 7, 0),
//     end: new Date(2024, 11, 10, 11, 0),
//   },
//   {
//     title: "7h - 7h30",
//     start: new Date(2024, 11, 10, 7, 0),
//     end: new Date(2024, 11, 10, 7, 30),
//   },
//   {
//     title: "7h30 - 8h",
//     start: new Date(2024, 11, 10, 7, 30),
//     end: new Date(2024, 11, 10, 8, 0),
//   },
//   {
//     title: "8h - 8h30",
//     start: new Date(2024, 11, 10, 8, 0),
//     end: new Date(2024, 11, 10, 8, 30),
//   },
//   {
//     title: "8h30 - 9h",
//     start: new Date(2024, 11, 10, 8, 30),
//     end: new Date(2024, 11, 10, 9, 0),
//   },
//   {
//     title: "9h - 9h30",
//     start: new Date(2024, 11, 10, 9, 0),
//     end: new Date(2024, 11, 10, 9, 30),
//   },
//   {
//     title: "8h - 8h30",
//     start: new Date(2024, 11, 10, 9, 30),
//     end: new Date(2024, 11, 10, 10, 0),
//   },
// ];

// const DoctorScheduleScreen = () => {
//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Calendar
//         events={events}
//         height={600}
//         onPressCell={(cell) => {
//           console.log(cell);
//         }}
//         // headerContainerStyle={{
//         //   backgroundColor: "#fff",
//         // }}
//         mode="3days"
//         toolbar={true}
//         locale="vi"
//         minHour={7}
//         maxHour={18}
//         overlapOffset={30}
//         eventCellTextColor="#000"
//         allDayEventCellStyle={{
//           backgroundColor: "#d0e6f7",
//         }}
//         // swipeEnabled={false}
//         // hiển thị ngày chủ nhật là ngày đầu tiên
//         weekStartsOn={0}
//         onChangeDate={(date) => {
//           console.log(date);
//         }}
//         // bodyContainerStyle={{
//         //   backgroundColor: "red",
//         //   height: 600,
//         // }}
//         showTime={false}
//         // onPressDateHeader={(date) => {
//         //   console.log(date);
//         // }}
//         // eventMinHeightForMonthView={100}
//         timeslots={1}
//
//       />
//     </View>
//   );
// };

// export default DoctorScheduleScreen;

import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-big-calendar";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";
import axiosConfig from "../apis/axiosConfig";

const DoctorScheduleScreen = () => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("week");
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState();
  const [isShow, setIsShow] = useState(false);

  // màu bệnh viện
  const hospitalBackgroundColors = ["#0165e1", "#0FAF00", "#FFCDD2"];
  const hospitalBorderColors = ["#00FC26", "#F44336", "#F44336"];

  // lấy lịch của bác sĩ
  const getDoctorSchedule = async () => {
    try {
      const response = await axiosConfig.get(
        "/doctor-schedules/get-all-schedule"
      );

      const hospitalColorMap = {};
      let hospitalIndex = 0;

      // Format dữ liệu
      const formattedData = response?.data?.flatMap((item) => {
        // Xử lý ngày và giờ
        const [year, month, day] = item.date
          .split("T")[0]
          .split("-")
          .map(Number);
        const [startHour, startMinute] = item.start_time.split(":").map(Number);
        const [endHour, endMinute] = item.end_time.split(":").map(Number);

        // Nếu bệnh viện chưa có trong map, gán màu
        if (!hospitalColorMap[item.hospital.name]) {
          hospitalColorMap[item.hospital.name] = {
            backgroundColor:
              hospitalBackgroundColors[
                hospitalIndex % hospitalBackgroundColors.length
              ],
            borderColor:
              hospitalBorderColors[hospitalIndex % hospitalBorderColors.length],
          };
          hospitalIndex++;
        }

        // Lịch làm việc của bác sĩ (sự kiện chính)
        const workingScheduleEvent = {
          title: `${item.hospital.name} - ${
            item.shift_type === "morning" ? "Ca sáng" : "Ca chiều"
          } - ${startHour}:${startMinute ? startMinute : "00"} - ${
            endHour
          }:${endMinute ? endMinute : "00"}`,
          start: new Date(year, month - 1, day, startHour, startMinute),
          end: new Date(year, month - 1, day, endHour, endMinute),
          hospital: item.hospital.name,
          shift: item.shift_type,
          backgroundColor: hospitalColorMap[item.hospital.name].backgroundColor,
          borderColor: hospitalColorMap[item.hospital.name].borderColor,
          borderWidth: 2, // Độ dày viền
          // color: "#fff",
        };

        // Lịch khám đã được đặt - chỉ hiển thị thời gian
        const appointmentEvents = item.appointmentSlots.map((slot) => {
          const [slotStartHour, slotStartMinute] = slot.start_time
            .split(":")
            .map(Number);
          const [slotEndHour, slotEndMinute] = slot.end_time
            .split(":")
            .map(Number);

          // Dùng title để hiển thị thời gian
          return {
            title: `${slotStartHour}:${slotStartMinute ? slotStartMinute : "00"} - ${
              slotEndHour
            }:${slotEndMinute ? slotEndMinute : "00"}`,
            start: new Date(
              year,
              month - 1,
              day,
              slotStartHour,
              slotStartMinute
            ),
            end: new Date(year, month - 1, day, slotEndHour, slotEndMinute),
            color: "red",
            backgroundColor: "#ff2000", // Màu sắc cho lịch khám đã đặt
            borderWidth: 1, // Độ dày viền cho lịch khám đã đặt
          };
        });

        // Kết hợp lịch làm việc và lịch khám
        return [workingScheduleEvent, ...appointmentEvents];
      });

      setDoctorSchedule(formattedData.flat() || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorSchedule();
  }, []);
  console.log(doctorSchedule);
  // fortmat dữ liệu hiển thị

  const eventCellStyle = (event) => {
    return {
      backgroundColor: event.backgroundColor,
      borderColor: event.borderColor,
      // color: event.color,

      borderRadius: 5,

      // fontSize: 20,
    };
  };

  const handlePressDateHeader = (date) => {
    setSelectedDate(new Date(date));
    setMode("day");
  };
  console.log(moment(calendarDate).format("YYYY-MM-DD"));
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: 35 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              {`${moment(calendarDate).format("YYYY")} Tháng ${moment(
                calendarDate
              ).format("MM")}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => setVisible(!visible)}
            >
              <FontAwesome name="calendar" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* chọn hiển thị */}
        {visible && (
          <View
            style={{
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                paddingHorizontal: 16,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  setMode("month");
                  setVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={20}
                  color={mode === "month" ? "#0165e1" : "#000"}
                />
                <Text
                  style={{
                    fontWeight: "300",
                    color: mode === "month" ? "#0165e1" : "#000",
                  }}
                >
                  Tháng
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  setMode("week");
                  setVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-week"
                  size={20}
                  color={mode === "week" ? "#0165e1" : "#000"}
                />
                <Text
                  style={{
                    fontWeight: "300",
                    color: mode === "week" ? "#0165e1" : "#000",
                  }}
                >
                  Tuần
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  setMode("3days");
                  setVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-range"
                  size={20}
                  color={mode === "3days" ? "#0165e1" : "#000"}
                />
                <Text
                  style={{
                    fontWeight: "300",
                    color: mode === "3days" ? "#0165e1" : "#000",
                  }}
                >
                  3 ngày
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => {
                  setMode("day");
                  setVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-today"
                  size={20}
                  color={mode === "day" ? "#0165e1" : "#000"}
                />
                <Text
                  style={{
                    fontWeight: "300",
                    color: mode === "day" ? "#0165e1" : "#000",
                  }}
                >
                  Ngày
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Calendar
          events={doctorSchedule}
          height={600}
          mode={mode}
          eventCellTextColor="#fff"
          locale="vi"
          minHour={6}
          maxHour={22}
          onSwipeEnd={(date) => {
            setCalendarDate(date);
          }}
          eventCellStyle={eventCellStyle}
          headerContainerStyle={{
            height:
              mode === "day" || mode === "3days" || mode === "week" ? 60 : 30,
          }}
          overlapOffset={mode === "week" ? 10 : mode === "3days" ? 30 : 40}
          showTime={false}
          date={selectedDate}
          onPressDateHeader={handlePressDateHeader}
          showVerticalScrollIndicator={false}
          // onChangeDate={(date) => {
          //   setCalendarDate(date);
          //   console.log(calendarDate);
          // }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#4995F9",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",

            position: "absolute",
            bottom: 10,
            right: 20,
            zIndex: 1000,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            setSelectedDate(new Date());
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
            {moment(new Date()).format("DD")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DoctorScheduleScreen;
