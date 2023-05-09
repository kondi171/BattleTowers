import { useEffect, useState, useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import shield from './../assets/img/shield.png';
import { AppContext, AppContextType } from './AppContext';
import Intro from './views/Intro';
import Menu from './views/Menu';
import Game from './views/Game';
import styles from './../assets/scss/modules/Logo.module.scss';
import End from './views/End';
import { GameResult } from '../enums';
import useSound from 'use-sound';


const BattleTowers = () => {
  const [changeState, setChangeState] = useState<boolean>(false);
  const { isGameStart, endGame, playMenu } = useContext(AppContext) as AppContextType;

  const stateAnimation = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });

  useEffect(() => {
    playMenu();
  }, []);

  return (
    <animated.div className="wrapper" style={stateAnimation}>
      <div className="game">
        {!isGameStart ?
          <>
            <header className={styles.logo}>
              <div className={styles.imageWrapper}>
                <img src={shield} alt="Shield - element of Battle Towers logo" />
              </div>
              <h1>Battle Towers</h1>
            </header>
            {!changeState ? <Intro setChangeState={setChangeState} /> : <Menu />}
          </> :
          <>{endGame === GameResult.UNPLAYED && <Game />}</>
        }
        {/* <Game /> */}
        {endGame !== GameResult.UNPLAYED && <End gameResult={endGame} />}
      </div>

    </animated.div>
  );
}

export default BattleTowers;


