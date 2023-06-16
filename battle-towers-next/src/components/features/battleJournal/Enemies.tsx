import styles from '@/assets/scss/modules/BattleJournal.module.scss';

import soldierOrc from '@/assets/img/journal/enemies/soldierOrc.png';
import scoutOrc from '@/assets/img/journal/enemies/scoutOrc.png';
import warriorOrc from '@/assets/img/journal/enemies/warriorOrc.png';

import soldierData from '@/resources/enemies/soldier.json';
import scoutData from '@/resources/enemies/scout.json';
import warriorData from '@/resources/enemies/warrior.json';

import EnemyCard from './EnemyCard';

const Enemies = () => {

    return (
        <div className={`${styles.cards} ${styles.enemies}`}>
            <EnemyCard name={soldierData.name} img={soldierOrc} health={soldierData.health} money={soldierData.money} speed={soldierData.speed} score={soldierData.score} opponent='Cannon' />
            <EnemyCard name={scoutData.name} img={scoutOrc} health={scoutData.health} money={scoutData.money} speed={scoutData.speed} score={scoutData.score} opponent='Minigun' />
            <EnemyCard name={warriorData.name} img={warriorOrc} health={warriorData.health} money={warriorData.money} speed={warriorData.speed} score={warriorData.score} opponent='Missile' />
        </div>
    );
}

export default Enemies;