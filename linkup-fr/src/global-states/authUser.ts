import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IAuthUser {
  name?: string;
  email: string;
  token: string;
  role: number;
  provider?: string;
}

interface IAuthUserState {
  authUser: IAuthUser;
  setAuthUser: (value: IAuthUser) => void;
}

export const useAuthUser = create<IAuthUserState>()(
  persist(
    (set) => ({
      authUser: {
        name: "",
        email: "",
        token: "",
        role: 0,
        provider: ""
      },
      setAuthUser: (value: IAuthUser) =>
        set(() => ({
          authUser: value
        })),
    }),
    {
      name: 'auth-user-storage', 
    }
  )
);
