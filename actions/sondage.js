import {RESPOND_TO_SONDAGE,INIT_SONDAGES} from './actionTypes';


const transformSondage = ({id,title,question,published_at,comments_count,answers_count,oui_count,non_count,userAnswer}) => {
    return {
        key:id,
        title,
        question,
        answer:(userAnswer && userAnswer.answer)?userAnswer.answer:"none",
        nbAnswers:answers_count,
        nbYes:oui_count,
        nbNo:non_count,
    }
}

export const respondToSondage = (key,answer) => {
    return {
      type: RESPOND_TO_SONDAGE, 
      payload:{
          key,
          answer
      }
    }
}

export const initSondages = (sondages) => {
    return {
      type: INIT_SONDAGES, 
      payload: sondages.map(e=>transformSondage(e))
    }
}