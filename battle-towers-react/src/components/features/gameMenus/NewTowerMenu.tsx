import styles from './../../../assets/scss/modules/SceneCanvas.module.scss';
import { NewTower } from '../../../enums';
import { useEffect, useState } from 'react';
import cannon1Image from './../../../assets/img/towers/structures/cannon/Cannon1.png'
import cannon2Image from './../../../assets/img/towers/structures/cannon/Cannon2.png'
import cannon3Image from './../assets/img/towers/structures/cannon/Cannon3.png'

import minigun1Image from './../../../assets/img/towers/structures/minigun/MG1.png'
import minigun2Image from './../../../assets/img/towers/structures/minigun/MG2.png'
import minigun3Image from './../../../assets/img/towers/structures/minigun/MG3.png'

import missile1Image from './../../../assets/img/towers/structures/missile/Missile_Launcher1.png'
import missile2Image from './../../../assets/img/towers/structures/missile/Missile_Launcher2.png'
import missile3Image from './../../../assets/img/towers/structures/missile/Missile_Launcher3.png'
import { Position } from '../../../types';

interface NewTowerMenuProps {
  contextMenuPosition: {
    x: number,
    y: number
  }
  setNewTower: (tower: NewTower) => void
}

const NewTowerMenu = ({ contextMenuPosition, setNewTower }: NewTowerMenuProps) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const canvasHeight = 768;

  useEffect(() => {
    if (contextMenuPosition.y > canvasHeight / 2) setPosition({
      x: Number(contextMenuPosition.x.toFixed()),
      y: Number(contextMenuPosition.y.toFixed()) - canvasHeight / 2
    });
    else setPosition({
      x: Number(contextMenuPosition.x.toFixed()),
      y: Number(contextMenuPosition.y.toFixed())
    });
  }, [contextMenuPosition]);

  return (
    <div className={styles.newTowerMenu} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <h2>Buy a new Tower</h2>
      <div className={styles.newTower} onClick={() => setNewTower(NewTower.CANNON)}>
        <div className={styles.imageWrapper}>
          <p className={styles.name}>Cannon</p>
          <img src={cannon1Image} alt="Cannon level 1" />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: 20</p>
          <p className={styles.money}>Money: 20</p>
          <p className={styles.speed}>Speed: 2 FPS</p>
        </div>
      </div>
      <div className={styles.newTower} onClick={() => setNewTower(NewTower.MINIGUN)}>
        <div className={styles.imageWrapper}>
          <p className={styles.name}>Minigun</p>
          <img src={minigun1Image} alt="Minigun level 1" />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: 20</p>
          <p className={styles.money}>Money: 20</p>
          <p className={styles.speed}>Speed: 2 FPS</p>
        </div>
      </div>
      <div className={styles.newTower} onClick={() => setNewTower(NewTower.MISSILE)}>
        <div className={styles.imageWrapper}>
          <p className={styles.name}>Missile Launcher</p>
          <img src={missile1Image} alt="Missile Launcher level 1" />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: 20</p>
          <p className={styles.money}>Money: 20</p>
          <p className={styles.speed}>Speed: 2 FPS</p>
        </div>
      </div>
    </div >
  );
}

export default NewTowerMenu;