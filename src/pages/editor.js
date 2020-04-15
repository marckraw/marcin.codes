import React from "react"
import Components from "../storyblok-components/components.js"
import SettingsContext from "../helpers/settingsContext"
import SbEditable from "storyblok-react"
import config from "../../gatsby-config"
let sbConfigs = config.plugins.filter(item => {
  return item.resolve === "gatsby-source-storyblok"
})
let sbConfig = sbConfigs.length > 0 ? sbConfigs[0] : {}
const loadStoryblokBridge = function(cb) {
  let script = document.createElement("script")
  script.type = "text/javascript"
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${sbConfig.options.accessToken}`
  script.onload = cb
  document.getElementsByTagName("head")[0].appendChild(script)
}
const getParam = function(val) {
  var result = ""
  var tmp = []
  window.location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      tmp = item.split("=")
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1])
      }
    })
  return result
}
class StoryblokEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = { story: null }
  }
  componentDidMount() {
    loadStoryblokBridge(() => {
      this.initStoryblokEvents()
    })
  }

  loadStory(payload) {
    window.storyblok.get(
      {
        slug: getParam("path"),
        version: "draft",
        resolve_relations: sbConfig.options.resolveRelations || [],
      },
      data => {
        this.setState({ story: data.story })
      }
    )
    window.storyblok.get(
      {
        slug: "settings/settings",
        version: "draft",
      },
      data => {
        this.context.set(data.story)
      }
    )
  }
  initStoryblokEvents() {
    this.loadStory({ storyId: getParam("path") })
    let sb = window.storyblok
    sb.on(["change", "published"], payload => {
      this.loadStory(payload)
    })
    sb.on("input", payload => {
      if (this.state.story && payload.story.id === this.state.story.id) {
        payload.story.content = sb.addComments(
          payload.story.content,
          payload.story.id
        )
        this.setState({ story: payload.story })
      }
    })
    sb.pingEditor(() => {
      if (sb.inEditor) {
        sb.enterEditmode()
      }
    })
  }
  render() {
    if (this.state.story == null) {
      return <div />
    }
    let content = this.state.story.content
    return (
      <SbEditable content={content}>
        <div>
          {React.createElement(Components(content.component), {
            key: content._uid,
            blok: content,
            story: this.state.story,
          })}
        </div>
      </SbEditable>
    )
  }
}
StoryblokEntry.contextType = SettingsContext
export default StoryblokEntry