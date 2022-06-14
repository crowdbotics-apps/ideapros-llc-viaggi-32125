import React, {useState} from "react"
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native"
import AsyncStorage from '@react-native-community/async-storage';

const Blank = ({navigation}) => {


  const handleSubmitButton = () => {
    
    AsyncStorage.setItem('user_onboarding_status', "true");
    navigation.replace('LogIn');
    
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>

        <ImageBackground source={require ('../assets/images/onboarding_background.png')} style={styles.Onboarding_background} />

        <View style={styles.View_2}>

          <View style={styles.View_4}>
            <View style={styles.View_4_2}>
            </View>
            <View style={styles.View_4_3}>
            </View>
            <View style={styles.View_4_1}>
            </View>
          </View>

          <View style={styles.View_7_wrapper}>
            <Text style={styles.Text_87_3}>
              Lorem Ipsum is simply dummy text of the printing
            </Text>
            <Text style={styles.Text_87_4}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy tex.
            </Text>
            <View style={styles.View_7}>
              <TouchableOpacity
                onPress={() => handleSubmitButton()}
              >
                <Text style={styles.Text_90}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
 
  ScrollView_1: { 
    backgroundColor: "rgba(255, 255, 255, 1)" 
  },
  View_3: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#E5E5E5",
    backgroundColor: "#f9faff",
  },
  Onboarding_background:{
    width: 386,
    height: 265,
    marginTop: 100,
    marginBottom: 40,
    alignSelf: "center",
  },
  View_2: {
    fontFamily: "Museo Slab",
  },
  Text_87: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 23,
    lineHeight: 24,
    color: "#4F5454",
    alignContent: "center",
    textAlign: "center",
    opacity: .9,
    marginBottom: 10,
  },
  Text_87_2: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 20,
    color: "#4F5454",
    alignContent: "center",
    textAlign: "center",
    opacity: .7,
    marginBottom: 48,
  },
  View_4: {
    width: "90%",
    height: "auto",
    alignContent: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  TextInput_1: {
    width: "100%",
    height: 55,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 60,
  },
  input_icon_view: {
    width: 22,
    height: 22,
    position: "absolute",
    top: 13,
    left: 10,
  },
  View_7_wrapper: {
    width: "95%",
    height: "auto",
    backgroundColor: "rgba(240, 107, 83, .10)",
    borderRadius: 30,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
  },
  Text_87_3: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.24,
    color: "#4F5454",
    borderLeftColor: "#F65F4D",
    borderLeftWidth: 5,
    paddingLeft: 20,
    alignContent: "center",
    textAlign: "center",
    marginTop: 20,
  },
  Text_87_4: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: "rgba(79, 84, 84, 0.7)",
    borderLeftColor: "transparent",
    borderLeftWidth: 5,
    paddingLeft: 20,
    alignContent: "center",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
  View_4_1: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F65F4D",
    marginLeft: 5,
    marginRight: 5,
  },
  View_4_2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    marginLeft: 5,
    marginRight: 5,
  },
  View_4_3: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    marginLeft: 5,
    marginRight: 5,
  },
})


export default Blank