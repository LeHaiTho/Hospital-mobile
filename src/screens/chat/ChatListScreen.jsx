import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import axiosConfig from "../../apis/axiosConfig";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../../utils/socket";

const data = [
  { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/150" },
  { id: 2, name: "Jane Doe", avatar: "https://via.placeholder.com/150" },
  { id: 3, name: "John Smith", avatar: "https://via.placeholder.com/150" },
];
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const renderItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Image
        source={{
          uri: item.avatar,
        }}
        style={{ width: 60, height: 60, borderRadius: 100 }}
      />
      <Text style={{}}>{item?.name?.split(" ")[0]}</Text>
    </View>
  );
};

const ChatListScreen = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInfoDoctor = async () => {
    try {
      setIsLoading(true);
      const response = await axiosConfig.get(
        `/users/get-info-doctor/${user.id}`
      );
      console.log(response.data.user.id);
      const getAllChatRoomOfDoctor = await axiosConfig.get(
        `/chat-rooms/${response.data.user.id}`
      );
      // lấy user của từng chat room
      setChatRooms(getAllChatRoomOfDoctor.data);
      // getAllChatRoomOfDoctor?.data?.forEach((room) => {
      //   // socket.emit("join-room", room.room_id);
      // });
      const rooms = getAllChatRoomOfDoctor.data.map((room) => room.room_id);
      rooms.forEach((roomId) => {
        socket.emit("join-room", roomId); // Join vào mỗi phòng
        console.log(`Joined room: ${roomId}`); // In ra log xác nhận
      });
      // Join vào tất cả các phòng mà người dùng có quyền tham gia

      socket.on("receive-message", (message) => {
        console.log("Received message:", message);
        // Xử lý và hiển thị tin nhắn
      });

      return () => {
        socket.off("receive-message"); // Cleanup khi component bị hủy
      };
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // Chỉ lấy room_id từ các phòng

  // useEffect(() => {
  //   const rooms = chatRooms.map((room) => room.room_id); // Chỉ lấy room_id từ các phòng
  //   console.log(rooms);
  //   // Tham gia các phòng qua socket
  //   // rooms.forEach((roomId) => {
  //   //   socket.emit("join-room", roomId);
  //   //   console.log("join-room", roomId);
  //   // });
  //   // return
  // }, []);
  useEffect(() => {
    getInfoDoctor();
  }, []);
  useEffect(() => {
    // Lắng nghe sự kiện "receive-message" từ socket
    socket.on("receive-message", (message) => {
      console.log("Received message:", message);

      // Cập nhật chatRooms khi nhận được tin nhắn mới
      setChatRooms((prevRooms) => {
        // Tìm phòng tương ứng với room_id trong chatRooms
        const updatedRooms = prevRooms.map((room) => {
          if (room.id === message.room_id) {
            // Thêm tin nhắn mới vào danh sách tin nhắn của phòng
            return {
              ...room,
              messages: [...room.messages, message], // Thêm tin nhắn mới vào phòng
            };
          }
          return room; // Không thay đổi phòng khác
        });
        return updatedRooms;
      });
    });

    // Cleanup: Hủy lắng nghe sự kiện khi component bị hủy
    return () => {
      socket.off("receive-message");
    };
  }, [chatRooms]);
  console.log("7777777777777777777777777777", chatRooms?.[0]?.messages);
  const renderChatItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          navigation.navigate("Chat", {
            chatRoomId: item,
            info: {
              avatar: item?.user?.avatar,
              gender: item?.user?.gender,
              date_of_birth: item?.user?.date_of_birth,
            },
          });
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
          <Avatar.Image
            source={{
              uri:
                // uri: item?.user?.avatar
                //   ? `${BASE_URL}${item.user.avatar}`
                //   : item?.user?.gender === true
                item?.user?.gender === true
                  ? "https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg"
                  : "https://img.freepik.com/premium-photo/3d-rendering-cute-little-girl-wearing-yellow-dress_877354-275.jpg",
            }}
            size={55}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>
              {`${item?.user?.gender ? "Nam" : "Nữ"} ${item?.user?.date_of_birth ? `(${new Date().getFullYear() - item.user.date_of_birth.split("-")[0]} tuổi)` : ""}`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text numberOfLines={1} style={{ color: "gray", flex: 1 }}>
                {item?.messages?.[item?.messages.length - 1]?.content}
              </Text>
              <Text style={{ color: "gray" }}>
                {moment(
                  item?.messages?.[item?.messages?.length - 1]?.createdAt
                ).format("HH:mm")}
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

        {/* <FlatList
          style={{}}
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{
            gap: 10,
          }}
          horizontal
        /> */}
        {/* <View>
          <Text>Tất cả các </Text>
        </View> */}
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <ActivityIndicator size="large" color="#0165FC" />
              <Text style={{ color: "gray", fontSize: 12 }}>
                Đang tải dữ liệu...
              </Text>
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={chatRooms}
              renderItem={renderChatItem}
              contentContainerStyle={{
                gap: 10,
              }}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Hiện tại không có cuộc trò chuyện nào</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListScreen;
