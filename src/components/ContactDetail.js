import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Alert} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import ContactForm from './ContactForm';
import Button from './common/Button';
import { connect } from 'react-redux';
import { contactUpdate, contactDelete, editContact } from '../actions';
import { Actions } from 'react-native-router-flux';

class ContactDetail extends Component {

    componentWillMount() {
        _.each(this.props.contact, (value, prop) => {
            this.props.contactUpdate({ prop, value });
        });
    }

    componentDidMount(){
      console.log('component did mount');
    }

    // getInitialState(){
    //     console.log('getInitialState');
    // }

    // getDefaultProps(){
    //     console.log('getDefaultProps');
    // }

    alertHelper( message, action) {
        Alert.alert( message, null,
            [
              {text: 'Yes', onPress: action},
              {text: 'No', onPress: () => console.log('No Pressed!')}
            ]
        )
    }

    onButtonDeletePress() {
        const { id } = this.props;
        console.log('ids : ' + id);
        this.alertHelper('Are you want to delete this?', 
                         () => this.props.contactDelete({ id }).then(() => {
                             if(this.props.error === ''){
                        
                                Actions.contactListContainer({ type: 'reset' });
                            }
                         }))
    }


    onButtonUpdatePress() {
        console.log('this.props '+ JSON.stringify(this.props))
        const { id, firstName,lastName,age } = this.props;
        console.log('firstname update : '+firstName);
        console.log('ids : ' + id);
        this.alertHelper('Are you want to update this?', 
                         () => this.props.editContact({ id, firstName,lastName,age }).then(() => {
                            if(this.props.error === ''){
                                console.log('aaa');
                                Actions.contactListContainer({ type: 'reset' });
                            }
                         }));
    }

    render() {

        console.log("propss"+JSON.stringify(this.props))
        return (
            <Card>
                <ContactForm />

                <CardSection>    
                <Button onPress={this.onButtonUpdatePress.bind(this)}>
                    Update Contact
                </Button>
                <Button onPress={this.onButtonDeletePress.bind(this)}>
                    Delete Contact
                </Button>
                
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const {id, firstName, lastName, age, error} = state.contactForm
    console.log('mapStateToProps detail component : '+JSON.stringify({firstName,lastName,age}));
    return {id, firstName, lastName,age, error};
}



export default connect(mapStateToProps, {contactUpdate, contactDelete, editContact})(ContactDetail);