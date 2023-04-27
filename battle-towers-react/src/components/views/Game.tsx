import styles from './../../assets/scss/modules/GameState.module.scss';
import logo from './../../assets/scss/modules/Logo.module.scss';
import SceneCanvas from '../SceneCanvas';
import shield from './../../assets/img/shield.png';
import { useEffect, useState, useContext } from 'react';
import Loading from './Loading';
import { animated, useSpring } from 'react-spring';
import { AppContext, AppContextType } from '../AppContext';
import Scroll from './Scroll';
import Logs from '../features/Logs';

const GameState = () => {

  const { wave, level, world, life, money, score } = useContext(AppContext) as AppContextType;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const stateAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 400 },
    // delay: 4000
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsScroll(true);
    }, 2000);
    setTimeout(() => {
      setIsScroll(false);
    }, 4000);
  }, []);

  return (
    <>
      {/* {isLoading ? <Loading /> : <> {isScroll ? <Scroll /> : */}
      <animated.main className={styles.gameState} style={stateAnimation}>
        <section className={styles.playground}>
          <SceneCanvas />
        </section>
        <section className={styles.graphicalInterface}>
          <header className={`${logo.logo} ${logo.logoMinimized}`}>
            <div className={logo.imageWrapper}>
              <img src={shield} alt="Shield - element of Battle Towers logo" />
            </div>
            <h1>Battle Towers</h1>
          </header>
          <div className={styles.worldInfo}>
            <h2>World</h2>
            <h3>{world}</h3>
            <h2>Level</h2>
            <h3>{level}</h3>
            <h2>Wave</h2>
            <h3>{wave}</h3>
          </div>
          <div className={styles.levelInfo}>
            <div className={styles.life}>
              <i className="fa fa-heart" aria-hidden="true"></i>
              <span>{life}</span>
            </div>
            <div className={styles.money}>
              <i className="fa fa-money" aria-hidden="true"></i>
              <span>{money}</span>
            </div>
            <div className={styles.score}>
              <h3>Score: <span>{score}</span></h3>
            </div>
            <Logs />
          </div>
        </section>
      </animated.main>
      {/* }
      </>
      } */}
    </>
  );
}

export default GameState;