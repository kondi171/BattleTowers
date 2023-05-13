import styles from './../../../assets/scss/modules/BattleJournal.module.scss';
import enemies from './../../../assets/img/journal/contents/enemies.png';
import towers from './../../../assets/img/journal/contents/towers.png';
import rules from './../../../assets/img/journal/contents/rules.png';
import { useEffect, useState } from 'react';
import Rules from './Rules';
import Enemies from './Enemies';
import Towers from './Towers';
import { animated, useSpring } from 'react-spring';

// import hoverElement from './../../../assets/audio/effects/towerPlace.wav';
// import confirmElement from './../../../assets/audio/effects/confirmMenu.wav';
import useSound from 'use-sound';
import { BattleJournalPage } from '../../../../enums';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface BattleJournalProps {
    isHelpOpen: boolean,
    setIsHelpOpen: (isOpen: boolean) => void;
}

const BattleJournal: React.FC<BattleJournalProps> = ({ isHelpOpen, setIsHelpOpen }) => {

    // const [playConfirm] = useSound(confirmElement)
    // const [playHover] = useSound(hoverElement);

    const stateAppearAnimation = useSpring({
        from: {
            opacity: isHelpOpen ? 0 : 1,
            translateY: isHelpOpen ? `-100vh` : `0`,
        },
        to: {
            opacity: isHelpOpen ? 1 : 0,
            translateY: isHelpOpen ? `0` : `-100vh`,
        },
        config: { duration: 200 }
    });

    const [activeArticle, setActiveArticle] = useState(BattleJournalPage.RULES);

    const handleActive = (e: React.MouseEvent, page: BattleJournalPage) => {
        const articles = document.querySelectorAll('article');
        articles.forEach((article) => {
            article.classList.remove(styles.active);
        });
        const target = e.target as HTMLDivElement;
        target.closest('article')?.classList.add(styles.active);
        setActiveArticle(page);
        // playConfirm();
    }

    const handleClose = () => {
        setIsHelpOpen(!isHelpOpen);
        // playConfirm();
    }

    const handlePlayHover = (e: React.MouseEvent) => {
        const article = e.target as HTMLDivElement;
        if (!article.classList.contains(styles.active)) {
            // playHover();
        }
    }

    useEffect(() => {
        const modal = document.querySelector(styles.battleJournal);
        if (modal) modal.classList.add(styles.active);
    }, []);

    return (
        <animated.section className={`${styles.battleJournal} ${isHelpOpen && styles.active}`} style={stateAppearAnimation}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Battle Journal</h3>
                <div className={styles.articles}>
                    <article className={styles.active} onMouseEnter={(e) => handlePlayHover(e)} onClick={e => handleActive(e, BattleJournalPage.RULES)}>
                        <Image src={rules} alt="Rules icon" />
                        <h3>Rules</h3>
                    </article>
                    <article onMouseEnter={(e) => handlePlayHover(e)} onClick={e => handleActive(e, BattleJournalPage.ENEMIES)}>
                        <Image src={enemies} alt="Enemies icon" />
                        <h3>Enemies</h3>
                    </article>
                    <article onMouseEnter={(e) => handlePlayHover(e)} onClick={e => handleActive(e, BattleJournalPage.TOWERS)}>
                        <Image src={towers} alt="Towers icon" />
                        <h3>Towers</h3>
                    </article>
                </div>
                <div className={styles.content}>
                    {activeArticle === BattleJournalPage.RULES && <Rules />}
                    {activeArticle === BattleJournalPage.ENEMIES && <Enemies />}
                    {activeArticle === BattleJournalPage.TOWERS && <Towers />}
                </div>
                {/* <i className={`${styles.close} fa fa-times`} onMouseEnter={() => playHover()} onClick={handleClose} /> */}
                <div onClick={handleClose} className={styles.close}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        aria-hidden={true}
                    />
                </div>
            </div>
        </animated.section>
    );
};

export default BattleJournal;