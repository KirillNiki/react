import React from "react";
import Paragraf from "./Paragraf";


function ColorfulText(props) {

  return (
    <div
      style={{
        background: `${props.color}`,
        borderRadius: '2%/14%',
        marginTop: '5%'
      }}>
      <Paragraf
        aspect_ratio={8}
        marginLeft={2}
        text={props.text}
        text_color={props.text_color}
        font_weight={'bold'}
      />
    </div>
  )
}
export default ColorfulText
