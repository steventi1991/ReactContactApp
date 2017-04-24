import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Card from './common/Card';
import Input from './common/Input';
import CardSection from './common/CardSection';
import Button from './common/Button';
import { createContact, contactUpdate, formReset } from '../actions'
import ContactForm from './ContactForm';


class ContactCreate extends Component {

    componentWillMount() {
        this.props.formReset();
    }


    onCreateContact() {
        const { firstName, lastName, age } = this.props;
        console.log('onCreateContact firstName : ' + firstName + ' lastName : ' + lastName+' age : ' + age);
        this.props.createContact({firstName, lastName, age});
    }
     
     render() {
        return (
                <Card>
                    <ContactForm {...this.props}/>

                    <CardSection>    
                    <Button onPress={this.onCreateContact.bind(this)}>
                        Create Contact
                    </Button>
                    </CardSection>
                </Card>
            );
     }
};

const mapStateToProps = (state) => {
  const { firstName, lastName, age } = state.contactForm;
  console.log('{mapstate} firstName : ' + firstName + ' lastName : ' + lastName + ' age : ' + age);
  return { firstName, lastName, age };
};

export default connect(mapStateToProps, {createContact, contactUpdate, formReset})(ContactCreate);