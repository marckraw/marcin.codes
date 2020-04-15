import React from "react"
const defaultContextValue = {
  settings: {},
  set: () => {},
}
const SettingsContext = React.createContext(defaultContextValue)
class SettingsContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.setSettings = this.setSettings.bind(this)
    this.state = {
      settings: props.settings,
      set: this.setSettings,
    }
  }
  setSettings(newSettings) {
    this.setState({
      settings: newSettings,
    })
  }
  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}
export { SettingsContext as default, SettingsContextProvider }
