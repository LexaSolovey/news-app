import axios from 'axios';

const API_URL = 'https://newsapi.org';
const ID_KEY = '6e613fac31ea462a97489c555823d01a';


export function fetchNewsData(publisher) {
  return axios.all([
    axios.get(`${API_URL}/v1/articles?source=${publisher}&sortBy=latest&apiKey=${ID_KEY}`),
  ])
    .then((listOfNews) => ({
      listOfNews: listOfNews[0],
    }));
}

export function fetchCountVisitsOfPage() {
  return fetch('/users').then(res => res.json());
}

