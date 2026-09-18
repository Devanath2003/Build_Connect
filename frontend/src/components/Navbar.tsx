import {Link} from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar(){
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    const user = useAuthStore(
        (state) => state.user
    );

    const logout = useAuthStore(
        (state) => state.logout
    );
    return (
        <nav>
            <h2>BuildConnect</h2>
            <div>
                <Link to="/">Home</Link>

                {!isAuthenticated ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="register">Register</Link>
                    </>
                ) : (
                    <>
                    { user && <span>Hello, {user.name || user.email}</span>}

                    <button onClick={logout}>
                        Logout
                    </button>
                    </>
                )}
    
                
            </div>
        </nav>
    );
}

export default Navbar;