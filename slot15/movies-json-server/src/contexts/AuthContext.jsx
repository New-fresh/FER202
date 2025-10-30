import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import movieApi from '../api/movieAPI';

const initialAuth = {
  user: null,        // {id, username, role, fullName}
  loading: false,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, error: null };
    default:
      return state;
  }
}

const AuthStateCtx = createContext(initialAuth);
const AuthDispatchCtx = createContext(null);

export const useAuthState = () => useContext(AuthStateCtx);
export const useAuthDispatch = () => useContext(AuthDispatchCtx);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuth);

  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) dispatch({ type: 'AUTH_SUCCESS', payload: JSON.parse(saved) });
  }, []);

  const login = useCallback(async (username, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const res = await movieApi.get('/accounts', { params: { username, password } });
      const user = Array.isArray(res.data) && res.data[0] ? res.data[0] : null;
      if (!user) {
        dispatch({ type: 'AUTH_ERROR', payload: 'Sai tài khoản hoặc mật khẩu' });
        return { ok: false };
      }
      const safeUser = { id: user.id, username: user.username, role: user.role, fullName: user.fullName };
      localStorage.setItem('auth_user', JSON.stringify(safeUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: safeUser });
      return { ok: true, user: safeUser };
    } catch {
      dispatch({ type: 'AUTH_ERROR', payload: 'Không thể kết nối server' });
      return { ok: false };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = { dispatch, login, logout };

  return (
    <AuthStateCtx.Provider value={state}>
      <AuthDispatchCtx.Provider value={value}>
        {children}
      </AuthDispatchCtx.Provider>
    </AuthStateCtx.Provider>
  );
};
