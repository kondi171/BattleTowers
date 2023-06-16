import styles from './../../../assets/scss/modules/Playground.module.scss';
import { ContextMenu, LogType, NewTower, CanvasBounding } from '../../../enums';
import { useContext, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { Position } from '../../../types';
import { AppContext, AppContextType } from '../../AppContext';

import cannon1Image from './../../../assets/img/towers/structures/cannon/cannon1.png'
import minigun1Image from './../../../assets/img/towers/structures/minigun/mg1.png'
import missile1Image from './../../../assets/img/towers/structures/missile/missile1.png'

import cannonData from '../../resources/towers/cannon.json';
import minigunData from '../../resources/towers/minigun.json';
import missileData from '../../resources/towers/missile.json';

import Tower from '../../classes/towers/Tower';
import Substructure from '../../classes/Substructure';
import Cannon from '../../classes/towers/Cannon';
import Minigun from '../../classes/towers/Minigun';
import Missile from '../../classes/towers/Missile';

import addToLogs from '../../scripts/addToLogs';
import Player from '../../classes/Player';

import towerPlace from './../../../assets/audio/effects/towerPlace.wav';

interface NewTowerMenuProps {
  contextMenuPosition: {
    x: number,
    y: number
  };
  setContextMenu: (ctxMenu: ContextMenu) => void;
  currentSubstructure: Substructure | null;
  setCurrentSubstructure: (substructure: null) => void;
  context2D: CanvasRenderingContext2D | null;
  towers: Tower[];
  player: Player;
}

const NewTowerMenu = ({ contextMenuPosition, setContextMenu, currentSubstructure, setCurrentSubstructure, context2D, towers, player }: NewTowerMenuProps) => {

  const [playTowerPlace] = useSound(towerPlace);
  const { logs, setMoney } = useContext(AppContext) as AppContextType;

  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isMoneyChanged, setIsMoneyChanged] = useState(false);
  const [towerValue, setTowerValue] = useState(0);

  const placeTower = (newTower: NewTower) => {
    let tower: Tower | null = null;
    if (currentSubstructure && context2D) {
      if (newTower === NewTower.CANNON) tower = new Cannon(context2D, { x: currentSubstructure.getPosition().x, y: currentSubstructure.getPosition().y });
      else if (newTower === NewTower.MINIGUN) tower = new Minigun(context2D, { x: currentSubstructure.getPosition().x, y: currentSubstructure.getPosition().y });
      else if (newTower === NewTower.MISSILE) tower = new Missile(context2D, { x: currentSubstructure.getPosition().x, y: currentSubstructure.getPosition().y });
      if (tower) {
        if (tower?.getMoney() <= player.getMoney()) {
          player.setMoney(player.getMoney() - tower!.getMoney());
          setMoney(player.getMoney());
          towers.push(tower!);
          setContextMenu(ContextMenu.NONE);
          playTowerPlace();
          addToLogs(logs, `${tower?.getName()} has been placed!`, LogType.SUCCESS);
          currentSubstructure.setOccupied(true);
          setCurrentSubstructure(null);
        } else {
          player.setMoney(player.getMoney() - tower!.getMoney());
          setIsMoneyChanged(true);
          setTowerValue(tower!.getMoney());
          setMoney(player.getMoney());
          addToLogs(logs, `Not Enough money`, LogType.FAILURE);
        }
      }
    }
  }
  useEffect(() => {
    if (isMoneyChanged) {
      player.setMoney(player.getMoney() + towerValue);
      setMoney(player.getMoney());
      setIsMoneyChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoneyChanged]);

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

  return (
    <div ref={menuRef} className={styles.newTowerMenu} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <h2>Buy a new Tower</h2>
      <div className={styles.newTower} onClick={() => placeTower(NewTower.CANNON)}>
        {player.getMoney() < cannonData.levels[0].money && <div className={styles.error}> Not enough money!</div>}
        <div className={styles.imageWrapper}>
          <p className={styles.name}>{cannonData.name}</p>
          <img src={cannon1Image} alt="Cannon level 1" />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: {cannonData.levels[0].damage}</p>
          <p className={styles.money}>Money: {cannonData.levels[0].money}</p>
          <p className={styles.speed}>Speed: {cannonData.levels[0].speed} FPS</p>
        </div>
      </div>
      <div className={styles.newTower} onClick={() => placeTower(NewTower.MINIGUN)}>
        {player.getMoney() < minigunData.levels[0].money && <div className={styles.error}> Not enough money!</div>}
        <div className={styles.imageWrapper}>
          <p className={styles.name}>{minigunData.name}</p>
          <img src={minigun1Image} alt="Minigun level 1" />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: {minigunData.levels[0].damage}</p>
          <p className={styles.money}>Money: {minigunData.levels[0].money}</p>
          <p className={styles.speed}>Speed: {minigunData.levels[0].speed} FPS</p>
        </div>
      </div>
      <div className={styles.newTower} onClick={() => placeTower(NewTower.MISSILE)}>
        {player.getMoney() < missileData.levels[0].money && <div className={styles.error}> Not enough money!</div>}
        <div className={styles.imageWrapper}>
          <p className={styles.name}>{missileData.name}</p>
          <img src={missile1Image} alt="Missile Launcher level 1" />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.health}>Damage: {missileData.levels[0].damage}</p>
          <p className={styles.money}>Money: {missileData.levels[0].money}</p>
          <p className={styles.speed}>Speed: {missileData.levels[0].speed} FPS</p>
        </div>
      </div>
    </div >
  );
}

export default NewTowerMenu;