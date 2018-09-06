import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView,
  Dimensions, TouchableOpacity, StatusBar, TextInput,Alert
} from 'react-native';
import { Button } from 'react-native-elements'
import {Constants} from 'expo'
import {connect} from 'react-redux'
import {editProfileInfo} from '../actions/user'
import {updateUser}  from '../config/api';

const TOP_CLEAR = Constants.statusBarHeight + 8

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;



class InfoActivite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex:0
    };

    this.design = {
          main : {
            flexDirection:'row',
            height:52,
            marginTop:16
          },
          tab : {
            flex:1,
            backgroundColor:'#00BF9A',
            justifyContent:'center',
          },
          selected: {  
            backgroundColor:'rgba(0,137,117,0.75)',
            borderColor:'rgba(244,82,77,0.75)',
            borderBottomWidth:4,
          },
          text:{
            color:'white',
            fontSize:16,
            textAlign:'center',
            textAlignVertical:'center',
          }
      } 

  }

  changeSelectedIndex = (newIndex) => {
    if(newIndex===this.state.selectedIndex) return;

    this.setState({
      selectedIndex:newIndex
    });
    
    if(this.props.onIndexChange){
       this.props.onIndexChange(newIndex);
    }
  }

  render(){

    const infoStyle = (this.state.selectedIndex==0)?[this.design.tab,this.design.selected]:this.design.tab;
    const activiteStyle = (this.state.selectedIndex==1)?[this.design.tab,this.design.selected]:this.design.tab;
    const activeOpacity = 0.9;

    return (
        <View style={this.design.main}>
            <TouchableOpacity 
                style={infoStyle} 
                activeOpacity={activeOpacity} 
                onPress={()=>this.changeSelectedIndex(0)}>
              <Text style={this.design.text}>
                INFO
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                 style={activiteStyle} 
                 activeOpacity={activeOpacity} 
                 onPress={()=>this.changeSelectedIndex(1)}>
              <Text style={this.design.text}>
                ACTIVITES
              </Text>
            </TouchableOpacity>
            
       </View>
    );

  }
      
    
}


const LineInfo = ({label,value,editMode,onChangeText}) => {
     
  let design = {
    container : {
      flexDirection:'column',
      borderBottomWidth:editMode?0:1,
      borderColor:'grey',
      marginBottom:16,
      paddingBottom:6,
    },
    label : {
      color:'#008975',
      fontSize:12,
      fontWeight:'bold'
    },
    value: {  
      color:editMode?'black':'rgba(126,123,138,1)',
      fontSize:16,
    },
 
} 
     return (
      <View style={design.container}>
          <Text style={design.label}>{label}</Text>
          {editMode?
          <TextInput onChangeText={(text) => onChangeText(text)} style={{marginTop:8}} defaultValue={value}/>
          :
          <Text style={design.value}>{value}</Text>
          }
      </View> 
     );

}

const mapStateToProps = ({currentUser}) => {
      return {
        ...currentUser,
        picture:currentUser.picture.large
      };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      editProfile:(id,name,email,password)=>dispatch(editProfileInfo(id,name,email,password)),
    }
  }



class Profile extends Component {
  constructor(props) {
    super(props);

    const {name, password,email, picture} = props;

    this.state = {
      selectedIndex:0,
      editMode:false,
      nameNew:name,
      passwordNew:password,
      emailNew:email,
      editBtDisabled:false,
    };

  }


  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }

  editBtnPressed = () => {
     if(this.state.editMode) {

       if(this.state.nameNew==='' || this.state.passwordNew===''){
             Alert.alert("Erreur","Les champs sont vides !!");
             return;
       }
        
       this.setState({ editBtDisabled:true});

       updateUser(this.props.token,this.state.nameNew,this.state.emailNew)
        .then((response) => response.json())
        .then((responseJson)=>{
               if(responseJson.error) Alert.alert("Erreur","Les informations remplies ne sont pas valides");
               else {
                   this.props.editProfile(this.props.id,
                                         this.state.nameNew,
                                         this.state.emailNew,
                                         this.state.passwordNew);
                    this.setState({
                      editMode:!this.state.editMode,
                    });
               }

               this.setState({ editBtDisabled:false});
        })
        .catch((error)=>{
            console.log("error Home-answer submit",error);
            Alert.alert("Erreur","Un problème est survenue lors de la modification du profil");
            this.setState({
              editMode:!this.state.editMode,
              editBtDisabled:false
            });
        });
         
 
     }
     else{
      this.setState({
        editMode:!this.state.editMode,
      });
     }

     
  }

  render() {

    const buttonsText = ['Info', 'Activité'];
    const { selectedIndex } = this.state

    const {name, password,email, picture} = this.props;

    return (
      <ScrollView style={[styles.container,{paddingBottom:(this.state.editMode?100:0)}]}>
        <View style={styles.scrollView}>
              <View style={styles.profileImgContainer}>
                <Image
                  source={{ uri: picture }}
                  style={styles.image}
                />
                <Text style={styles.imageTitle}>
                    {this.state.editMode?this.state.nameNew:name}
                 </Text>
              </View>
              <View style={styles.infoContainer}>
                    <LineInfo 
                        editMode={this.state.editMode} 
                        label="Nom d'utilisateur"
                        value = {this.state.editMode?this.state.nameNew:name}
                        onChangeText = {(nameNew)=>this.setState({nameNew})}
                    />
                    <LineInfo
                        editMode={this.state.editMode} 
                        label="Email" 
                        value = {this.state.editMode?this.state.emailNew:email}
                        onChangeText = {(emailNew)=>this.setState({emailNew})}
                    />
                    {/*<LineInfo 
                        editMode={this.state.editMode} 
                        label="Mot de passe"
                        value = {this.state.editMode?this.state.passwordNew:password}
                        onChangeText = {(passwordNew)=>this.setState({passwordNew})}
                    />*/}
              </View>
              <Button
                containerStyle={{ marginVertical: 20,justifyContent: 'center', alignItems: 'center'  }}
                style={{justifyContent: 'center', alignItems: 'center' }}
                buttonStyle={styles.editBtn}
                title={this.state.editMode?"SAUVEGARDER":"EDITER"}
                titleStyle={{fontSize: 24, color: 'white', textAlign: 'center', fontWeight:"bold" }}
                onPress={this.editBtnPressed}
                activeOpacity={0.5}
                disabled={this.state.editBtDisabled}
              />
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
     container : {
       flex: 1,
       marginTop:TOP_CLEAR
      },
      scrollView : {
        flex: 1,
        backgroundColor:"#fafafa",
      },
      profileImgContainer:{ 
        justifyContent: 'center', 
        alignItems: 'center' 
      },
      image:{
        width: IMAGE_SIZE,
         height: IMAGE_SIZE, 
         borderRadius: 10,
         marginTop:8
      },
      imageTitle:{
        fontSize: 26,
         color: 'black'
      },
      infoContainer:{
        flex: 1,
        marginTop: 20,
        marginHorizontal: 30
      },
      editBtn : { 
        height: 55,
        width: SCREEN_WIDTH - 40, 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'#F4524D',
        marginBottom:20,
      }
     
});