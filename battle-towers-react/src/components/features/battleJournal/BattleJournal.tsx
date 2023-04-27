import styles from './../../../assets/scss/modules/BattleJournal.module.scss';
import enemies from './../../../assets/img/journal/contents/enemies.png';
import towers from './../../../assets/img/journal/contents/towers.png';
import rules from './../../../assets/img/journal/contents/rules.png';
import { useEffect, useState } from 'react';
import { BattleJournalPage } from '../../../enums';
import Rules from './Rules';
import Enemies from './Enemies';
import Towers from './Towers';

interface Props {
    isHelpOpen: boolean,
    setIsHelpOpen: (isOpen: boolean) => void;
}

const BattleJournal: React.FC<Props> = ({ isHelpOpen, setIsHelpOpen }) => {
    const [activeArticle, setActiveArticle] = useState(BattleJournalPage.RULES);

    const handleActive = (e: any, page: BattleJournalPage) => {
        const articles = document.querySelectorAll('article');
        articles.forEach((article) => {
            article.classList.remove(styles.active);
        });
        const target = e.target as HTMLDivElement;
        target.closest('article')?.classList.add(styles.active);
        setActiveArticle(page);
    }

    const handleClose = () => { setIsHelpOpen(!isHelpOpen); }

    useEffect(() => {
        const modal = document.querySelector(styles.battleJournal);
        if (modal) modal.classList.add(styles.active);
    }, []);

    return (
        <section className={`${styles.battleJournal} ${isHelpOpen && styles.active}`}>
            <div className={styles.modal}>
                <h3 className={styles.header}>Battle Journal</h3>
                <div className={styles.articles}>
                    <article className={styles.active} onClick={e => handleActive(e, BattleJournalPage.RULES)}>
                        <img src={rules} alt="Rules icon" />
                        <h3>Rules</h3>
                    </article>
                    <article onClick={e => handleActive(e, BattleJournalPage.ENEMIES)}>
                        <img src={enemies} alt="Enemies icon" />
                        <h3>Enemies</h3>
                    </article>
                    <article onClick={e => handleActive(e, BattleJournalPage.TOWERS)}>
                        <img src={towers} alt="Towers icon" />
                        <h3>Towers</h3>
                    </article>
                </div>
                <div className={styles.content}>
                    {activeArticle === BattleJournalPage.RULES && <Rules />}
                    {activeArticle === BattleJournalPage.ENEMIES && <Enemies />}
                    {activeArticle === BattleJournalPage.TOWERS && <Towers />}
                </div>
                {/* <div className={styles.overlay}></div> */}
                <i className={`${styles.close} fa fa-times`} onClick={handleClose} />
            </div>
        </section>
    );
};

export default BattleJournal;