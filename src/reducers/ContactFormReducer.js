import { CONTACT_UPDATE, 
         CONTACT_CREATE, 
         CONTACT_DELETE, 
         CONTACT_EDIT,
         FORM_RESET,
         CONTACT_CREATE_FAIL,
         CONTACT_UPDATE_FAIL,
         CONTACT_DELETE_FAIL } from '../actions/types';


const INITIAL_STATE = {
    id: '',
    firstName : '',
    lastName : '',
    age : '',
    error: ''
}


export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
      case CONTACT_UPDATE :
        console.log('s :'+JSON.stringify({ ...state, [action.payload.prop]: action.payload.value }))
        return { ...state, [action.payload.prop]: action.payload.value };
      case CONTACT_CREATE :
        return INITIAL_STATE;
      case CONTACT_DELETE :
        return INITIAL_STATE;
      case CONTACT_EDIT :
        return INITIAL_STATE;
      case FORM_RESET:
        console.log('reset');
        return INITIAL_STATE;
      case CONTACT_CREATE_FAIL:
        return {...state, error:'Cannot Create Contact'};
      case CONTACT_UPDATE_FAIL:
        return {...state, error:'Cannot Update Contact'};
      case CONTACT_DELETE_FAIL:
        return {...state, error:'Cannot Delete Contact'};
      default :
        return state;

  }
};