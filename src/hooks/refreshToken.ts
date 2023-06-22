import { useState } from "react";


export function useRefreshToken () {
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [error, setError] = useState(null);

    const callRefreshToken = async () => {
        try {
            const result = await (await fetch("/api/auth", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "refresh",
            }),
            }))
            .json();

            setAccessToken(state => result.accessToken);
            setRefreshToken(state => result.refreshToken);
            setIsNewUser(state => result.isNewUser);
        } catch (err) {
            setError(state => err);
        }
    }

    const callLogOut = async () => {
        try {
            await fetch("/api/auth", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "logout",
                }),
            });
            
            setAccessToken(state => undefined);
            setRefreshToken(state => undefined);
            setIsNewUser(state => undefined);
            setError(state => undefined);
        } catch (err) {
            setError(state => err);
        }
    }

    return {
        accessToken,
        refreshToken,
        isNewUser,
        error,
        callRefreshToken,
        callLogOut
    }
}