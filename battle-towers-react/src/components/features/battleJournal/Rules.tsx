import styles from './../../../assets/scss/modules/BattleJournal.module.scss';

const Rules = () => {
    return (
        <>
            <h2 className={styles.rulesHeader}>Getting Stared</h2>
            <p className={styles.rulesParagraph}>Your goal is to defend each of the three worlds from the dangerous orcs without losing all your lives. To do this, you need to build towers, each of them are better or worse against different types of enemies (details can be found in the <strong>Towers</strong> tab). If you defeat an orc you will increase your score and receive a certain amount of money which you can build or upgrade towers. But beware, there are different types of orcs that will make it difficult to reach your goal. (Detailed information can be found in the <strong>Enemies</strong> tab).</p>
            <h2 className={styles.rulesHeader}>Worlds</h2>
            <p className={styles.rulesParagraph}>Defense is not easy, because you have to survive three worlds, each of them has 3 levels, and in each level you have to survive 3 waves, each wave is more dangerous than the previous one.</p>
            <h2 className={styles.rulesHeader}>Resources</h2>
            <p className={styles.rulesParagraph}>You start the game with <strong className={styles.health}>10 lives</strong> and <strong className={styles.money}>100 bills</strong>. For each survived level you get <strong className={styles.money}>100 bills</strong> extra for building or upgrading towers. If you survive world you get <strong className={styles.health}>3 lives</strong> and <strong className={styles.money}>300 bills</strong> extra!</p>
            <h2 className={styles.goodLuck}>Have fun and good luck!</h2>
        </>
    );
}

export default Rules;