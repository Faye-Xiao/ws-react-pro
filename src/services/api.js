import axios from 'axios';

let API_URL = 'https://itunes.apple.com/us/rss/topalbums';

const requests = {
  del: (url, config) =>
    axios.delete(`${API_URL}${url}`, config),
  get: (url, config) =>
    axios.get(`${API_URL}${url}`, config),
  put: (url, config) =>
    axios.put(`${API_URL}${url}`, null, config),
  post: (url, config) =>
    axios.post(`${API_URL}${url}`, null, config)
};

// Services

const Audios = {
  search: (term, limit = 100, config = null) =>
    requests.get(`/limit=` + limit + `/json?t=` + new Date().getTime(),
      {
        ...config,
        params: {

        }
      }
    )
};

export default {
  Audios
};
