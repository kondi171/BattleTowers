import styles from './../../../assets/scss/modules/BattleJournal.module.scss';
import soldierOrc from './../../../assets/img/journal/enemies/soldierOrc.png';
import scoutOrc from './../../../assets/img/journal/enemies/scoutOrc.png';
import warriorOrc from './../../../assets/img/journal/enemies/warriorOrc.png';
import EnemyCard from './EnemyCard';

const Enemies = () => {

    return (
        <div className={`${styles.cards} ${styles.enemies}`}>
            <EnemyCard name={'Soldier'} img={soldierOrc} health={100} money={20} speed={4} score={8} opponent='Cannon' />
            <EnemyCard name={'Scout'} img={scoutOrc} health={50} money={40} speed={6} score={12} opponent='Minigun' />
            <EnemyCard name={'Warrior'} img={warriorOrc} health={200} money={60} speed={2} score={16} opponent='Missile' />
        </div>
    );
}

export default Enemies;