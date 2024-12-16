// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// // import { TextInput, Image, Avatar, Button } from "react-native-paper";
// import { useState, useEffect } from "react";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import SocialMediaButton from "../components/SocialMediaButton";
// import { useNavigation } from "@react-navigation/native";
// import { FontAwesome6, Fontisto, Ionicons } from "@expo/vector-icons";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";

// const SignUp = () => {
//   const navigation = useNavigation();
//   const [form, setForm] = useState({
//     fullName: "",
//     username: "",
//     password: "",
//   });

//   GoogleSignin.configure({
//     webClientId:
//       "909616392538-ofbrf2mbi0cr9ops1sls8gnv9cdif35h.apps.googleusercontent.com",
//   });

//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;
//   async function onGoogleButtonPress() {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const signInResult = await GoogleSignin.signIn();

//     // Try the new style of google-sign in result, from v13+ of that module
//     idToken = signInResult.data?.idToken;
//     if (!idToken) {
//       // if you are using older versions of google-signin, try old style result
//       idToken = signInResult.idToken;
//     }
//     if (!idToken) {
//       throw new Error("No ID token found");
//     }

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(
//       signInResult.data.token
//     );

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   }

//   // return (
//   // return (
//   //   <View style={{ flex: 1, backgroundColor: "#fff" }}>
//   //     <ScrollView
//   //       showsVerticalScrollIndicator={false}
//   //       contentContainerStyle={{
//   //         backgroundColor: "#fff",
//   //         alignItems: "center",
//   //         justifyContent: "center",
//   //         paddingHorizontal: 20,
//   //         paddingTop: "40%",
//   //         gap: 20,
//   //       }}
//   //     >
//   //       <View style={{ gap: 5 }}>
//   //         <Text
//   //           style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
//   //         >
//   //           Chào mừng bạn đến với
//   //         </Text>
//   //         <Text
//   //           style={{
//   //             fontSize: 20,
//   //             fontWeight: "bold",
//   //             textAlign: "center",
//   //             color: "#0165FC",
//   //           }}
//   //         >
//   //           LHT MED
//   //         </Text>
//   //         <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>
//   //           Hãy đăng ký tài khoản để trải nghiệm những dịch vụ chăm sóc sức khỏe
//   //           tốt nhất.
//   //         </Text>
//   //       </View>

//   //       <View style={{ gap: 10, width: "100%" }}>
//   //         <View style={{ width: "100%", gap: 5 }}>
//   //           <Text style={{ fontWeight: "600" }}>Họ và tên</Text>
//   //           <View
//   //             style={{
//   //               flexDirection: "row",
//   //               alignItems: "center",
//   //               gap: 10,
//   //               borderWidth: 0.6,
//   //               borderColor: "#808080",
//   //               borderRadius: 100,
//   //               paddingVertical: 10,
//   //               paddingHorizontal: 20,
//   //               width: "100%",
//   //             }}
//   //           >
//   //             <FontAwesome6 name="user-pen" size={18} color="#808080" />
//   //             <TextInput
//   //               placeholder="Nhập họ và tên"
//   //               placeholderTextColor="#808080"
//   //               style={{ flex: 1 }}
//   //               value={form.fullName}
//   //               onChangeText={(text) => setForm({ ...form, fullName: text })}
//   //             />
//   //             {form.fullName && (
//   //               <TouchableOpacity
//   //                 onPress={() => setForm({ ...form, fullName: "" })}
//   //               >
//   //                 <Ionicons name="close-outline" size={20} color="#808080" />
//   //               </TouchableOpacity>
//   //             )}
//   //           </View>
//   //         </View>
//   //       </View>
//   //       <View style={{ gap: 10, width: "100%" }}>
//   //         <View style={{ width: "100%", gap: 5 }}>
//   //           <Text style={{ fontWeight: "600" }}>Tên đăng nhập</Text>
//   //           <View
//   //             style={{
//   //               flexDirection: "row",
//   //               alignItems: "center",
//   //               gap: 10,
//   //               borderWidth: 0.6,
//   //               borderColor: "#808080",
//   //               borderRadius: 100,
//   //               paddingVertical: 10,
//   //               paddingHorizontal: 20,
//   //               width: "100%",
//   //             }}
//   //           >
//   //             <FontAwesome6 name="user-large" size={18} color="#808080" />
//   //             <TextInput
//   //               placeholder="Email hoặc số điện thoại"
//   //               placeholderTextColor="#808080"
//   //               style={{ flex: 1 }}
//   //               value={form.username}
//   //               onChangeText={(text) => setForm({ ...form, username: text })}
//   //             />
//   //             {form.username && (
//   //               <TouchableOpacity
//   //                 onPress={() => setForm({ ...form, username: "" })}
//   //               >
//   //                 <Ionicons name="close-outline" size={20} color="#808080" />
//   //               </TouchableOpacity>
//   //             )}
//   //           </View>
//   //         </View>
//   //         <View style={{ width: "100%", gap: 5 }}>
//   //           <Text style={{ fontWeight: "600" }}>Mật khẩu</Text>
//   //           <View
//   //             style={{
//   //               flexDirection: "row",
//   //               alignItems: "center",
//   //               gap: 10,
//   //               borderWidth: 0.6,
//   //               borderColor: "#808080",
//   //               borderRadius: 100,
//   //               paddingVertical: 10,
//   //               paddingHorizontal: 20,
//   //               width: "100%",
//   //             }}
//   //           >
//   //             <FontAwesome6 name="lock" size={18} color="#808080" />
//   //             <TextInput
//   //               placeholder="************"
//   //               placeholderTextColor="#808080"
//   //               style={{ flex: 1 }}
//   //               secureTextEntry
//   //               value={form.password}
//   //               onChangeText={(text) => setForm({ ...form, password: text })}
//   //             />
//   //             {form.password && (
//   //               <TouchableOpacity
//   //                 onPress={() => setForm({ ...form, password: "" })}
//   //               >
//   //                 <Ionicons name="close-outline" size={20} color="#808080" />
//   //               </TouchableOpacity>
//   //             )}
//   //           </View>
//   //         </View>
//   //         <Text
//   //           style={{
//   //             color: "#0165FC",
//   //             textAlign: "right",
//   //             width: "100%",
//   //             textDecorationLine: "underline",
//   //           }}
//   //         >
//   //           Quên mật khẩu?
//   //         </Text>
//   //       </View>
//   //       <TouchableOpacity
//   //         style={{
//   //           backgroundColor: "#0165FC",
//   //           padding: 10,
//   //           borderRadius: 100,
//   //           width: "100%",
//   //         }}
//   //       >
//   //         <Text
//   //           style={{
//   //             color: "#fff",
//   //             fontSize: 16,
//   //             fontWeight: "500",
//   //             textAlign: "center",
//   //           }}
//   //         >
//   //           Đăng ký
//   //         </Text>
//   //       </TouchableOpacity>

