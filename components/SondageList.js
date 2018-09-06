import React, { Component } from 'react';
import SondageBoxItem from './SondageBoxItem';
import {FlatList} from 'react-native';



    

class SondageList extends  React.PureComponent {

 

    _renderItem = ({item}) => (
        <SondageBoxItem  
            data = {item}
            title={item.question} 
            date={item.title}
            displayStats={(item.answer!=="none")}
            yes={item.yes}
            no={item.no}
            nbComments={item.comments.length}
            onPress={()=>this.props.onPress(item.key)}/>
    );

    render () {
        return (
            <FlatList
             data={this.props.data}
             renderItem={this._renderItem}
          />
        )
    }

}
export default SondageList;


const styles = {
    container: {
      padding:5,
      flexDirection: 'row',
      paddingTop:10,
      paddingBottom:10,
    },
    main: {
        flex:1,
        flexDirection:'column',
      //  backgroundColor:'green',
        marginRight:5,
    },
  };