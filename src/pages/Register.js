import { useState } from 'react';
import axios from 'axios';

import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // console.log(email, password);
            const { data } = await axios.post(`/pre-register`, {
                email,
                password,
            });
            // console.log(data);
            if (data?.error) {
                toast.error(data?.error);
                setLoading(false);
            } else {
                setLoading(false);
                toast.success('Please check your email to complete registration');
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error('Something went wrong. Try again.');
        }
    };

    return (
        <div>
            <h1 className="display-1 bg-secondary text-light p-5 default-top-margin">Đăng ký</h1>

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
                                {loading ? 'Vui lòng chờ...' : 'Đăng ký'}
                            </button>
                        </form>

                        <div className="d-flex justify-content-between">
                            <Link to="/auth/forgot-password" style={{ textDecoration: 'none' }} className="text-danger">
                                Mật khẩu?
                            </Link>
                            <Link to="/login" style={{ textDecoration: 'none' }} className="text-danger pointer">
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
