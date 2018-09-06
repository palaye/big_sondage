import React, { Component } from 'react';
import {
	Text,
} from 'react-native';




export default Title = (props) => {

	const design = {
		  padding:8,
		  fontWeight:'bold',
		  fontSize: 15, 
		  color: '#008975'
	};

	let styles = [design,props.style];

	return (
		<Text style={styles}>{props.children} </Text>
	);

}

