import React, { Component } from 'react';
import {
  StyleSheet, Text, View,ScrollView, 
  Dimensions, TouchableOpacity,TouchableHighlight,Alert,
  Share,Linking

} from 'react-native';
import { Ionicons,Feather, MaterialIcons } from '@expo/vector-icons';


const LineIconText = ({iconName,text,onPress}) => {
     
     let iconSize =  32;

     let design = {
       containerView: {
         flexDirection: 'row',
         height:80, 
         alignItems:'center',
         borderColor:'#BDBDBD',
         borderBottomWidth:1,
         marginLeft:20,
         backgroundColor:"#fafafa",
        }
     }

     return (
      <TouchableOpacity onPress={onPress}>
      <View style={design.containerView}>
          <Ionicons style={{padding:4}} name={iconName} size={iconSize} color="#008975" />
          <Text style={{marginLeft:20}}>{text}</Text>
      </View>
      </TouchableOpacity>
     );

}

export default class MoreOptions extends Component {
  constructor(props) {
    super(props);
  }


  logOut = () => {
    //console.log('Deconnexion')
  }

  confirmLogOut = () =>{
    Alert.alert(
      'Confirmation',
      'Se déconnecter ?',
      [
        {text: 'NON', style: 'cancel'},
        {text: 'OUI', onPress: () => this.logOut()},
      ],
      { cancelable: false }
    )

  }

  inviteFriends = () => {
    Share.share({
      message: "Télécharger l'application et donnez votre opinion au quotidien sur le Sénégal",
      url: 'http://big.siss-group.com',
      title: 'Rejoignez-nous sur sn-sondage'
    }, {
      // Android only:
      dialogTitle: 'Inviter vos amis !',
    })
  }

  contactUs = () => {
    Linking.openURL("mailto:contact@sondage.sn?subject=contact")
  }

  goToWebsite = () => {
    Linking.openURL('http://big.siss-group.com/')
  }
  
  render() {
    return (
      <View style={{flex: 1,backgroundColor:"#fafafa"}}>
        <ScrollView style={{flex: 1,marginTop:24,marginBottom:8,backgroundColor:"#fafafa"}}>

                <Text style={{fontWeight:'bold',fontSize: 15, color: '#008975', marginLeft: 40,marginTop:40,marginBottom:12}}>
                  PLUS D'OPTIONS
                </Text>
                
                <LineIconText 
                  iconName="md-log-out" 
                  text="Déconnexion"
                  onPress={this.confirmLogOut} 
                />

                <LineIconText 
                  iconName="md-mail-open"
                  text="Contactez-nous"
                  onPress={this.contactUs}/>

                <LineIconText 
                    iconName="md-person-add" 
                    text="Inviter vos amis"
                    onPress={this.inviteFriends} />
                
                <Text style={{fontWeight:'bold',fontSize: 15, color: '#008975', marginLeft: 40,marginLeft: 40,marginTop:40,marginBottom:12}}>
                  INFORMATIONS
                </Text>

                <TouchableOpacity onPress={this.goToWebsite}>
                  <Text style={{marginLeft:20,marginTop:20,borderColor:'#BDBDBD',borderBottomWidth:1,height:50}}>A propos</Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={this.goToWebsite}>
                  <Text style={{marginLeft:20,marginTop:20,borderColor:'#BDBDBD',borderBottomWidth:1,height:50}}>Conditions d'utilisation</Text>
                </TouchableOpacity> 

        </ScrollView>
      </View>
    );
  }
}
