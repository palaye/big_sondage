import 
{
  ADD_COMMENT,
  RESPOND_TO_COMMENT,
  ACTION_ON_COMMENT,
  INIT_SONDAGE_COMMENTS,
  INIT_COMMENT_RESPONSES
} from './actionTypes';
import moment from 'moment';


const transformComment = ({id,servey_id,content,
                        created_at,user,userAnswer,user_thumb,
                        responses_count,flags_count,thumbs_up_count,
                        thumbs_down_count}) => {
  return {
    key:id,
    sondageKey:servey_id,
    text:content,
    date:moment(created_at, "YYYY-MM-DD HH:mm:ss").format(" DD-MM-YYYY à HH:mm"),
    user:user.name,
    picture:"https://randomuser.me/api/portraits/men/55.jpg",
    nbThumbsUp:thumbs_up_count,
    nbThumbsDown:thumbs_down_count,
    answer:(userAnswer && userAnswer.answer)?userAnswer.answer:"none",
    nbResponses:responses_count,
    flag:(flags_count>0), 
    userThumbsUp:(user_thumb.length==1)?(user_thumb[0].type=='up'):false,
    userThumbsDown:(user_thumb.length==1)?(user_thumb[0].type=='down'):false,
  }
}

const transformResponse = ({id,servey_id,content,
  created_at,user,userAnswer,user_thumb,
  response_to,flags_count,thumbs_up_count,
  thumbs_down_count}) => {
  return {
  key:id,
  sondageKey:servey_id,
  text:content,
  date:moment(created_at, "YYYY-MM-DD HH:mm:ss").format(" DD-MM-YYYY à HH:mm"),
  user:user.name,
  picture:"https://randomuser.me/api/portraits/men/55.jpg",
  nbThumbsUp:thumbs_up_count,
  nbThumbsDown:thumbs_down_count,
  answer:(userAnswer && userAnswer.answer)?userAnswer.answer:"none",
  commentKey:response_to,
  flag:(flags_count>0), 
  userThumbsUp:(user_thumb.length==1)?(user_thumb[0].type=='up'):false,
  userThumbsDown:(user_thumb.length==1)?(user_thumb[0].type=='down'):false,
  }
}

export const initSondageComments = (sondageKey,comments) => {
  return {
    type: INIT_SONDAGE_COMMENTS, 
    payload:comments.map(e=>transformComment(e)),
    meta : {
      sondageKey
    }
  }
}

export const initCommentResponses = (sondageKey,commentKey,responses)=>{
   return {
      type: INIT_COMMENT_RESPONSES, 
      payload:responses.map(e=>transformResponse(e)),
      meta : {
        sondageKey,
        commentKey
      }
  }
}  

export const addComment = (sondageKey,commentObj) => {
    return {
      type: ADD_COMMENT, 
      payload:transformComment(commentObj)
    }
}

export const respondToComment = (sondageKey,commentKey,responseObj) => {
    return {
      type: RESPOND_TO_COMMENT, 
      payload:transformResponse(responseObj),
      meta:{
        sondageKey,
        commentKey
      }
    }
}

export const THUMBS_UP = "THUMBS_UP";
export const THUMBS_DOWN = "THUMBS_DOWN";
export const FLAG = "FLAG";

export const respondToActionOnComment = (isResponse,key,actionType) => {
  return {
    type: ACTION_ON_COMMENT, 
    payload:{
      isResponse,
      key,
      actionType
    }
  }
}