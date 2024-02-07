import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import fetchWeather from "./lib/getWeather";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

const icons = {
  Clouds: "cloudy",
  Rain: "rains",
  Clear: "day-sunny",
  Atmosphere: "",
  ThunderStorm: "lightning",
  Snow: "snow",
  Drizzle: "rain",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
          setOk(false);
        }

        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });

        const whereIam = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
          useGoogleMaps: false,
        });
        setCity(whereIam[0].city);

        await fetchWeather(latitude, longitude, setDays, setOk);
      } catch (error) {
        console.error("Error fetching location:", error);
        setOk(false);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
        horizontal
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size={40} style={{ marginTop: 10 }} />
          </View>
        ) : (
          days.map((data) => (
            <View key={data.dt_txt} style={styles.day}>
              <View
                style={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Fontisto
                  style={{ alignSelf: "center" }}
                  name={icons[data.weather[0].main]}
                  size={88}
                  color="white"
                />
                <Text style={styles.temperature}>
                  {parseFloat(data.main.temp).toFixed(1)}
                </Text>
              </View>
              <Text style={styles.description}>{data.weather[0].main}</Text>
              <Text style={styles.smolText}>{data.weather[0].description}</Text>
            </View>
          ))
        )}
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
    color: "#fff",
  },
  weather: {},
  day: {
    flex: 1,
    width: screenWidth,
    marginTop: 50,
    alignItems: "center",
  },
  temperature: {
    fontSize: 138,
    color: "#fff",
  },
  description: {
    fontSize: 40,
    marginTop: -30,
    color: "#fff",
  },
  smolText: {
    fontSize: 20,
    color: "#fff",
  },
});
