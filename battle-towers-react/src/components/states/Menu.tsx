import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './../../assets/scss/modules/MenuState.module.scss';
import Button from '../features/Button';

type resolution = {
  width: number,
  height: number
};

const Menu = () => {
  const [resolution, setResolution] = useState<resolution>({ width: 0, height: 0 })
  const [resolutionIsOk, setResolutionIsOk] = useState<boolean>(false);
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
    if (width < 1280 || height < 720) setResolutionIsOk(false);
    else setResolutionIsOk(true);
  }
  const handleStartGame = () => {
    console.log('elo');
  }

  useEffect(() => {
    checkResolution();
    window.addEventListener('resize', checkResolution);
  }, []);

  return (
    <animated.div style={stateAppearAnimation}>
      <Button name="Play" click={handleStartGame} />
      <animated.div className={styles.menuState} style={stateAppearAnimation}>
        <div className={resolutionIsOk ? `${styles.resolutionSuccess}` : `${styles.resolutionError}`}>Your resolution: {resolution.width} x {resolution.height}
          {resolutionIsOk ?
            <i className="fa fa-check-circle-o" aria-hidden="true"></i> :
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          }
        </div>
        <div className={styles.score}>Best score: 924</div>
      </animated.div>
    </animated.div>
  );
}

export default Menu;