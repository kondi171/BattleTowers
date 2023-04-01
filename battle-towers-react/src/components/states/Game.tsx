import styles from './../../assets/scss/modules/GameState.module.scss';
import logo from './../../assets/scss/modules/Logo.module.scss';
import SceneCanvas from '../scenes/SceneCanvas';
import shield from './../../assets/img/shield.png';

const GameState = () => {
  return (
    <main className={styles.gameState}>
      <section className={styles.playground}>
        <SceneCanvas />
      </section>
      <section className={styles.graphicalInterface}>
        <header className={`${logo.logo} ${logo.logoMinimized}`}>
          <div className={logo.imageWrapper}>
            <img src={shield} alt="Shield - element of Battle Towers logo" />
          </div>
          <h1>Battle Towers</h1>
        </header>
        <div className={styles.worldInfo}>
          <h2>World</h2>
          <h3>Desert</h3>
          <h2>Level</h2>
          <h3>1.3</h3>
        </div>
        <div className={styles.levelInfo}>
          <div className={styles.life}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <span>10</span>
          </div>
          <div className={styles.money}>
            <i className="fa fa-money" aria-hidden="true"></i>
            <span>100</span>
          </div>
          <div className={styles.score}>
            <h3>Score: <span>924</span></h3>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GameState;