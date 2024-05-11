import { useEffect, useState } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app, googleAuthPrivider } from "./firebase";
import AllProducts from "./Components/AllProducts/AllProducts";

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      if (maybeUser != null) {
        setUser(maybeUser);
      } else {
        signInWithPopup(auth, googleAuthPrivider)
          .then(credentials => setUser(credentials.user))
          .catch((e) => console.error(e));
      }
      setIsLoading(false);
    });

    return unsub;
  }, [auth]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return user != null ? <AllProducts /> : <>User not authenticated</>;
};

