import { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './../../assets/scss/modules/MenuState.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../AppContext';
import next from './../../assets/img/next.svg';

import useSound from 'use-sound';
// import hoverElement from './../../assets/audio/effects/towerPlace.wav';
// import confirmElement from './../../assets/audio/effects/confirmMenu.wav';
import { Resolution } from '../../../types';
import Image from 'next/image';
import Button from '../features/Button';
import BattleJournal from '../features/battleJournal/BattleJournal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {

  // const { playMenu, stopMenu } = useContext(AppContext) as AppContextType;
  const { isGameStart, setIsGameStart } = useContext(AppContext) as AppContextType;

  // const [playConfirm] = useSound(confirmElement)
  // const [playHover] = useSound(hoverElement);

  const [resolution, setResolution] = useState<Resolution>({ width: 0, height: 0 })
  const [resolutionIsOk, setResolutionIsOk] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [init, setInit] = useState(false);

  const stateAppearAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    }
  });

  const checkResolution = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setResolution({
      width: width,
      height: height
    });
    if (width < 1280 || height < 768) setResolutionIsOk(false);
    else setResolutionIsOk(true);
  }

  const handleStartGame = () => {
    // stopMenu();
    setIsGameStart(!isGameStart);
  }

  const handleHelpOpen = () => {
    // playConfirm();
    setIsHelpOpen(!isHelpOpen);
    setInit(true);
  }

  useEffect(() => {
    checkResolution();
    // playMenu();
    window.addEventListener('resize', checkResolution);
    return () => {
      window.removeEventListener('resize', checkResolution);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <animated.div style={stateAppearAnimation}>
      <div className={styles.btn}>
        <Button name="Play" click={handleStartGame} />
      </div>
      {/* <animated.div className={styles.menuState} style={stateAppearAnimation}> */}
      <div className={styles.menuState}>
        <div className={styles.powered}>
          <span>Powered by Next</span>
          <Image src={next} alt='Next logo' />
        </div>
        <div className={styles.journal}>
          {/* <i onClick={handleHelpOpen} onMouseEnter={() => playHover()} className="fa fa-book" aria-hidden="true"></i> */}
          <div onClick={handleHelpOpen} className={styles.icon}>
            <FontAwesomeIcon
              icon={faBook}
              aria-hidden={true}
            />
          </div>
          <span>Battle Journal</span>
        </div>
        <div className={resolutionIsOk ? `${styles.resolutionSuccess}` : `${styles.resolutionError}`}>Your resolution: {resolution.width} x {resolution.height}
          <div className={styles.icons}>
            {resolutionIsOk ?
              <FontAwesomeIcon
                icon={faCheckCircle}
                aria-hidden={true}
              />
              :
              <FontAwesomeIcon
                icon={faTimesCircle}
                aria-hidden={true}
              />
            }
          </div>
        </div>
        <div className={styles.score}>Best score: {localStorage.getItem('score') === '0' ? 0 : localStorage.getItem('score')}</div>
      </div>
      {init && <BattleJournal isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />}
    </animated.div>
  );
}

export default Menu;