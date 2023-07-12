import { StyleSheet, View, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../App.jsx';
import { SafeAreaView } from 'react-native-safe-area-context'

const WebPage = () => {

    const [valueInput, setValueInput] = useContext(Context)
    
    const Link = `http://server.logicaysoftware.com/classnet${valueInput}/`
  
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: Link }} 
          startInLoadingState
          onLoadStart={() => {
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, }}>
              <ActivityIndicator size="large" color="#00ff00"/>
            </View>
          }}
        />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
});

export default WebPage