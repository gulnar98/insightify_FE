import React from 'react'
import Button from '../../UI/button/Button'
import Input from '../../UI/input'
import search from './asset/image/searchBtn.svg'
import styles from './asset/css/style.module.css'
import plus from './asset/image/plus.svg'
import Link from 'next/link'


function HeatMapAside() {
  return (
    <>
    <div className={styles.container}>
    <div className={styles.head}>
    <div className={styles.inputContainer}>
    <Button
    border="none"
    btncolor="#ffff">
   <img className={styles.imgIcon} src={search.src} alt="search" />
   </Button>
   <Input border="none" fontSize="14px" placeholder="Jump to..."/>
    </div>
    <div className={styles.btnContainer}>
    <Button
    border="none"
    btncolor="#ffff">
    <img className={styles.btnIcon} src={plus.src} alt="plus" />
    </Button>
    <p className={styles.btnText}>New heatmap</p>
    </div>
    </div>
    <div className={styles.body}>
    <Link legacyBehavior href="#"><a  className={styles.text} >New users</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text}>Mobile users</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text} >Rage clicked</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text}>/mobile-app recordings</a></Link>
    <Link legacyBehavior href="#"><a  className={styles.text} >All users copy</a></Link>
    </div>
    </div>
    
    </>
  )
}

export default HeatMapAside