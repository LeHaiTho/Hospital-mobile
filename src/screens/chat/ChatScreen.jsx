import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.auth.user.id); // ID giả định của người dùng hiện tại
  const receiverId = "456"; // ID giả định của người nhận

  // Sử dụng useRef để giữ socket duy nhất
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      // Tạo kết nối socket chỉ một lần
      socketRef.current = io("http://192.168.1.3:3000");

      // Gửi sự kiện 'join' đến server
      socketRef.current.emit("join", userId);

      // Lắng nghe sự kiện 'receive-message' từ server
      socketRef.current.on("receive-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // return () => {
    //   if (socketRef.current) {
    //     socketRef.current.off("receive-message");
    //     socketRef.current.disconnect(); // Ngắt kết nối khi không còn dùng
    //   }
    // };
  }, []);

  const handleSendMessage = () => {
    const message = {
      senderId: userId,
      receiverId,
      content: newMessage,
    };

    // Gửi tin nhắn đến server
    socketRef.current.emit("send-message", message);

    // Cập nhật giao diện
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              {item.senderId === userId ? "Bạn: " : "Người gửi: "}
              {item.content}
            </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Nhập tin nhắn..."
      />
      <Button title="Gửi" onPress={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
  },
});

export default ChatScreen;
