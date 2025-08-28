import { callApi } from '../utils';

const authenticate = (set) => async () => {
  try {
    set(() => ({ loading: true, error: null }));
    const response = await callApi('/makecv', { method: 'GET' });
    console.log('authenticate response', response);
    set(() => ({ loading: false, error: null, user: response.data.crrUser }));
    return response.data.crrUser;
  } catch (err) {
    set(() => ({ loading: false, error: err.message, user: null }));
  }
};

const login = (set) => async (creds) => {
  try {
    set(() => ({ loading: true, error: null }));
    const response = await callApi('/login', { method: 'POST' }, creds);
    console.log('response in login : ', response);
    set(() => ({ loading: false, error: null, user: response.data.crrUser }));
    return response.data.crrUser;
  } catch (err) {
    set(() => ({ loading: false, error: err.message, user: null }));
  }
};

const logout = (set) => async () => {
  try {
    set(() => ({ loading: true, error: null }));
    await callApi('/logout', { method: 'GET' });
    set(() => ({ loading: false, error: null, user: null }));
  } catch (err) {
    set(() => ({ loading: false, error: err.message, user: null }));
  }
};

export const createAuthStore = (set) => ({
  user: null,
  loading: true,
  error: null,
  authenticate: authenticate(set),
  login: login(set),
  logout: logout(set),
});
