import styles from './../../../assets/scss/modules/BattleJournal.module.scss';
import substructure from './../../../assets/img/towers/substructure.png';
const Rules = () => {
    return (
        <>
            <h2 className={styles.rulesHeader}>Getting Stared</h2>
            <p className={styles.rulesParagraph}>Your goal is to defend each of the three worlds from the dangerous orcs without losing all your lives. To do this, you need to build towers, each of them are better or worse against different types of enemies (details can be found in the <strong>Towers</strong> tab). If you defeat an orc you will increase your score and receive a certain amount of money which you can build or upgrade towers. But beware, there are different types of orcs that will make it difficult to reach your goal. (Detailed information can be found in the <strong>Enemies</strong> tab).</p>
            <h2 className={styles.rulesHeader}>Worlds</h2>
            <p className={styles.rulesParagraph}>Defense is not easy, because you have to survive three worlds, each of them has 3 levels, and in each level you have to survive 3 waves, each wave is more dangerous than the previous one.</p>
            <h2 className={styles.rulesHeader}>Resources</h2>
            <p className={styles.rulesParagraph}>You start the game with <strong className={styles.health}>10 lives</strong> and <strong className={styles.money}>100 bills</strong>. For each survived world your bills are set to <strong className={styles.money}>100 bills</strong>, <strong className={styles.money}>200 bills</strong> or <strong className={styles.money}>300 bills</strong> according to current world. For each survived level to your starting bills will be added <strong className={styles.money}>20 bills</strong> extra for building or upgrading towers. If you survive world you get <strong className={styles.health}>3 lives</strong> extra! Your score is the sum of each orc you defeat plus <strong>100 points </strong> for <strong className={styles.health}>each life</strong> you have saved, which is added at the end of the game.</p>
            <h2 className={styles.rulesHeader}>Placing Towers</h2>
            <p className={styles.rulesParagraph}>
                <span>You can place the towers only on specific placement</span>
                <img src={substructure} alt="Substructure of tower" />
                <span>If the substructure is hovered over, it will be highlighted</span>
            </p>
            <h2 className={styles.rulesHeader}>Tactical Mode</h2>
            <p className={styles.rulesParagraph}>Click on <strong><i className="fa fa-pause-circle-o" aria-hidden="true"></i></strong> visible on bottom right corner while playing to activate tactical mode. When tactical mode is active, time freezes, but you can place towers in a more thoughtful way. </p>
            <h2 className={styles.goodLuck}>Have fun and good luck!</h2>
        </>
    );
}

export default Rules;