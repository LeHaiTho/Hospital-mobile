import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Divider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
const StarRating = ({
  name,
  initialRating = 0,
  onRatingChange,
  onCommentChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState("");

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleCommentChange = (text) => {
    setComment(text);
    if (onCommentChange) {
      onCommentChange(text);
    }
    console.log(text);
  };

  return (
    <View style={{ alignItems: "center", gap: 10, width: "100%" }}>
      <Text style={{ fontWeight: "bold", color: "#000", marginBottom: 10 }}>
        Cảm nhận của bạn về {name}
      </Text>
      <View
        style={{
          width: "100%",
          gap: 20,
          alignItems: "center",
          borderWidth: 0.5,
          borderColor: "#AFAFAF",
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#AFAFAF" }}>
          Đánh giá của bạn
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={30}
                color="#FCAF23"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bình luận */}
      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", color: "#000" }}>
          Bình luận ý kiến
        </Text>

        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            padding: 10,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: "#AFAFAF",
            marginTop: 10,
          }}
        >
          <TextInput
            placeholder="Ý kiến của bạn"
            multiline={true}
            numberOfLines={5}
            onChangeText={handleCommentChange}
            value={comment}
            style={{
              textAlignVertical: "top",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default StarRating;
