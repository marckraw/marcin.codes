import React from "react"
import SbEditable from "storyblok-react"

const Text = props => (
  <SbEditable content={props.blok}>
    <p>{props.blok.title && props.blok.title}</p>
  </SbEditable>
)

export default Text
