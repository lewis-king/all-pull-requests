import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from "./store/index";
import AppContainer from './components/appContainer';

const store = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        );
    }
}

render(<App/>, document.getElementById('app'));