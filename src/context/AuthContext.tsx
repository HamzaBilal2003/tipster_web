import React, { createContext, useReducer, ReactNode } from "react";
import Cookies from "js-cookie";

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  dob: string;
  nationality: string;
  profile_picture: string;
  otp: string | null;
  otp_verified: '0' | '1';
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
  vip_status: string;
  bio: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: Partial<AuthState>;
}

interface AuthContextProps extends AuthState {
  login: (data: AuthState) => void;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  token: Cookies.get("authToken") || null,
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...initialState, token: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data: AuthState) => {
    const { user, token } = data;
    const currentToken = token || state.token;

    if (currentToken) {
      Cookies.set("authToken", currentToken, {
        secure: true,
        sameSite: "strict",
      });
    }
    if (user) {
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "strict",
      });
    }

    dispatch({
      type: "LOGIN",
      payload: { user, token: currentToken },
    });
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
