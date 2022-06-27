import { createContext, useEffect, useState } from "react";
import { decodeToken } from './../utils/common-utils';

interface Props { }


const AuthContext = createContext(
    {
        auth: {} as any | undefined,
        isLog: (e: string) => { }
    }
);

export const AuthContextProvider = (props: React.PropsWithChildren<Props>) => {
    const [auth, setAuth] = useState<any | undefined>({})

    useEffect(() => {
        var token = localStorage.getItem("token");
        if (token) {
            setAuth(decodeToken(token))
        }
    }, [])

    useEffect(() => {
    }, [auth])

    const isLog = (log: string) => {
        if (log === "logIn") {
            var token = localStorage.getItem("token");
            if (token) {
                setAuth(decodeToken(token))
            }
        }else{
            setAuth({})
        }
    }
    const context = {
        auth: auth,
        isLog: isLog
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
