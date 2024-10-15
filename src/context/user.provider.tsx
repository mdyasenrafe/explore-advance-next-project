import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { IUser } from "../types";
import { getCurrentUser } from "../services/AuthServices";

type UserContextType = {
  currentUser: IUser | null;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = React.memo(
  ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUser = useCallback(async () => {
      try {
        const userData = await getCurrentUser();
        setCurrentUser(userData as IUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }, []);

    const handleFetchUser = useCallback(() => {
      if (loading) {
        fetchUser();
      }
    }, [loading, fetchUser]);

    useEffect(() => {
      handleFetchUser();
    }, [handleFetchUser]);

    const contextValue = useMemo(
      () => ({
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
      }),
      [currentUser, loading]
    );

    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  }
);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within the UserProvider");
  }

  return context;
};
