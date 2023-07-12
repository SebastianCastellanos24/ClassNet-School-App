import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebPage from './WebPage';

const Main = () => {
  return (
    <SafeAreaView style={styles.background}>
      <WebPage/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  background: { display: "flex",  flex: 1, width: "100%", height: "100%" }, 
})

export default Main