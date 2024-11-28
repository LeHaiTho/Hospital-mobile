import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Icon

const Search = ({ placeholder, value, onChangeText, onClear }) => {
  return (
    <View
      style={{
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#0165FF",
        paddingHorizontal: 10,
      }}
    >
      {/* Search Icon */}
      <Ionicons name="search" size={20} color="#0165FC" style={styles.icon} />

      {/* TextInput Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Search"}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9CA3AF"
      />

      {/* Clear Icon */}
      {value ? (
        <Ionicons
          name="close-circle"
          size={20}
          color="#0165FC"
          style={styles.clearIcon}
          onPress={onClear}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    paddingVertical: 5,
  },
  clearIcon: {
    marginLeft: 10,
  },
});

export default Search;
