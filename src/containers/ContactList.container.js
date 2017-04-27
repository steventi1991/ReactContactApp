// ContactList.container.js

import React, {Component} from 'react';
import {Text, View, ListView} from 'react-native';
import { connect } from 'react-redux';
import {contactsFetch} from '../actions/';
import ContactList from '../components/ContactList';


class ContactListContainer extends Component {
    refreshData(){
        this.props.contactsFetch();
    }

    render() {
        this.refreshData();
        const { contacts } = this.props;
        return (
            <View>
                <ContactList contacts={contacts} />
            </View>
        );
    }   

}

const mapStateToProps = ({contactsReducer}) => {
    console.log("contactListContainer mapStateToProps "+ JSON.stringify(contactsReducer));
    const {contacts, error, loading} = contactsReducer;
    return {contacts,error,loading};
};

export default connect(mapStateToProps, {contactsFetch} )(ContactListContainer);