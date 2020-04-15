import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const UsesPage = props => (
  <Layout location={props.location}>
    <SEO title="marcin.codes | uses" />
    <div>
      <h2>
        Here will be my update hardware and software i use, inspired by{" "}
        <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">
          /uses
        </a>{" "}
        from Wes Bos and others.
      </h2>
      <h3>Hardware</h3>
      <ul>
        <li>Macbook pro 2018</li>
        <li>
          Magic Keyboard /{" "}
          <a
            href="https://www.keychron.com/collections/keyboard/products/keychron-mechanical-keyboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Keychron K1 (pure awesomeness)
          </a>
        </li>
      </ul>
      <h3>Software</h3>
      <ul>
        <li>Visual Studio Code</li>
        <li>Sporify</li>
        <li>1Password</li>
      </ul>
    </div>
  </Layout>
)

export default UsesPage
