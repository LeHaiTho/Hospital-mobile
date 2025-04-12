import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Image, TouchableOpacity, TextInput } from "react-native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
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
  const [loading, setLoading] = useState(false);

  // console.log("user", user.role);
  // const [routes] = useState([
  //   { key: "all", title: "Tất cả" },
  //   { key: "mine", title: "Câu hỏi của tôi" },
  // ]);
  console.log("user", user);
  const [questions, setQuestions] = useState([]);
  const [myQuestions, setMyQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  console.log("questions", questions?.likes?.[0]);
  const QuestionsList = ({ data, handleSnapPress, loading }) => (
    <>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#0165FC" />
          <Text style={{ color: "#808080", fontSize: 12 }}>
            Đang tải dữ liệu...
          </Text>
        </View>
      ) : data?.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ gap: 10, padding: 16, paddingBottom: 70 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  borderRadius: 10,
                  gap: 10,
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
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
        </View>
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

  const AllQuestions = ({ handleSnapPress, questions, loading }) => (
    <View>
      <QuestionsList
        data={questions}
        handleSnapPress={handleSnapPress}
        loading={loading}
      />
    </View>
  );
  console.log("questions", questions);
  const MyQuestions = ({ handleSnapPress, myQuestions, loading }) => (
    <View>
      <QuestionsList
        data={myQuestions}
        handleSnapPress={handleSnapPress}
        loading={loading}
      />
    </View>
  );
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);
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
    user?.role?.name == "doctor" || user?.role == "doctor"
      ? [
          {
            key: "all",
            title: "Các câu hỏi",
            component: (
              <QuestionsList
                data={questions}
                loading={loading}
                handleSnapPress={handleSnapPress}
              />
            ),
          },
        ]
      : [
          {
            key: "all",
            title: "Các câu hỏi",
            component: (
              <QuestionsList
                data={questions}
                loading={loading}
                handleSnapPress={handleSnapPress}
              />
            ),
          },
          {
            key: "mine",
            title: "Câu hỏi của tôi",
            component: (
              <QuestionsList
                data={myQuestions}
                loading={loading}
                handleSnapPress={handleSnapPress}
              />
            ),
          },
        ];

  // const routes =
  //   user?.role?.name === "doctor" || user?.role === "doctor"
  //     ? [
  //         {
  //           title: "Các câu hỏi",
  //           component: (
  //             <AllQuestions
  //               data={questions}
  //               loading={loading}
  //               handleSnapPress={handleSnapPress}
  //             />
  //           ),
  //         },
  //       ]
  //     : [
  //         {
  //           title: "Các câu hỏi",
  //           component: (
  //             <AllQuestions
  //               data={questions}
  //               loading={loading}
  //               handleSnapPress={handleSnapPress}
  //             />
  //           ),
  //         },
  //         {
  //           title: "Câu hỏi của tôi",
  //           component: (
  //             <MyQuestions
  //               data={myQuestions}
  //               loading={loading}
  //               handleSnapPress={handleSnapPress}
  //             />
  //           ),
  //         },
  //       ];

  // Nếu là doctor, chỉ có tab "All Questions"
  const renderScene = SceneMap({
    all: () => (
      <AllQuestions
        handleSnapPress={handleSnapPress}
        questions={questions}
        loading={loading}
      />
    ),
    mine: () => (
      <MyQuestions
        handleSnapPress={handleSnapPress}
        myQuestions={myQuestions}
        loading={loading}
      />
    ),
  });
  const getAllQuestions = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get("/questions");
      setQuestions(response?.data?.questions);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    if (user && questions.length > 0) {
      console.log("dddddddddddddddddddddddddddddddddd", user);
      setLoading(true);
      const filterMyQuestions = questions?.filter(
        (quest) => quest?.user?.id === user?.id
      );
      console.log("filterMyQuestions", filterMyQuestions);
      setMyQuestions(filterMyQuestions);
      setLoading(false);
    }
  }, [user, questions]);

  const handleSendAnswer = async (selectedQuestion, answer) => {
    try {
      setLoading(true);

      // Gửi câu trả lời mới qua API
      const response = await axiosConfig.post("/questions/answer", {
        question_id: selectedQuestion?.id,
        content: answer,
      });

      const newComment = {
        id: response.data.id, // ID của comment mới từ API
        question_id: selectedQuestion.id,
        content: answer,
        createdAt: new Date().toISOString(), // Thời gian hiện tại
        updatedAt: new Date().toISOString(),
        user: {
          avatar: user?.avatar, // Thêm thông tin user nếu cần
          fullname: user?.fullname, // Lấy từ context hoặc user hiện tại
          id: user?.id,
          role: { name: user?.role || user?.role?.name }, // Lấy từ context hoặc user hiện tại
          // ID của người dùng hiện tại
        },
        user_id: user?.id, // ID của người dùng hiện tại
      };

      // Cập nhật danh sách comments cục bộ
      const updatedComments = [
        ...(selectedQuestion.comments || []),
        newComment,
      ];
      setSelectedQuestion((prev) => ({
        ...prev,
        comments: updatedComments,
      }));
      Keyboard.dismiss();
      setAnswer("");
      await getAllQuestions();
      // Cập nhật selectedQuestion

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const createQuestion = () => {
    if (user) {
      navigation.navigate("CreateQuestion");
    } else {
      navigation.replace("Login");
    }
  };
  // console.log("answer", selectedQuestion);
  console.log("myQuestions", myQuestions);
  // console.log("questions", questions);
  // console.log("selectedQuestion", selectedQuestion);
  return (
    <GestureHandlerRootView>
      {/* <TabView
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
      /> */}

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            justifyContent: routes.length === 1 ? "center" : "space-between",
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
      </View>
      {/* <AllQuestions
        data={questions}
        loading={loading}
        handleSnapPress={handleSnapPress}
      /> */}

      {user?.role?.name !== "doctor" && user?.role !== "doctor" ? (
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
          onPress={createQuestion}
        >
          <FontAwesome name="question-circle-o" size={24} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "400" }}>Đặt câu hỏi</Text>
        </TouchableOpacity>
      ) : null}
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
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {selectedQuestion?.comments?.map((cmt, index) => (
            <View
              style={{
                borderRadius: 10,
                gap: 10,
                backgroundColor: "#fff",
              }}
              key={index}
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
        selectedQuestion?.user?.role?.name === "doctor" ||
        user?.role?.name === "doctor" ||
        user?.role === "doctor" ? (
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
          <View style={{ gap: 10, alignItems: "center", paddingBottom: 10 }}>
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
