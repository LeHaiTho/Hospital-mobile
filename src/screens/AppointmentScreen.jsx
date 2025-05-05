import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AppointmentCard from "../components/AppointmentCard";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import axiosConfig from "../apis/axiosConfig";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Upcoming = ({ appointments, getAppointments, refreshing, isLoading }) => {
  const upcomingAppointments = appointments?.filter(
    (appointment) =>
      appointment.status === "pending" || appointment.status === "confirmed"
  );
  const renderAppointment = ({ item }) => {
    return <AppointmentCard appointment={item} />;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0165FF" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
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
            initialNumToRender={3}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
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
      )}
    </View>
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
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
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
    </View>
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
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const routes = [
    {
      title: "Sắp tới",
      component: (
        <Upcoming
          appointments={appointments}
          getAppointments={getAppointments}
          refreshing={refreshing}
          isLoading={isLoading}
        />
      ),
    },
    {
      title: "Hoàn thành",
      component: (
        <Completed
          appointments={appointments}
          getAppointments={getAppointments}
          refreshing={refreshing}
        />
      ),
    },
    {
      title: "Đã hủy",
      component: (
        <Cancelled
          appointments={appointments}
          getAppointments={getAppointments}
          refreshing={refreshing}
        />
      ),
    },
  ];
  const navigation = useNavigation();
  const getAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axiosConfig.get(
        `/appointments/get-appointment-by-user-id`
      );
      setAppointments(response.data.appointmentList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  console.log(user);
  useEffect(() => {
    if (user) {
      getAppointments();
    } else {
      navigation.replace("Login");
    }
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {!user ? (
        <ActivityIndicator size="large" color="#0165FF" />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",

              backgroundColor: "#fff",

              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingHorizontal: 16,

              borderBottomWidth: 0.6,
              borderBottomColor: "#D9D9D9",
            }}
          >
            {routes.map((route, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  borderBottomWidth: 2,
                  borderColor: index === i ? "#0165FF" : "transparent",
                  paddingHorizontal: 20,
                  paddingBottom: 7,
                }}
                onPress={() => setIndex(i)}
              >
                <Text
                  style={{
                    fontWeight: index === i ? "700" : "400",
                    color: "#000",
                    fontSize: 16,
                  }}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flex: 1 }}>{routes[index].component}</View>
        </>
      )}
    </View>
  );
};

export default AppointmentScreen;
