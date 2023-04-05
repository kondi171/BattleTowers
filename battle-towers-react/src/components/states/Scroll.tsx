import CtrlScroll from './../../assets/img/CtrlScroll.png';
import styles from './../../assets/scss/modules/ScrollState.module.scss';

const Scroll = () => {
    return (
        <div className={styles.scrollState}>
            <img src={CtrlScroll} alt="Change resolution info" />
            <div>If the game doesn't display correctly, try this combination</div>
        </div>
    );
}

export default Scroll;