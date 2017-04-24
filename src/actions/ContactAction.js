import { Actions } from 'react-native-router-flux';
import {
  // LOAD_CONTACTS,
  LOAD_CONTACTS_SUCCESS,
  LOAD_CONTACTS_FAIL,
  CONTACT_UPDATE,
  CONTACT_CREATE,
  CONTACT_DELETE,
  FORM_RESET,
  CONTACT_CREATE_FAIL,
  CONTACT_UPDATE_FAIL,
  CONTACT_DELETE_FAIL
} from './types';


const BASE_URL = 'http://localhost:3000/'

const urlRequest = (endpoint) => BASE_URL + endpoint

const headers = {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'dataType': 'json'
                }


export const contactsFetch = () => {

  return (dispatch) => {
    const host = urlRequest('contacts')
    const url = `${host}`
    let options = Object.assign({ method: 'get' }, null)
    options.headers = headers

    return fetch(url, options).then(resp => {

      let json = resp.json()
      if (resp.ok) {
       return json;
      }

    }).then(json => {
        console.log('success')
        contactFetchSuccess(dispatch, json);
    }).catch((err)=>{
      console.log('error')
        contactFetchFailed(dispatch);
    })

  };
};

const contactDeleteFailed = (dispatch) => {
  console.log('contactDeleteFailed');
    dispatch({ type: CONTACT_DELETE_FAIL });
};


const contactCreateFailed = (dispatch) => {
  console.log('contactCreateFailed');
    dispatch({ type: CONTACT_CREATE_FAIL });
};


const contactUpdateFailed = (dispatch) => {
  console.log('contactUpdateFailed');
    dispatch({ type: CONTACT_UPDATE_FAIL });
};


const contactFetchFailed = (dispatch) => {
    dispatch({ type: LOAD_CONTACTS_FAIL });
};

const contactFetchSuccess = (dispatch, contacts) => {
    dispatch({
      type: LOAD_CONTACTS_SUCCESS,
      payload: contacts
    });
};


export const createContact =  ({ firstName, lastName, age }) => {

  return (dispatch) => {

    const host = urlRequest('contacts')
    const url = `${host}`
    let options = Object.assign({ method: 'post' }, null)
    options.headers = headers
    options.body = JSON.stringify({
      'firstName':firstName,
      'lastName':lastName,
      'age':age
    })
    return fetch(url, options).then(resp => {
      let json = resp.json()
      if (resp.ok) {
       return json;
      }
      return json.then(err => {
        console.log(err);
        //loadContactFail(dispatch);
      })
    }).then(json => {
      dispatch({ type: CONTACT_CREATE });
      Actions.contactList({ type: 'reset' });
    }).catch((error)=> {
        console.log('faileddd '+ error)
        contactCreateFailed(dispatch);
    })

  };
};


export const formReset = () => {
  return {
    type: FORM_RESET
  }
};


export const editContact =  ({ id,firstName, lastName, age }) => {

  return (dispatch) => {
    const host = urlRequest('contacts/'+id)
    const url = `${host}`
    let options = Object.assign({ method: 'put' }, null)
    options.headers = headers
    console.log('host '+ host)
    options.body = JSON.stringify({
      'firstName':firstName,
      'lastName':lastName,
      'age':age
    })

    console.log('body '+ options.body);

    return fetch(url, options).then(resp => {

      if (resp.ok) {
       Actions.contactList({ type: 'reset' });
       return ;
      }

    }).catch(() => {
      contactUpdateFailed(dispatch);
    })

  };
};



export const contactUpdate = ({ prop, value }) => {
  console.log('value '+value)
  return {
    type: CONTACT_UPDATE,
    payload: { prop, value }
  };
};


export const contactDelete = ({id}) =>{
  return (dispatch) => {
   const host = urlRequest('contacts/'+id)
   const url = `${host}`
   console.log('id: '+id);
   console.log('host: '+host);
   let options = Object.assign({ method: 'delete' }, null)
   options.headers = headers
   return fetch(url, options).then(resp => {
    
     if (resp.ok) {
      dispatch({ type: CONTACT_DELETE });
      Actions.contactList({ type: 'reset' });
      return;
     }
   }).catch(() =>{
     console.log('failed')
     contactDeleteFailed(dispatch);
   })
 };
}
