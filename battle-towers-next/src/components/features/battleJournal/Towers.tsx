import cannonTower1 from './../../../assets/img/journal/towers/Cannon.png';
import minigunTower1 from './../../../assets/img/journal/towers/MG.png';
import missileTower1 from './../../../assets/img/journal/towers/Missile_Launcher.png';

import cannonTower2 from './../../../assets/img/journal/towers/Cannon2.png';
import minigunTower2 from './../../../assets/img/journal/towers/MG2.png';
import missileTower2 from './../../../assets/img/journal/towers/Missile_Launcher2.png';

import cannonTower3 from './../../../assets/img/journal/towers/Cannon3.png';
import minigunTower3 from './../../../assets/img/journal/towers/MG3.png';
import missileTower3 from './../../../assets/img/journal/towers/Missile_Launcher3.png';

import cannonData from './../../../resources/towers/cannon.json';
import minigunData from './../../../resources/towers/minigun.json';
import missileData from './../../../resources/towers/missile.json';

import styles from './../../../assets/scss/modules/BattleJournal.module.scss';
import TowerCard from './TowerCard';

const Towers = () => {
  return (
    <>
      <h2>Level 1</h2>
      <div className={styles.cards}>
        <TowerCard name={'Cannon'} img={cannonTower1} damage={cannonData.levels[0].damage} money={cannonData.levels[0].money} speed={cannonData.levels[0].speed} opponent={'Soldier'} />
        <TowerCard name={'Minigun'} img={minigunTower1} damage={minigunData.levels[0].damage} money={minigunData.levels[0].money} speed={minigunData.levels[0].speed} opponent={'Scout'} />
        <TowerCard name={'Missile'} img={missileTower1} damage={missileData.levels[0].damage} money={missileData.levels[0].money} speed={missileData.levels[0].speed} opponent={'Warrior'} />
      </div >
      <h2>Level 2</h2>
      <div className={styles.cards}>
        <TowerCard name={'Cannon'} img={cannonTower2} damage={cannonData.levels[1].damage} money={cannonData.levels[1].money} speed={cannonData.levels[1].speed} opponent={'Soldier'} />
        <TowerCard name={'Minigun'} img={minigunTower2} damage={minigunData.levels[1].damage} money={minigunData.levels[1].money} speed={minigunData.levels[1].speed} opponent={'Scout'} />
        <TowerCard name={'Missile'} img={missileTower2} damage={missileData.levels[1].damage} money={missileData.levels[1].money} speed={missileData.levels[1].speed} opponent={'Warrior'} />
      </div >
      <h2>Level 3</h2>
      <div className={styles.cards}>
        <TowerCard name={'Cannon'} img={cannonTower3} damage={cannonData.levels[2].damage} money={cannonData.levels[2].money} speed={cannonData.levels[2].speed} opponent={'Soldier'} />
        <TowerCard name={'Minigun'} img={minigunTower3} damage={minigunData.levels[2].damage} money={minigunData.levels[2].money} speed={minigunData.levels[2].speed} opponent={'Scout'} />
        <TowerCard name={'Missile'} img={missileTower3} damage={missileData.levels[2].damage} money={missileData.levels[2].money} speed={missileData.levels[2].speed} opponent={'Warrior'} />
      </div >
    </>
  );
}

export default Towers;