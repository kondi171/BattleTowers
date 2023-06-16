import { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from '@/assets/scss/modules/MenuState.module.scss';
import { AppContext } from '../AppContext';
import { AppContextType } from '../AppContext';
import next from '@/assets/img/next.png';

import useSound from 'use-sound';
// @ts-ignore
import hoverElement from '@/assets/audio/effects/towerPlace.wav';
// @ts-ignore
import confirmElement from '@/assets/audio/effects/confirmMenu.wav';
import { Resolution } from '@/typescript/types';
import Image from 'next/image';
import Button from '@/components/features/Button';
import BattleJournal from '@/components/features/battleJournal/BattleJournal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {

  const { isGameStart, setIsGameStart, playMenu, stopMenu } = useContext(AppContext) as AppContextType;

  const [playConfirm] = useSound(confirmElement)
  const [playHover] = useSound(hoverElement);

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
    stopMenu();
    setIsGameStart(!isGameStart);
  }

  const handleHelpOpen = () => {
    playConfirm();
    setIsHelpOpen(!isHelpOpen);
    setInit(true);
  }

  useEffect(() => {
    checkResolution();
    playMenu();
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
      <animated.div className={styles.menuState} style={stateAppearAnimation}>
        <div className={styles.powered}>
          <span>Powered by Next</span>
          <Image src={next} alt='Next logo' />
        </div>
        <div className={styles.journal}>
          <div onClick={handleHelpOpen} onMouseEnter={() => playHover()} className={styles.icon}>
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
      </animated.div>
      {init && <BattleJournal isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />}
    </animated.div>
  );
}

export default Menu;