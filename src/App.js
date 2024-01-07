import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import GlobalStyles from './components/GlobalStyles/globalstyles';

import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/nav/NavBar';
import Lecture from './pages/user/course/Lecture';
import Listening from './pages/user/course/Listening';
import AccountActivate from './pages/auth/AccountActivate';
import ForgotPassword from './pages/auth/ForgotPassword';
import AccessAccount from './pages/auth/AccessAccount';

import PrivateRoute from './components/routes/PrivateRoute';
import Dashboard from './pages/user/Dashboard';
import EnrolledCourses from './pages/user/course/EnrolledCourses';
import PostedCourses from './pages/user/course/PostedCourses';
import CourseCreate from './pages/user/course/CourseCreate';
import CourseView from './pages/CourseView';
import CourseEdit from './pages/user/course/CourseEdit';

export default function App() {
    return (
        <GlobalStyles>
            <BrowserRouter>
                <AuthProvider>
                    <NavBar></NavBar>
                    <Toaster />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/auth/account-activate/:token" element={<AccountActivate />} />
                        <Route path="/auth/access-account/:token" element={<AccessAccount />} />
                        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="dashboard" element={<Dashboard />} />

                            <Route path="/user/enrolled-courses" element={<EnrolledCourses />} />
                            <Route path="/user/posted-courses" element={<PostedCourses />} />

                            {/* chỉnh sửa khóa học */}
                            <Route path="user/course/:slug" element={<CourseEdit />} />
                        </Route>

                        {/* slug of the course */}
                        <Route path="/learning/lecture/:slug" element={<Lecture />} />
                        <Route path="/learning/listening/:slug" element={<Listening />} />

                        <Route path="/course/create" element={<CourseCreate />} />
                        <Route path="/course/:slug" element={<CourseView />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </GlobalStyles>
    );
}
