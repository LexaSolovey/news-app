const initialState = [];

export default function newsDataToState(state = initialState, action) {
    if(action.type === 'NEWS_DATA_TO_STATE'){
        return action.payload;
    }
    return state;
}