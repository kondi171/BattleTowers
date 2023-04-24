import { useContext, useEffect, useState } from 'react';
import styles from './../../assets/scss/modules/GameState.module.scss';
import { LogType } from '../../enums';
import { AppContextType, AppContext } from '../AppContext';

const Logs = () => {

  const { logs } = useContext(AppContext) as AppContextType;

  return (
    <section className={styles.logs}>
      {logs.length === 0 && <span className={styles.empty}>Logs</span>}
      {[...logs].reverse().map((log, index) => {
        const { type, content, time } = log;
        return (
          <div className={styles.text} key={index}>
            {type === LogType.FAILURE ?
              <div className={styles.row}>
                <span className={styles.failure}>{content}</span>
                <span className={styles.time}>{time}</span>
              </div> :
              <div className={styles.row}>
                <span className={styles.success}>{content}</span>
                <span className={styles.time}>{time}</span>
              </div>
            }
          </div>)
      })}
    </section>
  );
}

export default Logs;