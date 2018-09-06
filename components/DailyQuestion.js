import React, { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {Card,Button} from 'react-native-elements'
import YesNo from './YesNo'

const CardTitle = ({title,subTitle}) => {
    return (
        <View style={{alignItems:"center"}}>
            <Text style={{fontWeight:"bold",fontSize:15}}>
                {this.props.title}
            </Text>
            <Text style={{fontSize:14,color:"grey"}}>
                {this.props.subTitle}
            </Text>
        </View>

    );
}

class DailyQuestion extends Component {



  render() {
    return (
        
        <Card title={this.props.date} 
              titleStyle={{padding:8,fontWeight:'bold',fontSize:15}}
              dividerStyle={{backgroundColor:'#008975'}}	>
            <Text style={{marginBottom: 10,fontSize:15}}>
                {this.props.question}
            </Text>
           
            <YesNo
                yes={this.props.yes} 
                no={this.props.no} 
                answer={this.props.answer}
                onAnswer={this.props.onAnswer}/>
           
        </Card>
    );
  }
}


const styles = {
    wrapper: {
        flex: 1,

    },
    btnView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height:120,
    },
    btn : {
        marginHorizontal:10,
    }

};


export default DailyQuestion;
