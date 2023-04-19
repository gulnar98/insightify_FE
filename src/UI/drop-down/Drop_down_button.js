import React from 'react'

export default function Drop_down(props) {
  let color = props.color 
  let border = props.border 
  let textColor = props.textColor 
  let borderRadius = props.borderRadius 
  let padding = props.padding 
  let margin = props.margin 
  
  let value = props.value;
  let fontFamily=props.fontFamily;
  let fontSize=props.fontSize;
  let fontWeight=props.fontWeight;

  const { name = "All pages", options = [
    { value: "page1", label: "Page 1" },
    { value: "page2", label: "Page 2" }
  ] } = props;

  return (
    <select name={name} style={{backgroundColor:color, borderRadius, color: textColor, border, padding, margin, value,fontFamily,fontSize,fontWeight}}>
      <option value="">All pages</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  )
}
