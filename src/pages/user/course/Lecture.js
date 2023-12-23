import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/auth';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Learning() {
    // state
    const [course, setCourse] = useState({});
    const [curriculums, setCurriculums] = useState([]);

    // hooks
    const params = useParams();
    useEffect(() => {
        if (params?.slug) {
            fetchCourse();
            fetchCurriculums();
        }
        // console.log(params?.slug);
    }, [params?.slug]);

    const fetchCourse = async () => {
        try {
            const { data } = await axios.get(`/course/${params?.slug}`);
            // console.log(data);

            setCourse(data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCurriculums = async () => {
        try {
            const { data } = await axios.get(`/course/curriculum/${params?.slug}`);
            // console.log(data);

            setCurriculums(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {/* <h1 className="display-1 bg-primary text-light p-5">Learning</h1> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light default-top-margin">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        Navbar
                    </a>
                    <a class="navbar-brand" href="#">
                        {course.name}
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="#">
                                Quá trình học tập
                            </a>
                            <a class="nav-link" href="#">
                                Hướng dẫn
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container-fluid ">
                <div className="row">
                    <div className="col-sm-9" id="col-left">
                        <div className="youtube-window">
                            <iframe
                                className="youtube-position"
                                src="https://www.youtube.com/embed/MJ7JZSW6seA?si=F6qgTWFClSzb4Zdy"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-sm-3" id="col-right">
                        <h5 className="default-top-margin">Nội dung</h5>
                        <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                            {curriculums?.map((curriculum) => (
                                <div className="accordion-item" key={curriculum._id}>
                                    <h2 className="accordion-header" id={`panelsStayOpen-heading-${curriculum.slug}`}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#panelsStayOpen-collapse-${curriculum.slug}`}
                                            aria-expanded="true"
                                            aria-controls={`panelsStayOpen-collapse-${curriculum.slug}`}
                                        >
                                            {curriculum.slug}
                                            <br></br>
                                            3/3 | 11min
                                        </button>
                                    </h2>
                                    <div
                                        id={`panelsStayOpen-collapse-${curriculum.slug}`}
                                        className="accordion-collapse collapse show"
                                        aria-labelledby={`panelsStayOpen-heading-${curriculum.name}`}
                                    >
                                        <div className="accordion-body">
                                            <div className="list-group list-group-flush list-group-numbered">
                                                {curriculum.lessons?.map((lesson) => (
                                                    <a
                                                        href="#"
                                                        className="list-group-item list-group-item-action"
                                                        key={lesson._id}
                                                    >
                                                        {lesson.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseTwo"
                                    >
                                        2. Bài học 2
                                    </button>
                                </h2>
                                <div
                                    id="panelsStayOpen-collapseTwo"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="panelsStayOpen-headingTwo"
                                >
                                    <div className="accordion-body">
                                        <div className="list-group list-group-flush list-group-numbered">
                                            <a
                                                href="#"
                                                className="list-group-item list-group-item-action "
                                                aria-current="true"
                                            >
                                                The current link item
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action">
                                                A second link item
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action">
                                                A third link item
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action">
                                                A fourth link item
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseThree"
                                    >
                                        3. Bài học 3
                                    </button>
                                </h2>
                                <div
                                    id="panelsStayOpen-collapseThree"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="panelsStayOpen-headingThree"
                                >
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by
                                        default, until the collapse plugin adds the appropriate classes that we use to
                                        style each element. These classes control the overall appearance, as well as the
                                        showing and hiding via CSS transitions. You can modify any of this with custom
                                        CSS or overriding our default variables. It's also worth noting that just about
                                        any HTML can go within the <code>.accordion-body</code>, though the transition
                                        does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFourth">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseFourth"
                                        aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseFourth"
                                    >
                                        4. Bài học 4
                                    </button>
                                </h2>
                                <div
                                    id="panelsStayOpen-collapseFourth"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="panelsStayOpen-headingFourth"
                                >
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by
                                        default, until the collapse plugin adds the appropriate classes that we use to
                                        style each element. These classes control the overall appearance, as well as the
                                        showing and hiding via CSS transitions. You can modify any of this with custom
                                        CSS or overriding our default variables. It's also worth noting that just about
                                        any HTML can go within the <code>.accordion-body</code>, though the transition
                                        does limit overflow.
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* fixed bottom navbar */}
            <nav class="navbar fixed-bottom navbar-light bg-light">
                <div class="container-fluid">
                    <a class="nav-link" href="#">
                        Bài trước
                    </a>
                    <a class="nav-link" href="#">
                        Bài sau
                    </a>
                </div>
            </nav>
        </div>
    );
}
