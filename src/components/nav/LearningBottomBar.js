import { useAuth } from '../../context/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function LearningBottomBar() {
    // access context
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const loggedIn = auth.user !== null && auth.token !== '';

    return (
        <nav className="navbar bg-dark-subtle fixed-bottom navbar-expand-lg">
            <div className="container-fluid justify-content-center">
                <a className="nav-link text-light me-3" href="#">
                    <i className="fa-solid fa-chevron-left me-1"></i> Bài trước
                </a>
                <a className="nav-link text-light ms-3" href="#">
                    Bài sau <i className="fa-solid fa-chevron-right ms-1"></i>
                </a>
                {/* <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                            <i className="fa-solid fa-chevron-left me-1"></i> Bài trước
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Bài sau <i className="fa-solid fa-chevron-right ms-1"></i>
                        </a>
                    </li>
                </ul> */}
            </div>
        </nav>
    );
}
