import * as Location from "expo-location";

import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { COLORS } from "../constants";
import MapPreview from "./MapPreview";
import { useNavigation } from "@react-navigation/native";

const LocationSelector = ({ onLocation }) => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState();

  const veryPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "PErmisos insuficientes",
        "Necesitamos permisos para la ubicacion",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const handleGetLocation = async () => {
    const isLocationOk = await veryPermissions();
    if (!isLocationOk) return;

    const location = await Location.getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    onLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} newStyles={styles.preview}>
        <Text> Ubicacion en procesos...</Text>
      </MapPreview>
      <Button
        title="Obtener ubicacion"
        color={COLORS.PEACH_PUFF}
        onPress={handleGetLocation}
      />
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.PEACH_PUFF,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: " 100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
