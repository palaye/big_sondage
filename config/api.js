
const API_BASE_URL = "http://192.168.43.189/big/public/api/";

const Token = 

function apiError(message){
  return {
    status:"error",
    payload:message
  }
}
function apiSuccess(result){
  return {
    status:"success",
    payload:result
  }
}


function configPostJson(token,bodyContent){
  return {
    method:'POST',
    body:JSON.stringify(bodyContent),
    headers:{
      'Accept' : 'application/json',
      'Content-Type':'application/json',
      'Authorization':'Bearer '+token
    }
  }
}

function configDeleteJson(token){
  return {
    method:'DELETE',
    headers:{
      'Authorization':'Bearer '+token
    }
  }
}

function configGetJson(token){
  return {
    method:'GET',
    headers:{
      'Authorization':'Bearer '+token
    }
  }
}

function configFormPost(obj,token){
  let formData = new FormData();
  for(var k in obj) {
     formData.append(k,obj[k])
  }
  
  let config= {
    method:'POST',
    body:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    }
  }
  if(token) config.headers['Authorization'] = 'Bearer '+token;
  
  return config;
}

export function getUserDetails(token,userId){
  return fetch(API_BASE_URL+"users/"+userId,configGetJson(token));
}

export function login(name,password){
  return fetch(API_BASE_URL+"login",configFormPost({name,password}));
}

export function register(name,email,password){
  return fetch(API_BASE_URL+"register",configFormPost({name,email,password}));
}

export function updateUser(token,name,email){
  return fetch(API_BASE_URL+"user/update",configFormPost({name,email},token));
}

export function getServeys(token){
  return fetch(API_BASE_URL+"serveys",configGetJson(token));
}

export function getServey(token,serveyId){
  return fetch(API_BASE_URL+"serveys/"+serveyId,configGetJson(token));
}

export function answerServey(token,serveyId,answerObj){
  return fetch(API_BASE_URL+"serveys/"+serveyId+"/answers",configPostJson(token,answerObj));
}

export function commentServey(token,serveyId,commentObj){
  return fetch(API_BASE_URL+"serveys/"+serveyId+"/comments",configPostJson(token,commentObj));
}

export function getCommentsOfServey(token,serveyId){
  return fetch(API_BASE_URL+"serveys/"+serveyId+"/comments",configGetJson(token));
}

export function respondToComment(token,serveyId,commentId,responseObj){
  return fetch(API_BASE_URL+"serveys/"+serveyId+"/comments/"+commentId+"/responses",
              configPostJson(token,responseObj));
}

export function getResponsesOfComment(token,serveyId,commentId){
  return fetch(API_BASE_URL+"serveys/"+serveyId+"/comments/"+commentId+"/responses",
              configGetJson(token));
}

export function thumbComment(token,commentId,thumbObj){
  return fetch(API_BASE_URL+"comments/"+commentId+"/thumbs",
              configPostJson(token,thumbObj));
}

export function deleteThumb(token,commentId){
  return fetch(API_BASE_URL+"comments/"+commentId+"/thumbs",
              configDeleteJson(token));
}

export function flagComment(token,commentId){
  return fetch(API_BASE_URL+"comments/"+commentId+"/flags",
              configPostJson(token,{}));
}

export function deleteFlag(token,commentId){
  return fetch(API_BASE_URL+"comments/"+commentId+"/flags",
              configDeleteJson(token));
}