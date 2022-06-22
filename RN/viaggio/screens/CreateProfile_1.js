import React, {useState} from "react"
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView
} from "react-native"
import {launchImageLibrary} from 'react-native-image-picker';

const Blank = ({navigation}) => {

  const [imageUploaded, setImageUploaded] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [LoadingEffect, setLoadingEffect] = useState(false);

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
    console.log('profile Image File Name: ', profileImage.assets[0].fileName);
    console.log('profile Image File Type: ', profileImage.assets[0].type);
    console.log('profile Image File Size: ', profileImage.assets[0].fileSize);
    console.log('profile Image File Width: ', profileImage.assets[0].width);
    console.log('profile Image File Height: ', profileImage.assets[0].height);
    let createdFormData = createFormData(profileImage, { userId: '123' })
    // console.log( JSON.stringify(createdFormData) );

    setLoadingEffect(true);
    
    var dataToSend = {
      "profile.photo": profileImage.assets[0].uri,
      private_mode: false,
    };
    
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log("FormBody: ", formBody);
    const userToken = "735cd18d6e50adcbc63f2b045702621b9cbe6bc5";

    fetch('https://ideapros-llc-viaggi-32125.botics.co/api/v1/users/d0101b88-e82d-414f-ac72-adb86042a057/', {
      method: 'PATCH',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
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
            <ImageBackground source={require ('../assets/images/profile_white_icon.png')} style={styles.profile_icon_upload_picture} />
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
    // backgroundColor: "rgba(246, 95, 77, 0.1)",
    backgroundColor: "red",
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