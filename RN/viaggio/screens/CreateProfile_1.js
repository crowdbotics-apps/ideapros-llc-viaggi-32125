import React, {useEffect, useState} from "react"
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView
} from "react-native"
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

const Blank = ({navigation}) => {

  const [imageUploaded, setImageUploaded] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [LoadingEffect, setLoadingEffect] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {

    const getUserTokenFromStorage = async()=>{
      let user_token = await AsyncStorage.getItem("user_token_vg");
      let user_id = await AsyncStorage.getItem("user_id_vg");
      console.log("User token: ", user_token)
      setUserToken(user_token);
      console.log("User id: ", user_id)
      setUserId(user_id);
      fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${user_id}/`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Token ${user_token}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Response all vehicle: ", responseJson);
          setUserPhoto(responseJson.profile.photo);
          })
        .catch((error) => {
          console.error(error);
        });
      setLoadingEffect(false);
    }
    getUserTokenFromStorage()

  }, []);

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  const handleSubmitButton = () => {
    if (!imageUploaded) {
      alert('Please upload image');
      return;
    }

    console.log('profile Image URI: ', profileImage.assets[0].uri);

    let formdata = new FormData();

    if (imageUploaded) {
      formdata.append('profile.photo', {
        name: profileImage.assets[0].fileName,
        type: profileImage.assets[0].type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : profileImage.assets[0].uri,
      });
    }

    setLoadingEffect(true);

    fetch(`https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/${userId}/`, {
      method: 'PATCH',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${userToken}`,
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log("Response: ", responseJson);
        setLoadingEffect(false);
        setImageUploaded(true);
        navigation.replace("CreateProfile_2");
      })
      .catch((error) => {
        console.error(error);
      });
    
   
  };
  

  const handleImageUpload = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response);
      if (response) {
        setProfileImage(response);
        setImageUploaded(true);
        setUserPhoto(response.assets[0].uri);
      }
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.ScrollView_1}
    >
      <View style={styles.View_3}>

        {LoadingEffect && <View style={styles.Loading_effect}>
          <ImageBackground source={require("../assets/images/loading.gif")} style={styles.Loading_effect_image} />
        </View>}

        <TouchableOpacity onPress={() => navigation.goBack()} >
          <ImageBackground source={require ('../assets/images/left_arrow.png')} style={styles.back_icon} />
        </TouchableOpacity>

        <View style={styles.View_2}>

          <Text style={styles.Text_87}>
            Let’s Create your Profile
          </Text>

          <TouchableOpacity style={styles.View_4} onPress={() => handleImageUpload()}>
            {!userPhoto && (
              <>
              <ImageBackground source={require ('../assets/images/profile_white_icon.png')} style={styles.profile_icon_upload_picture} />
              </>
            )}
            {userPhoto && (
              <>
                <ImageBackground
                  source={{ uri: userPhoto }}
                  // style={{ width: 300, height: 300 }}
                  style={styles.profile_icon_upload_picture_real}
                />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.View_5}>
            <Text style={styles.Text_88}>
              Upload Profile Picture
            </Text>
            <Text style={styles.Text_89}>
              Tap the circle to upload your profile picture
            </Text>
          </View>

          <View style={styles.View_7}>
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              // onPress={() => navigation.navigate('CreateProfile_2')}
            >
              <Text style={styles.Text_90}>
              Continue
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Loading_effect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, .9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  Loading_effect_image: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 70,
    height: 70,
    marginTop: -35,
    marginLeft: -35,
  },
  ScrollView_1: { 
    backgroundColor: "rgba(255, 255, 255, 1)" 
  },
  View_3: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f9faff",  
  },
  back_icon:{
    width: 8,
    height: 14.22,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 36,
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
    marginBottom: 48,
  },
  View_4: {
    width: 235,
    height: 212,
    backgroundColor: "rgba(246, 95, 77, 0.1)",
    borderRadius: 15,
    marginBottom: 50,
    alignSelf: "center",
    alignSelf: "center",
  },
  profile_icon_upload_picture: {
    width: 108,
    height: 135,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -67,
    marginLeft: -54,
    opacity: .7,
  },
  profile_icon_upload_picture_real: {
    width: 220,
    height: 200,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -100,
    marginLeft: -110,
    opacity: .7,
    borderRadius: 15,
  },
  View_5: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  Text_88: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 30,
    color: "#4F5454",
    marginBottom: 10,
  },
  Text_89: {
    fontFamily: 'Museo Slab',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 12,
    color: "rgba(79, 84, 84, 0.7)",
    marginBottom: 144,
  },
  View_7: {
    width: 283,
    height: 53,
    backgroundColor: "#F65F4D",
    borderRadius: 12,
    alignSelf: "center",
  },
  Text_90: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
})


export default Blank