import cannonTower1 from './../../../assets/img/journal/towers/Cannon.png'
import cannonTower2 from './../../../assets/img/journal/towers/Cannon2.png'
import cannonTower3 from './../../../assets/img/journal/towers/Cannon3.png'

import minigunTower1 from './../../../assets/img/journal/towers/MG.png'
import minigunTower2 from './../../../assets/img/journal/towers/MG2.png'
import minigunTower3 from './../../../assets/img/journal/towers/MG3.png'

import missileTower1 from './../../../assets/img/journal/towers/Missile_Launcher.png'
import missileTower2 from './../../../assets/img/journal/towers/Missile_Launcher2.png'
import missileTower3 from './../../../assets/img/journal/towers/Missile_Launcher3.png'

import styles from './../../../assets/scss/modules/BattleJournal.module.scss';
import TowerCard from './TowerCard'

const Towers = () => {
  return (
    <>
      <h2>Level 1</h2>
      <div className={styles.cards}>
        <TowerCard name={'Cannon'} img={cannonTower1} damage={20} money={20} speed={2} opponent={'Soldier'} />
        <TowerCard name={'Minigun'} img={minigunTower1} damage={10} money={40} speed={3} opponent={'Scout'} />
        <TowerCard name={'Missile'} img={missileTower1} damage={40} money={60} speed={1} opponent={'Warrior'} />
      </div >
      <h2>Level 2</h2>
      <div className={styles.cards}>
        <TowerCard name={'Cannon'} img={cannonTower2} damage={20} money={20} speed={2} opponent={'Soldier'} />
        <TowerCard name={'Minigun'} img={minigunTower2} damage={10} money={40} speed={3} opponent={'Scout'} />
        <TowerCard name={'Missile'} img={missileTower2} damage={40} money={60} speed={1} opponent={'Warrior'} />
      </div>
      <h2>Level 3</h2>
      <div className={styles.cards}>
        <TowerCard name={'Cannon'} img={cannonTower3} damage={20} money={20} speed={2} opponent={'Soldier'} />
        <TowerCard name={'Minigun'} img={minigunTower3} damage={10} money={40} speed={3} opponent={'Scout'} />
        <TowerCard name={'Missile'} img={missileTower3} damage={40} money={60} speed={1} opponent={'Warrior'} />
      </div>

    </>
  );
}

export default Towers;