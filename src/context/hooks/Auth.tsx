import { User, Tokens, Login } from "../../types/Auth";
import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { login, logout } from "../../api/authentication";
import { toast } from "react-toastify";
import { google_auth } from "../../api/authentication";


type AuthContext = {
    tokens?: Tokens | null;
    currentUser?: User | null;
    handleLogin?: (data?: Login, id?: string) => Promise<void>;
    handleGoogleAuth?: (data: string) => Promise<void>;
    handleLogout?: () => Promise<void>;
    loading?: boolean;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);
type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // On initial load, check localStorage for existing auth data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedTokens = localStorage.getItem("tokens");

        if (storedUser && storedTokens) {
            // If user and tokens exist in localStorage, restore the state
            setCurrentUser(JSON.parse(storedUser));
            setTokens(JSON.parse(storedTokens));
        }
        setLoading(false);
    }, []); // Only run once when the component mounts


    async function handleLogin(data?: Login, id?: string) {
        try {
            const response = data ? await login(data) : await google_auth(id ? id: "")
            const tokens = {access_token: response.access_token, refresh_token: response.refresh_token};
            localStorage.setItem("tokens", JSON.stringify(tokens));

            try {
                const user = {
                    id: response.id,
                    name: response.name,
                    email: response.email,
                    full_name: response.full_name ? response.full_name: null,
                    auth_type: response.auth_type
                };

                localStorage.setItem("user", JSON.stringify(user));

                // Update the state with the logged-in user and tokens
                setCurrentUser(user);
            } catch (error) {
                if (error){
                    toast.error(error.response.data.detail)
                } else {
                    toast.error("Error fetch user info")
                }
            }

            // Store user and tokens in localStorage
            setTokens(tokens);
        } catch (error) {
            // toast("Incorrect email or password.")
            if (error?.response.status == 401){
                toast(error.response.data.detail)
            } else {
                toast("There was a problem logging into your account.")
            }
            setCurrentUser(null);
            setTokens(null);
        }
    }

    async function handleLogout() {
        // Clear auth data from state
        try{
            const user_tokens: any = localStorage.setItem("tokens", JSON.stringify(tokens));
            const parsed_tokens = user_tokens ? JSON.parse(user_tokens): {}
            const tokens_to_use = {access: parsed_tokens.access_token, refresh: parsed_tokens.refresh_token}
            await logout(tokens_to_use)
            setCurrentUser(null);
            setTokens(null);
            localStorage.removeItem("user");
            localStorage.removeItem("tokens");
        } catch(error) {
            setCurrentUser(null);
            setTokens(null);
            localStorage.removeItem("user");
            localStorage.removeItem("tokens");
        }
    }

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogout, currentUser, tokens, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used inside of AuthProvider");
    }

    return context;
}

