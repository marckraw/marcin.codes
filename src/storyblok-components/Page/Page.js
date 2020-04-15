import React from "react"
import Components from "../components.js"

const Page = props => {
  return (
    props.blok.body &&
    props.blok.body.map(blok =>
      React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
        story: props.story,
      })
    )
  )
}

export default Page
