export default function filterContentNews(state, filter){
  return state.filter((item) => {
    const stateToArr = `${item.title} ${item.description}`.split(' ');
    const filterToArr = filter.split(' ');
    const findInStateItems = filterToArr.map((filterItem, index) => {
      const currentItemFind = stateToArr.some(word => (
        word.substring(0, filterItem.length) === filterItem ||
        word.toLowerCase().substring(0, filterItem.length) === filterItem ||
        word.toUpperCase().substring(0, filterItem.length) === filterItem 
      ));
      let previousItemCheck;
      if(index !== 0) {
        previousItemCheck = stateToArr.some(word => (
          word === filterToArr[index -1 ] ||
          word.toLowerCase() === filterToArr[index -1 ] ||
          word.toUpperCase() === filterToArr[index -1 ]
        ));
      } 
      return index === 0 ? [currentItemFind] : [currentItemFind, previousItemCheck];
    });
    return findInStateItems.every(item => item.every(subItem => subItem));
  });
}
