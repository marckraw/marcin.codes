import React from "react"

export default ({ children, pageContext }) => {
  const settings = Object.assign({}, pageContext.settings)
  if (typeof settings.content === "string") {
    settings.content = JSON.parse(settings.content)
  }

  return <React.Fragment>{children}</React.Fragment>
}
