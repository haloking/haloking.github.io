import './Listening.scss';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/auth';
import { useIsLearning } from '../../../context/isLearning';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
// import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars-2';

import LearningTopBar from '../../../components/nav/LearningTopBar';

// import sound from '../../../assets/audio/audiotest.mp3';
// import { tapeScript } from '../../../helpers/tapeScript';
import useSize from '../../../helpers/useSize';
import LearningBottomBar from '../../../components/nav/LearningBottomBar';

export default function Learning() {
    // context
    const [isLearning, setIsLearning] = useIsLearning();
    setIsLearning(true);
    console.log('isLearning', isLearning);

    // get window size dynamically
    const windowSize = useSize();
    console.log('width:', windowSize[0]);
    console.log('height:', windowSize[1]);

    // state
    const [course, setCourse] = useState({});
    const [curriculums, setCurriculums] = useState([]);

    const [currentTime, setCurrentTime] = useState(0);

    const [playing, setPlaying] = useState(true);
    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);

    const [isRepeatedOn, setIsRepeatedOn] = useState(false);
    const [isVietnamese, setIsVietnamese] = useState(false);
    const [isLessonSelected, setIsLessonSelected] = useState(false);

    const [audio, setAudio] = useState('');
    const [tapescript, setTapescript] = useState([]);
    const [timeStart, setTimeStart] = useState(0);
    const [timeEnd, setTimeEnd] = useState(0);
    const [isDictating, setIsDictating] = useState(true);
    const [textIndex, setTextIndex] = useState(0);

    const [answer0, setAnswer0] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [answer5, setAnswer5] = useState('');

    const [answerWholeSentence, setAnswerWholeSentence] = useState('');

    // easy, medium, difficult, all
    const [level, setLevel] = useState('medium');

    // const [isCorrectAnswer0, setIsCorrectAnswer0] = useState(false);
    // const [isCorrectAnswer1, setIsCorrectAnswer1] = useState(false);
    // const [isCorrectAnswer2, setIsCorrectAnswer2] = useState(false);
    // const [isCorrectAnswer3, setIsCorrectAnswer3] = useState(false);
    // const [isCorrectAnswer4, setIsCorrectAnswer4] = useState(false);
    // const [isCorrectAnswer5, setIsCorrectAnswer5] = useState(false);

    const [isCheckAnswer, setIsCheckAnswer] = useState(false);

    let correctAnswer0 = '';
    let correctAnswer1 = '';
    let correctAnswer2 = '';
    let correctAnswer3 = '';
    let correctAnswer4 = '';
    let correctAnswer5 = '';

    // useRef
    // player
    const playerRef = useRef(null);

    // accordion
    const accItemsRefs = useRef([]);
    const accordionRef = useRef(null);

    // fixed content title
    const contentTitleRef = useRef(null);

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

    useEffect(() => {
        if (isDictating) {
            // console.log(timeStart);
            // console.log(timeEnd);
            if (currentTime >= timeEnd / 1000) {
                playerRef.current?.seekTo(timeStart / 1000, 'seconds');
                pause();
            }
            if (currentTime < timeStart / 1000) {
                // console.log('here');
                // console.log(timeStart);
                // console.log(timeEnd);
                playerRef.current?.seekTo(timeStart / 1000, 'seconds');
                play();
                pause();
            }
        }

        if (isRepeatedOn) {
            if (currentTime >= timeEnd / 1000) {
                playerRef.current?.seekTo(timeStart / 1000, 'seconds');
                play();
                // console.log(timeStart);
                // console.log(timeEnd);
            }
        }

        // run every 100 milliseconds
        const interval = setInterval(() => {
            setCurrentTime(playerRef.current?.getCurrentTime());
        }, 100);
        return () => clearInterval(interval);
    }, [currentTime]);

    // animate the active accordion item to scroll to top
    useEffect(() => {
        if (curriculums.length > 0) {
            // get accordion elements using useRef
            const accordionItems = accItemsRefs.current;

            // get Scrollbars component of accordion
            const accComponent = accordionRef.current;

            // get actual DOM element of accordion
            const acc = accComponent.view;
            console.log(acc);

            var r = document.querySelector(':root');
            console.log(r.style);

            // r.style.setProperty('--navbar-brand-padding-y', '0.5rem');

            // console.log(contentTitleRef.current.getBoundingClientRect());

            accordionItems.map((el, index) => {
                // console.log(el);
                el.addEventListener('shown.bs.collapse', (e) => {
                    const rect = el.getBoundingClientRect();
                    console.log(rect);
                    // But we can´t just simply set the ref prop on the Scrollbars component,
                    // because this would be a reference to the component, not the actual DOM element.
                    acc.scrollBy({
                        top: rect.top - 190.39,
                        // left: 0,
                        behavior: 'smooth',
                    });

                    // acc.scroll({
                    //     top: rect.top - 190.39,
                    //     behavior: 'smooth',
                    // });

                    // console.log(acc.scrollTop);
                    // console.log(el.parentNode.offsetTop);

                    // var scrollOffset = acc.scrollTop + el.parentNode.offsetTop;
                    // var scrollOffset = acc.scrollTop + el.parentNode.offsetTop;
                    // console.log(scrollOffset);

                    // acc.scroll({
                    //     top: scrollOffset,
                    //     // left: 0,
                    //     behavior: 'smooth',
                    // });

                    // acc.scrollBy({
                    //     top: rect.top - 190.39,
                    //     // left: 0,
                    //     behavior: 'smooth',
                    // });

                    // window.scroll({
                    //     top: scrollOffset,
                    //     // left: 0,
                    //     behavior: 'smooth',
                    // });
                });
            });
        }
    }, [curriculums]);

    // This works well, but not common pratice in React because it interfere DOM directly
    // useEffect(() => {
    //     // js for active accordion item going to top
    //     const accordionItems = document.querySelectorAll('.accordion-collapse');
    //     const acc = document.getElementById('accordionExample');
    //     // const accordionItems = acc.querySelectorAll('.collapse');

    //     accordionItems.forEach((el) => {
    //         el.addEventListener('shown.bs.collapse', (e) => {
    //             var scrollOffset = acc.scrollTop + el.parentNode.offsetTop;
    //             window.scroll({
    //                 top: scrollOffset,
    //                 left: 0,
    //                 behavior: 'smooth',
    //             });
    //         });
    //     });
    // }, [curriculums]);

    const handleClickSentence = (e, text) => {
        try {
            // console.log(text);
            setTimeStart(text.timeStart);
            setTimeEnd(text.timeEnd);
            console.log(text.timeStart);
            console.log(text.timeEnd);
            playerRef.current?.seekTo(text.timeStart / 1000, 'seconds');
            play();
        } catch (err) {
            console.log(err);
        }
    };

    const handleRepeat = () => {
        if (!isRepeatedOn) {
            // get position of the current text
            const index = tapescript.findIndex((t) => t.timeEnd / 1000 > currentTime);

            const currentText = tapescript[index];
            const timeStart = currentText.timeStart;
            const timeEnd = currentText.timeEnd;
            setTimeStart(timeStart);
            setTimeEnd(timeEnd);

            // console.log(currentText);
            // console.log(timeStart);
            // console.log(timeEnd);
        }

        setIsRepeatedOn(!isRepeatedOn);
    };

    const handleVietnameseSubtitle = () => {
        setIsVietnamese(!isVietnamese);
    };

    const handleClickLesson = async (e, lessonId) => {
        e.preventDefault();
        // console.log(lessonId);

        // const accordionItems = document.querySelectorAll('.accordion-collapse');
        // const acc = document.getElementById('accordionExample');
        // // const accordionItems = acc.querySelectorAll('.collapse');
        // console.log(accordionItems);
        // console.log(acc);

        // accordionItems.forEach((el) => {
        //     el.addEventListener('shown.bs.collapse', (e) => {
        //         var scrollOffset = acc.scrollTop + el.parentNode.offsetTop;
        //         window.scroll({
        //             top: scrollOffset,
        //             left: 0,
        //             behavior: 'smooth',
        //         });
        //     });
        // });

        try {
            const { data } = await axios.get(`/course/lesson/${lessonId}`);
            const tempTapescript = data?.tapescript?.tapescript;

            if (tempTapescript) {
                const nameList = [`Lydia`, `Stevenson`, `Korpis`];
                const exceptList = [` `, `'s`];
                const punctuationList = [`.`, `,`, `!`, `?`, `:`, `;`, `'`];
                const articleList = [`a`, `an`, `the`];
                const prepositionList = [
                    `about`,
                    `above`,
                    `across`,
                    `after`,
                    `against`,
                    `as`,
                    `at`,
                    `before`,
                    `but`,
                    `by`,
                    `in`,
                    `into`,
                    `inside`,
                    `of`,
                    `off`,
                    `on`,
                    `onto`,
                    `over`,
                    `to`,
                    `under`,
                    `up`,
                    `with`,
                    `for`,
                ];
                const commonWordsList = [
                    `be`,
                    `being`,
                    `am`,
                    `is`,
                    `are`,
                    `has`,
                    `have`,
                    `having`,
                    `do`,
                    `doing`,
                    `did`,
                    `i`,
                    `you`,
                    `he`,
                    `she`,
                    `they`,
                    `it`,
                    `this`,
                    `that`,
                    `him`,
                    `her`,
                    `me`,
                    `them`,
                    `my`,
                    `our`,
                    `your`,
                    `his`,
                    `her`,
                    `their`,
                    `its`,
                    `myself`,
                    `yourself`,
                    `itself`,
                    `themselves`,
                    `himself`,
                    `herself`,
                    `these`,
                    `those`,
                    `here`,
                    `there`,
                    `some`,
                    `any`,
                    `who`,
                    `whom`,
                    `what`,
                    `which`,
                    `when`,
                    `where`,
                    `how`,
                    `yes`,
                    `no`,
                    `not`,
                    `yeah`,
                    `all`,
                    `so`,
                    `and`,
                    `hello`,
                    `oh`,
                    `well`,
                    `too`,
                    `can`,
                    `could`,
                    `will`,
                    `would`,
                    `now`,
                    `then`,
                    `if`,
                    `although`,
                    `bit`,
                    `very`,
                    `last`,
                    `other`,
                    `neither`,
                    `today`,
                    `tomorrow`,
                    `yesterday`,
                    `week`,
                    `month`,
                    `year`,
                    `set`,
                    `setting`,
                    `take`,
                    `taking`,
                    `will`,
                    `would`,
                    `can`,
                    `could`,
                    `go`,
                    `going`,
                    `look`,
                    `looking`,
                    `want`,
                    `need`,
                    `doesn't`,
                    `didn't`,
                    `i'm`,
                    `you're`,
                    `they're`,
                    `he's`,
                    `she's`,
                    `it's`,
                    `like`,
                    `talk`,
                    `talking`,
                    `same`,
                    `more`,
                    `much`,
                    `little`,
                    `people`,
                    `one`,
                    `two`,
                    `three`,
                    `four`,
                    `five`,
                    `six`,
                    `seven`,
                    `eight`,
                    `nine`,
                    `ten`,
                    `first`,
                    `just`,
                    `dr`,
                    `mr`,
                    `ms`,
                    `mrs`,
                    `only`,
                    `lot`,
                    `each`,
                    `everyone`,
                    `everybody`,
                    `than`,
                ];
                const conjunctionList = ['and', `but`, `also`, `or`, `however`, `although`, `though`, `because`];

                // assign the timeEnd of the last text in tapescript
                // tempTapescript[tempTapescript.length - 1].timeEnd = playerRef.current?.getDuration() * 1000;
                tempTapescript[tempTapescript.length - 1].timeEnd = Math.floor(data.lesson.audioDuration * 1000);

                // console.log('Total duration:', Math.floor(data.lesson.audioDuration * 1000));
                tempTapescript?.map((text, index) => {
                    // assign timeEnd of text in tapescript
                    if (index > 0) {
                        const timeEnd = text.timeStart;
                        tempTapescript[index - 1].timeEnd = timeEnd;
                    }

                    // generate data for dictation
                    const keywords = [];
                    const keywordsIndex = [];
                    const easyDictationIndex = [];
                    const mediumDictationIndex = [];
                    const difficultDictationIndex = [];

                    const str = text.english
                        .replaceAll(',', '*#*,')
                        .replaceAll(`'s`, `*#*'s`)
                        .replaceAll('.', '*#*.')
                        .replaceAll('!', '*#*!')
                        .replaceAll('?', '*#*?')
                        .replaceAll(' ', '*#* *#*');
                    // console.log(str);
                    let seperatedText = str.split('*#*');
                    // console.log(seperatedText);

                    tempTapescript[index].seperatedText = seperatedText;

                    seperatedText?.map((word, index) => {
                        const lowerCaseWord = word.toLowerCase();
                        if (
                            !nameList.includes(word) &&
                            !exceptList.includes(lowerCaseWord) &&
                            !commonWordsList.includes(lowerCaseWord) &&
                            !prepositionList.includes(lowerCaseWord) &&
                            !articleList.includes(lowerCaseWord) &&
                            !punctuationList.includes(lowerCaseWord) &&
                            !conjunctionList.includes(lowerCaseWord)
                        ) {
                            keywords.push(word);
                            keywordsIndex.push(index);
                        }
                    });
                    // console.log(keywords);
                    // console.log(keywordsIndex);

                    tempTapescript[index].keywords = keywords;
                    tempTapescript[index].keywordsIndex = keywordsIndex;

                    const keywordsCount = keywordsIndex.length;
                    if (keywordsCount) {
                        let randomNumber = Math.floor(Math.random() * keywordsCount);

                        easyDictationIndex.push(keywordsIndex[randomNumber]);
                        mediumDictationIndex.push(keywordsIndex[randomNumber]);
                        difficultDictationIndex.push(keywordsIndex[randomNumber]);

                        if (keywordsCount > 1 && keywordsCount <= 3) {
                            while (difficultDictationIndex.length < 2) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!difficultDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    difficultDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                        }

                        if (keywordsCount > 3 && keywordsCount <= 5) {
                            while (mediumDictationIndex.length < 2) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!mediumDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    mediumDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                            while (difficultDictationIndex.length < 3) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!difficultDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    difficultDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                        }

                        if (keywordsCount > 5 && keywordsCount <= 9) {
                            while (mediumDictationIndex.length < 3) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!mediumDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    mediumDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                            while (difficultDictationIndex.length < 4) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!difficultDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    difficultDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                        }

                        if (keywordsCount > 9) {
                            while (mediumDictationIndex.length < 4) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!mediumDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    mediumDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                            while (difficultDictationIndex.length < 6) {
                                randomNumber = Math.floor(Math.random() * keywordsCount);
                                if (!difficultDictationIndex.includes(keywordsIndex[randomNumber])) {
                                    difficultDictationIndex.push(keywordsIndex[randomNumber]);
                                }
                            }
                        }
                    }
                    // console.log(easyDictationIndex);
                    // console.log(mediumDictationIndex);
                    // console.log(difficultDictationIndex);
                    // console.log(seperatedText[keywordsIndex[randomNumber]]);

                    tempTapescript[index].easyDictationIndex = easyDictationIndex;
                    tempTapescript[index].mediumDictationIndex = mediumDictationIndex;
                    tempTapescript[index].difficultDictationIndex = difficultDictationIndex;

                    switch (level) {
                        case 'easy':
                            tempTapescript[index].selectedDictationIndex = easyDictationIndex;
                            break;
                        case 'medium':
                            tempTapescript[index].selectedDictationIndex = mediumDictationIndex;
                            break;
                        case 'difficult':
                            tempTapescript[index].selectedDictationIndex = difficultDictationIndex;
                            break;
                        case 'all':
                            break;
                    }
                });

                // generate time of each word in seperatedText
                tempTapescript?.map((text, index) => {
                    // console.log(text.timeStart);
                    // console.log(text.timeEnd);
                    // console.log(text.seperatedText.length);
                    const str = text.english
                        .replaceAll(',', '')
                        .replaceAll('.', '')
                        .replaceAll('!', '')
                        .replaceAll('?', '')
                        .replaceAll(' ', '');

                    // const averageTimeOfWord = Math.floor(
                    //     (parseInt(text.timeEnd) - parseInt(text.timeStart)) / parseInt(text.seperatedText.length),
                    // );
                    // console.log(averageTimeOfWord);

                    const timeStartSeperatedText = [];
                    const timeEndSeperatedText = [];
                    // for (let i = 0; i < text.seperatedText.length; i++) {
                    //     timeStartSeperatedText.push(parseInt(text.timeStart) + i * averageTimeOfWord);
                    //     timeEndSeperatedText.push(timeStartSeperatedText[i] + averageTimeOfWord);
                    // }

                    const averageTimeOfCharactor = Math.floor((text.timeEnd - text.timeStart) / str.length);
                    // console.log(averageTimeOfCharactor);
                    const delayTime = 0 * averageTimeOfCharactor;

                    text.seperatedText?.map((word, index) => {
                        if (index === 0) {
                            timeStartSeperatedText.push(text.timeStart - delayTime);
                            timeEndSeperatedText.push(
                                timeStartSeperatedText[index] + word.length * averageTimeOfCharactor,
                            );
                        } else {
                            const lowerCaseWord = word.toLowerCase();
                            if (!exceptList.includes(lowerCaseWord) && !punctuationList.includes(lowerCaseWord)) {
                                timeStartSeperatedText.push(timeEndSeperatedText[index - 1]);
                                timeEndSeperatedText.push(
                                    timeStartSeperatedText[index] + word.length * averageTimeOfCharactor,
                                );
                            } else {
                                timeStartSeperatedText.push(timeEndSeperatedText[index - 1]);
                                timeEndSeperatedText.push(timeStartSeperatedText[index]);
                            }
                        }
                    });

                    // console.log(timeStartSeperatedText);
                    // console.log(timeEndSeperatedText);
                    tempTapescript[index].timeStartSeperatedText = timeStartSeperatedText;
                    tempTapescript[index].timeEndSeperatedText = timeEndSeperatedText;
                });

                console.log('tapescript:', tempTapescript);

                // initialization
                setAudio(data.lesson.audio);
                playerRef.current?.seekTo(tempTapescript[0].timeStart / 1000, 'seconds');
                setCurrentTime(0);
                setPlaying(false);
                setIsRepeatedOn(false);
                setTextIndex(0);
                setTimeStart(tempTapescript[0].timeStart);
                setTimeEnd(tempTapescript[0].timeEnd);

                setAnswer0('');
                setAnswer1('');
                setAnswer2('');
                setAnswer3('');
                setAnswer4('');
                setAnswer5('');

                setTapescript(tempTapescript);

                setIsLessonSelected(true);
            } else {
                setIsLessonSelected(false);
                console.log('Do not have content!');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleShowDictation = () => {
        setIsDictating(true);

        playerRef.current?.seekTo(tapescript[0].timeStart / 1000, 'seconds');
        setCurrentTime(0);
        setPlaying(false);
        setIsRepeatedOn(false);
        setTextIndex(0);
        setTimeStart(tapescript[0].timeStart);
        setTimeEnd(tapescript[0].timeEnd);

        setAnswer0('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setAnswer5('');
    };
    const handleShowTapescript = () => {
        setIsDictating(false);

        playerRef.current?.seekTo(tapescript[0].timeStart / 1000, 'seconds');
        // setCurrentTime(0);
        // setPlaying(false);
        setIsRepeatedOn(false);
        setTextIndex(0);
        setTimeStart(tapescript[0].timeStart);
        setTimeEnd(tapescript[0].timeEnd);

        setAnswer0('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setAnswer5('');
        setIsCheckAnswer(false);
        pause();
    };

    const handleNext = () => {
        if (textIndex < tapescript.length - 1) {
            const nextTextIndex = textIndex + 1;

            playerRef.current?.seekTo(tapescript[nextTextIndex].timeStart / 1000, 'seconds');
            setTimeStart(tapescript[nextTextIndex].timeStart);
            setTimeEnd(tapescript[nextTextIndex].timeEnd);

            setTextIndex(nextTextIndex);
            setAnswer0('');
            setAnswer1('');
            setAnswer2('');
            setAnswer3('');
            setAnswer4('');
            setAnswer5('');
            setAnswerWholeSentence('');

            setIsCheckAnswer(false);
            play();
        }
    };

    const handlePrevious = () => {
        if (textIndex > 0) {
            const previousTextIndex = textIndex - 1;

            playerRef.current?.seekTo(tapescript[previousTextIndex].timeStart / 1000, 'seconds');
            setTimeStart(tapescript[previousTextIndex].timeStart);
            setTimeEnd(tapescript[previousTextIndex].timeEnd);

            setTextIndex(previousTextIndex);
            setAnswer0('');
            setAnswer1('');
            setAnswer2('');
            setAnswer3('');
            setAnswer4('');
            setAnswer5('');
            setAnswerWholeSentence('');

            setIsCheckAnswer(false);
            play();
        }
    };

    const handleCheckAnswer = () => {
        setIsCheckAnswer(true);
    };

    const handleShowCorrectAnswer = () => {
        // console.log(answer0);
        // console.log(answer1);
        // console.log(answer2);
        // console.log(answer3);
        // console.log(answer4);
        // console.log(answer5);

        // console.log(tapescript[textIndex].english);

        if (answer0.toLowerCase() !== correctAnswer0.toLowerCase()) setAnswer0(correctAnswer0);
        if (answer1.toLowerCase() !== correctAnswer1.toLowerCase()) setAnswer1(correctAnswer1);
        if (answer2.toLowerCase() !== correctAnswer2.toLowerCase()) setAnswer2(correctAnswer2);
        if (answer3.toLowerCase() !== correctAnswer3.toLowerCase()) setAnswer3(correctAnswer3);
        if (answer4.toLowerCase() !== correctAnswer4.toLowerCase()) setAnswer4(correctAnswer4);
        if (answer5.toLowerCase() !== correctAnswer5.toLowerCase()) setAnswer5(correctAnswer5);

        setAnswerWholeSentence(tapescript[textIndex].english);
    };

    const handleListenAgain = () => {
        playerRef.current?.seekTo(timeStart / 1000, 'seconds');
        play();
    };

    const handleClearAnswer = () => {
        setAnswer0('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        setAnswer5('');
        setAnswerWholeSentence('');

        setIsCheckAnswer(false);
    };

    const assignSelectedDictationIndex = (selectedLevel) => {
        const tempTapescript = tapescript;
        console.log('selectedLevel:', selectedLevel);

        tapescript?.map((text, index) => {
            switch (selectedLevel) {
                case 'easy':
                    tempTapescript[index].selectedDictationIndex = text.easyDictationIndex;
                    break;
                case 'medium':
                    tempTapescript[index].selectedDictationIndex = text.mediumDictationIndex;
                    break;
                case 'difficult':
                    tempTapescript[index].selectedDictationIndex = text.difficultDictationIndex;
                    break;
                case 'all':
                    break;
            }
        });
        console.log('tempTapescript:', tempTapescript);

        setTapescript(tempTapescript);

        handleClearAnswer();
    };

    const isCorrectWholeSentence = () => {
        console.log(tapescript[textIndex].english);
        console.log(answerWholeSentence);
        console.log(tapescript[textIndex].english === answerWholeSentence);

        return tapescript[textIndex].english === answerWholeSentence;
    };

    return (
        <div className="container-fluid">
            {isLearning && <LearningTopBar title={course.title}></LearningTopBar>}

            <div className="row">
                {/* left column, the learning window */}
                <div className="col-sm-9 learning-top-margin" id="col-left">
                    {isLessonSelected ? (
                        <div className="container-fluid ">
                            <div className="row">
                                <div className="col-sm-6 bg-secondary-subtle mb-3 p-3 d-flex justify-content-center">
                                    <div>
                                        <button
                                            onClick={handleShowDictation}
                                            className="btn btn-secondary rounded-pill text-light"
                                        >
                                            Nghe chép chính tả
                                        </button>{' '}
                                        <button
                                            onClick={handleShowTapescript}
                                            className="btn btn-secondary rounded-pill text-light"
                                        >
                                            Nghe có lời thoại
                                        </button>
                                        {isDictating ? (
                                            <div className="mt-3">
                                                {/* <h4 className="text-secondary text-align-center mt-3">
                                                    Luyện nghe chép chính tả
                                                </h4> */}
                                                <select
                                                    className="form-select mb-3 w-50"
                                                    aria-label="Default select example"
                                                    value={level}
                                                    onChange={(e) => {
                                                        console.log('level:', e.target.value);
                                                        setLevel(e.target.value);
                                                        assignSelectedDictationIndex(e.target.value);
                                                    }}
                                                >
                                                    <option value="easy">Dễ</option>
                                                    <option value="medium">Trung bình</option>
                                                    <option value="difficult">Khó</option>
                                                    <option value="all">Cả câu</option>
                                                </select>
                                            </div>
                                        ) : (
                                            <div>
                                                {/* <h4 className="text-secondary text-align-center mt-3">
                                                    Luyện nghe có lời thoại
                                                </h4> */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6 bg-secondary-subtle mb-3 p-3">
                                    <div>
                                        <ReactPlayer
                                            url={audio}
                                            ref={playerRef}
                                            width="300px"
                                            height="50px"
                                            controls={true}
                                            playing={playing}
                                            onPlay={play}
                                            onPause={pause}
                                        />
                                        {/* <ReactPlayer
                                        url="https://www.computerhope.com/jargon/m/example.mp3"
                                        ref={playerRef}
                                        width="400px"
                                        height="50px"
                                        controls={true}
                                        playing={playing}
                                        onPlay={play}
                                        onPause={pause}
                                        /> */}
                                        {/* <ReactPlayer
                                        url={sound}
                                        ref={playerRef}
                                        width="400px"
                                        height="50px"
                                        controls={true}
                                        playing={playing}
                                        onPlay={play}
                                        onPause={pause}
                                        /> */}
                                    </div>
                                    <div className="form-check form-switch mt-3">
                                        <input
                                            onChange={handleRepeat}
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            checked={isRepeatedOn}
                                        ></input>
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                            Lặp lại
                                        </label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input
                                            onChange={handleVietnameseSubtitle}
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckVietnameseSubtitle"
                                            checked={isVietnamese}
                                        ></input>
                                        <label className="form-check-label" htmlFor="flexSwitchCheckVietnameseSubtitle">
                                            Tiếng Việt
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* <Scrollbars style={{ height: `${windowSize[1] - 64 - 160 - 57}px` }}> */}
                            <Scrollbars style={{ height: `${windowSize[1] - 300 - 57}px` }}>
                                {/* <h2>current time playing: {currentTime} second.</h2> */}

                                {isDictating ? (
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-6">
                                            <div className="mt-3 mb-3">
                                                <button
                                                    onClick={handlePrevious}
                                                    type="button"
                                                    className="btn btn-secondary rounded-pill btn-sm"
                                                >
                                                    Câu trước
                                                </button>{' '}
                                                <button
                                                    onClick={handleListenAgain}
                                                    type="button"
                                                    className="btn btn-secondary rounded-pill btn-sm"
                                                >
                                                    Nghe lại
                                                </button>{' '}
                                                {/* <button
                                                onClick={handleCheckAnswer}
                                                type="button"
                                                className="btn btn-secondary rounded-pill btn-sm"
                                                >
                                                Kiểm tra
                                                </button> */}
                                                <button
                                                    onClick={handleShowCorrectAnswer}
                                                    type="button"
                                                    className="btn btn-secondary rounded-pill btn-sm"
                                                >
                                                    Đáp án
                                                </button>{' '}
                                                <button
                                                    onClick={handleClearAnswer}
                                                    type="button"
                                                    className="btn btn-secondary rounded-pill btn-sm"
                                                >
                                                    Xóa
                                                </button>{' '}
                                                <button
                                                    onClick={handleNext}
                                                    type="button"
                                                    className="btn btn-secondary rounded-pill btn-sm"
                                                >
                                                    Câu sau
                                                </button>
                                            </div>

                                            {level !== 'all' ? (
                                                // listening then fill in the blanks
                                                <div className="mt-3">
                                                    {tapescript[textIndex]?.seperatedText?.map((word, index) => {
                                                        const isIncluded =
                                                            tapescript[textIndex].selectedDictationIndex.includes(
                                                                index,
                                                            );
                                                        if (isIncluded) {
                                                            const indexAnswer = tapescript[
                                                                textIndex
                                                            ].selectedDictationIndex.findIndex((i) => i === index);
                                                            // console.log(indexAnswer);

                                                            switch (indexAnswer) {
                                                                case 0:
                                                                    correctAnswer0 = word;
                                                                    return (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            className={
                                                                                !isCheckAnswer
                                                                                    ? 'form-control-dictation'
                                                                                    : answer0.toLowerCase() ===
                                                                                      word.toLowerCase()
                                                                                    ? 'form-control-dictation-right'
                                                                                    : 'form-control-dictation-wrong'
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    answer0.toLowerCase() ===
                                                                                    word.toLowerCase()
                                                                                        ? 'blue'
                                                                                        : 'red',
                                                                            }}
                                                                            value={answer0}
                                                                            onChange={(e) => setAnswer0(e.target.value)}
                                                                        />
                                                                        // {isCorrectAnswer0? <></>:<></>}
                                                                    );
                                                                case 1:
                                                                    correctAnswer1 = word;
                                                                    return (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            className={
                                                                                !isCheckAnswer
                                                                                    ? 'form-control-dictation'
                                                                                    : answer1.toLowerCase() ===
                                                                                      word.toLowerCase()
                                                                                    ? 'form-control-dictation-right'
                                                                                    : 'form-control-dictation-wrong'
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    answer1.toLowerCase() ===
                                                                                    word.toLowerCase()
                                                                                        ? 'blue'
                                                                                        : 'red',
                                                                            }}
                                                                            value={answer1}
                                                                            onChange={(e) => setAnswer1(e.target.value)}
                                                                        />
                                                                    );
                                                                case 2:
                                                                    correctAnswer2 = word;
                                                                    return (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            className={
                                                                                !isCheckAnswer
                                                                                    ? 'form-control-dictation'
                                                                                    : answer2.toLowerCase() ===
                                                                                      word.toLowerCase()
                                                                                    ? 'form-control-dictation-right'
                                                                                    : 'form-control-dictation-wrong'
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    answer2.toLowerCase() ===
                                                                                    word.toLowerCase()
                                                                                        ? 'blue'
                                                                                        : 'red',
                                                                            }}
                                                                            value={answer2}
                                                                            onChange={(e) => setAnswer2(e.target.value)}
                                                                        />
                                                                    );
                                                                case 3:
                                                                    correctAnswer3 = word;
                                                                    return (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            className={
                                                                                !isCheckAnswer
                                                                                    ? 'form-control-dictation'
                                                                                    : answer3.toLowerCase() ===
                                                                                      word.toLowerCase()
                                                                                    ? 'form-control-dictation-right'
                                                                                    : 'form-control-dictation-wrong'
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    answer3.toLowerCase() ===
                                                                                    word.toLowerCase()
                                                                                        ? 'blue'
                                                                                        : 'red',
                                                                            }}
                                                                            value={answer3}
                                                                            onChange={(e) => setAnswer3(e.target.value)}
                                                                        />
                                                                    );
                                                                case 4:
                                                                    correctAnswer4 = word;
                                                                    return (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            className={
                                                                                !isCheckAnswer
                                                                                    ? 'form-control-dictation'
                                                                                    : answer4.toLowerCase() ===
                                                                                      word.toLowerCase()
                                                                                    ? 'form-control-dictation-right'
                                                                                    : 'form-control-dictation-wrong'
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    answer4.toLowerCase() ===
                                                                                    word.toLowerCase()
                                                                                        ? 'blue'
                                                                                        : 'red',
                                                                            }}
                                                                            value={answer4}
                                                                            onChange={(e) => setAnswer4(e.target.value)}
                                                                        />
                                                                    );
                                                                case 5:
                                                                    correctAnswer5 = word;
                                                                    return (
                                                                        <input
                                                                            key={index}
                                                                            type="text"
                                                                            className={
                                                                                !isCheckAnswer
                                                                                    ? 'form-control-dictation'
                                                                                    : answer5.toLowerCase() ===
                                                                                      word.toLowerCase()
                                                                                    ? 'form-control-dictation-right'
                                                                                    : 'form-control-dictation-wrong'
                                                                            }
                                                                            style={{
                                                                                color:
                                                                                    answer5.toLowerCase() ===
                                                                                    word.toLowerCase()
                                                                                        ? 'blue'
                                                                                        : 'red',
                                                                            }}
                                                                            value={answer5}
                                                                            onChange={(e) => setAnswer5(e.target.value)}
                                                                        />
                                                                    );
                                                            }
                                                        } else {
                                                            return <span key={index}>{word}</span>;
                                                        }
                                                        // return isIncluded ? (
                                                        //     <input
                                                        //         key={index}
                                                        //         type="text"
                                                        //         className="form-control-dictation"
                                                        //         value={`answer${indexAnswer}`}
                                                        //         onChange={(e) => `setAnswer${indexAnswer}`(e.target.value)}
                                                        //     />
                                                        // ) : (
                                                        //     <span key={index}>{word}</span>
                                                        // );
                                                    })}
                                                </div>
                                            ) : (
                                                // listening then write whole sentences
                                                <div>
                                                    <textarea
                                                        className="form-control mb-3"
                                                        style={{
                                                            color: isCorrectWholeSentence() ? 'blue' : 'red',
                                                        }}
                                                        value={answerWholeSentence}
                                                        placeholder="Chép cả câu ở đây"
                                                        onChange={(e) => setAnswerWholeSentence(e.target.value)}
                                                    />
                                                </div>
                                            )}
                                            {isVietnamese ? (
                                                <p className="mt-3">{tapescript[textIndex].vietnamese}</p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="col-sm-3"></div>
                                    </div>
                                ) : (
                                    // listening with tapescript UI
                                    <div className="">
                                        {tapescript?.map((text, index) => (
                                            <div className="mb-3 ms-3" key={index}>
                                                {text.seperatedText?.map((word, i) => (
                                                    <span
                                                        onClick={(e) => handleClickSentence(e, text)}
                                                        style={{
                                                            color:
                                                                currentTime > text.timeStartSeperatedText[i] / 1000 &&
                                                                currentTime < text.timeEndSeperatedText[i] / 1000
                                                                    ? 'Tomato'
                                                                    : '',
                                                            border:
                                                                currentTime > text.timeStartSeperatedText[i] / 1000 &&
                                                                currentTime < text.timeEndSeperatedText[i] / 1000
                                                                    ? '0.1px solid Tomato'
                                                                    : '',
                                                            borderRadius:
                                                                currentTime > text.timeStartSeperatedText[i] / 1000 &&
                                                                currentTime < text.timeEndSeperatedText[i] / 1000
                                                                    ? '5px'
                                                                    : '',
                                                        }}
                                                        key={i}
                                                    >
                                                        {word}
                                                    </span>
                                                ))}
                                                <br></br>
                                                {isVietnamese ? (
                                                    <span
                                                        onClick={(e) => handleClickSentence(e, text)}
                                                        className="text-button-subtitle"
                                                        style={{
                                                            color:
                                                                currentTime > text.timeStart / 1000 &&
                                                                currentTime < text.timeEnd / 1000
                                                                    ? 'SlateBlue'
                                                                    : '',
                                                        }}
                                                    >
                                                        {text.vietnamese}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        ))}

                                        {/* {tapescript?.map((text, index) => (
                                        <div className="mb-3" key={index}>
                                            <span
                                                onClick={(e) => handleClickSentence(e, text)}
                                                className="text-button"
                                                style={{
                                                    color:
                                                        currentTime > text.timeStart / 1000 &&
                                                        currentTime < text.timeEnd / 1000
                                                            ? 'blue'
                                                            : '',
                                                }}
                                            >
                                                {text.english}
                                            </span>
                                            <br></br>
                                            {isVietnamese ? (
                                                <span
                                                    onClick={(e) => handleClickSentence(e, text)}
                                                    className="text-button-subtitle"
                                                    style={{
                                                        color:
                                                            currentTime > text.timeStart / 1000 &&
                                                            currentTime < text.timeEnd / 1000
                                                                ? 'green'
                                                                : '',
                                                    }}
                                                >
                                                    {text.vietnamese}
                                                </span>
                                            ) : (
                                                <></>
                                            )}

                                            <br></br>
                                        </div>
                                    ))} */}
                                    </div>
                                )}
                            </Scrollbars>
                        </div>
                    ) : (
                        <div>
                            <h1 className="display-6 bg-secondary text-light p-5">{course.title}</h1>
                        </div>
                    )}
                </div>

                {/* right column, the accordion */}
                <div className="col-sm-3 learning-top-margin mx-0 p-0" id="col-right">
                    <h5 ref={contentTitleRef} className="bg-secondary-subtle p-3 m-0">
                        Nội dung
                    </h5>
                    {/* <Scrollbars ref={accordionRef} style={{ height: `${windowSize[1] - 64 - 56 - 57}px` }}> */}
                    <Scrollbars ref={accordionRef} style={{ height: `${windowSize[1] - 300 - 57}px` }}>
                        <div className="accordion accordion-flush" id="accordionExample">
                            {curriculums?.map((curriculum, index) => (
                                <div className="accordion-item" key={curriculum._id}>
                                    <h2 className="accordion-header" id={`panelsStayOpen-heading-${curriculum.slug}`}>
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#panelsStayOpen-collapse-${curriculum.slug}`}
                                            aria-expanded="false"
                                            aria-controls={`panelsStayOpen-collapse-${curriculum.slug}`}
                                        >
                                            {curriculum.title}
                                            <br></br>
                                            3/3 | 11min
                                        </button>
                                    </h2>
                                    <div
                                        ref={(el) => (accItemsRefs.current[index] = el)}
                                        id={`panelsStayOpen-collapse-${curriculum.slug}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                        aria-labelledby={`panelsStayOpen-heading-${curriculum.title}`}
                                    >
                                        <div className="accordion-body">
                                            <div className="list-group list-group-flush list-group-numbered">
                                                {curriculum.lessons?.map((lesson) => (
                                                    <a
                                                        onClick={(e) => handleClickLesson(e, lesson._id)}
                                                        className="list-group-item list-group-item-action"
                                                        key={lesson._id}
                                                    >
                                                        {lesson.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Scrollbars>
                </div>
            </div>
            {/* <div className="text-center bg-light w-100 position-fixed bottom-0 start-0" style={{ height: '3rem' }}>
                <h3>Bottom Bar</h3>
            </div> */}
            <LearningBottomBar></LearningBottomBar>
        </div>
    );
}
