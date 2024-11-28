import React from "react";
import { Text, View } from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  AntDesign,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
const Stats = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
      }}
    >
      {data == 1 ? (
        <>
          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <FontAwesome5 name="globe" size={24} color="#0165FC" />
            </View>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Website</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <Ionicons name="chatbox-ellipses" size={24} color="#0165FC" />
            </View>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Nhắn tin</Text>
          </View>

          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <Ionicons name="call" size={24} color="#0165FC" />
            </View>

            <Text style={{ fontSize: 12, color: "#6B7280" }}>Liên hệ</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <FontAwesome6 name="map-location-dot" size={24} color="#0165FC" />
            </View>

            <Text style={{ fontSize: 12, color: "#6B7280" }}>Vị trí</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <MaterialCommunityIcons name="share" size={24} color="#0165FC" />
            </View>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Chia sẻ</Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              alignItems: "center",
              gap: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <FontAwesome name="star" size={24} color="#0165FC" />
            </View>
            <Text style={{ fontWeight: 600, color: "#0165FC" }}>4.9+</Text>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Rating</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <FontAwesome name="group" size={24} color="#0165FC" />
            </View>
            <Text style={{ fontWeight: 600, color: "#0165FC" }}>7,000+</Text>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Patients</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <FontAwesome6
                name="briefcase-medical"
                size={24}
                color="#0165FC"
              />
            </View>
            <Text style={{ fontWeight: 600, color: "#0165FC" }}>10+</Text>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Experience</Text>
          </View>
          <View
            style={{
              alignItems: "center",
              gap: 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#DBEAFE",
                alignItems: "center",
                padding: 15,
                borderRadius: 100,
              }}
            >
              <Ionicons name="chatbox-ellipses" size={24} color="#0165FC" />
            </View>
            <Text style={{ fontWeight: 600, color: "#0165FC" }}>100+</Text>
            <Text style={{ fontSize: 12, color: "#6B7280" }}>Reviews</Text>
          </View>
        </>
      )}
    </View>
  );
};
export default Stats;
