export default function filterContentNews(state, filter){
  const news = state.filter( (item) => {
    const arrToSerch = `${item.title} ${item.description}`.split(' ');
    const result = arrToSerch.filter( (word) =>{
      if(word.substring(0, filter.length) === filter ||
          word.toLowerCase().substring(0, filter.length) === filter ||
          word.toUpperCase().substring(0, filter.length) === filter){
        return item;
      }
      return undefined;
    });
    return result.length !== 0;
  });
  return news;
}