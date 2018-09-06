import React, { Component } from 'react';
import { View,TextInput,Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class AddComment extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
          keyboardHeight:0,
          text: ''
      };
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow  = (e) => {
      this.setState({
        keyboardHeight:e.endCoordinates.height
      }); 

      //console.log('Keyboard Shown ',e.endCoordinates.height);
  }

  _keyboardDidHide = (e)  => {
 
    this.setState({
      keyboardHeight:0
    }); 
     //  console.log('Keyboard Hidden');
  }


  render(){
      const colorFeel = '#F4524D';
      const design = {
          container:{
             position:'absolute',
             bottom:this.state.keyboardHeight,
             right:2,
             left:2,
             zIndex:100,
             backgroundColor:'white',
             height:100,
             borderWidth:2,
             borderColor:colorFeel
          },
          commentArea:{
            flex:1,
            flexDirection:'row',
            marginRight:5,
         },
          text:{
            flex:1,
          },
          actionsArea:{
            flexDirection:'column',
            justifyContent:'space-between',
            marginBottom:16
         },
         closeIcon:{
          position:'relative',
          top:0,
       },
      }
      
      if(this.props.show) {
        return (
          <View behavior="padding" style={design.container}>
            <View style={design.commentArea}>
                  <TextInput
                      autoFocus
                      multiline
                      style={design.text}
                      placeholder="Tapez votre commentaire"
                      onChangeText={(text) => this.setState({text})}
                    />
                  <View style={design.actionsArea}>
                    <Ionicons style={design.closeIcon} name="md-close-circle" size={28} color="#455A64" onPress={this.props.onCancelComment} />
                    <Ionicons name="md-send" size={32} color={colorFeel} onPress={()=>this.props.onCommentSend(this.state.text)} />
                  </View>
            </View>
          </View>
      )
    }
    else return null;

  }

}