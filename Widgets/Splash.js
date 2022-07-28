import React,{Component} from "react";
import {View,TouchableOpacity,Text} from "react-native";
import LottieView from "lottie-react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

export default class Splash extends Component{
  
    render(){
        const rewardedAdID = Platform.select({
    ios: "ca-app-pub-3940256099942544/1712485313",
    android: "ca-app-pub-3940256099942544/5224354917",
  });
   showInterstitial=()=> {
    AdMobRewarded.setAdUnitID(rewardedAdID);
    AdMobRewarded.requestAdAsync().then(() => {
    AdMobRewarded.showAdAsync().catch((e) => console.log(e.message))})}
    return(
        <View style={{alignItems:"center",backgroundColor:"white",width:"100%",height:"100%",justifyContent:"center"}}>
           <View style={{justifyContent:"center",alignItems:"center"}}>
               <LottieView autoPlay
            source={require("../assets/Tic Tac Toe.json")} 
            style={{height:200,width:200,marginBottom:50}}          
            />
           <TouchableOpacity style={{padding:12,width:150,backgroundColor:"pink",borderRadius:20,alignItems:"center"}} onPress={(props)=>{this.props.navigation.navigate('Home')}} >
              <Text>Play With Friends</Text>
           </TouchableOpacity>
            <TouchableOpacity  style={{marginTop:30,width:150,marginBottom:50,borderRadius:20,alignItems:"center",padding:12,backgroundColor:"pink"}} onPress={(props)=>{this.props.navigation.navigate('Computer');showInterstitial;}} >
              <Text>Play With A.I</Text>
           </TouchableOpacity>
           </View>
        </View>
    )
} }