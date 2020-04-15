import ComponentNotFound from "./component-not-found"
import Page from "./Page/Page"
import Text from "./Text/Text"

const ComponentList = {
  page: Page,
  text: Text,
}

const Components = type => {
  if (typeof ComponentList[type] === "undefined") {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
