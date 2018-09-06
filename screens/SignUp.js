import React, { Component, PropTypes } from 'react';
import Logo from '../components/Logo';
import SignUpForm from '../components/SignUpForm';
import Wallpaper from '../components/Wallpaper';
import SignupSection from '../components/SignupSection';
import {View} from 'react-native';

export default class SignUpScreen extends Component {
	render() {
		return (
			<Wallpaper>
				<Logo/>
				<SignUpForm />
				<View style={{flex:2}} />
			</Wallpaper>
		);
	}
}