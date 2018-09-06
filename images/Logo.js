import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
} from 'react-native';

import logoImg from '../images/logo.png';

export default class Logo extends Component {
	render() {

		const design = {
			container: {
				flex: this.props.flex?this.props.flex:2,
				alignItems: 'center',
				justifyContent: 'center',
			},
		}
		return (
			<View style={design.container}>
				<Image source={logoImg} style={styles.image} />
				<Text style={styles.text}>REACT NATIVE</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		width: 80,
		height: 80,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	}
});
