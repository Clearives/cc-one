import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/login';

const _Users = Users;
const normalAxios = axios.create();
export default {
  bootstrap() {
    const mock = new MockAdapter(axios);
    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success',
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure',
    });

    // login
    mock.onPost('/login').reply((config) => {
      const { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          const hasUser = LoginUsers.some((u) => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: 'success', user }]);
          } else {
            resolve([200, { code: 500, msg: 'username password error' }]);
          }
        }, 500);
      });
    });

    // table demo
    mock.onGet('/user/list').reply((config) => {
      const { name } = config.params;
      const mockUsers = _Users.filter((user) => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers,
          }]);
        }, 1000);
      });
    });

    // 每日一文
    mock.onGet('/getArticle/today').reply(config => new Promise((resolve, reject) => {
      normalAxios.get('https://interface.meiriyiwen.com/article/today?dev=1')
        .then((response) => {
          setTimeout(() => {
            resolve([200, {
              article: response.data.data,
            }]);
          }, 500);
        });
    }));
    // 随机文章
    mock.onGet('/getArticle/random').reply(config => new Promise((resolve, reject) => {
      normalAxios.get('https://interface.meiriyiwen.com/article/random?dev=1')
        .then((response) => {
          setTimeout(() => {
            resolve([200, {
              article: response.data.data,
            }]);
          }, 500);
        });
    }));
  },
};
