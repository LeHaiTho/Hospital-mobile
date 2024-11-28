import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const PatientInfo = ({ patient }) => {
  return (
    <View style={{ paddingVertical: 10, gap: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <FontAwesome name="user" size={24} color="#797979" />
          <Text style={{ color: "#797979" }}>Họ và tên</Text>
        </View>
        <Text style={{ fontWeight: "500" }}>{patient?.fullname}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            gap: 7,
          }}
        >
          <MaterialCommunityIcons
            name="emoticon-sick-outline"
            size={24}
            color="#797979"
          />
          <Text style={{ color: "#797979" }}>Lý do khám</Text>
        </View>
        <Text style={{ fontWeight: "500" }}>{patient?.reason}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#797979" }}>Đặt khám cho</Text>
        <Text style={{ fontWeight: "500" }}>Bản thân</Text>
      </View>
    </View>
  );
};

export default PatientInfo;
