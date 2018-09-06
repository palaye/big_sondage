import {EDIT_PROFILE_INFO,INIT_CURRENT_USER} from './actionTypes';


export const editProfileInfo = (id,name,email,password) => {
    return {
      type: EDIT_PROFILE_INFO, 
      payload:{
          id,
          name,
          email,
          password
      }
    }
}


export const initCurrentUser = (user) => {
    return {
      type: INIT_CURRENT_USER, 
      payload:user
    }
}
