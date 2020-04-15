import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allStoryblokEntry.edges

    console.log("tutaj data")
    console.log(data)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />

        {posts.map(({ node }) => {
          const title = node.name || node.slug
          return (
            <article key={node.slug} style={{ marginBottom: "32px" }}>
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={`/${node.full_slug}`}>
                    {title}
                  </Link>
                </h3>
                <small>{node.first_published_at}</small>
              </header>
              <section>{node.field_short_description_string}</section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query AllStoryblokPosts {
    site {
      siteMetadata {
        title
      }
    }
    allStoryblokEntry(
      sort: { fields: [first_published_at], order: DESC }
      filter: { full_slug: { regex: "/posts//" } }
    ) {
      edges {
        node {
          id
          name
          created_at
          published_at
          content
          slug
          full_slug
          position
          is_startpage
          first_published_at
          lang
          field_component
          field_title_string
          field_content_string
          field_short_description_string
        }
      }
    }
  }
`
// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//             description
//           }
//         }
//       }
//     }
//   }
// `
