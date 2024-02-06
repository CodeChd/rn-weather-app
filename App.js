import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function App() {
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) setOk(false);

    //get accurate location
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
      useGoogleMaps: false,
    });

    console.log(location[0].city);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.city}>
        <Text style={styles.cityName}>Philippines</Text>
      </View>

      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
        horizontal
      >
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 64,
    fontWeight: "500",
  },
  weather: {},
  day: {
    flex: 1,
    width: screenWidth,
    marginTop: 50,
    alignItems: "center",
  },
  temperature: {
    fontSize: 178,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  },
});
