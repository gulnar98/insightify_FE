import React from 'react'
import Link from 'next/link'
import search from './asset/image/btnSearch.svg'
import styles from './asset/css/style.module.css'
import { useState, useEffect } from 'react'

function RecordingAside() {
  const [isClicked, setIsClicked] = useState(true);

  useEffect(() => {
    const handleDocumentClick = () => {
      setIsClicked(true);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setIsClicked(false);
  };

  return (
    <>
        <div className={styles.wrapper}>
          <div className={styles.firstRow}>
            <div className={styles.inputContainer}>
              {
                isClicked ?  
                (
                  <>
                    <p>User segments</p>
                    <button className={styles.btn} onClick={handleButtonClick}>
                      <img src={search.src} alt="Search" />
                    </button>
                  </>
                ) 
                :
                (
                  <input type='text' placeholder={"Search segments"} className={styles.searchinput}/>
                ) 
              }
            </div>
            <div className={styles.textContainer}>
              <Link legacyBehavior href="#"><a className={styles.text}>All users</a></Link>
              <Link legacyBehavior href="#"><a className={styles.text}> New users</a></Link>
              <Link legacyBehavior href="#"><a className={styles.text}>Mobile users</a></Link>
              <Link legacyBehavior href="#"><a className={styles.text}>Rage clicked</a></Link>
            </div>
          </div>
          <div className={styles.secondRow}>
            <Link legacyBehavior href="#"><a className={styles.text}>/mobile-app recordings</a></Link>
            <Link legacyBehavior href="#"><a className={styles.text}>All users copy</a></Link>
          </div>
        </div>
   </>
  )
}

export default RecordingAside