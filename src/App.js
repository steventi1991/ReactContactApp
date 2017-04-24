import React from 'react';
import RouterComponent from './Router';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import ContactList from './components/ContactList';

const App = () => {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
            <RouterComponent />
        </Provider>
    );
};

export default App;