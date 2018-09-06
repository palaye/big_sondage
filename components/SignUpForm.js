import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg  from '../images/eye_black.png';

export default class SignUpForm extends Component {
	constructor(props) {
    super(props);
	}


	render() {
		return (
			<KeyboardAvoidingView behavior="padding"
				style={styles.container}>
				<UserInput source={usernameImg}
					placeholder='Username'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} />
				<UserInput source={usernameImg}
					placeholder='Email'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} />
					
				<UserInput source={passwordImg}
					secureTextEntry
					placeholder='Password'
					returnKeyType={'done'}
					autoCapitalize={'none'}
					autoCorrect={false} />
				<UserInput source={passwordImg}
					secureTextEntry
					placeholder='Confirm Password'
					returnKeyType={'done'}
					autoCapitalize={'none'}
					autoCorrect={false} />
				<ButtonSubmit text="SIGN UP"/>
			</KeyboardAvoidingView>
			//</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignItems: 'center',
	},
});
