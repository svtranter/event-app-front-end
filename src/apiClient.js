import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider
    this.logoutHandler = logoutHandler
  }
  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider()
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject()
      } else {
        throw error;
      }
    });
  }

  async login(username, password) {
    console.log(username, password)
    return await axios({
      method: 'post',
      url: `${url}auth`,
      data: {
        username,
        password
      }
    });
  }

  getEvents() {
    return this.authenticatedCall("get", url);
  }

  addEvent(name, location, precis, date, time) {
    return this.authenticatedCall("post", url, { name, location, precis, date, time });
  }

  removeEvent(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEvent(id, name, location, precis, date, time) {
    return this.authenticatedCall("put", `${url}${id}`, { name, location, precis, date, time });
  }
}
