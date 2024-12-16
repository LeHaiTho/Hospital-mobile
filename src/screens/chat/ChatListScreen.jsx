import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import axiosConfig from "../../apis/axiosConfig";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/150" },
  { id: 2, name: "Jane Doe", avatar: "https://via.placeholder.com/150" },
  { id: 3, name: "John Smith", avatar: "https://via.placeholder.com/150" },
];

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Avatar.Image source={{ uri: item.avatar }} size={60} />
      <Text style={{}}>{item.name.split(" ")[0]}</Text>
    </View>
  );
};

const ChatListScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const getInfoDoctor = async () => {
    try {
      const response = await axiosConfig.get(
        `/users/get-info-doctor/${user.id}`
      );
      const getAllChatRoomOfDoctor = await axiosConfig.get(
        `/chat-rooms/${response.data.user.id}`
      );
      // lấy user của từng chat room
      setChatRooms(getAllChatRoomOfDoctor.data.chatRooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfoDoctor();
  }, [user]);

  const renderChatItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate("Chat", { chatRoomId: item.room_id });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingVertical: 3,
            paddingRight: 10,
          }}
        >
          <Avatar.Image source={{ uri: item.avatar }} size={55} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.user.fullname}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text numberOfLines={1} style={{ color: "gray", flex: 1 }}>
                DSAHSAJK
              </Text>
              <Text style={{ color: "gray" }}>
                {moment(item.createdAt).format("HH:mm")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 16,
        }}
      >
        <TextInput
          placeholderTextColor="gray"
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: 50,
            paddingHorizontal: 15,
            paddingVertical: 6,
            color: "#000",
          }}
          placeholder="Tìm kiếm"
        />

        <FlatList
          style={{}}
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{
            gap: 10,
          }}
          horizontal
        />

        <FlatList
          scrollEnabled={false}
          data={chatRooms}
          renderItem={renderChatItem}
          contentContainerStyle={{
            gap: 10,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListScreen;
