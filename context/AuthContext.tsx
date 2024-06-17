'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '@/lib/firebase/AuthConfig';

// 初期化
const auth = getAuth(app);
// 
export const AuthContext = createContext({});


export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>
            {/* ローディングアニメーション追加したけど表示されねぇ */}
            {loading ? <div className='flex justify-center animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent'>Loading...</div> : children}
        </AuthContext.Provider>
    );
}