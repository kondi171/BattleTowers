import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import shield from './../assets/img/shield.png';
import Intro from './states/Intro';
import Menu from './states/Menu';

const BattleTowers = () => {
  const [changeState, setChangeState] = useState<boolean>(false);
  const stateAnimation = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setChangeState(true);
    }, 8000);
  }, []);

  return (
    <animated.div className="wrapper" style={stateAnimation}>
      <header className='logo'>
        <div className="image-wrapper">
          <img src={shield} alt="Shield - element of Battle Towers logo" />
        </div>
        <h1>Battle Towers</h1>
      </header>
      {!changeState ? <Intro /> : <Menu />}
    </animated.div>
  );
}

export default BattleTowers;


