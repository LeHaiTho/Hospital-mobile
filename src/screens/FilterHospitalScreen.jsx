// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import * as Location from "expo-location";

// const LocationExampleScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const requestLocationPermission = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();

//     if (status !== "granted") {
//       setErrorMsg("Permission to access location was denied");
//       return;
//     }

//     const userLocation = await Location.getCurrentPositionAsync({});
//     setLocation(userLocation);
//   };

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View>
//       <Text>{text}</Text>
//     </View>
//   );
// };

// export default LocationExampleScreen;

import React from "react";
import { Text, View } from "react-native";

const FilterHospitalScreen = () => {
  return <View></View>;
};

export default FilterHospitalScreen;
