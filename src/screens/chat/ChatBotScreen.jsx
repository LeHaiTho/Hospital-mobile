import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import moment from "moment";
import axiosConfig from "../../apis/axiosConfig";
import { random } from "lodash";
import { useNavigation } from "@react-navigation/native";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const ChatBotScreen = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const initialBotMessage = {
      sender_id: 2,
      content:
        "Xin chào! Tôi là chatbot hỗ trợ bạn. Bạn khỏe không? Có điều gì thú vị đang xảy ra không?",
      createdAt: new Date(),
    };
    setMessages([initialBotMessage]);
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    const message = {
      sender_id: 1, // Tin nhắn của người dùng
      content: newMessage,
      createdAt: new Date(),
    };

    // Cập nhật tin nhắn mới vào danh sách
    setMessages((prevMessages) => [message, ...prevMessages]);
    setNewMessage(""); // Xóa tin nhắn đã nhập

    try {
      const response = await axiosConfig.post("/chatbot/chat", {
        question: newMessage,
      });
      if (response.status === 200) {
        const botMessage = {
          id: message.length + 2,
          sender_id: 2,
          content: response.data,
          createdAt: new Date(),
        };
        setMessages((prevMessages) => [botMessage, ...prevMessages]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(messages);
  const renderList = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "80%",
            alignSelf: item.sender_id === 1 ? "flex-end" : "flex-start",
            justifyContent: item.sender_id === 1 ? "flex-end" : "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: item.sender_id === 1 ? "#0165FC" : "#F2F2F2",
              padding: 10,
              borderRadius: 20,
              gap: 10,
            }}
          >
            <Text style={{ color: item.sender_id === 1 ? "#fff" : "#000" }}>
              {item?.content?.ai_response || item.content}
            </Text>

            {item?.content?.hospitals && (
              <View
                style={{
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "#f20000",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Cơ sở y tế giúp ích cho bạn:
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    flexDirection: "row",
                    gap: 10,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("HospitalDetail", {
                      id: item.content.hospitals.id,
                    })
                  }
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      marginVertical: 5,
                      overflow: "hidden",
                    }}
                    source={{
                      uri: `${BASE_URL}${item?.content?.hospitals?.banner}`,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#0165fc",
                      }}
                      numberOfLines={1}
                    >
                      {item?.content?.hospitals?.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 12,
                        color: "#797979",
                      }}
                    >
                      {item?.content?.hospitals?.address}
                    </Text>
                    <Text
                      style={{
                        color: "#0165fc",
                        fontSize: 12,
                        fontWeight: "500",
                        marginTop: 5,
                        textAlign: "right",
                      }}
                    >
                      Chi tiết
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <Text
              style={{
                color: item.sender_id === 1 ? "#fff" : "#000",
                fontSize: 10,
                textAlign: item.sender_id === 1 ? "right" : "left",
              }}
            >
              {moment(item.createdAt).format("HH:mm")}
            </Text>
          </View>
        </View>
      </>
    );
  };

  console.log(messages);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        data={messages}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        inverted={true}
        contentContainerStyle={{ padding: 12, gap: 12, marginBottom: 100 }}
        ListFooterComponent={<View style={{ height: 100 }} />}
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
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#0165FC" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBotScreen;
