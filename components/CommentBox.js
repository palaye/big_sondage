import React, { Component } from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {Avatar,Badge} from 'react-native-elements'
import { Ionicons,Feather, MaterialIcons } from '@expo/vector-icons';


const AvatarBox = ({yes,pictureLink}) => {
    
    const design = {
        container:{
            width:70,
        //    backgroundColor : 'yellow',
            alignItems:'center',
        },
        response:{
            marginTop:8,
            backgroundColor:(yes?"#2E7D32":"#B71C1C"),
            color:'white',
            textAlign:'center',
            paddingVertical:4,
            paddingHorizontal:8,
            borderRadius:4,
            fontSize:10,
            fontWeight:'bold',
        }
    }

    return (
        <View style={design.container} >
            <Avatar
                medium
                rounded
                source={{uri:pictureLink /*"https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"*/}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
            <Text style={design.response}>{yes?"OUI":"NON"}</Text>
       </View>
    );
};

const Content = ({title,user,subtitle}) => {

    const design = {
        container:{
            flexDirection:'column',
           // backgroundColor : 'red',
            marginBottom : 12,
        },
        title:{
            //color:'rgba(126,123,138,1)',
        },
        subtitle:{
            color:"#616161",  //"#455A64",
            marginLeft:8,
          //  fontWeight:'bold',
        },
        subtitleContainer:{
            flexDirection:'row',
            marginTop:8,
            alignItems:'center'
        }
    }

    return (
        <View style={design.container} >
            <Text style={design.title}>{title}</Text>
            <View style={design.subtitleContainer}>
                <Badge 
                    containerStyle={{ backgroundColor:"rgba(69,90,100,0.88)" /* '#455A64'*/}} 
                    textStyle={{ color: 'white',fontSize:11}}
                    value={user}
                />
                <Text style={design.subtitle}>{subtitle}</Text>
            </View>
       </View>
    );
};
  
class Actions extends Component {

    constructor(props) {
        super(props);
        this.design = {
            container:{
                flexDirection:'row',
              //  backgroundColor : 'pink',
                marginBottom :12,
            },
            left:{
                flexDirection:'row',
                justifyContent :'flex-start',
                alignItems: 'center',
            },
            right:{
                flex:1,
                flexDirection:'row',
                justifyContent :'flex-end',
                padding:8,
            },
            text:{
                marginLeft:4,
                marginRight:16,
            },
            replyActionView:{
                flexDirection:'row',
                alignItems:'center'
            }
    
        }

        this.iconSize = 20;
        this.iconPadding = 4;
        this.defaultIconColor =  "rgba(97,97,97,0.77)";      // "#90A4AE"
        this.selectionColor = "#1976D2" ; //"#F57F17";

        this.state = {
            nbThumbsUp : this.props.nbThumbsUp,
            nbThumbsDown : this.props.nbThumbsDown,
            selectedThumb : 'none',
            flagIsSelected : false,
        }
    }
   
   onThumbsUp = () =>{
       // console.log("onThumbsUp")
        if(this.state.selectedThumb=='down'){
            this.setState({
                nbThumbsDown:(this.state.nbThumbsDown-1),
                nbThumbsUp:(this.state.nbThumbsUp+1),
                selectedThumb : 'up'
            })
        }
        else if(this.state.selectedThumb=='up'){
            this.setState({
                nbThumbsUp:(this.state.nbThumbsUp-1),
                selectedThumb : 'none'
            })
        }
        else {
            this.setState({
                nbThumbsUp:(this.state.nbThumbsUp+1),
                selectedThumb : 'up'
            })
        }
   }

   onThumbsDown = () =>{
     // console.log("onThumbsDown")
        if(this.state.selectedThumb=='up'){
            this.setState({
                nbThumbsUp:(this.state.nbThumbsUp-1),
                nbThumbsDown:(this.state.nbThumbsDown+1),
                selectedThumb : 'down'
            })
        }
        else if(this.state.selectedThumb=='down'){
            this.setState({
                nbThumbsDown:(this.state.nbThumbsDown-1),
                selectedThumb : 'none'
            })
        }
        else {
            this.setState({
                nbThumbsDown:(this.state.nbThumbsDown+1),
                selectedThumb : 'down'
            })
        }
   }

   onFlagPressed = () => {
       if(this.state.flagIsSelected) {
           this.setState({
               flagIsSelected:false
           })
       }
       else {
        this.setState({
            flagIsSelected:true
        })
      }
   }

   render(){

        const {nbThumbsUp,nbThumbsDown,selectedThumb,flagIsSelected} = this.state;

        const thumbsUpColor = (selectedThumb==='up')?this.selectionColor:this.defaultIconColor;
        const thumbsDownColor = (selectedThumb==='down')?this.selectionColor:this.defaultIconColor;
        const flagColor = flagIsSelected?this.selectionColor:this.defaultIconColor;

        const nbReplies = this.props.nbReplies?this.props.nbReplies:0;

        return (
            <View style={this.design.container}>
                <View style={this.design.left}>
                    <Ionicons
                         onPress={this.onThumbsUp} 
                         style={{padding:this.iconPadding}}
                         name="md-thumbs-up" 
                         size={this.iconSize}
                         color={thumbsUpColor} />
                    <Text style={this.design.text}>{nbThumbsUp}</Text>
                
                    <Ionicons 
                        onPress={this.onThumbsDown} 
                        style={{top:5,padding:this.iconPadding}} 
                        name="md-thumbs-down"
                        size={this.iconSize} 
                        color={thumbsDownColor} />
                    <Text  style={this.design.text}>{nbThumbsDown}</Text>

                    {!this.props.hideReplyAction && 
                        <MaterialIcons 
                        onPress={this.props.onReply} 
                        style={{top:5,padding:this.iconPadding}} 
                        name="comment" 
                        size={this.iconSize} 
                        color={this.defaultIconColor} />
                    }

                    {/*<Text  style={this.design.text}>{nbReplies}</Text>*/}
                </View>

                <View style={this.design.right}>
                     <Ionicons 
                        onPress={this.onFlagPressed}
                        style={{top:5,padding:this.iconPadding}}
                        name="md-flag" 
                        size={this.iconSize-2} 
                        color={flagColor} />
                </View>

            </View>
        );


   }
        
};
  
 
/*
const Actions = ()=>{
    return <View/>
}
*/
class CommentBox extends Component {

    nbResponsesToText = (nbResponses)  => {
         if(nbResponses<=0) return "";
         else if(nbResponses==1) return "AFFICHER LA REPONSE";
         else return "AFFICHER LES "+nbResponses+" REPONSES";
    }

    render () {
        //console.log("CommentBox props",this.props)
        return (
            
          <View style={[styles.container,{backgroundColor:this.props.backgroundColor?this.props.backgroundColor:"#fafafa"}]} >
              <AvatarBox yes={this.props.yes} pictureLink={this.props.userPicture}/>
              <View style={styles.main}>
                  <Content title={this.props.text} user={this.props.user} subtitle={this.props.date}/>
                  <Actions 
                     nbThumbsUp={this.props.nbThumbsUp}
                     nbThumbsDown={this.props.nbThumbsDown}
                     hideReplyAction = {this.props.hideReplyAction} 
                     onReply={this.props.onReply}/>
                  {
                   this.props.displayNbResponses && (this.props.nbResponses>0) &&
                  <TouchableOpacity style={styles.nbResponsesContainer}>
                    <Text style={styles.nbResponses} onPress={this.props.onSeeResponses}>
                            {this.nbResponsesToText(this.props.nbResponses)}
                    </Text> 
                  </TouchableOpacity>
                  }
              </View>
          </View>
        
        )
    }

}
export default CommentBox;


const styles = {
    container: {
      padding:5,
      flexDirection: 'row',
      paddingTop:10,
      paddingBottom:10,
      borderColor:'#D3D3D3',
      borderBottomWidth:1,
    },
    main: {
        flex:1,
        flexDirection:'column',
       
      //  backgroundColor:'green',
        marginRight:5,
    },
    nbResponses: {
        fontSize: 15,
        color:"#3498db",
       // color:"#F4524D",
      // fontWeight:'bold'
    },
    nbResponsesContainer: {
       // alignSelf:'flex-end'
    }
  };