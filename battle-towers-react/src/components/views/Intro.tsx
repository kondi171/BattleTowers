import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './../../assets/scss/modules/IntroState.module.scss';

interface IntroProps {
  setChangeState: (accept: boolean) => void;
}

const Intro = ({ setChangeState }: IntroProps) => {

  const infoRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const attentionMessage = 'For best experience and properly game working, we recommend min resolution 1280 x 768.';
  const [currentAttentionMessage, setCurrentAttentionMessage] = useState<string>('');
  const [buttonInfo, setButtonInfo] = useState('Accept');
  const attentionMessageAnimation = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    delay: 1000,
  });

  const handleAccept = () => {
    const span = infoRef.current;
    const btn = btnRef.current;
    if (span && btn) {
      span.classList.add(styles.fadeOut);
      setTimeout(() => {
        setButtonInfo('Have a nice play :)');
        btn.classList.add(styles.fadeIn);
        span.classList.add(styles.fadeIn);
      }, 400);
    }
    setTimeout(() => {
      setChangeState(true);
    }, 2000);
  }

  useEffect(() => {
    let currentLetter = 0;
    let delay = 0;
    let animatedText = '';
    const letterInterval = setInterval(() => {
      delay++;
      if (delay >= 30) {
        animatedText += attentionMessage[currentLetter];
        currentLetter++;
        if (currentLetter >= attentionMessage.length) clearInterval(letterInterval);
        else setCurrentAttentionMessage(animatedText);
      }
    }, 50);
    setTimeout(() => {
      const btn = btnRef.current;
      if (btn) {
        btn?.classList.add(styles.visible);
      }
    }, 5000);
  }, []);

  return (
    <section className={styles.introState}>
      <animated.h2 className={styles.attention} style={attentionMessageAnimation}><span>Attention!</span> {currentAttentionMessage}<span>|</span></animated.h2>
      <button ref={btnRef} className={styles.introButton} onClick={handleAccept}>
        <span className={styles.btnInfo} ref={infoRef}>{buttonInfo}</span>
      </button>
    </section>
  );
}

export default Intro;