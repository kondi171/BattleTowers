import styles from './../../../assets/scss/modules/SceneCanvas.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Position, TowerStats } from '../../../types';
import Tower from '../../classes/towers/Tower';
import PlacementTile from '../../classes/PlacementTile';

interface UpgradeTowerMenuProps {
  contextMenuPosition: {
    x: number,
    y: number
  };
  activeTile: PlacementTile | null;
  towers: Tower[];
  currentTower: Tower | null;
}

const UpgradeTowerMenu = ({ contextMenuPosition, activeTile, towers, currentTower }: UpgradeTowerMenuProps) => {
  const canvasWidth = 1280;
  const canvasHeight = 768;
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [presentTower, setPresentTower] = useState<TowerStats | null>(null);
  const [nextTower, setNextTower] = useState<TowerStats | null>(null);

  const upgradeTower = () => {
    const clickedTower = towers.filter((tower) => tower.getPosition().x === activeTile?.getPosition().x && tower.getPosition().y === activeTile?.getPosition().y);
    clickedTower[0].upgradeTower();
  }

  useEffect(() => {
    const presentTower = {
      name: currentTower?.getName(),
      level: currentTower?.getCurrentLevelInfo().level,
      damage: currentTower?.getCurrentLevelInfo().damage,
      money: currentTower?.getCurrentLevelInfo().money,
      speed: currentTower?.getCurrentLevelInfo().speed,
      image: currentTower?.getCurrentLevelInfo().image
    }
    const nextTower = {
      name: currentTower?.getName(),
      level: currentTower?.getNextLevelInfo().level,
      damage: currentTower?.getNextLevelInfo().damage,
      money: currentTower?.getNextLevelInfo().money,
      speed: currentTower?.getNextLevelInfo().speed,
      image: currentTower?.getNextLevelInfo().image
    }
    setPresentTower(presentTower);
    setNextTower(nextTower);
  }, [currentTower]);

  useEffect(() => {
    const menuBounding = {
      width: menuRef.current!.clientWidth,
      height: menuRef.current!.clientHeight
    };

    const totalWidth = menuBounding.width + contextMenuPosition.x;
    const totalHeight = menuBounding.height + contextMenuPosition.y;

    let newPosition = { x: contextMenuPosition.x, y: contextMenuPosition.y };

    if (totalWidth > canvasWidth) {
      newPosition.x = contextMenuPosition.x - (totalWidth - canvasWidth);
    }

    if (totalHeight > canvasHeight) {
      newPosition.y = contextMenuPosition.y - (totalHeight - canvasHeight) - 50;
    }

    setPosition(newPosition);
  }, [contextMenuPosition]);

  return (
    <div ref={menuRef} className={styles.upgradeTowerMenu} style={{ left: `${position.x.toFixed()}px`, top: `${position.y.toFixed()}px` }}>
      <h2>Upgrade the {presentTower?.name}</h2>
      <div className={styles.upgradeTower}>
        <div className={styles.imageWrapper}>
          <p className={styles.name}>Level {presentTower?.level}</p>
          <img src={presentTower?.image} alt={`${presentTower?.name} Level ${presentTower?.level}`} />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: {presentTower?.damage}</p>
          <p className={styles.money}>Money: {presentTower?.money}</p>
          <p className={styles.speed}>Speed: {presentTower?.speed} FPS</p>
        </div>
      </div>
      <i className="fa fa-angle-double-down" aria-hidden="true"></i>
      <div className={styles.upgradeTower}>
        <div className={styles.imageWrapper}>
          <p className={styles.name}>Level {nextTower?.level}</p>
          <img src={nextTower?.image} alt={`${nextTower?.name} Level ${nextTower?.level}`} />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: {nextTower?.damage}</p>
          <p className={styles.money}>Money: {nextTower?.money}</p>
          <p className={styles.speed}>Speed: {nextTower?.speed} FPS</p>
        </div>
      </div>
      <button onClick={upgradeTower}>Upgrade</button>
    </div>
  );
}

export default UpgradeTowerMenu;