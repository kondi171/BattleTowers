import Image, { StaticImageData } from 'next/image';
import styles from '@/assets/scss/modules/BattleJournal.module.scss';

interface TowerCardProps {
  name: string
  img: StaticImageData,
  damage: number,
  money: number,
  speed: number,
  opponent: string,
}

const Card = ({ name, img, damage, money, speed, opponent }: TowerCardProps) => {
  return (
    <div className={styles.card}>
      <h3>{name} Tower</h3>
      <div className={styles.imgWrapper}>
        <Image src={img} alt={`${name} Tower`} />
      </div>
      <p className={styles.health}>Damage: {damage}</p>
      <p className={styles.money}>Money: {money}</p>
      <p className={styles.speed}>Speed: {speed} FPS </p>
      <p className={styles.opponent}>
        <span>Best target</span>
        <span>{opponent} Orc</span>
      </p>
    </div>
  );
}

export default Card;