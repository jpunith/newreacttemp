import React, { useEffect } from 'react';
import { LoginCallback, useOktaAuth } from '@okta/okta-react';

function LoginErrorComponent({ error }) {
    return <p>Login Error: {error} </p>
}

function LoginCallbackWarpper() {
    const { authState } = useOktaAuth();
    useEffect(() => {
        if (authState && authState?.isAuthenticated) {
            localStorage.setItem("token", "DumyTokenHere")
            window.location.href = window.location.origin + '/app/welcome';
        }
    }, [authState]);
    return <LoginCallback errorComponent={LoginErrorComponent} />;
}

export default LoginCallbackWarpper;