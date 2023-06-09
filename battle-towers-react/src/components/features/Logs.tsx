import { useContext } from 'react';
import styles from './../../assets/scss/modules/GameState.module.scss';
import { LogType } from './../../typescript/enums';
import { AppContextType, AppContext } from '../AppContext';

const Logs = () => {
  const { logs } = useContext(AppContext) as AppContextType;

  return (
    <section className={styles.logs}>
      {[...logs].reverse().map((log, index) => {
        const { type, content, time } = log;
        return (
          <div className={styles.text} key={index}>
            <div className={styles.row}>
              {type === LogType.SUCCESS ?
                <span className={styles.success}>{content}</span> :
                <span className={styles.failure}>{content}</span>
              }
              <span className={styles.time}>{time}</span>
            </div>
          </div>)
      })}
    </section>
  );
}

export default Logs;