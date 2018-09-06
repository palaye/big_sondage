import React, { Component, PropTypes } from 'react';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import Wallpaper from '../components/Wallpaper';
import SignupSection from '../components/SignupSection';

export default class LoginScreen extends Component {

	goToHome = ()=>{
		//console.log("navigating to Tabs")
		 this.props.navigation.navigate("Tabs");
	}

	render() {
		return (
			<Wallpaper>
				<Logo />
				<LoginForm onSubmitOk={this.goToHome}/>
				<SignupSection/>
			</Wallpaper>
		);
	}
}