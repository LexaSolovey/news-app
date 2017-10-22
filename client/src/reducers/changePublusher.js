const initialState = 0;

export default function changePublusher(state = initialState, action) {
    if(action.type === 'CHANGE_PUBLISHER'){
        return action.payload;
    }
    return state;
}
