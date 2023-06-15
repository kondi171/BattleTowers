import styles from './../../../assets/scss/modules/Playground.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { Mouse, Position, TowerStats } from '../../../../types';
import Tower from '../../../classes/towers/Tower';
import Substructure from '../../../classes/Substructure';
import Player from '../../../classes/Player';
import { AppContext, AppContextType } from '../../AppContext';
import { CanvasBounding, ContextMenu, LogType } from '../../../../enums';
import addToLogs from '../../../scripts/addToLogs';
// @ts-ignore
import towerPlace from './../../../assets/audio/effects/towerPlace.wav';

interface UpgradeTowerMenuProps {
  contextMenuPosition: Mouse;
  setContextMenu: (ctxMenu: ContextMenu) => void;
  currentSubstructure: Substructure | null;
  towers: Tower[];
  currentTower: Tower | null;
  player: Player;
  refreshAssets: () => void;
}

const UpgradeTowerMenu = ({ contextMenuPosition, setContextMenu, currentSubstructure, towers, currentTower, player, refreshAssets }: UpgradeTowerMenuProps) => {

  const [playTowerPlace] = useSound(towerPlace);

  const { logs, setMoney } = useContext(AppContext) as AppContextType;

  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [presentTower, setPresentTower] = useState<TowerStats | null>(null);
  const [nextTower, setNextTower] = useState<TowerStats | null>(null);
  const [isMoneyChanged, setIsMoneyChanged] = useState(false);
  const [towerValue, setTowerValue] = useState(0);

  const upgradeTower = () => {
    const clickedTower = towers.filter(tower => tower.getPosition().x === currentSubstructure?.getPosition().x && tower.getPosition().y === currentSubstructure?.getPosition().y);
    const activeTower = clickedTower[0];
    if (typeof nextTower?.money !== 'undefined') {
      setTowerValue(nextTower?.money);
      if (player.getMoney() < nextTower?.money) {
        player.setMoney(player.getMoney() - nextTower?.money);
        setMoney(player.getMoney());
        setIsMoneyChanged(true);
        addToLogs(logs, 'Not enough money!', LogType.FAILURE);
      }
      else {
        activeTower.upgradeTower();
        playTowerPlace();
        player.setMoney(player.getMoney() - nextTower?.money);
        setMoney(player.getMoney());
        addToLogs(logs, `${activeTower.getName()} Tower has been upgraded to level ${activeTower.getCurrentLevelInfo().level}`, LogType.SUCCESS);
        setContextMenu(ContextMenu.NONE);
        refreshAssets();
      }
    }
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
    if (totalWidth > CanvasBounding.WIDTH) {
      newPosition.x = contextMenuPosition.x - (totalWidth - CanvasBounding.WIDTH);
    }
    if (totalHeight > CanvasBounding.HEIGHT) {
      newPosition.y = contextMenuPosition.y - (totalHeight - CanvasBounding.HEIGHT) - 50;
    }
    setPosition(newPosition);
  }, [contextMenuPosition]);

  useEffect(() => {
    if (isMoneyChanged) {
      player.setMoney(player.getMoney() + towerValue);
      setMoney(player.getMoney());
      setIsMoneyChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoneyChanged]);

  return (
    <>
      {presentTower?.level !== 3 ?
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
          {nextTower && <>{player.getMoney() >= nextTower.money! ? <button onClick={upgradeTower}>Upgrade</button> :
            <button className={styles.error} onClick={upgradeTower}>Not enough money!</button>}</>
          }
        </div> :
        <div ref={menuRef} className={styles.maxLevel} style={{ left: `${position.x.toFixed()}px`, top: `${position.y.toFixed()}px` }}>
          <h2>{presentTower?.name} Tower Level {presentTower?.level}</h2>
          <img src={presentTower?.image} alt={`${presentTower?.name} Level ${presentTower?.level}`} />
          <h2>Level of this {presentTower?.name} is maxed out!</h2>
        </div>
      }
    </>
  );
}

export default UpgradeTowerMenu;