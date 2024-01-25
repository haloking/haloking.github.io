import { useState, useEffect } from 'react';

import HomeContent from './HomeContent';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// import 'overlayscrollbars/overlayscrollbars.css';
// import { OverlayScrollbarsComponent, useOverlayScrollbars } from 'overlayscrollbars-react';

import useSize from '../helpers/useSize';

import { MediaDetect, Mobile, Desktop, MobileAndTablet } from '../components/media/MediaDetect';
import { useMediaQuery } from 'react-responsive';

export default function Home() {
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

    // state
    const [isScrollbarsApplied, setIsScrollbarsApplied] = useState(true);

    // hook
    useEffect(() => {
        if (isMobile) {
            setIsScrollbarsApplied(false);
        } else {
            setIsScrollbarsApplied(true);
        }
    }, [windowSize]);

    return (
        <>
            {isScrollbarsApplied ? (
                // <Scrollbars
                //     style={{ height: `${windowSize[1]}px` }}
                //     // This will activate auto hide
                //     autoHide
                //     // Hide delay in ms
                //     autoHideTimeout={100}
                //     // Duration for hide animation in ms.
                //     autoHideDuration={200}
                // >
                // </Scrollbars>

                // <OverlayScrollbarsComponent style={{ height: `${windowSize[1]}px` }}>
                // </OverlayScrollbarsComponent>

                <SimpleBar style={{ height: `${windowSize[1]}px` }}>
                    <HomeContent></HomeContent>

                    <p>
                        <strong>
                            innerWidth : <span>{windowSize[0]}</span>
                        </strong>
                    </p>
                    <p>
                        <strong>
                            innerHeight : <span>{windowSize[1]}</span>
                        </strong>
                    </p>
                    <MediaDetect></MediaDetect>
                    <h5>Applied Customized ScrollBar</h5>
                </SimpleBar>
            ) : (
                <>
                    <HomeContent></HomeContent>

                    <p>
                        <strong>
                            innerWidth : <span>{windowSize[0]}</span>
                        </strong>
                    </p>
                    <p>
                        <strong>
                            innerHeight : <span>{windowSize[1]}</span>
                        </strong>
                    </p>
                    <MediaDetect></MediaDetect>
                    <h5>Not Applied Customized ScrollBar</h5>
                </>
            )}
        </>
    );
}
