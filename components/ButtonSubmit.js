import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
} from 'react-native';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
	constructor() {
		super();

		/*this.state = {
			isLoading: false,
		};*/

		//this.buttonAnimated = new Animated.Value(0);
		//this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	_onPress() {
		if (this.props.isLoading) return;

		/*this.setState({ isLoading: true });

		setTimeout(() => {
			this.setState({ isLoading: false });
			this.props.onSubmitOk();
		}, 2300); */
		this.props.onConnexionBtnPressed();
	}


	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
	

		return (
			<View style={styles.container}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={1} >
							{this.props.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>{this.props.text}</Text>
							}
					</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//top: -95,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F4524D',
		height: MARGIN,
		paddingHorizontal:60,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#F035E0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#F4524D',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
		fontWeight:'bold'
	},
	image: {
		width: 24,
		height: 24,
	},
});
