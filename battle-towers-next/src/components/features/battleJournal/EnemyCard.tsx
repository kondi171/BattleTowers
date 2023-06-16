import Image, { StaticImageData } from 'next/image';
import styles from '@/assets/scss/modules/BattleJournal.module.scss';

interface EnemyCardProps {
  name: string
  img: StaticImageData,
  health: number,
  money: number,
  speed: number,
  score: number,
  opponent: string,
}

const EnemyCard = ({ name, img, health, money, speed, score, opponent }: EnemyCardProps) => {
  return (
    <div className={styles.card}>
      <h3>{name} Orc</h3>
      <div className={styles.imgWrapper}>
        <Image src={img} alt={`${name} Orc`} />
      </div>
      <p className={styles.health}>Health: {health}</p>
      <p className={styles.money}>Money: {money}</p>
      <p className={styles.speed}>Speed: {speed} FPS</p>
      <p className={styles.score}>Score: {score}</p>
      <p className={styles.opponent}>
        <span>Best tower</span>
        <span>{opponent}</span>
      </p>
    </div>
  );
}

export default EnemyCard;