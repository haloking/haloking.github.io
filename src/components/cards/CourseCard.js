import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

import { Badge } from 'antd';

import { Link } from 'react-router-dom';
// import AdFeatures from './AdFeatures';

import { formatNumber } from '../../helpers/ad';

export default function CourseCard({ course }) {
    // access context
    const [auth, setAuth] = useAuth();

    const loggedIn = auth.user !== null && auth.token !== '';

    return (
        <div className="col-lg-4 p-4 gx-4 gy-4">
            <Link to={`/course/${course.slug}`} className="nav-link">
                <Badge.Ribbon text={`${course?.price}`}>
                    <div className="card hoverable shadow">
                        {/* <img
                            src={course?.photos?.[0]?.Location}
                            alt={`${course?.title}`}
                            style={{ height: '250px', objectFit: 'cover' }}
                        /> */}
                        <img
                            src={course?.thumbnail}
                            alt={`${course?.title}`}
                            style={{ height: '250px', objectFit: 'cover' }}
                        />

                        <div className="card-body">
                            <h3>${formatNumber(course?.price)}</h3>
                            <h3>{course?.title}</h3>
                            <p className="card-text">{course?.description}</p>

                            {/* <AdFeatures course={course} /> */}
                        </div>
                    </div>
                </Badge.Ribbon>
            </Link>
        </div>
    );
}
