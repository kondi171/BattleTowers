import useSound from 'use-sound';
import styles from './../../assets/scss/modules/Button.module.scss';
import confirmMenu from './../../assets/audio/effects/confirmMenu.wav';
import hoverMenu from './../../assets/audio/effects/towerPlace.wav';
import { useEffect, useRef } from 'react';

interface ButtonProps {
  name: string,
  click: () => void
}

const Button = ({ name, click }: ButtonProps) => {
  const [playConfirm] = useSound(confirmMenu);
  const [playHover, { stop }] = useSound(hoverMenu);

  return (
    <div onClick={() => playConfirm()} onMouseEnter={() => playHover()} onMouseLeave={() => stop()} className={styles.btnWrapper}>
      <button className={styles.button} onClick={click}>
        {name}
        <div id={styles.clip}>
          <div id={styles.leftTop} className={styles.corner}></div>
          <div id={styles.rightBottom} className={styles.corner}></div>
          <div id={styles.rightTop} className={styles.corner}></div>
          <div id={styles.leftBottom} className={styles.corner}></div>
        </div>
        <span id={styles.rightArrow} className={styles.arrow}></span>
        <span id={styles.leftArrow} className={styles.arrow}></span>
      </button>

    </div>
  );
}

export default Button;
