import React, { Component } from 'react';
import CommentBox from './CommentBox';
import {FlatList} from 'react-native';
import {connect} from 'react-redux'
    
const mapStateToProps = ({comments,commentResponses},ownProps) => {

   // console.log("commentList own props",ownProps)

    const {isResponseList,idKey,onReply} = ownProps;

    let dataSimple = isResponseList?
                    commentResponses.filter(e=>e.commentKey===idKey):
                    comments.filter(e=>e.sondageKey===idKey);

    //console.log("commentList datasimple",isResponseList,idKey,onReply)

    let data = dataSimple.map(e => {
        if(isResponseList) return {...e,responses:[]};
        else {
            return {
                ...e,
                responses:commentResponses.filter(r=>r.commentKey===e.key).map(x=>x.key)
            }
        }
    });      

   // console.log("In here !!")

    return {
        data,
        onReply,
        displayNbResponses:!isResponseList,
        hideReplyAction:isResponseList
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
   
    }
}



class CommentList extends  React.PureComponent {

    _renderItem = (withNbResponses,hideReplyAction) =>  ({item}) => (
        <CommentBox displayNbResponses={withNbResponses} 
                    nbResponses = {item.nbResponses}
                    yes = {item.answer==="oui"}
                    text={item.text}
                    hideReplyAction={hideReplyAction}
                    onReply={()=>this.props.onReply(item)}
                    user={item.user}
                    userPicture={item.picture}
                    nbThumbsUp={item.nbThumbsUp}
                    nbThumbsDown={item.nbThumbsDown}
                    onSeeResponses={()=>this.props.onSeeResponses(item)}
                    date={item.date}
                    />
    );

    render () {

       // console.log("Rendering CommentList");
        return (
            <FlatList
             data={this.props.data}
             renderItem={this._renderItem(this.props.displayNbResponses,this.props.hideReplyAction)}
          />
        )
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(CommentList); 


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