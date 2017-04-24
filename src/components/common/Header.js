import React from 'react';
import {View, Text} from 'react-native';


const Header = (props) => {
    const {textStyle, viewStyle} = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerTitle}</Text>
        </View>
    )
};


const styles = {
    textStyle :{
        fontSize:24,
    },
    viewStyle:{
        backgroundColor:"#F8F8F8",
        height: 64,
        justifyContent:'center',
        alignItems:'center',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    }
}

export default Header;