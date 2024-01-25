import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
};
const MobileOrTablet = ({ children }) => {
    const isMobileOrTablet = useMediaQuery({ maxWidth: 991 });
    return isMobileOrTablet ? children : null;
};
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
};
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
};
const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
};

const MediaDetect = () => (
    <div>
        <Desktop>
            <p>
                <strong>Desktop or Laptop</strong>
            </p>
        </Desktop>
        <MobileOrTablet>
            <p>
                <strong>Mobile or Tablet</strong>
            </p>
        </MobileOrTablet>
        <Tablet>
            <p>
                <strong>Tablet</strong>
            </p>
        </Tablet>
        <Mobile>
            <p>
                <strong>Mobile</strong>
            </p>
        </Mobile>
        <Default>
            <p>
                <strong>Not mobile: maybe Desktop or Laptop or Tablet</strong>
            </p>
        </Default>
    </div>
);

export { MediaDetect, Desktop, Tablet, Mobile, Default, MobileOrTablet };
