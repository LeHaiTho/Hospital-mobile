import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import AppointmentCard from "../components/AppointmentCard";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";
const Upcoming = ({ appointments, getAppointments, refreshing }) => {
  const upcomingAppointments = appointments?.filter(
    (appointment) =>
      appointment.status === "pending" || appointment.status === "confirmed"
  );
  const renderAppointment = ({ item }) => {
    return <AppointmentCard appointment={item} />;
  };
  return (
    <FlatList
      onRefresh={getAppointments}
      refreshing={refreshing}
      data={upcomingAppointments}
      renderItem={renderAppointment}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        backgroundColor: "#fff",
      }}
      ListEmptyComponent={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ textAlign: "center", color: "#797979" }}>
            Không có lịch hẹn nào
          </Text>
        </View>
      }
    />
  );
};
const Completed = ({ appointments, getAppointments, refreshing }) => {
  const completedAppointments = appointments?.filter(
    (appointment) => appointment.status === "completed"
  );
  const renderAppointment = ({ item }) => {
    return <AppointmentCard appointment={item} />;
  };
  return (
    <FlatList
      data={completedAppointments}
      onRefresh={getAppointments}
      refreshing={refreshing}
      renderItem={renderAppointment}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        backgroundColor: "#fff",
      }}
      // ListEmptyComponent={
      //   <View
      //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      //   >
      //     <Text style={{ textAlign: "center", color: "#797979" }}>
      //       Không có lịch hẹn nào
      //     </Text>
      //   </View>
      // }
    />
  );
};
const Cancelled = ({ appointments, getAppointments, refreshing }) => {
  const cancelledAppointments = appointments?.filter(
    (appointment) => appointment.status === "cancelled"
  );
  const renderAppointment = ({ item }) => {
    return <AppointmentCard appointment={item} />;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={cancelledAppointments || []}
        onRefresh={getAppointments}
        refreshing={refreshing}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          backgroundColor: "#fff",
        }}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "#797979" }}>
              Không có lịch hẹn nào
            </Text>
          </View>
        }
      />
    </View>
  );
};

const renderScene = ({ route, appointments, getAppointments, refreshing }) => {
  switch (route.key) {
    case "upcoming":
      return (
        <Upcoming
          appointments={appointments}
          getAppointments={getAppointments}
          refreshing={refreshing}
        />
      );
    case "completed":
      return (
        <Completed
          appointments={appointments}
          getAppointments={getAppointments}
          refreshing={refreshing}
        />
      );
    case "cancelled":
      return (
        <Cancelled
          appointments={appointments}
          getAppointments={getAppointments}
          refreshing={refreshing}
        />
      );
    default:
      return null;
  }
};

const AppointmentScreen = () => {
  const [index, setIndex] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [routes] = useState([
    { key: "upcoming", title: "Sắp tới" },
    { key: "completed", title: "Hoàn thành" },
    { key: "cancelled", title: "Đã hủy" },
  ]);
  const navigation = useNavigation();
  const getAppointments = async () => {
    try {
      const response = await axiosConfig.get(
        `/appointments/get-appointment-by-user-id`
      );
      setAppointments(response.data.appointmentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [navigation]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) =>
        renderScene({
          route,
          appointments,
          getAppointments,
          refreshing,
        })
      }
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "#0165FF" }}
          labelStyle={{
            color: "#000",
            textTransform: "none",
            textAlign: "center",
          }}
          style={{ backgroundColor: "#fff" }}
          tabStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          renderLabel={({ route, focused }) => (
            <Text style={{ color: focused ? "#0165FF" : "#000" }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default AppointmentScreen;
