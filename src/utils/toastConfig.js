// src/utils/ToastConfig.js
import React from "react";
import { View, Text } from "react-native";

export const ToastConfig = {
  success: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        {text1}
      </Text>
      {text2 ? (
        <Text style={{ color: "white", fontSize: 14 }}>{text2}</Text>
      ) : null}
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "#f20000",
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
      {text2 ? (
        <Text style={{ color: "white", fontSize: 14 }}>{text2}</Text>
      ) : null}
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "#0165FC",
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
      {text2 ? (
        <Text style={{ color: "white", fontSize: 14 }}>{text2}</Text>
      ) : null}
    </View>
  ),
};

export default ToastConfig;
