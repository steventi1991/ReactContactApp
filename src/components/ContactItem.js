import React, {Component} from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import CardSection from './common/CardSection';
import { Actions } from 'react-native-router-flux';

class ContactItem extends Component {

    renderDescription() {
        const { contact, selectedContactId } = this.props;
        const { expandViewStyle, descriptionStyle} = styles;

        if (contact.id === selectedContactId) {
            console.log("renderDescription")
            return (<View style={expandViewStyle}>
                <Text style={descriptionStyle}>{'Fullname : '+ contact.firstName +' '+ contact.lastName}</Text>
                <Text style={descriptionStyle}>{'Age :' + contact.age}</Text>
                </View>
            );
        }
    }

    render() {
        
        const {id, firstName, lastName, age} = this.props.contact
        return (
            <TouchableWithoutFeedback onPress={() => Actions.contactDetail({contact: this.props.contact})}>
                <View>
                    <CardSection>
                        <View style = {styles.headerStyle}>
                        <Text style={styles.nameTextStyle}>{firstName + ' ' + lastName}</Text>
                        {/*<View>*/}
                        <Text style={styles.ageStyle}>{age + ' years old'}</Text>
                        </View>
                    </CardSection>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = {
    headerStyle:{
     flexDirection:'column'   
    },
    nameTextStyle : {
        fontSize:24,
        paddingLeft:15,
        height:45,
        fontWeight:'bold'
    },
    expandViewStyle : {
        paddingLeft:80,
        height: 80,
        paddingTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor:'#d3d3d3'
    }, descriptionStyle: {
        fontSize:20,
        color:'#7e7e7e'
    }, ageStyle :{
        fontSize: 15,
        color:'#7e7e7e',
        paddingLeft:15
    }
}

export default ContactItem;