const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import 'isomorphic-fetch';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'

import * as actions from '../src/actions/ContactAction'
import * as types from '../src/actions/types'



describe('Syncronous Action Creator', () => {
  it('should create an action to reset form', () => {

    const expectedAction = {
      type: types.FORM_RESET
    }

    console.log('print : '+ JSON.stringify(actions.formReset()));
    expect(actions.formReset()).toEqual(expectedAction)
  })


  it('should create an action to update contact form', () => {

    const expectedAction = {
      type: types.CONTACT_UPDATE,
      payload: { prop: 'firstName', value: 'Steven' }
    }
    // console.log('print : '+ JSON.stringify(actions.formReset()));
    expect(actions.contactUpdate({ prop: 'firstName', value: 'Steven' })).toEqual(expectedAction)
  })
})



describe('Asyncronous Action Creator', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('Call loadContactSuccess action when load data finish', () => {
    nock('http://localhost:3000')
      .get('/contacts')
      .reply(200, { body: [] })

    const expectedActions = [
      { type: types.LOAD_CONTACTS_SUCCESS, payload: { body: [] } }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.ContactsFetch())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })


})
