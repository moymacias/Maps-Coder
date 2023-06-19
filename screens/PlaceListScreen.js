import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import { loadAddress } from "../store/places.actions";

const PlaceListScreen = () => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);

  useEffect(() => {
    dispatch(loadAddress());
  }, []);

  const renderItem = ({ item }) => (
    <PlaceItem
      title={item.title}
      image={item.image}
      address={item.address}
      onSelect={() => navigation.navigate("Detalle", { placeId: item.id })}
    />
  );

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaceListScreen;
