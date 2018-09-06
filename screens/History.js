import React, { Component } from 'react';
import { Text,View,ScrollView} from 'react-native';
import SondageList from '../components/SondageList'
import title from '../components/Title'
import {Constants} from 'expo'
import {connect} from 'react-redux'
//import {sondages} from '../config/data'

const TOP_CLEAR = Constants.statusBarHeight + 8;

const mapStateToProps = ({sondages,comments}) => {

      let dataSimple = sondages.filter(e=>e.key!==1);
      let data = dataSimple.map(s=>{
          return {
            ...s,
            yes:Math.round(s.nbYes/s.nbAnswers*100)+"%",
            no:Math.round(s.nbNo/s.nbAnswers*100)+"%",
            comments:comments.filter(c=>c.sondageKey===s.key)
          }
      })

      return {
          data
      }
}
  
  
const mapDispatchToProps = (dispatch) => {
    return {}
}

class History extends Component {

  openSondageScreen = (sondageKey)=>{
    console.log("navigating to Sondage Screen - sondageKey ",sondageKey)
    this.props.navigation.navigate("SondageHome",{sondageKey});
  }

  render() {
    return (
      <View style={styles.containerView}>
        <Title> LES DERNIERS SONDAGES </Title>
      <ScrollView style={styles.scrollView}>
          <SondageList data={this.props.data} onPress={this.openSondageScreen}/>
      </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(History); 


const styles = {
    containerView: {
        flex: 1,
        marginTop:TOP_CLEAR,
        backgroundColor:"#fafafa"
    },
    title: {
      padding:8,
      fontWeight:'bold',
      fontSize: 15, 
      color: '#008975'
    },
    scrollView: {
      flex: 1,
      backgroundColor:"#fafafa"
    },
    
};