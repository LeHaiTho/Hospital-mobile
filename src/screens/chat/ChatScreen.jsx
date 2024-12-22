import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../utils/socket";
import { useSelector } from "react-redux";
import axiosConfig from "../../apis/axiosConfig";

import moment from "moment";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { doctorId, doctorName, doctorAvatar, chatRoomId, info } =
    route.params || {};
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const flatListRef = useRef(null);

  console.log("usertrtretete", user);
  console.log(chatRoomId);
  useEffect(() => {
    if (user.role.name === "doctor" || user.role === "doctor") {
      const fetchMessages = async () => {
        const response = await axiosConfig.get(
          `${baseUrl}/messages/${chatRoomId.id}`
        );
        // console.log("response", response.data.messages);
        setMessages(response.data.messages);
      };
      fetchMessages();
      socket.emit("join-room", { roomId: chatRoomId?.room_id });
      console.log("đã đọc");
      // console.log("messages", messages);
    }
    if (user.role.name === "customer" || user.role === "customer") {
      console.log("chatRoomId", user);
      const fetchChatRoom = async () => {
        const response = await axiosConfig.post(
          `${baseUrl}/chat-rooms/create`,
          {
            patient_id: user.id,
            doctor_id: doctorId,
          }
        );
        // console.log("response", response.data.chatRoom);
        fetchMessages(response.data.chatRoom.id);
      };
      const fetchMessages = async (id) => {
        const response = await axiosConfig.get(
          // `${baseUrl}/messages/${`room-${user.id}-${doctorId}`}/messages`
          `${baseUrl}/messages/${id}`
        );
        // console.log("response", response.data.messages);
        setMessages(response.data.messages);
        console.log("messages", messages);
      };
      fetchChatRoom();
      // fetchMessages();
      socket.emit("join-room", { roomId: `room-${user.id}-${doctorId}` });
    }
  }, []);
  console.log("info", info);
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("send-message", {
        message: newMessage,
        roomId:
          user.role.name === "doctor" || user.role === "doctor"
            ? chatRoomId?.room_id
            : `room-${user.id}-${doctorId}`,
      });
      setNewMessage("");
    }
  };
  // receive message
  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
      console.log("message", message);
    });
    return () => {
      socket.off("receive-message");
    };
  }, []);
  const handleCheck = async () => {
    try {
      const response = await axiosConfig.post(`/subscriptions/check`);
      if (response.data.subscription.length === 0) {
        navigation.navigate("Packages");
      } else {
        return;
      }
    } catch (error) {}
  };
  const shouldShowTime = (currentMessage, previousMessage) => {
    if (!previousMessage) return true; // Hiển thị thời gian cho tin nhắn đầu tiên
    const currentTime = moment(currentMessage.createdAt);
    const previousTime = moment(previousMessage.createdAt);
    const diffMinutes = currentTime.diff(previousTime, "minutes");
    return diffMinutes >= 5; // Chỉ hiển thị thời gian nếu cách nhau 5 phút
  };
  const renderItem = ({ item, index }) => {
    // Hàm tính toán và kiểm tra thời gian

    const showTime = shouldShowTime(item, messages[index - 1]); // Kiểm tra nếu thời gian cần hiển thị
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: "50%",
          alignSelf: item.sender_id === user.id ? "flex-end" : "flex-start",

          justifyContent:
            item.sender_id === user.id ? "flex-end" : "flex-start",
        }}
      >
        <View
          style={{
            backgroundColor: item.sender_id === user.id ? "#0165FC" : "#F2F2F2",
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: item.sender_id === user.id ? "#fff" : "#000" }}>
            {item.content}
          </Text>
          {showTime && (
            <Text
              style={{
                color: item.sender_id === user.id ? "#fff" : "#000",
                fontSize: 10,
                textAlign: item.sender_id === user.id ? "right" : "left",
              }}
            >
              {moment(item.createdAt).format("HH:mm")}
            </Text>
          )}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View
        style={{
          paddingVertical: 30,
          paddingBottom: 10,
          backgroundColor: "#0165FC",
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Avatar.Image
              source={{
                uri: doctorAvatar
                  ? `${baseUrl}${doctorAvatar}`
                  : info.gender === true
                    ? "https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg"
                    : "https://img.freepik.com/premium-photo/3d-rendering-cute-little-girl-wearing-yellow-dress_877354-275.jpg",
              }}
              size={45}
            />
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {doctorName ||
                `${info?.user?.gender ? "Nam" : "Nữ"} ${info?.user?.date_of_birth ? `(${new Date().getFullYear() - info.user.date_of_birth.split("-")[0]} tuổi)` : ""}`}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={messages}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        inverted={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 5,
          paddingBottom: 10,
        }}
        // onContentSizeChange={() => {
        //   flatListRef.current?.scrollToEnd({ animated: true });
        // }}
        style={{ flex: 1, marginBottom: 0 }}
      />
      <View
        style={{
          bottom: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 12,
          paddingVertical: 6,
          gap: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <AntDesign name="pluscircle" size={24} color="#0165FC" />
          <Entypo name="camera" size={24} color="#0165FC" />
          <FontAwesome name="picture-o" size={24} color="#0165FC" />
          <FontAwesome name="microphone" size={24} color="#0165FC" />
        </View>
        <TextInput
          placeholder="Nhập tin nhắn"
          value={newMessage}
          onChangeText={setNewMessage}
          style={{
            backgroundColor: "#F2F2F2",
            borderRadius: 50,
            paddingHorizontal: 13,
            paddingVertical: 7,
            flex: 1,
          }}
          onFocus={handleCheck}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#0165FC" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
