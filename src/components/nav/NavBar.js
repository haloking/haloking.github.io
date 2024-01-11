import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

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
        <nav className="navbar bg-white shadow-sm fixed-top py-3 navbar-expand-lg">
            <div className="container-fluid">
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
                <a className="navbar-brand text-secondary" href="/">
                    <i className="fa-solid fa-snowflake" id="logo" /> EEE
                </a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link btn btn-secondary rounded-pill" aria-current="page" href="/">
                                Trang chủ
                            </a>
                        </li>
                        {loggedIn ? (
                            <li className="nav-item">
                                <a className="nav-link btn btn-secondary rounded-pill" href="/user/enrolled-courses">
                                    Khóa học của tôi
                                </a>
                            </li>
                        ) : (
                            ''
                        )}
                        <li className="nav-item">
                            <a className="nav-link btn btn-secondary rounded-pill" href="/">
                                Học tập
                            </a>
                        </li>

                        {!loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link btn btn-secondary rounded-pill" href="/register">
                                        Đăng ký
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link btn btn-secondary rounded-pill" href="/login">
                                        <i className="fa-solid fa-circle-user fs-5" /> Đăng nhập
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
                                        className="nav-link btn btn-secondary rounded-pill dropdown-toggle"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i class="fa-solid fa-person-shelter"></i> User
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="dropdown-item" href="/dashboard">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={logout} className="dropdown-item">
                                                Logout
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>
                                        <li>
                                            <a className="dropdown-item">Something else here</a>
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
