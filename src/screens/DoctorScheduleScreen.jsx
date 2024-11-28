// import React from "react";
// import { View } from "react-native";
// import { Calendar } from "react-native-big-calendar";
// import { Dimensions } from "react-native";

// const { width } = Dimensions.get("window");
// const height = Dimensions.get("window").height;
// const DoctorScheduleScreen = () => {
//   const events = [
//     {
//       title: "lịch khám",
//       start: new Date(2024, 10, 6, 10, 0), // 2024-11-06 10:00
//       end: new Date(2024, 10, 6, 10, 30), // 2024-11-06 11:30
//     },
//     {
//       title: "Meeting with team",
//       start: new Date(2024, 10, 6, 10, 30), // 2024-11-06 10:00
//       end: new Date(2024, 10, 6, 11, 0), // 2024-11-06 11:30
//     },
//     {
//       title: "Code review",
//       start: new Date(2024, 10, 7, 14, 0), // 2024-11-07 14:00
//       end: new Date(2024, 10, 7, 14, 30), // 2024-11-07 15:00
//     },
//     {
//       title: "Workout",
//       start: new Date(2024, 10, 8, 6, 30), // 2024-11-08 06:30
//       end: new Date(2024, 10, 8, 7, 0), // 2024-11-08 07:30
//     },
//   ];
//   return (
//     <View>
//       {/* <Calendar
//         events={events}
//         hideNowIndicator
//         mode="day"
//         selectedDate="2024-11-06"
//         onPressEvent={(event) => alert(`Selected event: ${event.title}`)}
//         bodyContainerStyle={{
//           backgroundColor: "white",
//         }}

//         height={height}
//         rowHeight={50}
//         headerComponent={() => (
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//             Weekly Schedule
//           </Text>
//         )}
//         eventCellStyle={{
//           backgroundColor: "#0165e1",
//           borderRadius: 5,
//           height: 50,
//           hourRowHeight: 50,
//         }}
//         headerContainerStyle={{
//           backgroundColor: "#f5f5f5",
//           height: 70,
//         }}
//       /> */}
//       <Calendar
//         mode="week"
//         allDayEventCellStyle={{
//           backgroundColor: "red",
//           height: 200,
//         }}
//         calendarCellStyle={{
//           backgroundColor: "red",
//           height: 200,
//         }}
//         events={events}
//         height={600}
//         showAllDayEventCell={true}
//       />
//     </View>
//   );
// };

// export default DoctorScheduleScreen;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-big-calendar";
import dayjs from "../apis/vi";
import axiosConfig from "../apis/axiosConfig";

const DoctorScheduleScreen = () => {
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const getDoctorSchedule = async () => {
    try {
      const response = await axiosConfig.get(
        "doctor-schedules/doctor/get-schedule"
      );
      const data = response?.data || [];

      // Chuyển đổi dữ liệu từ API thành events
      const formattedEvents = data.flatMap((day) => {
        return day.shifts.flatMap((shift) => {
          return shift.appointmentSlots.map((slot) => {
            const date = new Date(day.date);
            const [startHour, startMinute] = slot.start_time.split(":");
            const [endHour, endMinute] = slot.end_time.split(":");

            return {
              title: "",
              start: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(startHour),
                parseInt(startMinute)
              ),
              end: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                parseInt(endHour),
                parseInt(endMinute)
              ),
            };
          });
        });
      });

      setDoctorSchedule(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(doctorSchedule);

  useEffect(() => {
    getDoctorSchedule();
  }, []);
  // const events = [
  //   {
  //     title: "Bệnh viện trung ương",
  //     start: new Date(2024, 10, 6, 7, 30),
  //     end: new Date(2024, 10, 6, 8, 0),
  //   },
  //   {
  //     title: "Bệnh viện trung ương",
  //     start: new Date(2024, 10, 6, 8, 0),
  //     end: new Date(2024, 10, 6, 8, 30),
  //   },
  //   {
  //     title: "Bệnh viện trung ương",
  //     start: new Date(2024, 10, 6, 9, 30),
  //     end: new Date(2024, 10, 6, 10, 0),
  //   },
  //   {
  //     title: "Bệnh viện trung ương",
  //     start: new Date(2024, 10, 6, 10, 0),
  //     end: new Date(2024, 10, 6, 10, 30),
  //   },
  //   {
  //     title: "Bệnh viện trung ương",
  //     start: new Date(2024, 10, 6, 10, 30),
  //     end: new Date(2024, 10, 6, 11, 0),
  //   },
  //   {
  //     title: "Bệnh viện Trung ương Quân đội 108",
  //     start: new Date(2024, 10, 6, 11, 0),
  //     end: new Date(2024, 10, 6, 11, 30),
  //   },
  //   {
  //     title: "Code Review",
  //     start: new Date(2024, 10, 7, 14, 0),
  //     end: new Date(2024, 10, 7, 14, 30),
  //   },
  //   {
  //     title: "Workout",
  //     start: new Date(2024, 10, 8, 6, 30),
  //     end: new Date(2024, 10, 8, 7, 0),
  //   },
  // ];

  return (
    <Calendar
      events={doctorSchedule}
      date="2024-11-06"
      mode="week"
      locale="vi"
      hourStyle={{
        height: 100, // Làm cho chữ in đậm
        fontSize: 14, // Tùy chỉnh kích thước chữ
        color: "#333", // Tùy chỉnh màu chữ
        height: 100,
      }}
      minHour={7}
      maxHour={18}
      bodyContainerStyle={{
        backgroundColor: "#fff",
        height: "100%",
      }}
      eventCellStyle={{
        borderBottomWidth: 2,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderColor: "#fff",
      }}
      calendarCellStyle={{
        height: 130,
      }}
      hourRowHeight={130}
      headerContainerStyle={{
        height: 70,
      }}
      dayHeaderStyle={{
        height: 200,
        position: "relative",
        zIndex: 1000,
        top: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
      }}
      showAllDayEventCell={true}
      dayHeaderHighlightColor="blue"
      onPressDateHeader={(date) => {
        console.log(date);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calendar: {
    flex: 1,
    height: 500, // Adjust the calendar height as needed
  },
});

export default DoctorScheduleScreen;
