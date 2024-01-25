import './HomeContent.scss';

import { useAuth } from '../context/auth';
import { useState, useEffect } from 'react';
import axios from 'axios';

import CourseCard from '../components/cards/CourseCard';
import Slider from '../components/sliders/Slider';

import useSize from '../helpers/useSize';

import { useMediaQuery } from 'react-responsive';

export default function HomeContent() {
    // get window sizes dynamically
    const windowSize = useSize();
    // console.log('innerWidth:', windowSize[0]);
    // console.log('innerHeight:', windowSize[1]);

    // media query
    const isDesktop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const isNotDesktop = useMediaQuery({ maxWidth: 992 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    // context
    const [auth, setAuth] = useAuth();

    // state
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    const loggedIn = auth.user !== null && auth.token !== '';

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (auth?.token) fetchEnrolledCourses();
    }, [auth?.token]);

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get('/courses');
            console.log('All courses:', data);
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const { data } = await axios.get(`/enrolled-courses`);
            console.log('Enrolled Courses:', data);
            setEnrolledCourses(data);
            if (data.length > 0) setIsEnrolled(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '-7%' }}>
                <div className="display-1">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0 m-0">
            <section className="hero-section">
                <div className="container d-flex justify-content-center align-items-center flex-column text-white fw-bold">
                    {!isMobile && <h1>IELTS - TOEFL - TOEIC</h1>}

                    {isMobile && <h1>IELTS</h1>}
                    {isMobile && <h1>TOEFL</h1>}
                    {isMobile && <h1>TOEIC</h1>}

                    <h2>Học và Luyện thi</h2>
                    <div>
                        <a href="#posted-courses" className="btn btn-primary rounded-pill px-4 py-1 fs-5">
                            Tìm hiểu
                        </a>
                    </div>
                </div>
            </section>

            <h1 className="mt-5 text-center display-3 text-secondary fw-bold mx-sm-5 py-sm-3 text-lg-start ms-lg-5 pt-lg-4 pb-lg-3">
                English Education for Everyone
            </h1>

            <div className="d-flex justify-content-center justify-content-lg-start ms-lg-5 pb-lg-4">
                <a href="#posted-courses" className="btn btn-primary rounded-pill px-4 py-1 mb-4 fs-5 py-sm-2">
                    Tìm hiểu
                </a>
            </div>

            <Slider></Slider>

            {loggedIn && isEnrolled ? (
                <>
                    <h2> Khóa học của tôi </h2>
                    <div>
                        <div className="row">
                            {enrolledCourses?.map((course) => (
                                <CourseCard course={course} key={course._id} />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
            <h3 className="text-center text-lg-start pt-4 pb-3 ms-lg-5 display-5 fw-bolder" id="posted-courses">
                Các khóa học <span className="badge bg-secondary">Mới</span>
            </h3>
            {/* <h1 className="display-4 fw-bolder text-center text-lg-start">Các khóa học</h1> */}

            <div>
                <div className="container row">
                    {courses?.map((course) => (
                        <CourseCard course={course} key={course._id} />
                    ))}
                </div>
            </div>

            <p>
                Lorem ipsum dolor sit amet. Vel eveniet velit ea internos voluptatem eos internos porro sed minus enim.
                Et saepe repellendus qui doloribus internos qui quis rerum sit maxime voluptatum eum molestiae
                reiciendis aut tenetur iste qui numquam sunt. Sed maxime illum ex quis quia est facere dolorem. Non
                laboriosam cupiditate ut aliquid sunt vel voluptatum consequatur eum Quis ipsum qui libero nemo. Cum
                autem deserunt aut nesciunt iure non alias distinctio sed veritatis libero. Eos cupiditate accusantium a
                quidem placeat qui placeat dolorum et cumque pariatur est harum ducimus qui consequatur iste. Aut porro
                quia est deserunt dolorem rem maxime sunt aut Quis rerum.{' '}
            </p>
            <p>
                Qui animi excepturi ut doloribus placeat non odit aliquid est neque quidem. Vel aliquid maiores qui
                commodi magni qui velit deleniti aut maxime sequi qui facilis culpa eos impedit laborum qui temporibus
                numquam. Aut saepe labore et molestias dignissimos qui temporibus quia hic sapiente quidem. Ad molestiae
                autem id assumenda voluptatem est odio voluptas eos voluptas culpa? Non molestiae soluta et consequuntur
                omnis sit debitis harum aut praesentium architecto et illo veniam aut deserunt soluta nam soluta
                dolorem?{' '}
            </p>
            <p>
                Ea exercitationem fugit sed quam corrupti sed assumenda dignissimos non autem fuga ea quos galisum quo
                eveniet odit qui voluptate saepe? Et minima consequuntur eum recusandae doloremque ad ullam nisi et
                veniam repellat et veniam ullam. Qui fugit officia rem iure quibusdam et Quis maiores ad aspernatur sint
                ut suscipit sunt aut harum iste. Ea quae expedita a odit sunt sed aliquam magnam sed quia distinctio ut
                adipisci nemo. Eos itaque accusantium et laudantium dolor ut eligendi atque non cupiditate galisum ab
                praesentium iste non nihil distinctio.{' '}
            </p>
            <p>End.</p>
            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        </div>
    );
}
