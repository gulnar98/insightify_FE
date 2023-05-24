import React from 'react'
import Button from '../../UI/button/Button'
import close from './asset/image/close.svg'
import styles from './asset/css/style.module.css'

function DeletePopUp({buttonCancel}) {
  return (
    <>
     <div className={styles.wrapper}>
        <div className={styles.divOne}>
          <h1 className={styles.title}>Delete recordings?</h1>
          <Button
            border="none"
            btncolor="#ffff" 
            imgprops={<img className={styles.Xicon} src={close.src} alt='iconX'/>}/>
        </div>
        <p className={styles.text}>Deleting recordings is permanent and cannot be undone</p>
        <div className={styles.btnContainer}>
          {buttonCancel}
          <Button
            btncolor="#9A3530"
            textColor="#ffff"
            text="Yes, delete"
            padding="12px 17px"
            border="none"
            borderRadius='6px'
            fontFamily="Inter"
            fontSize='14px'
            fontWeight='600'/>
        </div>
      </div>
    </>
  )
}

export default DeletePopUp