//   //       <View
//   //         style={{
//   //           flexDirection: "row",
//   //           gap: 10,
//   //           alignItems: "center",
//   //           width: "100%",
//   //           justifyContent: "center",
//   //           paddingHorizontal: 40,
//   //         }}
//   //       >
//   //         <View style={{ flex: 1, height: 0.5, backgroundColor: "#808080" }} />
//   //         <Text style={{ color: "#808080" }}>hoặc Đăng ký bằng </Text>
//   //         <View style={{ flex: 1, height: 0.5, backgroundColor: "#808080" }} />
//   //       </View>
//   //       <View style={{ gap: 10, flexDirection: "row" }}>
//   //         <TouchableOpacity
//   //           style={{
//   //             flexDirection: "row",
//   //             alignItems: "center",
//   //             gap: 10,
//   //             borderWidth: 0.4,
//   //             borderColor: "#808080",
//   //             borderRadius: 100,
//   //             padding: 10,
//   //           }}
//   //         >
//   //           <Image
//   //             source={require("../../assets/ggle.png")}
//   //             style={{ width: 30, height: 30 }}
//   //           />
//   //         </TouchableOpacity>
//   //         <TouchableOpacity
//   //           style={{
//   //             flexDirection: "row",
//   //             alignItems: "center",
//   //             gap: 10,
//   //             borderWidth: 0.4,
//   //             borderColor: "#808080",
//   //             borderRadius: 100,
//   //             padding: 10,
//   //           }}
//   //         >
//   //           <Image
//   //             source={require("../../assets/facebook.jpg")}
//   //             style={{ width: 30, height: 30 }}
//   //           />
//   //         </TouchableOpacity>
//   //       </View>
//   //       <View style={{ flexDirection: "row", gap: 5 }}>
//   //         <Text>Bạn đã có tài khoản?</Text>
//   //         <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//   //           <Text style={{ color: "#0165FC" }}>Đăng nhập</Text>
//   //         </TouchableOpacity>
//   //       </View>
//   //     </ScrollView>
//   //   </View>
//   // );
//   if (!user) {
//     return (
//       <View>
//         <Text>Đăng nhập bằng google</Text>
//         <TouchableOpacity onPress={onGoogleButtonPress}>
//           <Text>Đăng nhập</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// };

// export default SignUp;

import React, { useState, useEffect } from "react";

import auth from "@react-native-firebase/auth";
import { Button, View, Text, Image } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "909616392538-ofbrf2mbi0cr9ops1sls8gnv9cdif35h.apps.googleusercontent.com",
});

const SignUp = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  async function onGoogleButtonPress() {
    // Kiểm tra xem người dùng có đăng nhập trước đó không
    // const isSignedIn = await GoogleSignin.isSignedIn();
    // if (isSignedIn) {
    //   await GoogleSignin.signOut(); // Đăng xuất khỏi Google
    //   console.log("User signed out from Google");
    // }

    // Đăng nhập lại
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();
    const signInResult = await GoogleSignin.signIn();
    console.log("signInResult", signInResult);
    let idToken = signInResult.idToken || signInResult?.data?.idToken;
    if (!idToken) throw new Error("No ID token found");

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Đăng nhập với Firebase
    const user_sign_in = await auth().signInWithCredential(googleCredential);
    console.log("user_sign_in", user_sign_in);
  }
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Login</Text>
        <GoogleSigninButton
          style={{ width: 200, height: 50 }}
          onPress={() => onGoogleButtonPress()}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome {user.email}</Text>
      <Image
        source={{ uri: user.photoURL }}
        style={{ width: 100, height: 100 }}
      />
      <Button title="Đăng xuất" onPress={() => auth().signOut()} />
    </View>
  );
};

export default SignUp;
