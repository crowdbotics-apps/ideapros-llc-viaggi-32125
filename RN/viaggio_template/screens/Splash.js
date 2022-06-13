import React, {useState, useEffect} from "react"
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen"
// import { getNavigationScreen } from "@screens"
import AsyncStorage from '@react-native-community/async-storage';

const Blank = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // let value = null;
      // navigation.replace(
      //   value === null ? 'Auth' : 'MainScreen'
      // )
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'LogIn'
        ),
      );
    }, 1000);
  }, []);


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>
        <View style={styles.View_2}>
          <ImageBackground  
            source={require('../assets/images/viaggi_splash_logo.png')}
            style={styles.ImageBackground_86_909}
          />
        </View> 
      </View>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
  ScrollView_1: { 
    backgroundColor: "rgba(255, 255, 255, 1)" 
  },
  View_3: { 
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  View_2: { 
    width: "100%",
    height: "100%",
    backgroundColor: "#f9faff",  
    zIndex: 999,
  },
  ImageBackground_86_909: {
    width: 213,
    height: 62,
    position: "relative",
    left: "50%",
    top: "50%",
    marginTop: -31,
    marginLeft: -106,
  },
})


export default Blank