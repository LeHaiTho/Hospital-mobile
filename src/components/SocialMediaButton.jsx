import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Image } from "react-native-paper";

const SocialMediaButton = () => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        width: "100%",

        gap: 15,
      }}
    >
      <Button
        mode="contained"
        buttonColor="transparent"
        textColor="black"
        style={styles.shadow}
      >
        Kết nối với Google
      </Button>
      <Button
        icon="google"
        mode="contained"
        buttonColor="transparent"
        textColor="black"
        style={styles.shadow}
      >
        Kết nối với Google
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    width: "100%",
  },
});

export default SocialMediaButton;
