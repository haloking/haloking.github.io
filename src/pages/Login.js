import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function Login() {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // console.log(email, password);
            const { data } = await axios.post(`/login`, {
                email,
                password,
            });
            // console.log(data);
            if (data?.error) {
                toast.error(data?.error);
                setLoading(false);
            } else {
                setAuth(data);
                localStorage.setItem('auth', JSON.stringify(data));
                setLoading(false);
                toast.success('Login successful');
                location?.state !== null ? navigate(location.state) : navigate('/');
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error('Something went wrong. Try again.');
        }
    };

    return (
        <div>
            <h1 className="display-1 bg-secondary text-light p-5 default-top-margin">Đăng nhập</h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                className="form-control mb-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                required
                                autoFocus
                            />

                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                className="form-control mb-4"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button className="btn btn-outline-secondary rounded-pill col-12 mb-4" disabled={loading}>
                                {loading ? 'Vui lòng chờ...' : 'Đăng nhập'}
                            </button>
                        </form>

                        <div className="d-flex justify-content-between">
                            <Link to="/auth/forgot-password" style={{ textDecoration: 'none' }} className="text-danger">
                                Mật khẩu?
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none' }} className="text-danger pointer">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
