import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react'
import { Image } from 'react-native';
import { Asset } from 'expo-asset';


export const StartButton = ({navigation}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    const navigateToTimer = () => {
        navigation.navigate('Timer');
    };

    return (
        <TouchableWithoutFeedback 
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={navigateToTimer}
        >
            <View style={[styles.continue, isHovered && styles.continueHovered]}>
                <Image source={require('../assets/arrow.png')}
                    style={{ filter: " brightness(0) invert(1)", width: 50, height: 50 }} />
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    continueHovered: {
        backgroundColor: "#671266"
    },
    continue: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#81017f",
        width: 70,
        height: 70,
        borderRadius: "50%"
    },
});
