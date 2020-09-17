const path = require(`path`)
const trim = require("lodash/trim")
const { createFilePath } = require(`gatsby-source-filesystem`)

let settings = {}

const createStoryblokPages = async (graphql, createPage) => {
  return new Promise((resolve, reject) => {
    const storyblokEntry = path.resolve("src/templates/storyblok-entry.js")

    graphql(
      `
        {
          stories: allStoryblokEntry(filter: { slug: { eq: "settings" } }) {
            edges {
              node {
                id
                name
                created_at
                published_at
                uuid
                slug
                full_slug
                field_component
                content
                is_startpage
                parent_id
                group_id
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      if (result.data.stories.edges.length === 1) {
        settings = result.data.stories.edges[0].node
      }

      // TODO: Divide creating /posts/ pages from normal pages
      // stories: allStoryblokEntry(filter: {field_component: {ne: "simple-blog-post"}, slug:{ne:"settings"}}) {
      resolve(
        graphql(
          `
            {
              stories: allStoryblokEntry(filter: { slug: { ne: "settings" } }) {
                edges {
                  node {
                    id
                    name
                    created_at
                    published_at
                    uuid
                    slug
                    field_component
                    full_slug
                    content
                    is_startpage
                    parent_id
                    group_id
                  }
                }
              }
            }
          `
        ).then((result) => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          const entries = result.data.stories.edges
          entries.forEach((entry, index) => {
            const previous =
              index === entries.length - 1 ? null : entries[index + 1].node
            const next = index === 0 ? null : entries[index - 1].node

            const pagePath =
              entry.node.full_slug === "home" ? "" : `${entry.node.full_slug}`

            createPage({
              path: `/${pagePath}`,
              component: storyblokEntry,
              context: {
                settings: settings,
                story: entry.node,
                previous,
                next,
              },
            })
          })
        })
      )
    })
  })
}

const createMarkdownPages = async (graphql, createPage) => {
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await createStoryblokPages(graphql, createPage)
  await createMarkdownPages(graphql, createPage)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}
