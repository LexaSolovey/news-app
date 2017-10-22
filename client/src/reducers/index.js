import { combineReducers } from 'redux';

import publisherstoState from './publishersToState';
import changePublusher from './changePublusher';
import newsDataToState from './newsDataToState';
import filterNews from './filterNews';

export default combineReducers({
    publisherstoState,
    changePublusher,
    newsDataToState,
    filterNews,
})