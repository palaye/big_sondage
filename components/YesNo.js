import React, { Component } from 'react';
import {Text,View} from 'react-native';
import {Button,Badge} from 'react-native-elements'


class YesNo extends Component {

    render () {

        return (
          <View style={styles.container}>
              <View style={{alignItems:"center"}}>
                    <Button 
                        buttonStyle={[styles.btnStyle,this.props.answer=='oui'?styles.btnColorSelected:styles.btnColor]} 
                        style={styles.btnNativeStyle} 
                        textStyle={[styles.text,this.props.answer=='oui'?styles.textColorSelected:styles.textColor]}
                        raised
                        onPress={()=>this.props.onAnswer("oui")}
                        large 
                        title="    OUI    " />
                    {this.props.answer!='none' && 
                    <Badge
                        value={this.props.yes?this.props.yes:"0%"}
                        containerStyle={styles.badgeValueContainer}
                    />
                    }
               </View>

               <View style={{alignItems:"center"}}>
                    <Button 
                        buttonStyle={[styles.btnStyle,this.props.answer=='non'?styles.btnColorSelected:styles.btnColor]}
                        style={styles.btnNativeStyle} 
                        textStyle={[styles.text,this.props.answer=='non'?styles.textColorSelected:styles.textColor]}
                        raised 
                        onPress={()=>this.props.onAnswer("non")}
                        large 
                        title="    NON    "  />
                        {this.props.answer!='none' && 
                        <Badge
                            value={this.props.no?this.props.no:"0%"}
                            containerStyle={styles.badgeValueContainer}
                        />
                        }
              </View>
          </View>
        )
    }

}
export default YesNo;

const styles = {
    container: {
        margin: 5,
        flexDirection: 'row',
        height: 100,
        justifyContent: 'space-around',
    },
    btnNativeStyle:{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    btnStyle:{
        height: 55,
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth:2,
    },
    btnColor:{
        backgroundColor:'transparent',
        borderColor:'#00AA8D',
    },
    btnColorSelected:{
        backgroundColor:'#00AA8D',
        borderColor:'#00AA8D',
    },
    text: {
        fontWeight: 'bold', 
        fontSize: 18,
    }, 
    textColor:{
        color:'#008975',
    },
    textColorSelected:{
        color:'white'
    },
    badgeValueContainer:{
        marginVertical:8,
        backgroundColor:"#008975",
        width:60,
    }
};
