
import React from 'react'

// This is a dropdown button

export default function Drop_down(props) {
  let color = props.color 
  let border = props.border 
  let textColor = props.textColor 
  let borderRadius = props.borderRadius 
  let padding = props.padding 
  let margin = props.margin 
  let value = props.value;
 

  const { name = "All pages", options = [
    { value: "page1", label: "Page 1" },
    { value: "page2", label: "Page 2" }
  ] } = props;

  return (
   <div style={{backgroundColor:color, borderRadius, color: textColor, border, padding, margin, value}}>
     <select name={name} style={{ fontFamily: "Inter",fontWeight: "500",fontSize: "14px", border: "none",columnGap:'5px',textColor:"#303742",outline: "none",  paddingRight: "8px"}} >
      <option value="">{name}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
   </div>
  )
}
