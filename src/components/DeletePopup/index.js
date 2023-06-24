import React from 'react'
import Button from '../../UI/button/Button'
import close from './asset/image/close.svg'
import styles from './asset/css/style.module.css'

function DeletePopUp({buttonCancel, exitBtn, yesdelete}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.divOne}>
          <h1 className={styles.title}>Delete recordings?</h1>
          {exitBtn}
        </div>
        <p className={styles.text}>Deleting recordings is permanent and cannot be undone</p>
        <div className={styles.btnContainer}>
          {buttonCancel}
          {yesdelete}
        </div>
        </div>
      </div>
     
    </>
  )
}

export default DeletePopUp