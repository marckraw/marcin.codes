import React from "react"
import ReactMardown from "react-markdown"
import { useStaticQuery, graphql, Link } from "gatsby"
// import { Link, graphql } from "gatsby"

import Bio from "../../../components/bio"
import Layout from "../../../components/layout"
import SEO from "../../../components/seo"

const isPost = fullSlug => fullSlug.split("/")[0] === "posts"

const SimpleBlogPost = props => {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location} title={title}>
      <SEO title={props.story.name} description={props.story.name} />
      <article>
        <header>
          <h1>{props.story.name}</h1>
          <p>{props.story.created_at}</p>
        </header>
        <ReactMardown source={props.blok.content} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      {/* remove navigation for now */}
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && isPost(previous.full_slug) && (
              <Link to={`/${previous.full_slug}`} rel="prev">
                ← {previous.name}
              </Link>
            )}
          </li>
          <li>
            {next && isPost(next.full_slug) && (
              <Link to={`/${next.full_slug}`} rel="next">
                {next.name} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default SimpleBlogPost
