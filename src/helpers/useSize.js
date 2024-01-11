import { useEffect, useState } from 'react';

// return Width windowsize[0] and Height windowsize[1]
const useSize = () => {
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const windowSizeHandler = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', windowSizeHandler);
        return () => {
            window.removeEventListener('resize', windowSizeHandler);
        };
    }, []);

    return windowSize;
};

export default useSize;
