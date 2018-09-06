
import 
{
RESPOND_TO_SONDAGE,
ACTION_ON_COMMENT,
ADD_COMMENT,
RESPOND_TO_COMMENT,
EDIT_PROFILE_INFO,
INIT_CURRENT_USER,
INIT_SONDAGES,
INIT_SONDAGE_COMMENTS,
INIT_COMMENT_RESPONSES
} from '../actions/actionTypes';

import {FLAG,THUMBS_DOWN,THUMBS_UP} from "../actions/comment"
import moment from 'moment';

export const currentUser = (state=[], action) => {
    if(action.type==INIT_CURRENT_USER){
       return {
         ...action.payload,
          picture: {
                large: "https://randomuser.me/api/portraits/men/30.jpg",
                medium: "https://randomuser.me/api/portraits/med/men/30.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/men/30.jpg"
          }
        };
    }
    else if(action.type===EDIT_PROFILE_INFO){
      const {name, email} = action.payload;
      return{
        ...state,
        email,
        name
      }
    }
    return state;
}

export const sondages = (state=[], action) => {

  if(action.type==INIT_SONDAGES){
    return action.payload;
  }
  else if(action.type===RESPOND_TO_SONDAGE){

    console.log("reducer RespondToSondage ",action.payload);
    let newState = state.map(el => {
        if(el.key!==action.payload.key || el.answer!=="none") {
          return el;
        } 
        else{
          let nbYes = el.nbYes;
          let nbNo = el.nbNo;
          let answer = action.payload.answer;
  
          if(answer==="oui") nbYes++;
          else if(answer==="non") nbNo++;

          let newObj = {
            ...el,
            answer,
            nbAnswers:el.nbAnswers+1,
            nbYes,
            nbNo
          };
          console.log("reducer RespondToSondage",newObj);

          return newObj;
        }
    });

    return newState;
  }

  return state
}


export const comments = (state=[], action) => {

  if(action.type===INIT_SONDAGE_COMMENTS){
     let filterResult = state.filter(e=> (e.sondageKey!==action.meta.sondageKey))
      return filterResult.concat(action.payload);
  }
  else if(action.type===ADD_COMMENT){

   /* let {sondageKey,text,answer} = action.payload;

    let newComment = {
      key:state.length+1,
      sondageKey,
      text,
      date:moment.now(),
      user:"idy",
      picture:"https://randomuser.me/api/portraits/thumb/women/64.jpg",
      nbThumbsUp:0,
      nbThumbsDown:0,
      answer,
      flag:false,
      userThumbsUp:false,
      userThumbsDown:false,
    }*/

    let newState = state.concat(action.payload);

    return newState;
  } 
  else if(action.type===ACTION_ON_COMMENT && !action.payload.isResponse){
    return updateCommentListForAction(state,action)
  } 
  else if(action.type===RESPOND_TO_COMMENT){
    console.log("reducer RESPOND_TO_COMMENT ")
    let newState = state.map(el => {
      if(el.key!==action.meta.commentKey) return el;
      else return {
          ...el,
          nbResponses:el.nbResponses+1
        }    
    })
    console.log(state,newState)
    return newState;
  } 
  
 
  return state;
}


export const commentResponses = (state=[], action) => {
  if(action.type===INIT_COMMENT_RESPONSES){
    let filterResult = state.filter(e=> (e.commentKey!==action.meta.commentKey))
    return filterResult.concat(action.payload);
  }
  else if(action.type===RESPOND_TO_COMMENT){
  
      let newState = state.concat(action.payload);
  
      return newState;
  } 
  else if(action.type===ACTION_ON_COMMENT && action.payload.isResponse){
    
    return updateCommentListForAction(state,action)
  } 

  return state;
}

export const users = (state=[], action) => {


  /*if(action.type===EDIT_PROFILE_INFO){
      const {id, username, email,password} = action.payload;
      let newState = state.map(el => {
        if(el.id!==id) {
            return el;
        } 
        else{
            return {
              ...el,
              email,
              login:{
                username,
                password
              }
            }
        }
      });

      return newState;
  }*/

  return state;
}


const updateCommentListForAction = (list=[],action)=>{

    let {key,actionType} = action.payload;

    return  list.map(el => {
      if(el.key!==key) {
        return el;
      } 
      else{
          return newCommentForAction(el,actionType);
      }
    });
  
}



const newCommentForAction = (oldComment,actionType)=>{

  let newElt = oldComment;

  if(actionType==FLAG){
      newElt.flag = !newElt.flag;
  }
  else if(actionType==THUMBS_DOWN) {
      if(newElt.userThumbsDown) { // comment is currently thumbed down, so cancel thumb down
          newElt.userThumbsDown = false;
          newElt.nbThumbsDown = newElt.nbThumbsDown-1;
      }
      else if(newElt.userThumbsUp) { // comment is currently thumbed up, so thumb down
          newElt.userThumbsDown = true;
          newElt.userThumbsUp = false;
          newElt.nbThumbsDown = newElt.nbThumbsDown+1;
          newElt.nbThumbsUp = newElt.nbThumbsUp-1;
      }
      else{ // comment was not thumbed
          newElt.userThumbsDown = true;
          newElt.nbThumbsDown = newElt.nbThumbsDown+1;
      }
  }
  else if(actionType==THUMBS_UP) {
    if(newElt.userThumbsUp) { // comment is currently thumbed up, so cancel thumb up
        newElt.userThumbsUp = false;
        newElt.userThumbsUp = newElt.userThumbsUp-1;
    }
    else if(newElt.userThumbsDown) { // comment is currently thumbed down, so thumb up
        newElt.userThumbsUp = true;
        newElt.userThumbsDown = false;
        newElt.nbThumbsDown = newElt.nbThumbsDown-1;
        newElt.nbThumbsUp = newElt.nbThumbsUp+1;
    }
    else{ // comment was not thumbed
          newElt.userThumbsUp = true;
          newElt.userThumbsUp = newElt.userThumbsUp+1;
    }
  }
    
  

 return newElt;


}