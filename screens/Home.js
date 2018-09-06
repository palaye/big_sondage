import React, { Component } from 'react';
import { Text,View,ScrollView,Button} from 'react-native';
import DailyQuestion from '../components/DailyQuestion'
import CommentList from '../components/CommentList'
import SondageList from '../components/SondageList'
import AddComment from '../components/AddComment'
import {Constants} from 'expo'
import {sondageDuJour} from '../config/data'
import {connect} from 'react-redux'
import {respondToSondage} from '../actions/sondage'
import {addComment,initSondageComments,initCommentResponses} from '../actions/comment'
import * as api from '../config/api';


const TOP_CLEAR = Constants.statusBarHeight + 8;


export default Home = (props)=>{

  
  if(props.navigation) {

      let navData = props.navigation.getParam("sondageKey",false);
      if(navData){
         return <SondageContainer idKey={navData} {...props} />
      } 
  }
 
  return <SondageContainer {...props} />
  
}


const mapStateToProps = ({sondages,currentUser},{idKey}) => {

  //console.log("mapStateToProps - sondages",sondages)
  //console.log("mapStateToProps - idKey",idKey)
  //console.log('found Sondage',)
  let data;
  if(idKey===undefined) data = sondages[0];
  else data = sondages.find(e=>(e.key===idKey));

  return {
      data,
      currentUser
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onAnswerSubmitted:key=>answer=>{
       //console.log("dispatch onAnswerSubmitted")
       dispatch(respondToSondage(key,answer))
    },
   /* sendComment:(func,sondageKey,answer)=>text=>{
      func();
      dispatch(addComment(sondageKey,text,answer))
    },*/
    onCommentAdded:(sondageKey,comment)=>{
      dispatch(addComment(sondageKey,comment))
    },
    onCommentsLoaded:(key,comments)=>dispatch(initSondageComments(key,comments)),
    onCommentResponsesLoaded:(sondageKey,commentKey,responses)=>{
      dispatch(initCommentResponses(sondageKey,commentKey,responses))
    }
  }
}


class Sondage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        showAddComment:false,
        
    };
  }

  componentDidMount(){
    
      const {key} = this.props.data;
       api.getCommentsOfServey(this.props.currentUser.token,key)
          .then((response) => response.json())
          .then((responseJson)=>{
             // console.log("comments of sondage loaded",key,responseJson);
              this.props.onCommentsLoaded(key,responseJson);
           })
          .catch((error)=>{
              // console.log("error Home-loading comments",error);
               Alert.alert('Erreur','Un problème est survenu lors chargement des comments')
          });
  } 

  
  showAddComment = () => {
    this.setState({
      showAddComment:true
    });
  }

  
  sendComment = sondageKey=>content=> {
    
        api.commentServey(this.props.currentUser.token,sondageKey,{content})
        .then((response) => response.json())
        .then((responseJson)=>{
            console.log("comment the servey",sondageKey,responseJson);
            this.props.onCommentAdded(sondageKey,responseJson);
          })
        .catch((error)=>{
              console.log("comment the servey",error);
        });

        this.setState({
          showAddComment:false
        });
  }

  cancelComment = () => {
    //console.log("The comment was cancelled !");
    this.setState({
      showAddComment:false
    });
  }

  seeCommentResponses = (comment)=>{
     const {key} = this.props.data;
     api.getResponsesOfComment(this.props.currentUser.token,key,comment.key)
       .then((response) => response.json())
       .then((responseJson)=>{
           console.log("responses of comment loaded",comment.key,responseJson);
           this.props.onCommentResponsesLoaded(key,comment.key,responseJson);
           this.props.navigation.navigate("CommentResponses",{sondage:this.props.data,comment});
        })
       .catch((error)=>{
            console.log("error Home-loading responses of",error);
       });
      
  }

  onAnswer = (userAnswer) => {
       console.log("userAnswer submitted ",userAnswer);
       const {key} = this.props.data;

       this.props.onAnswerSubmitted(key)(userAnswer);

       api.answerServey(this.props.currentUser.token,key,{answer:userAnswer})
         .then((response) => response.json())
         .then((responseJson)=>{
             console.log("answer submitted for survey",key,responseJson);
          })
         .catch((error)=>{
              console.log("error Home-answer submit",error);
         });

  }

  onReplyToComment = (comment)=>{
    const {key} = this.props.data;
    api.getResponsesOfComment(this.props.currentUser.token,key,comment.key)
      .then((response) => response.json())
      .then((responseJson)=>{
          console.log("responses of comment loaded",comment.key,responseJson);
          this.props.onCommentResponsesLoaded(key,comment.key,responseJson);
          this.props.navigation.navigate("CommentResponses",{sondage:this.props.data,comment,showCommentBox:true});          
       })
      .catch((error)=>{
           console.log("error Home-loading responses of",error);
      });

     }

  render() { 

    //console.log("rendering Home - sondage",this.props.data);

    const yes = Math.round(this.props.data.nbYes/this.props.data.nbAnswers*100)+"%";
    const no = Math.round(this.props.data.nbNo/this.props.data.nbAnswers*100)+"%";

    const {key,title,question,answer} = this.props.data;

    return (
      <View style={[styles.containerView,{marginTop:this.props.clearTop?TOP_CLEAR:0}]}>
      <ScrollView style={styles.scrollView}>
          <DailyQuestion
            date={title}
            question={question}
            yes={yes}
            no={no}
            answer = {answer}
            onAnswer={this.onAnswer}
            />
            {answer!='none' && 
           <View style={styles.comments}>
             <View style={styles.commentsHeader} >
                 <Button
                    onPress={this.showAddComment}
                    title="Ajouter un commentaire"
                    color="#F4524D"
                  />
             </View>
             <CommentList 
                  idKey={key} 
                  onReply={this.onReplyToComment}
                  isResponseList={false}
                  onSeeResponses={this.seeCommentResponses} />
           </View>
          }
      </ScrollView>
       <AddComment 
        show={this.state.showAddComment} 
        onCommentSend={this.sendComment(key)} 
        onCancelComment={this.cancelComment}/>
      </View>
    );
  }
}


const styles = {
    containerView: {
        flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor:"#fafafa"
    },
    commentsHeader:{
      flexDirection:'row',
      paddingLeft:20,
      paddingBottom:20,
      borderColor:'#D3D3D3',
      borderBottomWidth:1,
    },
    comments: {
      flex: 1,
      marginTop:50,
    },
    
};


let SondageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sondage);