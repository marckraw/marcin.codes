import React from "react"

import Components from "../storyblok-components/components.js"

class StoryblokEntry extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.story.uuid === props.pageContext.story.uuid) {
      return null
    }

    return StoryblokEntry.prepareStory(props)
  }

  static prepareStory(props) {
    const story = Object.assign({}, props.pageContext.story)
    story.content = JSON.parse(story.content)

    const settings = Object.assign({}, props.pageContext.settings)
    if (typeof settings.content === "string") {
      settings.content = JSON.parse(settings.content)
    }

    return { story, settings }
  }

  constructor(props) {
    super(props)

    this.state = StoryblokEntry.prepareStory(props)
  }

  render() {
    let content = this.state.story.content
    let story = this.state.story
    let settings = this.state.settings

    return React.createElement(Components(content.component), {
      key: content._uid,
      blok: content,
      story,
      settings,
      location: this.props.location,
    })
  }
}

export default StoryblokEntry
