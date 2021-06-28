import { useHistory } from "react-router-dom";
import { firebase, auth } from "../services/firebase";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserType = {
    id: string;
    name: string;
    avatar: string;
  }
  
type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
    signOutFromGoogle: () => void;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [ user, setUser ] = useState<UserType>();
    const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  async function signOutFromGoogle() {
    await auth.signOut();
    setUser(undefined);
    history.push('/');
  }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOutFromGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}
