import { callApi } from '../utils';

const getErrorMessage = (err, fallback = 'Something went wrong. Please try again.') =>
  err?.response?.data?.error || err?.message || fallback;

const authenticate = (set) => async () => {
  try {
    set(() => ({ loading: true, error: null }));
    const response = await callApi('/makecv', { method: 'GET' });
    console.log('authenticate response', response);
    set(() => ({ loading: false, error: null, user: response.data.crrUser }));
    return response.data.crrUser;
  } catch (err) {
    const message = getErrorMessage(err, 'Authentication failed');
    set(() => ({ loading: false, error: message, user: null }));
    throw new Error(message);
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
    const message = getErrorMessage(err, 'Login failed');
    set(() => ({ loading: false, error: message, user: null }));
    throw new Error(message);
  }
};

const signup = (set, get) => async (payload) => {
  try {
    set(() => ({ loading: true, error: null }));
    const response = await callApi('/signup', { method: 'POST' }, payload);
    await get().authenticate();
    return response.data;
  } catch (err) {
    const message = getErrorMessage(err, 'Signup failed');
    set(() => ({ loading: false, error: message, user: null }));
    throw new Error(message);
  }
};

const logout = (set) => async () => {
  try {
    set(() => ({ loading: true, error: null }));
    await callApi('/logout', { method: 'GET' });
    set(() => ({ loading: false, error: null, user: null }));
  } catch (err) {
    const message = getErrorMessage(err, 'Logout failed');
    set(() => ({ loading: false, error: message, user: null }));
    throw new Error(message);
  }
};

export const createAuthStore = (set, get) => ({
  user: null,
  loading: true,
  error: null,
  authenticate: authenticate(set),
  login: login(set),
  signup: signup(set, get),
  logout: logout(set),
});
