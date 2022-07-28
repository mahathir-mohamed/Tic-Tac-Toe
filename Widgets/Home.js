import React,{useState,Component} from "react";
import {View,StyleSheet,Image,Alert,TouchableOpacity,Text,Button,SafeAreaView,ScrollView} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
export default class Home extends Component{
 
    constructor(props){
        super(props);
        this.state={
            gameState:[ 
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
           currentPlayer:1,
           Player1:0,
           Player2:0,
           PlayerCount1:0,
        }
    }
    
    startGame=()=>{
        this.setState({
            gameState:[
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ]
        })
    }
    refresh=()=>{
        this.startGame();
    }
    componentDidMount(){
        this.startGame();
    }
    renderState=(row,col)=>{
      var value=this.state.gameState[row][col];
      switch(value){
        case 1:
            return <Image style={{borderRadius:100,width:40,height:40}} source={require("../assets/tom.png")}/>
        case -1:
            return <Image  style={{borderRadius:100,width:40,height:40}}  source={require("../assets/dog.jpeg")}/>
        default:
            return <View/>
      }
      
    }
    onTileChange=(row,col)=>{
        var value=this.state.gameState[row][col];
        if(value!==0){
            return;
        }
        var currentPlayer=this.state.currentPlayer;
        const arr = this.state.gameState.slice();
        arr[row][col]=currentPlayer
        
        this.setState({
            gameState:arr
        })
        var nextPlayer = (currentPlayer==1)?-1:1;
         this.setState({
            currentPlayer:nextPlayer
        })
        var Winner = this.getWinner();
        if(Winner==1){
            Alert.alert("Tom won !!!");
            var PlayerCount1 = this.state.PlayerCount1;
            PlayerCount1 =PlayerCount1+1;
            this.setState({PlayerCount1:PlayerCount1})
            var Player1 = this.state.Player1;
            Player1=Player1+1;
            this.setState({Player1:Player1})
            PlayerCount1=this.state.PlayerCount1;
            PlayerCount1+=1;
            this.setState({PlayerCount1:PlayerCount1})
            this.startGame();
        } 
        if(Winner==-1){
            Alert.alert("Rocket won !!!");
            var Player2 = this.state.Player2;
            Player2=Player2+1;
            this.setState({Player2:Player2})
             this.startGame();
        }
        if((this.state.PlayerCount1)%8==0 && this.state.PlayerCount1!==0){
           this.showInterstitial();
           var PlayerCount1 = this.state.PlayerCount1;
            PlayerCount1 =PlayerCount1+1;
            this.setState({PlayerCount1:PlayerCount1})
        }
    }
    getWinner=()=>{
        var length=3;
        var arr=this.state.gameState;
        var sum;
        for(var i=0;i<length;i++){
            sum=arr[i][0]+arr[i][1]+arr[i][2]
            if(sum==3){
                return 1;
            }
            if(sum==-3){
                return -1;
            }
        
        }
         for(var i=0;i<length;i++){
            sum=arr[0][i]+arr[1][i]+arr[2][i]
            if(sum==3){
                return 1;
            }
            if(sum==-3){
                return -1;
            }
        
        }
      
            sum=arr[0][0]+arr[1][1]+arr[2][2]
            if(sum==3){
                return 1;
            }else if(sum==-3){
                return -1;
            }
        sum=arr[0][2]+arr[1][1]+arr[2][0]
        if(sum==3){
           return 1;
        }else if(sum==-3){
            return -1;
        } 
    }
    showInterstitial=async ()=> {
        try{
            await AdMobInterstitial.setAdUnitID('ca-app-pub-1528217790054116/9527664094'); // Test ID, Replace with your-admob-unit-id
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
            await AdMobInterstitial.showAdAsync();
            setTimeout(() => {
             AdMobInterstitial.dismissAdAsync();
              }, 1000);
        }catch(error){
            console.log(error);

        }

    //await AdMobRewarded.setAdUnitID('ca-app-pub-1528217790054116/8816367596'); // Test ID, Replace with your-admob-unit-id
    //await AdMobRewarded.requestAdAsync(); 
    //await AdMobRewarded.showAdAsync();
}

  render(){
    return(  
          
        <View style={{alignItems:"center",borderWidth:1,width:"100%",height:"100%",justifyContent:"center"}}>
             <View style={{marginBottom:40,marginTop:30,borderRadius:10,padding:10,justifyContent:"center",backgroundColor:"violet",alignItems:"center",width:200}}>
                <Text style={{fontSize:30}}>Tic Tac Toe</Text>
            </View>
            <View style={{width:"95%",padding:10,justifyContent:"space-around",flexDirection:"row",marginBottom:25}}>
                <View style={{marginRight:10}}>
                     <Image style={{borderRadius:100,width:40,height:40}} source={require("../assets/tom.png")}/>
               <Text style={{padding:15,borderRadius:12}}>{this.state.Player1}</Text>
                </View>
                <View style={{marginLeft:10}}>
                    <Image style={{borderRadius:100,width:40,height:40}} source={require("../assets/dog.jpeg")}/>
                     <Text style={{padding:15,borderRadius:12}}>{this.state.Player2}</Text>
                </View>
            </View>
            <View style={Style.mainContainer}>
                <View style={Style.container} >
                    <TouchableOpacity onPress={()=>{this.onTileChange(0,0)}}style={[Style.Tile,Style.Border,Style.Top,Style.Left]}>
                         {this.renderState(0,0)} 
                     </TouchableOpacity> 
                    <TouchableOpacity onPress={()=>{this.onTileChange(0,1)}} style={[Style.Tile,Style.Top]}>
                        {this.renderState(0,1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onTileChange(0,2)}} style={[Style.Tile,Style.Top,Style.Right,Style.Border]}>
                         {this.renderState(0,2)}
                    </TouchableOpacity>
                </View>
                <View style={Style.container}>
                    <TouchableOpacity onPress={()=>{this.onTileChange(1,0)}} style={[Style.Tile,Style.left,Style.Left]}>
                         {this.renderState(1,0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onTileChange(1,1)}} style={[Style.Tile,Style.lowOpacity]}>
                         {this.renderState(1,1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onTileChange(1,2)}} style={[Style.Tile,Style.right,,Style.Right]}>
                         {this.renderState(1,2)}
                    </TouchableOpacity>
                </View>
                <View  style={Style.container}>
                    <TouchableOpacity onPress={()=>{this.onTileChange(2,0)}} style={[Style.Tile,Style.Border,Style.Bottom,,Style.Left]}>
                         {this.renderState(2,0)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onTileChange(2,1)}} style={[Style.Tile,Style.Bottom,Style.Bottom]}>
                         {this.renderState(2,1)}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.onTileChange(2,2)}} style={[Style.Tile,Style.Border,Style.Right,,Style.Bottom]}>
                         {this.renderState(2,2)}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:"row",width:"65%",alignItems:"center",justifyContent:"space-between"}}>
               <TouchableOpacity onPress={()=>{this.startGame();this.showInterstitial();}} style={{marginTop:50,backgroundColor:"pink",padding:10,borderRadius:5}}>
                <Text>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(props)=>{
            this.showInterstitial();
            this.props.navigation.navigate('Splash');
            }} style={{marginTop:50,backgroundColor:"pink",padding:10,borderRadius:5}}>
            <Text>Go Back</Text>
            </TouchableOpacity>
            </View>
          <View style={{width:"100%",marginLeft:10,marginRight:10,marginTop:25}}>
            <AdMobBanner bannerSize="smartBanner"  adUnitID= {Platform.OS=="ios"?"ca-app-pub-1528217790054116/2209832302":"ca-app-pub-1528217790054116/7735451720"} servePersonalizedAds={true}/>
           
            </View>
        </View>
    )
} 
}

const Style= StyleSheet.create({
    Tile:{
        width:85,
        height:85,
        borderWidth:4,
        justifyContent:"center",
        alignItems: "center",
        opacity:0.9

    },
    Top:{
      borderTopWidth:0
    },
    Bottom:{
      borderBottomWidth:0
    },
    Right:{
      borderRightWidth:0
    },
    Left:{
      borderLeftWidth:0
    },
    container:{
        flexDirection:"row",
        borderLeftWidth:0,
        borderRightWidth:0
    },
    mainContainer:{
      padding:10,
      justifyContent:"center",
      alignItems:"center",
    }
})