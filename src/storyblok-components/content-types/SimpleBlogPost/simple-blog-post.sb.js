module.exports = {
  name: "simple-blog-post",
  display_name: "Simple Blog Post",
  is_nestable: false,
  is_root: true,
  schema: {
    title: {
      type: "text",
    },
    content: {
      type: "markdown",
    },
    short_description: {
      type: "textarea",
    },
  },
}
