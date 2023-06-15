import Image from 'next/image';
import CtrlScroll from './../../assets/img/CtrlScroll.png';
import styles from './../../assets/scss/modules/ScrollState.module.scss';
import { useSpring, animated } from 'react-spring';

const Scroll = () => {
    const stateAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });
    return (
        <animated.div className={styles.scrollState} style={stateAnimation}>
            <Image src={CtrlScroll} alt="Change resolution info" />
            <div>If the game doesn't display correctly, try this combination</div>
        </animated.div>
    );
}

export default Scroll;