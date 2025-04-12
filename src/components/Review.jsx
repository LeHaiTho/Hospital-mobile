// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { View, TouchableOpacity } from "react-native";
// import { Avatar, Text } from "react-native-paper";
// import moment from "moment";

// const Review = ({ doctor }) => {
//   console.log("doctor-review", doctor);
//   return (
//     <View
//       style={{ marginTop: 20, marginBottom: 20, paddingBottom: 50, gap: 10 }}
//     >
//       <Text style={{ fontWeight: "bold", color: "#1F2937" }}>
//         Phản hồi của bệnh nhân
//       </Text>
//       <View style={{ gap: -2 }}>
//         {doctor?.ratings?.map((rating) => (
//           <View
//             key={rating.id}
//             style={{
//               borderWidth: 1,
//               borderColor: "#E5E5E5",
//               padding: 10,
//               borderRadius: 10,
//               marginVertical: 10,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <View
//                 style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
//               >
//                 <Avatar.Image
//                   size={40}
//                   source={{
//                     uri:
//                       rating?.avatar ||
//                       "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
//                   }}
//                 />
//                 <Text style={{ fontWeight: 700, color: "#1F2937" }}>
//                   {rating?.user}
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   paddingHorizontal: 10,
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     gap: 5,
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <Ionicons name="star" size={18} color="#FFD700" />
//                   <Text
//                     style={{
//                       color: "#6B7280",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                     }}
//                   >
//                     {rating?.rating}
//                   </Text>
//                 </View>
//                 <Text style={{ color: "#6B7280", fontSize: 12 }}>
//                   {moment(rating?.createdAt).fromNow()}
//                 </Text>
//               </View>
//             </View>
//             <View>
//               <Text
//                 style={{ color: "#6B7280", paddingVertical: 10 }}
//                 numberOfLines={3}
//               >
//                 {rating?.comment}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </View>
//       <TouchableOpacity>
//         <Text
//           style={{
//             color: "#0165FC",
//             textDecorationLine: "underline",
//             textAlign: "center",
//           }}
//         >
//           Xem thêm đánh giá
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Review;

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-paper";
import moment from "moment";

const Review = ({ doctor }) => {
  const [showAllRatings, setShowAllRatings] = useState(false);

  // Xác định danh sách ratings cần hiển thị
  const ratingsToShow = showAllRatings
    ? doctor?.ratings
    : doctor?.ratings?.slice(0, 2);

  // Kiểm tra xem có cần hiển thị nút "Xem thêm" không
  const shouldShowViewMore = doctor?.ratings?.length > 2;

  return (
    <View
      style={{ marginTop: 20, marginBottom: 20, paddingBottom: 50, gap: 10 }}
    >
      <Text style={{ fontWeight: "bold", color: "#1F2937" }}>
        Phản hồi của bệnh nhân
      </Text>
      <View style={{ gap: -2 }}>
        {ratingsToShow?.map((rating) => (
          <View
            key={rating.id} // Đảm bảo mỗi rating có key duy nhất
            style={{
              borderWidth: 1,
              borderColor: "#E5E5E5",
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Avatar.Image
                  size={40}
                  source={{
                    uri:
                      rating?.avatar ||
                      "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
                  }}
                />
                <Text style={{ fontWeight: 700, color: "#1F2937" }}>
                  {rating?.user}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text
                    style={{
                      color: "#6B7280",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {rating?.rating}
                  </Text>
                </View>
                <Text style={{ color: "#6B7280", fontSize: 12 }}>
                  {moment(rating?.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{ color: "#6B7280", paddingVertical: 10 }}
                numberOfLines={3}
              >
                {rating?.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Chỉ hiển thị "Xem thêm" nếu có hơn 2 ratings */}
      {shouldShowViewMore && (
        <TouchableOpacity onPress={() => setShowAllRatings(!showAllRatings)}>
          <Text
            style={{
              color: "#0165FC",
              textDecorationLine: "underline",
              textAlign: "center",
            }}
          >
            {showAllRatings ? "Thu gọn đánh giá" : "Xem thêm đánh giá"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Review;
