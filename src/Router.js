import React, {Component} from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ContactDetail from './components/ContactDetail';
import ContactList from './components/ContactList';
import ContactCreate from './components/ContactCreate';
import ContactListContainer from './containers/ContactList.container';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65}}>
            
            <Scene 
            rightTitle="Add"
            onRight = {() => Actions.createContact()}
            key="contactListContainer" 
            component={ContactListContainer} 
            title="Contacts" initial/>
            
            <Scene 
            key="contactDetail" 
            component={ContactDetail} title="Detail" />

            <Scene 
            key="createContact" 
            component={ContactCreate} title="Create Contact" />
        </Router>
    );
};

export default RouterComponent;