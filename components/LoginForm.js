import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	Alert
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg  from '../images/eye_black.png';
import * as api from '../config/api';
import {connect} from 'react-redux';
import {initCurrentUser} from '../actions/user'
import {initSondages} from '../actions/sondage'

//const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdlZDQzZDEwNGYzNWU5YzQ3ODI0MjZmMzBlZGU0MjcwODE3OGEyYzY4OGYyYzMyZmZiODE1NjhlYjI1ODIzZWI5ZDQwMmRlYjUxZDcxMWNmIn0.eyJhdWQiOiIxIiwianRpIjoiN2VkNDNkMTA0ZjM1ZTljNDc4MjQyNmYzMGVkZTQyNzA4MTc4YTJjNjg4ZjJjMzJmZmI4MTU2OGViMjU4MjNlYjlkNDAyZGViNTFkNzExY2YiLCJpYXQiOjE1MzYxNTkxMzgsIm5iZiI6MTUzNjE1OTEzOCwiZXhwIjoxNTY3Njk1MTM4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cUGaxGNKxTZpuNH9RRx65p-pocvS4fAMFtahsauHxSBWpfeMqm6Pe6ALr5mRDpAI3xvpo7GvS13FHtFijhTuYocHqULbUqkqwWRFlB0rYqEIUImOwcxVo6u1s78s5naQqdMQC9an6u5Wm8C7amSsV0htv18-cVB8TjSlkxXY5XtNJpsQPU6O2YaKS72kzn2BIIP3svsH0wSPDy42OM28uERghr_yAldR9TofnX7H4Rp8FJ1o_aFPT5NcLLHM7OPLXUdi8alfZ2SiwL3W2iAGeQ1M0CFBq9AH9noYaXlhqcWEBfEFlGPjhJ5GDytbiaZm7B4WO8PK9Np-UYekWiGyHM087LUZuHmtrztIWeucQ76WH4jPIo93wN4Jw8RHC0TIwYU6kdUD7U7Z3JqIt9GG1pdFrjwvkgO6KI6C6LcynVaDtrjBg3t75Ey-_vB_qK6V0x217ooIgqAsRYqpYxud_PkcAAVvpPJjlRyZTU3EbBjGfRWrIrsQYUSnUGZQ1FMsy6ix-blFkf3nJsxIqGhnH6QlpW1JP3eCYmSW_rq93BGUbmo5IKR_nf9kKR0NoRc4UI_GQr4-hczZ01dgy1z4Lwg3tFfLJIjQB_K2bZtAQjUsHH6AiySkaVk6fUn2es5OSmoSFI-tWs2wUropT5oDJMOhwvEhW3kOVUUrqNKOlTI";


export class LoginForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
			showPass: true,
			press: false,
			isConnexionBtnLoading:false,
			name:'',
			password:''
		};
		this.showPass = this.showPass.bind(this);
	}

   showPass = () => {
 	 this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
   }

   handleSubmit = ()=>{
	
	  if(this.state.name==='' || this.state.password===''){
		  Alert.alert('Champ(s) non rempli(s)','Veuillez remplir vos identifiants');
		  return;
	  }

	  this.setState({isConnexionBtnLoading:true});

	  api.login(this.state.name,this.state.password).then((response) => response.json())
			.then((responseJson)=>{
				if(responseJson.success){
					let token = responseJson.success.token;
					let user = responseJson.success.user;
					user['token'] = token;
					this.props.onUserLoggedIn(user);
					
					api.getServeys(token)
					.then((response) => response.json())
					.then((sondagesJson)=>{
						 // console.log("LoginForm-loadingSondages",sondagesJson);
						 this.props.onSondagesLoaded(sondagesJson);
						 this.setState({isConnexionBtnLoading:false});
						 this.props.onSubmitOk(); 
					}).catch(error=>{
						//console.log("Erreur : Sondage pas chargé ",error);  
						Alert.alert('Erreur','Un problème est survenu lors du chargement des sondages !')
						this.setState({isConnexionBtnLoading:false});
					})
				}
				else{
					console.log("error auth",responseJson.error)
					Alert.alert('Erreur de connexion',responseJson.error)
					this.setState({isConnexionBtnLoading:false});
				}
	 })
	 .catch((error)=>{
				console.log("error",error);
				Alert.alert('Erreur de connexion','Un problème est survenu lors de la connexion')
				this.setState({isConnexionBtnLoading:false});
	 });
		
			//this.logApi(api.register('mariama','mariama@gmail.com','1234'));
			//this.logApi(api.answerServey(token,2,{answer:"non"}));
			// this.logApi(api.commentServey(token,2,{content:"commentaire suite à ma réponse"}));
			// this.logApi(api.flagComment(token,10));
			//this.logApi(api.getCommentsOfServey(token,2));
			//this.logApi(api.respondToComment(token,2,10,{content:"responding to myself"}));
			//this.logApi(api.getResponsesOfComment(token,2,10));
			// this.logApi(api.getServey(token,2));
			//this.logApi(api.getServeys(token));
			//this.logApi(api.getUserDetails());
			//this.logApi(api.thumbComment(token,10,{type:'down'}));
			// this.logApi(api.deleteFlag(token,10));
			//this.logApi(api.deleteThumb(token,10));

	   /*setTimeout(() => {
		this.props.onSubmitOk();
	   }, 2300);*/
	   
   }

   onNameChanged = (name) => {
		this.setState({name})
   }

   onPasswordChanged = (password) => {
		this.setState({password})
   }

   logApi = (fetchPromise)=>{
		fetchPromise.then((response) => response.json())
		.then((responseJson)=>{
			console.log("responseJson",responseJson);
		})
		.catch((error)=>{
			console.log("error",error);
		});
   }

	render() {
		//console.log("LoginForm-state",this.state);
		return (
			<KeyboardAvoidingView behavior='padding'
				style={styles.container}>
				<UserInput source={usernameImg}
					placeholder="Nom d'utilisateur"
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} 
					value={this.state.name}
					onChangeText={this.onNameChanged}/>
				<UserInput source={passwordImg}
					secureTextEntry={this.state.showPass}
					placeholder='Mot de passe'
					returnKeyType={'done'}
					autoCapitalize={'none'}  
					autoCorrect={false} 
					value={this.state.password}
					onChangeText={this.onPasswordChanged}/>
				<TouchableOpacity
					activeOpacity={0.7}
					style={styles.btnEye}
					onPress={this.showPass}
				>
				<Image source={eyeImg} style={styles.iconEye} />
				</TouchableOpacity>
				<ButtonSubmit 
						isLoading={this.state.isConnexionBtnLoading}
						text="CONNEXION" 
						onConnexionBtnPressed={this.handleSubmit}
				/>
			</KeyboardAvoidingView>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: 'center',
	},
	btnEye: {
    position: 'absolute',
    top: 80,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});

const mapStateToProps = ({currentUser}) => {
	//console.log("LoginForm - currentUser",currentUser)
	return {
		currentUser
	};
}
	
	
const mapDispatchToProps = (dispatch) => {
	return {
		onUserLoggedIn:(user)=>dispatch(initCurrentUser(user)),
		onSondagesLoaded:(sondages) =>dispatch(initSondages(sondages))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
  )(LoginForm);
