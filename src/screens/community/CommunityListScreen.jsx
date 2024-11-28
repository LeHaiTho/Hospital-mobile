import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Image, TouchableOpacity, TextInput } from "react-native";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";
import axiosConfig from "../../apis/axiosConfig";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function CommunityListScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { user } = useSelector((state) => state.auth);
  // const [routes] = useState([
  //   { key: "all", title: "Tất cả" },
  //   { key: "mine", title: "Câu hỏi của tôi" },
  // ]);
  console.log("user", user);
  const [questions, setQuestions] = useState([]);
  const [myQuestions, setMyQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  const QuestionsList = ({ data, handleSnapPress }) => (
    <>
      {data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ gap: 10, paddingBottom: 70 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                borderRadius: 10,
                gap: 10,
                backgroundColor: "#fff",
                shadowColor: "#000",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Image
                  source={{
                    uri: item?.is_anonymous
                      ? "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
                      : item?.user?.avatar
                      ? `${BASE_URL}${item?.user?.avatar}`
                      : "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg", // ảnh mặc định
                  }}
                  style={{ width: 55, height: 55, borderRadius: 100 }}
                  resizeMode="cover"
                />
                <View>
                  <Text
                    style={{ fontSize: 14, color: "#000", fontWeight: "500" }}
                  >
                    {item?.is_anonymous
                      ? item?.user?.gender
                        ? "Nam"
                        : "Nữ"
                      : item?.user?.fullname}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#808080" }}>
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 14, color: "#000" }}>
                  {item?.content}
                </Text>
                {item?.image && (
                  <Image
                    source={{ uri: `${BASE_URL}${item?.image}` }}
                    style={{ width: "100%", height: 170, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                )}

                {/* khung bác sĩ nào đã trả lời */}
                {item?.comments?.filter(
                  (cmt) => cmt?.user?.role?.name === "doctor"
                ).length > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      backgroundColor: "#DBEAFE",
                      paddingVertical: 7,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${BASE_URL}${
                          item?.comments?.filter(
                            (cmt) => cmt?.user?.role?.name === "doctor"
                          )[0]?.user?.avatar
                        }`,
                      }}
                      style={{ width: 45, height: 45, borderRadius: 100 }}
                      resizeMode="cover"
                    />
                    <View>
                      <Text style={{ fontSize: 12, color: "#808080" }}>
                        Được trả lời bởi
                      </Text>
                      <Text style={{ color: "#0165FC", fontWeight: "500" }}>
                        {
                          item?.comments?.filter(
                            (cmt) => cmt?.user?.role?.name === "doctor"
                          )[0]?.user?.fullname
                        }
                      </Text>
                    </View>
                  </View>
                )}

                {/* bên trái là chuyên khoa, bên phải là số lượng câu trả lời và lượt thích */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#0165FC",
                      fontWeight: "500",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      backgroundColor: "#DBEAFE",
                    }}
                  >
                    {item?.specialty?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        gap: 10,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {item?.likes?.find(
                        (questLike) => questLike?.user_id === user?.id
                      ) ? null : (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                          }}
                          onPress={() => console.log(item?.id)}
                        >
                          <FontAwesome
                            name="heart-o"
                            size={24}
                            color="#808080"
                          />
                          <Text style={{ color: "#808080", fontSize: 12 }}>
                            Thích
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                          borderLeftColor: "#808080",
                          paddingLeft: 10,
                        }}
                      >
                        <FontAwesome name="heart" size={24} color="#f20000" />
                        <Text style={{ color: "#808080", fontSize: 12 }}>
                          {item?.likes?.length}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                      onPress={() => handleSnapPress(item)}
                    >
                      <FontAwesome
                        name="commenting-o"
                        size={24}
                        color="#808080"
                      />
                      <Text style={{ color: "#808080", fontSize: 12 }}>
                        {item?.comments?.length}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <FontAwesome name="sticky-note-o" size={100} color="#808080" />
          <Text style={{ fontSize: 14, color: "#808080" }}>
            Không có câu hỏi nào
          </Text>
        </View>
      )}
    </>
  );

  const AllQuestions = ({ handleSnapPress, questions }) => (
    <View>
      <QuestionsList data={questions} handleSnapPress={handleSnapPress} />
    </View>
  );
  console.log("user", user);
  const MyQuestions = ({ handleSnapPress, myQuestions }) => (
    <View>
      <QuestionsList data={myQuestions} handleSnapPress={handleSnapPress} />
    </View>
  );
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"]);
  const handleSnapPress = useCallback((item) => {
    setSelectedQuestion(item);
    sheetRef.current?.snapToIndex(1);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handleSheetChange = useCallback((index) => {
    if (index === -1) {
      setIsSheetVisible(false); // Đặt trạng thái khi BottomSheet đóng
    } else {
      setIsSheetVisible(true); // Đặt trạng thái khi BottomSheet mở
    }
  }, []);

  // Xác định các routes cần hiển thị dựa trên vai trò người dùng
  const routes =
    user?.role?.name !== "doctor" || user?.role === "customer"
      ? [
          { key: "all", title: "All Questions" },
          { key: "mine", title: "My Questions" },
        ]
      : [{ key: "all", title: "All Questions" }]; // Nếu là doctor, chỉ có tab "All Questions"
  const renderScene = SceneMap({
    all: () => (
      <AllQuestions handleSnapPress={handleSnapPress} questions={questions} />
    ),
    mine: () => (
      <MyQuestions
        handleSnapPress={handleSnapPress}
        myQuestions={myQuestions}
      />
    ),
  });
  const getAllQuestions = async () => {
    try {
      const response = await axiosConfig.get("/questions");
      setQuestions(response?.data?.questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);
  useEffect(() => {
    if (user && questions.length > 0) {
      const filterMyQuestions = questions?.filter(
        (quest) => quest?.user?.id === user?.id
      );
      setMyQuestions(filterMyQuestions);
    }
  }, [user, questions]);

  const handleSendAnswer = async (selectedQuestion, answer) => {
    try {
      const response = await axiosConfig.post("/questions/answer", {
        question_id: selectedQuestion?.id,
        content: answer,
      });
      Keyboard.dismiss();
      setAnswer("");
      // đóng bàn phím
      await getAllQuestions();
      const updatedQuestion = questions.find(
        (q) => q.id === selectedQuestion?.id
      );
      setSelectedQuestion(updatedQuestion); // Đảm bảo cập nhật comment mới
    } catch (error) {
      console.log(error);
    }
  };
  console.log("answer", selectedQuestion);
  console.log("myQuestions", myQuestions);
  console.log("questions", questions);
  return (
    <GestureHandlerRootView>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#fff" }}
            style={{ backgroundColor: "#fff" }}
            activeColor="#000"
            inactiveColor="#A8A2A2"
            labelStyle={{
              fontWeight: "500",
              color: "#0165FC",
              letterSpacing: 1,
            }}
            tabStyle={{
              backgroundColor: "#fff",
            }}
          />
        )}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 15,
          right: 16,
          left: 16,
          backgroundColor: "#0165FC",
          borderRadius: 10,
          flex: 1,
          padding: 10,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("CreateQuestion")}
      >
        <FontAwesome name="question-circle-o" size={24} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "400" }}>Đặt câu hỏi</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
        index={-1}
        backgroundStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        style={{
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{}}
        onClose={handleClosePress}
      >
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <FontAwesome name="heart" size={24} color="#f20000" />
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              {`${selectedQuestion?.likes?.length} người thích câu hỏi này`}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: "#808080", marginBottom: 10 }}>
            Có {selectedQuestion?.comments?.length} câu trả lời. Bạn chỉ được
            xem các câu trả lời. Nếu có câu hỏi bạn muốn hỏi, hãy đăng câu hỏi
            mới.
          </Text>
        </View>

        <BottomSheetScrollView
          ref={sheetRef}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          index={-1}
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {selectedQuestion?.comments?.map((cmt) => (
            <View
              style={{
                borderRadius: 10,
                gap: 10,
                backgroundColor: "#fff",
              }}
              key={cmt?.id}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Image
                  source={{
                    uri:
                      cmt?.user?.role?.name === "doctor"
                        ? `${BASE_URL}${cmt?.user?.avatar}`
                        : "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
                  }}
                  style={{ width: 45, height: 45, borderRadius: 100 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, gap: 5 }}>
                  <Text style={{ color: "#000", fontWeight: "600" }}>
                    {cmt?.user?.role?.name === "doctor" ? (
                      <Text style={{ color: "#0165FC", fontWeight: "500" }}>
                        {cmt?.user?.fullname}
                      </Text>
                    ) : selectedQuestion?.is_anonymous ? (
                      selectedQuestion?.user?.gender ? (
                        "Nam"
                      ) : (
                        "Nữ"
                      )
                    ) : (
                      cmt?.user?.fullname
                    )}
                  </Text>
                  <Text>{cmt?.content}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#808080" }}>
                      {moment(cmt?.createdAt).format("DD/MM/YYYY")}
                    </Text>
                    <TouchableOpacity>
                      <Text style={{ color: "#0165FC" }}>Trả lời</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </BottomSheetScrollView>
        {selectedQuestion?.user_id === user?.id ||
        selectedQuestion?.user?.role?.name === "doctor" ? (
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <TextInput
              multiline
              value={answer}
              placeholder="Viết câu trả lời..."
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: 50,
                paddingHorizontal: 15,
                paddingVertical: 5,
                textAlignVertical: "top",
                flex: 1,
              }}
              onChangeText={(text) => setAnswer(text)}
            />
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => handleSendAnswer(selectedQuestion, answer)}
            >
              <FontAwesome name="send" size={25} color="#0165FC" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 10, alignItems: "center" }}>
            <Text
              style={{
                color: "#808080",
                fontWeight: "400",
                textAlign: "center",
              }}
              onPress={() => navigation.navigate("CreateQuestion")}
            >
              Bạn không thể trả lời câu hỏi này! Hãy{" "}
              <Text style={{ color: "#0165FC", fontWeight: "500" }}>
                đặt câu hỏi
              </Text>{" "}
              để được bác sĩ tư vấn
            </Text>
          </View>
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
