import reducer from '../src/reducers/ContactFormReducer'
import * as types from '../src/actions/types'

describe('ContactFormReducer', () => {
  it('should return the initial state', () => {

    const action = {}
    const expectedState = {
                            id: '',
                            firstName: '',
                            lastName: '',
                            age: '',
                            error:''
                          }
    expect(reducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle CONTACT_UPDATE', () => {

    const action = {
        type: types.CONTACT_UPDATE,
        payload: {"firstName":"Steven"} 
    }
    const expectedState = {
                            firstName: "Steven"
                          }

    expect(reducer({"firstName":"Steven"}, action)).toEqual(expectedState)
  })

  it('should handle CONTACT_CREATE', () => {

    const action = { type: types.CONTACT_CREATE }
    const expectedState = {
                            id: '',
                            firstName: '',
                            lastName: '',
                            age: '',
                            error:''
                          }

    expect(reducer([], action)).toEqual(expectedState)

  })

  it('should handle CONTACT_EDIT', () => {
    const action = {
                      type: types.CONTACT_EDIT
                    }
    const expectedState = {
                            id: '',
                            firstName: '',
                            lastName: '',
                            age: '',
                            error:''
                          }
    expect(reducer([], action)).toEqual(expectedState)
  })

  it('should handle FORM_RESET', () => {

    const action = {
                      type: types.FORM_RESET
                   }

    const expectedState = {
                            id: '',
                            firstName: '',
                            lastName: '',
                            age: '',
                            error:''
                          }

    expect(reducer([], action)).toEqual(expectedState)
  })

})
