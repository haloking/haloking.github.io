import './NavBar.scss';

import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { useIsLearning } from '../../context/isLearning';

import { useMediaQuery } from 'react-responsive';

export default function NavBar() {
    // media query
    const isDesktop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const isNotDesktop = useMediaQuery({ maxWidth: 992 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    // context
    const [isLearning, setIsLearning] = useIsLearning();

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const loggedIn = auth.user !== null && auth.token !== '';

    const logout = () => {
        setAuth({ user: null, token: '', refreshToken: '' });
        localStorage.removeItem('auth');
        navigate('/');
    };

    return (
        <>
            {!isLearning && (
                <nav className="navbar bg-white shadow-sm fixed-top py-3 navbar-expand-lg" id="main-navbar">
                    {/* Place toggle button tag before logo anchor tag to make collapse icon on the left */}
                    <div className="container-fluid">
                        <a className="navbar-brand text-secondary me-auto" href="/">
                            <i className="fa-solid fa-snowflake" id="logo" />
                        </a>
                        <div
                            className="offcanvas offcanvas-end"
                            tabindex="-1"
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title text-secondary" id="offcanvasNavbarLabel">
                                    <i className="fa-solid fa-snowflake" id="logo" />
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active mx-lg-2" aria-current="page" href="/">
                                            Trang chủ
                                        </a>
                                    </li>
                                    {loggedIn && (
                                        <li className="nav-item">
                                            <a className="nav-link mx-lg-2" href="/user/enrolled-courses">
                                                Khóa học của tôi
                                            </a>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <a className="nav-link mx-lg-2" href="/">
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-lg-2" href="/">
                                            Học tập
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link mx-lg-2" href="/">
                                            Liên hệ
                                        </a>
                                    </li>

                                    {/* {!loggedIn && (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link mx-lg-2" href="/register">
                                                Đăng ký
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mx-lg-2 login-button" href="/login">
                                                <i className="fa-solid fa-circle-user fs-5" /> Đăng nhập
                                            </a>
                                        </li>
                                    </>
                                )} */}
                                </ul>
                            </div>
                        </div>

                        {!loggedIn && (
                            <a className="login-button" href="/login">
                                Đăng nhập
                            </a>
                        )}
                        {loggedIn && !isMobile && (
                            <a className="dropstart">
                                <a
                                    className="dropdown-toggle login-button"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-person-shelter"></i>
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
                                        <a className="dropdown-item">Something</a>
                                    </li>
                                </ul>
                            </a>
                        )}
                        {loggedIn && isMobile && (
                            <a className="dropdown">
                                <a
                                    className="dropdown-toggle login-button"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-person-shelter"></i>
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
                                        <a className="dropdown-item">Something</a>
                                    </li>
                                </ul>
                            </a>
                        )}
                        <button
                            className="navbar-toggler pe-0"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}
