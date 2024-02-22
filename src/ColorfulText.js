import React from "react";
import Paragraf from "./Paragraf";
import { Children } from 'react';


function ColorfulText(props) {
  let object = (
    <Paragraf
      aspect_ratio={8}
      marginLeft={2}
      text={props.text}
      text_color={props.text_color}
      font_weight={'bold'}
    />
  )

  if (Children.count(props.children) > 0) {
    object = (
      Children.map(props.children, (child, index) =>
        child
      ))
  }

  return (
    <div
      style={{
        background: `${props.color}`,
        borderRadius: '2%/14%',
        marginTop: '5%'
      }}>
      {object}
    </div>
  )
}
export default ColorfulText
