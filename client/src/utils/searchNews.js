export default function filterContentNews(state, filter){
    const news = state.filter(item =>{
        if(item.description.includes(filter) ||
            item.title.includes(filter) ||
            item.description.toLowerCase().includes(filter) ||
            item.title.toLowerCase().includes(filter) ||
            item.description.toUpperCase().includes(filter) ||
            item.title.toUpperCase().includes(filter))
            return item;
        else return undefined;
    });
    return news;
}