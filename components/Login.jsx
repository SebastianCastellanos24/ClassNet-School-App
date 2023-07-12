import { useContext, useState, useEffect } from 'react'
import { Text, StyleSheet, ImageBackground, Image, View, TextInput, Modal, Alert, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Context } from '../App.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

let users = [ "002", "003", "013", "025", "029", "036", "039", "040", "050", "060", "081", "090", "100","102", "111", "122", "130", "166", "172" ]

const Login = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  
  const [valueInput, setValueInput, loggedIn, setLoggedIn] = useContext(Context)
  const [isValidate, setIsValidate] = useState(2)
  const [error, setError] = useState("")

  const guardarDato = async (e) => {
    try {
      await AsyncStorage.setItem('schoolKeyLogin', e);
      console.log('Dato guardado exitosamente');
      setValueInput(e)
    } catch (error) {
      console.log('Error al guardar el dato:', error);
    }
  };

  useEffect(() => {
    const obtenerDato = async () => {
      try {
        const valor = await AsyncStorage.getItem('schoolKeyLogin');
        if (valor !== null) {
          setValueInput(valor);
          console.log("Bienvenido a ClassNet School App " + valor)
        }
      } catch (error) {
        console.log('Error al obtener el dato:', error);
      }
    };
  
    obtenerDato();
  }, []);

  const handleInput = (e) => {
    if(e === ""){
      setError("Ingresa algún codigo de acceso")
      setIsValidate(0)
    } else if(e.length !== 3) {
      setError("El código debe ser de tres dígitos")
      setIsValidate(0)
    } else if( !(users.includes(e)) ){
      setError("Este colegio no se encuentra registrado")
      setIsValidate(0)
    } else {
      setError("")
      setIsValidate(1)
      guardarDato(e);
      navigation.navigate("Main", {})
      setLoggedIn(true)
    }
  }

  return (
    <SafeAreaView style={styles.background}>
        <ImageBackground style={styles.imageBackground} source={require("../assets/bgApp.jpg")}>
            <View style={styles.div}>
              <Image style={styles.image} source={require("../assets/LogoApp.png")}></Image>
              <View style={isValidate === 0 ? {backgroundColor: "red", marginVertical: 10, paddingVertical: 5 ,fontSize: 14, borderRadius: 3, width: "85%" } : {backgroundColor: "none"}}>
                <Text style={styles.error}>{error}</Text>
              </View>
              <Text style={styles.text}>Ingresa aquí el codigo del colegio</Text>
              <TextInput keyboardType="numeric" style={styles.input} placeholder="Código de acceso de 3 dígitos" onChangeText={(e) => handleInput(e)}/>
            </View>
            <View style={styles.div2}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTextTitle}>Código de acceso</Text>
                    <Text style={styles.modalTextTop}>El código de acceso es una referencia única a tu institución académica y es escencial para ingresar a la App.</Text>
                    <Text style={styles.modalTextBottom}>Si no conoces tu código comunicate con tu colegio para recibir más información.</Text>
                    <Pressable
                      style={styles.button}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyleHide}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Pressable
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>¿Qué es el código de acceso?</Text>
              </Pressable>
            </View>
            <View style={styles.div3}>
                <Text style={styles.footer}> App desarollada por Lógica y Software 2023</Text>
            </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
    background: { display: "flex",  flex: 1 }, 
    
    imageBackground: { width: "100%",  height: "100%", alignItems: "center", }, 
    
    div: { width: "90%", height: 400,  alignItems: "center", justifyContent: "flex-end" }, 
    
    image: { width: 250,  height: 200, marginBottom: 20 }, 
    
    text: { color: "white", fontWeight: "bold", fontSize: 18, marginBottom: 10 }, 
    
    input: { borderWidth: 1, padding: 8, width: "85%", color: "#3096E5", borderColor: "white", backgroundColor: "white", fontSize: 16, borderRadius: 3}, 
    
    botonSend: { marginTop: 15, backgroundColor: "#3096E5", width: "85%", borderRadius: 3 },

    botonNotSend: { marginTop: 15, backgroundColor: "#D7D7D7", width: "85%", borderRadius: 3 },

    botonSendText: { color: "white", textAlign: "center", paddingVertical: 10, fontWeight: "700" },

    div2: { width: "90%", height: 60,  alignItems: "center", justifyContent: "flex-end" },
    
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22, },
    
    modalView: { margin: 20, backgroundColor: 'white', borderRadius: 3, padding: 20, alignItems: 'center', shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    
    button: { borderRadius: 3, paddingVertical: 10, paddingHorizontal: 120, elevation: 2, backgroundColor: "#3096E5" },

    textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 15, paddingHorizontal: 30, fontSize: 15 }, 
    
    textStyleHide: { color: 'white', fontWeight: 'bold', textAlign: 'center', },
    
    modalText: { marginBottom: 15, textAlign: 'center' }, 
    
    modalTextTitle: { fontWeight: "bold", color: "#3096E5", fontSize: 20, paddingBottom: 4 }, 
    
    modalTextTop: { paddingVertical: 4, textAlign: "justify" }, 
    
    modalTextBottom: { paddingTop: 4, paddingBottom: 14, textAlign: "justify", fontWeight: "600"},

    div3: { width: "90%", height: 160,  alignItems: "center", justifyContent: "flex-end" },

    footer: { color: "white", fontSize: 10 }, 

    error: { color: "white",fontWeight: '600', textAlign: 'center'}
  })

export default Login