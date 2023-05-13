import React from 'react';
import ChartBarBody from '../ChartBarBody';
import HeaderChartBar from '../headerChartBar';
import Drop_down from '@/UI/drop-down';
import styles from './asset/css/style.module.css';
import line1 from './asset/images/line1.svg'
import line2 from './asset/images/line2.svg'
import line3 from './asset/images/line3.svg'
import faleft from './asset/images/Left.svg'
import mapIcon from './asset/images/map.svg'
import flag from './asset/images/flag.svg'

function TopCountries() {
    const dropdownOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
    ];

    const handleDropdownChange = (option) => {
        console.log('Selected option:', option);
        
    }

  return (
     <>
     <div className={styles.wrapper}>
       <div className={styles.header}>
        
       <HeaderChartBar text="Technology">

       <Drop_down name="Devices" options={dropdownOptions} onChange={handleDropdownChange} border="1px solid #D6D6D6"  borderRadius="6px" padding="7px 15px"   />
   
       </HeaderChartBar>
       
    </div>

     <div className={styles.body}>
     
     <div className={styles.chartBodyContainer}>

     <ChartBarBody
          iconSrc={flag.src}
          imageSrc={line1.src}
          pTagText="Netherlands"
          anchorHref="#"
          anchorText="4.8k sessions"
          faLeftIconSrc={mapIcon.src}
          mapIconSrc={faleft.src}
          row ={{display:'flex',justifyContent:'space-between', }}
          aStyle={{textDecoration: 'none',fontFamily:'Inter',fontWeight:'500', fontSize:'12px',color:'#707070' }}
          pStyle={{marginBottom:'2px', color:'#303742',fontFamily:'Inter',fontWeight:'500', fontSize:'14px',padding:'5px'}}
          secondColumn={{alignSelf:'end',display:'flex',justifyContent:'space-between',columnGap:'5px'}}
          firstRow={{display:'flex',columnGap:'5px' }}
          iconStyle={{marginBottom:'2px', padding:'3px'}}
          
        />

     <ChartBarBody
          iconSrc={flag.src}
          imageSrc={line2.src}
          pTagText="Netherlands"
          anchorHref="#"
          anchorText="1.9k sessions"
          faLeftIconSrc={mapIcon.src}
          mapIconSrc={faleft.src}
          row ={{display:'flex',justifyContent:'space-between', }}
          aStyle={{textDecoration: 'none',fontFamily:'Inter',fontWeight:'500', fontSize:'12px',color:'#707070' }}
          pStyle={{marginBottom:'2px', color:'#303742',fontFamily:'Inter',fontWeight:'500', fontSize:'14px',padding:'5px'}}
          secondColumn={{alignSelf:'end',display:'flex',justifyContent:'space-between',columnGap:'5px'}}
          firstRow={{display:'flex',columnGap:'5px'}}
          iconStyle={{marginBottom:'2px'}}
          
        />

     <ChartBarBody
          iconSrc={flag.src}
          imageSrc={line3.src}
          pTagText="Netherlands"
          anchorHref="#"
          anchorText="29 sessions"
          faLeftIconSrc={mapIcon.src}
          mapIconSrc={faleft.src}
          row ={{display:'flex',justifyContent:'space-between', }}
          aStyle={{textDecoration: 'none',fontFamily:'Inter',fontWeight:'500', fontSize:'12px',color:'#707070' }}
          pStyle={{marginBottom:'2px', color:'#303742',fontFamily:'Inter',fontWeight:'500', fontSize:'14px',padding:'5px'}}
          secondColumn={{alignSelf:'end',display:'flex',justifyContent:'space-between',columnGap:'5px'}}
          firstRow={{display:'flex',columnGap:'5px'}}
          iconStyle={{marginBottom:'2px'}}
          
        />
            <ChartBarBody
          iconSrc={flag.src}
          imageSrc={line3.src}
          pTagText="Netherlands"
          anchorHref="#"
          anchorText="29 sessions"
          faLeftIconSrc={mapIcon.src}
          mapIconSrc={faleft.src}
          row ={{display:'flex',justifyContent:'space-between', }}
          aStyle={{textDecoration: 'none',fontFamily:'Inter',fontWeight:'500', fontSize:'12px',color:'#707070' }}
          pStyle={{marginBottom:'2px', color:'#303742',fontFamily:'Inter',fontWeight:'500', fontSize:'14px',padding:'5px'}}
          secondColumn={{alignSelf:'end',display:'flex',justifyContent:'space-between',columnGap:'5px'}}
          firstRow={{display:'flex',columnGap:'5px'}}
          iconStyle={{marginBottom:'2px'}}
          
        />
            <ChartBarBody
          iconSrc={flag.src}
          imageSrc={line3.src}
          pTagText="Netherlands"
          anchorHref="#"
          anchorText="29 sessions"
          faLeftIconSrc={mapIcon.src}
          mapIconSrc={faleft.src}
          row ={{display:'flex',justifyContent:'space-between', }}
          aStyle={{textDecoration: 'none',fontFamily:'Inter',fontWeight:'500', fontSize:'12px',color:'#707070' }}
          pStyle={{marginBottom:'2px', color:'#303742',fontFamily:'Inter',fontWeight:'500', fontSize:'14px',padding:'5px'}}
          secondColumn={{alignSelf:'end',display:'flex',justifyContent:'space-between',columnGap:'5px'}}
          firstRow={{display:'flex',columnGap:'5px'}}
          iconStyle={{marginBottom:'2px'}}
          
        />








     </div>








     </div>




    </div>
    
     
     
     
     
     
     </>
  )
}

export default TopCountries