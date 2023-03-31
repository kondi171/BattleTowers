import styles from './../../assets/scss/modules/GameState.module.scss';
import SceneCanvas from '../scenes/SceneCanvas';
const GameState = () => {
  return (
    <main className={styles.gameState}>
      <SceneCanvas />
      <section className={styles.graphicalInterface}></section>
    </main>

  );
}

export default GameState;