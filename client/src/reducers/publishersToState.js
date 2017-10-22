const initialState = [
    {
        name: 'Ars Technica',
        apiCode: 'ars-technica'
    },
    {
        name: 'Fox Sports',
        apiCode: 'fox-sports'
    },
    {
        name: 'New York',
        apiCode: 'new-york-magazine'
    },
    {
        name: 'Daily Mail',
        apiCode: 'daily-mail'
    },
    {
        name: 'MTV News',
        apiCode: 'mtv-news'
    },
];

export default function publishersToState(state = initialState, action) {
    if(action.type === 'PUBLISHERS_TO_STATE'){
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}