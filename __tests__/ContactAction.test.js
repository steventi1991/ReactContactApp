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

    return store.dispatch(actions.contactsFetch())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  // ===========

  it('creates LOAD_CONTACTS_FAIL when load contacts has been done', () => {
    nock('http://localhost:3000')
      .get('/contacts')
      .reply(404, {} )

    const expectedActions = [
      { type: types.LOAD_CONTACTS_FAIL },
      { type: types.LOAD_CONTACTS_SUCCESS, payload: undefined }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactsFetch())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })


  it('get id when create contacts has been done', () => {
    nock('http://localhost:3000')
      .post('/contacts', {
        firstName: 'Steven',
        lastName: 'Tio',
        age: 32
      })
      .reply(200, { body: {id: '123'} })

    const expectedActions = [
      { type: types.CONTACT_CREATE }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.createContact({ firstName: 'Steven', lastName: 'Tio', age: 32 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('get response when update contacts has been done', () => {
    nock('http://localhost:3000')
      .put('/contacts/123', {
        firstName: 'Steven',
        lastName: 'Tio',
        age: 32
      })
      .reply(200, {} )

    const expectedActions = [
      { type: types.CONTACT_CREATE },
    ]

    const expectedErrorActions = [
      { type: types.CONTACT_UPDATE_FAIL }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.editContact({ id: 123, firstName: 'Steven', lastName: 'Tio', age: 32 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
      
  })


    it('get response when update has failed', () => {
    nock('http://localhost:3000')
      .put('/contacts/123', {
        firstName: 'Steven',
        lastName: 'Tio',
        age: 32
      })
      .reply(200, {} )

    const expectedActions = [
      { type: types.CONTACT_UPDATE_FAIL },
    ]

    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.editContact({ id: 123, firstName: 'Stevenss', lastName: 'Tio', age: 32 }))
      .catch(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
      
  })

  it('get response when delete contacts has been done', () => {
    nock('http://localhost:3000')
      .delete('/contacts/123')
      .reply(200, {} )

    const expectedActions = [
      { type: types.CONTACT_DELETE }
    ]
    const store = mockStore({ contacts: [] })

    return store.dispatch(actions.contactDelete({ id: 123 }))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })


})


