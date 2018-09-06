import React, { Component } from 'react';
import CommentBox from '../components/CommentBox';
import CommentList from '../components/CommentList';
import AddComment from '../components/AddComment';
import {FlatList,ScrollView,Text,View,Button} from 'react-native';
import {connect} from 'react-redux'
import {respondToComment} from '../actions/comment'
import * as api from '../config/api';

//let i = 0;

const mapStateToProps = ({commentResponses,currentUser},{navigation}) => {
  
    let sondage = navigation.getParam("sondage",{});
    let comment = navigation.getParam("comment",{});
    let showCommentBox = navigation.getParam("showCommentBox",false);
   // i++;
   // console.log("CommentResponses - navigation ",i,navigation)

    return {
          sondage,
          comment,
          showCommentBox,
          responses:commentResponses.filter(r=>r.commentKey===comment.key),
          currentUser
      }
  }
  
  
  const mapDispatchToProps = (dispatch) => {

    return {
      /*sendComment:(func,sondageKey,commentKey,answer)=>text=>{
        func(sondageKey,commentKey,text);
        dispatch(respondToComment(sondageKey,commentKey,text,answer))
      },*/
      onCommentResponse:(sondageKey,commentKey,response)=>{
        //func(sondageKey,commentKey,text);
        dispatch(respondToComment(sondageKey,commentKey,response))
      }
    }
  }

class CommentResponses extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showAddComment:this.props.showCommentBox
          };
      }
    
      
      showAddComment = () => {
        //console.log("Add Comment pressed !");
        this.setState({
          showAddComment:true
        });
      }
    
      sendComment = (sondageKey,commentKey)=>content=> {

        api.respondToComment(this.props.currentUser.token,sondageKey,commentKey,{content})
        .then((response) => response.json())
        .then((responseJson)=>{
            console.log("responding to comment",commentKey,responseJson);
            this.props.onCommentResponse(sondageKey,commentKey,responseJson);
         })
        .catch((error)=>{
             console.log("responding to comment",error);
        });

        this.setState({
          showAddComment:false
        });
      }
    
      cancelComment = () => {
       // console.log("The comment was cancelled !");
        this.setState({
          showAddComment:false
        });
      }

      
      render() {

        let {sondage,comment,responses} = this.props;

        return (
          <View style={styles.containerView}>
            <ScrollView style={styles.containerScrollView}>
                <Text style={styles.title}>{sondage.question}</Text>
                <CommentBox 
                    backgroundColor="#EEEEEE" 
                    displayNbResponses = {false}
                    nbResponses = {responses.length}
                    yes = {comment.answer==="oui"}
                    text={comment.text}
                    hideReplyAction={false}
                    onReply={this.showAddComment}
                    user={comment.user}
                    userPicture={comment.picture}
                    nbThumbsUp={comment.nbThumbsUp}
                    nbThumbsDown={comment.nbThumbsDown}
                />
                <Text style={styles.nbResponses} >{responses.length+ " REPONSE"+ (responses.length>1?"S":"")}</Text>
                <CommentList 
                  hideReplyAction
                  idKey={comment.key} 
                  onReply={this.showAddComment}
                  isResponseList={true}
                />
            </ScrollView>
            <AddComment 
                show={this.state.showAddComment} 
               // onCommentSend={this.props.sendComment(this.sendComment,sondage.key,comment.key,comment.answer)} 
                 onCommentSend={this.sendComment(sondage.key,comment.key)} 
                onCancelComment={this.cancelComment}/>
          </View>
        );
      }
    }
    

export default connect(mapStateToProps,mapDispatchToProps)(CommentResponses); 


    const styles = {
        containerView: {
            flex: 1,
            marginTop:16,
        },
        containerScrollView: {
          flex: 1,
        },
        commentsHeader:{
          flexDirection:'row',
          paddingLeft:20,
          marginTop:20,
          marginBottom:20,
        },
        nbResponses: {
          backgroundColor:'#607D8B',
          color:'white',
          borderColor:'#D3D3D3',
          borderBottomWidth:1,
          paddingLeft:20,
          paddingBottom:8,
          paddingTop:8,
          fontWeight:'bold'
        },
        title: {
          fontSize : 20,
          color : 'blue',
          borderColor:'#D3D3D3',
          borderBottomWidth:1,
          padding:20,
        },
        
    };