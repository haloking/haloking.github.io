// even though it's called sidebar, it will sit on top, just below main nav
// feel free to put it on side
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/user/wishlist">
                    Wishlist
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/user/enrolled-courses">
                    Khóa học của tôi
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/course/create">
                    Tạo khóa học
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/user/posted-courses">
                    Khóa học đã đăng
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/user/profile">
                    Update Profile
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/user/settings">
                    Settings
                </NavLink>
            </li>
        </ul>
    );
}
