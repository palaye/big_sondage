import React, { Component } from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {Avatar,Badge} from 'react-native-elements'
import {MaterialIcons } from '@expo/vector-icons';
import sondage_icon from '../images/sondage_icon.png';


const AvatarBox = () => {
    
    const design = {
        container:{
            width:70,
            //backgroundColor : 'yellow',
            flexDirection:'row',
            justifyContent:'center'
        }
    }

    return (
        <View style={design.container} >
            <Avatar
                medium
                rounded
                source={sondage_icon}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              //  containerStyle={{backgroundColor:'#D3D3D3'}}
                overlayContainerStyle={{backgroundColor: 'transparent'}}
                />
       </View>
    );
};

const Content = ({title}) => {

    const design = {
        container:{
            flexDirection:'column',
           // backgroundColor : 'red',
            marginBottom : 12,
        }
    }

    return (
        <View style={design.container} >
            <Text>{title}</Text>
       </View>
    );
};

const StatValue = ({label,value,labelStyle,valueTextStyle,valueContainerStyle}) => {
    
        const design = {
            container:{
                flexDirection:'row',
                // marginRight : 28,
                alignItems:'center'
            },
        }
    
        return (
            <View style={design.container} >
                <Text style={labelStyle} >{label}</Text>
                <Badge
                    value={value}
                    textStyle={valueTextStyle}
                    containerStyle={valueContainerStyle}
                />
           </View>
        );
};
    
const Stats = ({yes,no,nbComments}) => {

    const colorFeel = "#3498db";
    const iconSize=16;

    const design = {
        container:{
           
        },
        yesNoStats:{
            flexDirection:'row',
            marginBottom :12,
            justifyContent:'space-around',
        },
        label:{
            color:'white',
            textAlign:'center',
            paddingVertical:4,
            paddingHorizontal:8,
            borderRadius:4,
            fontSize:12,
            fontWeight:'bold',
            marginRight:8,
        },
        yesLabelBG:{
            backgroundColor:"#2E7D32"
        },
        noLabelBG:{
            backgroundColor:"#B71C1C"
        }, 
        valueContainer:{
            backgroundColor:"#455A64"
           // backgroundColor:"#008975"
        }, 
        commentStats:{
            flexDirection:'row',
            justifyContent:'flex-end',
            alignItems:'center'
        },
        text:{
            color : colorFeel,
           // fontWeight :"bold",
        }
    }
    
        return (
            <View style={design.container}>
                <View style={design.yesNoStats}>
                        <StatValue
                            labelStyle={[design.label,design.yesLabelBG]}
                           // valueTextStyle={}
                            valueContainerStyle={design.valueContainer}
                            label="OUI" 
                            value={yes}/>        
                        <StatValue 
                            labelStyle={[design.label,design.noLabelBG]}
                          //  valueTextStyle={}
                            valueContainerStyle={design.valueContainer}
                            label="NON"
                            value={no}/>             
                </View>
                <View style={design.commentStats}>        
                    <Text style={design.text} >{nbComments + " commentaire"+(nbComments>1?"s":"")}</Text>
                    <MaterialIcons  name="navigate-next" size={iconSize} color={colorFeel} />
                </View>
           </View>
        );
};

const Participate = () => {

    const colorFeel = "#3498db";
    const iconSize=16;

    const design = {
        container:{
            flexDirection:'row',
            justifyContent:'flex-end',
            alignItems:'center'
        },
        text:{
            color : colorFeel,
           // fontWeight :"bold",
        }
    }

    


    return (

           <View style={design.container}>        
                    <Text style={design.text} >Participer au sondage</Text>
                    <MaterialIcons  name="navigate-next" size={iconSize} color={colorFeel} />
           </View>

    );

}
    

class SondageBoxItem extends Component {



    render () {

        return (
          <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.container}>
              <AvatarBox/>
              <View style={styles.main}>
                  <Content title={this.props.title}/>
                  {
                    this.props.displayStats?
                   <Stats 
                     yes={this.props.yes} 
                     no={this.props.no}
                     nbComments={this.props.nbComments}/>
                   :
                   (<Participate/>)
                   }
              </View>
           </View>
         </TouchableOpacity>
         
        )
    }

}
export default SondageBoxItem;


const styles = {
    container: {
      padding:5,
      flexDirection: 'row',
      paddingTop:10,
      paddingBottom:10,
      borderColor:'#D3D3D3',
      borderBottomWidth:1
    },
    main: {
        flex:1,
        flexDirection:'column',
       // backgroundColor:'green',
        marginRight:5,
    },
  };