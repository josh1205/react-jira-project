import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function RefreshSession() {
    const accessToken = false;
    const refreshToken = null;
    const loading = false;

    useEffect(() => {
        function verifyRefreshToken() {
            try {
                console.log('Refreshing access token');
            } catch(err) {
                console.log('Error refreshing access token: ', err);
            }
        }
        if (!accessToken) {
            verifyRefreshToken();
        }
    }, [accessToken, refreshToken]);

    return (
        <>
            { loading ? <p>Loading...</p> : <Outlet />}
        </>
    );
}

export default RefreshSession;