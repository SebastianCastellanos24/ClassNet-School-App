import { ImageBackground, StyleSheet, Button, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useMemo, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Context } from '../App.jsx';

const TIME_IN_MS_INTRO = 2000;
const ANIMATION_DURATION_MS = 1000;

const SplashScreen = () => {
  const [isWaiting, setIsWaiting] = useState(true)
  const [loggedIn, setLoggedIn] = useContext(Context)

  const navigation = useNavigation();

  const [colors, setColors] = useState(["#3096E5", "#3096E5"])

  const animatedSpin = new Animated.Value(0);

  const spin = animatedSpin.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1]
  })

  const spin2 = animatedSpin.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  })

  const animateClokwise = Animated.timing(animatedSpin, {
    toValue: 1,
    duration: ANIMATION_DURATION_MS,
    useNativeDriver: true,
  })

  const animateCounterClockwise = Animated.timing(animatedSpin, {
    toValue: 0,
    duration: ANIMATION_DURATION_MS,
    useNativeDriver: true,
  })

  const sequence = Animated.sequence([animateClokwise, animateCounterClockwise]);

  Animated.loop(sequence).start();

  const randomBackgroundColor = useMemo(() => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsWaiting(false);
    }, TIME_IN_MS_INTRO)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (isWaiting) {
      return
    }

    if(loggedIn) {
      navigation.navigate("Main", {})
    } else {
      navigation.navigate("Login", {})
    }
  }, [loggedIn, isWaiting])

  return (
    <SafeAreaView style={[styles.background, {backgroundColor: randomBackgroundColor}]}>
      <Animated.View style={{ transform: [{scale: spin}], opacity: spin2 }}>
        <ImageBackground style={styles.image} source={require("../assets/LogoApp.png")}/>
        {!loggedIn ? <Button title="Realiza el login aquí" onPress={() => {navigation.navigate("Login", {})}}/> : <Button title="Ingresa aquí" onPress={() => {navigation.navigate("Main", {})}}/>}
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  background: {
    display: "flex", 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  }, image: {
    width: 250, 
    height: 200,
    marginBottom: 30
  }
})

export default SplashScreen