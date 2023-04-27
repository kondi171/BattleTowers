import { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './../../assets/scss/modules/MenuState.module.scss';
import Button from '../features/Button';
import { AppContext } from '../AppContext';
import { AppContextType } from '../AppContext';
import react from './../../assets/img/react.png';
import BattleJournal from '../features/battleJournal/BattleJournal';
type resolution = {
  width: number,
  height: number
};

// battle journal span appear when hover na journal fix: battle journal span appear only if icon is hovered
// add transition to modal and modal overlay when they appear and disappear

const Menu = () => {
  const [resolution, setResolution] = useState<resolution>({ width: 0, height: 0 })
  const [resolutionIsOk, setResolutionIsOk] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const { isGameStart, setIsGameStart } = useContext(AppContext) as AppContextType;

  const stateAppearAnimation = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
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

  const handleStartGame = () => setIsGameStart(!isGameStart);
  const handleHelpOpen = () => setIsHelpOpen(!isHelpOpen);

  useEffect(() => {
    checkResolution();
    window.addEventListener('resize', checkResolution);
  }, []);

  return (
    <animated.div style={stateAppearAnimation}>
      <Button name="Play" click={handleStartGame} />
      <animated.div className={styles.menuState} style={stateAppearAnimation}>
        <div className={styles.powered}>
          <span>Powered by React</span>
          <img src={react} alt='React logo' />
        </div>
        <div onClick={handleHelpOpen} className={styles.journal}>
          <span>Battle Journal</span>
          <i className="fa fa-book" aria-hidden="true"></i>
        </div>
        <div className={resolutionIsOk ? `${styles.resolutionSuccess}` : `${styles.resolutionError}`}>Your resolution: {resolution.width} x {resolution.height}
          {resolutionIsOk ?
            <i className="fa fa-check-circle-o" aria-hidden="true"></i> :
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          }
        </div>
        <div className={styles.score}>Best score: {localStorage.getItem('score') === '0' ? 0 : localStorage.getItem('score')}</div>
      </animated.div>
      {isHelpOpen && <BattleJournal isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />}
    </animated.div>
  );
}

export default Menu;