import styles from './../../assets/scss/modules/Button.module.scss';

type ButtonProps = {
  name: string,
  click: () => void
}

const Button = ({ name, click }: ButtonProps) => {
  return (
    <div className={styles.btnWrapper}>
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
