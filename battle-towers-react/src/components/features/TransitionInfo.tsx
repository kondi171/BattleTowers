import styles from './../../assets/scss/modules/SceneCanvas.module.scss';

type TransitionInfoProps = {
  info: string,
  time: number
}

const TransitionInfo = ({ info, time }: TransitionInfoProps) => {
  return (
    <div className={styles.transitionInfo}>
      <h3>Next {info} in {time}...</h3>
    </div>
  );
}

export default TransitionInfo;