import React from 'react'
import Button from '../../UI/button/Button'
import close from './asset/image/close.svg'
import styles from './asset/css/style.module.css'


function DeletePopUp() {
  return (
    <>
     <div className={styles.wrapper}>
     <div className={styles.closeBtn}>
    <Button
    border="none"
    btncolor="#ffff"
    
    >
    <img  className={styles.Xicon} src={close.src} alt='iconX'/></Button>
    </div>
     <h1 className={styles.title}>Delete recordings?</h1>
     <p className={styles.text}>Deleting recordings is permanent and cannot be <br/>undone</p>
     <div className={styles.btnContainer}>
        <Button 
           border="none"
           btncolor="#ffff"
           textColor='black'
           padding="12px 17px"
           text='Cancel'
           fontFamily="Inter"
           fontSize='14px'
           fontWeight='600'/>
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