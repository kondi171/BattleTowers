import { GamePart } from '../../../enums';
import styles from './../../assets/scss/modules/Playground.module.scss';

interface TransitionInfoProps {
  info: string;
  time: number;
  start: boolean;
  setStart: (start: boolean) => void;
}

const TransitionInfo = ({ info, time, start, setStart }: TransitionInfoProps) => {

  return (
    <div className={styles.transitionInfo}>
      {info === GamePart.START || info === GamePart.WORLD ?
        <h3 onClick={() => setStart(!start)}>Ready? <br />Click to Start!</h3> :
        <h3>Next {info} in {time}...</h3>
      }
    </div>
  );
}

export default TransitionInfo;