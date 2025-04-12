import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import moment from "moment";

const NewsCard = ({ news }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          padding: 10,
          borderWidth: 0.5,
          borderColor: "#ccc",
          borderRadius: 10,
          width: 320,
          gap: 10,
        },
        pressed && {
          opacity: 0.5,
        },
      ]}
      onPress={() => {}}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Image
          source={{ uri: news.avatar }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#ccc",
          }}
        />
        <View style={{ flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Text
            style={{
              color: "#0165FC",
              fontWeight: "bold",
              fontSize: 15,
              textTransform: "uppercase",
            }}
          >
            {news.author}
          </Text>
          <Text style={{ fontSize: 12, color: "#666" }}>
            {moment(news.date).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={4}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {news.subTitle}
      </Text>
      <Image
        source={{ uri: news.image }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />
    </Pressable>
  );
};

export default NewsCard;
