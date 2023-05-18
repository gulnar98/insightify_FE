
import React from 'react'
import Link from 'next/link'
import Button from '../../UI/button/Button'
import Input from '../../UI/input'
import search from './asset/image/btnSearch.svg'
import styles from './asset/css/style.module.css'

function RecordingAside() {
  return (
   <>
   <div className={styles.wrapper}>
    <div className={styles.firstRow}>
    <div className={styles.inputContainer}>
    <Input border="none" fontSize="12px" placeholder="User segments" textColor="#707070"/>
    <Button
    border="none"
    btncolor="#ffff">
    <img className={styles.imgIcon} src={search.src} alt="search" />
    </Button>
    </div>
    <div className={styles.textContainer}>
    <Link legacyBehavior href="#"><a  className={styles.text} >All users</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text}> New users</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text}>Mobile users</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text}>Rage clicked</a></Link>
    </div>
    </div>
    <div className={styles.secondRow}>
    <Link legacyBehavior href="#"><a  className={styles.text}>/mobile-app recordings</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text}>All users copy</a></Link>
     </div>
   </div>
   
   
   
   </>
  )
}

export default RecordingAside