import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './../../assets/scss/modules/IntroState.module.scss';

const Intro = () => {
  const attentionMessage = 'For best experience and properly game working, we recommend min resolution 1280 x 768.';
  const [currentAttentionMessage, setCurrentAttentionMessage] = useState<string>('');
  const attentionMessageAnimation = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    delay: 1000,
  });

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
  }, []);

  return (
    <animated.h2 className={styles.introState} style={attentionMessageAnimation}><span>Attention!</span> {currentAttentionMessage}<span>|</span></animated.h2>
  );
}

export default Intro;