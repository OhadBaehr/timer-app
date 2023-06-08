import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { Image } from 'react-native';
import { Asset } from 'expo-asset';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TimerScreen } from './TimerScreen';
import { HomeScreen } from './home/HomeScreen';
const Stack = createStackNavigator();

export default function App() {
  async function cacheImages(images) {
    return await Promise.all(
      images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      })
    );
  }

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      const imageAssets = cacheImages([
        require('./assets/timer.png'),
        require('./assets/arrow.png')
      ]);
      await Promise.all([imageAssets]);
      setIsReady(true);
    }

    loadAssets();
  }, []);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.navbar}>
            <Image source={require('./assets/timer.png')}
              style={{ width: 50, height: 50 }} />
            <View style={styles.title}>
              <Text style={styles.titleText}>My Timer</Text>
            </View>
          </View>
        </View>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  title: {
    width: "calc(100% - 100px)",
    alignItems: "center",
  },
  navbar: {
    width: "100vw",
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid transparent",
    borderBottomColor: "rgba(0,0,0,0.2)",
    height: "80px",
    padding: 20,
  },
});
