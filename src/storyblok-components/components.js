import ComponentNotFound from "./component-not-found";
import Page from "./Page/Page";
import Text from "./Text/Text";
import SimpleBlogPost from "./content-types/SimpleBlogPost/SimpleBlogPost";
import BlogPost from "./content-types/BlogPost";

const ComponentList = {
  page: Page,
  text: Text,
  "simple-blog-post": SimpleBlogPost,
  "blog-post": BlogPost,
};

const Components = (type) => {
  if (typeof ComponentList[type] === "undefined") {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
