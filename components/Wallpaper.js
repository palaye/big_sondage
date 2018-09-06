import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	ImageBackground,
	View,
} from 'react-native';

import bgSrc from '../images/wallpaper.png';

export default class Wallpaper extends Component {
	render() {
		return (//#008975
			<View style={{flex:1,backgroundColor:"#ffffff"}}>
			  {this.props.children}
			</View>
		);
	}
}

/*
<ImageBackground style={styles.picture} source={bgSrc}>
				{this.props.children}
			</ImageBackground>
*/
const styles = StyleSheet.create({
	picture: {
		flex: 1,
		resizeMode: 'cover',
	},
});
