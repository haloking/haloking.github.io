import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';

export default function NavBar() {
    // access context
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const loggedIn = auth.user !== null && auth.token !== '';

    const logout = () => {
        setAuth({ user: null, token: '', refreshToken: '' });
        localStorage.removeItem('auth');
        navigate('/');
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary ">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    EEE
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">
                                Trang chủ
                            </a>
                        </li>
                        {loggedIn ? (
                            <li className="nav-item">
                                <a className="nav-link" href="/user/enrolled-courses">
                                    Khóa học của tôi
                                </a>
                            </li>
                        ) : (
                            ''
                        )}
                        <li className="nav-item">
                            <a className="nav-link" href="/learning">
                                Học tập
                            </a>
                        </li>

                        {!loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">
                                        Đăng nhập
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">
                                        Đăng ký
                                    </a>
                                </li>
                            </>
                        ) : (
                            ''
                        )}

                        {loggedIn ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        User
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="dropdown-item" href="/dashboard">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={logout} className="dropdown-item" href="">
                                                Logout
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Something else here
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            ''
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
