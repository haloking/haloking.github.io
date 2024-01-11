import { useState, createContext, useContext, useEffect } from 'react';

const IsLearningContext = createContext();

const IsLearningProvider = ({ children }) => {
    const [isLearning, setIsLearning] = useState(false);

    useEffect(() => {
        let fromLS = localStorage.getItem('isLearning');
        if (fromLS) setIsLearning(JSON.parse(fromLS));
    }, []);

    return <IsLearningContext.Provider value={[isLearning, setIsLearning]}>{children}</IsLearningContext.Provider>;
};

const useIsLearning = () => useContext(IsLearningContext); // [isLearning, setIsLearning]

export { useIsLearning, IsLearningProvider }; // wrap the app with provider
