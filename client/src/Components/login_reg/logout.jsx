import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button className="btn btn-info logout" onClick={() => logout()}>
                Sign Out
            </button>
        )
        
    )
}

export default LogoutButton