import { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import * as Font from 'expo-font';
import { Heebo_400Regular } from '@expo-google-fonts/heebo';

export function TimerScreen({ startFrom = 60 }) {
    const [count, setCount] = useState(startFrom);
    const [timerFinished, setTimerFinished] = useState(false);
    const startTime = useRef(Date.now());
    const prevTime = useRef(Date.now());
    const frameRequest = useRef();

    Font.loadAsync({
        'Heebo-Regular': Heebo_400Regular,
    });

    const updateCounter = () => {
        const now = Date.now();
        const elapsedSeconds = (now - startTime.current) / 1000;
        const remainingSeconds = startFrom - elapsedSeconds;
        if (remainingSeconds > 0) {
            if (now > prevTime.current + 34.5) {
                setCount(Math.max(remainingSeconds, 0));
                prevTime.current = now;
            }
            frameRequest.current = requestAnimationFrame(updateCounter);
        } else {
            setCount(0);
            setTimerFinished(true);
        }
    }

    const resetCounter = () => {
        setTimerFinished(false);
        startTime.current = Date.now();
        setCount(startFrom);
        frameRequest.current = requestAnimationFrame(updateCounter);
    }

    useEffect(() => {
        frameRequest.current = requestAnimationFrame(updateCounter);
        return () => cancelAnimationFrame(frameRequest.current);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginTop: -70, background: "#eee", width: 300, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 40, justifyContent: "center", alignItems: "center", height: 300 }}>
                <Text style={{ fontSize: 45, fontFamily: 'Heebo-Regular' }}>{count.toFixed(2)}</Text>
            </View>
            <View style={{ marginTop: 40 }}>
                <Text onPress={resetCounter}>Reset</Text>
            </View>
        </View>
    );
}
