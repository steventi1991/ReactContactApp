import { combineReducers } from 'redux';
import ContactsReducer from './ContactsReducer';
import ContactFormReducer from './ContactFormReducer';

export default combineReducers({
    contactsReducer: ContactsReducer,
    contactForm: ContactFormReducer
});