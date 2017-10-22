const initialState = '';

export default function filterNews(state = initialState, action) {
    if(action.type === 'FIND_NEWS'){
        return action.payload;
    }
    return state;
}
