import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import Tags from "../components/Tags"
import Github from "../components/Github"

export default function Posts({data, children}) {
  const { mdx, previous, next } = data

  console.log(children)

  return (
    <Layout
      title={mdx.frontmatter.title}
      subtitle={mdx.frontmatter.subtitle}
      blogMenu={{ previous, next }}
      blog
    >
      <StyledBlogPost>
        <h1>{mdx.frontmatter.title}</h1>
        <h6 dangerouslySetInnerHTML={{ __html: mdx.frontmatter.subtitle }} />
        <p id="blog_meta_header">
          <strong>Published</strong> {mdx.frontmatter.date}
        </p>
        <hr />
        <article>
          {/* <MDXProvider> */}
           {children}
          {/* </MDXProvider> */}
        </article>
        <hr />
        <p id="blog_meta_footer">
          <p>
            <strong>Author</strong>
            Christopher Talke
          </p>
          <strong>Topics</strong>
          <Tags tags={mdx.frontmatter.tags} />
        </p>
        <div className="github-edit">
          <Github />
          <div>
            Find an issue with this post? Think you could clarify, update or add
            something? All my posts are available to{" "}
            <a
              href={`https://github.com/christopher-talke/talke-dev/tree/master/content/posts/${mdx.frontmatter.slug}.mdx`}
            >
              edit on Github
            </a>
            !
          </div>
        </div>
      </StyledBlogPost>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String, $prev: String, $next: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        slug
        subtitle
        title
        tags
      }
    }

    previous: mdx(id: { eq: $prev }) {
      frontmatter {
        slug
        title
      }
    }

    next: mdx(id: { eq: $next }) {
      frontmatter {
        slug
        title
      }
    }
  }
`

const StyledBlogPost = styled.div`
  max-width: 650px;
  margin: 70px auto 50px auto;

  & article {
    line-height: 1.6;
    font-size: 16px;
  }

  @media only screen and (max-width: 600px) {
    & {
      padding: 0 14px;
    }
  }

  & h1 {
    line-height: 88.78%;
  }

  h2,
  h4 {
    margin-top: 45px;
    margin-bottom: 5px;
  }

  h2:nth-of-type(1),
  h4:nth-of-type(1) {
    margin-top: 25px;
  }

  h2 + p,
  h4 + p {
    margin-top: 0px;
  }

  & #blog_meta_header {
    margin: 25px 0;
  }

  & hr {
    width: 80%;
    border: 0;
    margin: 20px 0;
    border-top: 1px solid rgba(0, 67, 116, 0.35);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
  }

  .blog-tag {
    text-transform: capitalize;
  }

  pre {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    margin: 30px 0;
    line-height: 1.4;
    transform: scale(1.01);
    transform: scale(1.02);
    width: 825px;
    right: calc(425px - 50%);
  }

  @media only screen and (max-width: 600px) {
    & pre {
      overflow: auto;
      transform: scale(1.01);
      width: auto;
      right: auto;
    }
  }

  pre code.grvsc-code {
    white-space: pre-wrap;
  }

  .grvsc-line-highlighted {
    background: #213a21;
    border-left: 7px solid #82c5ff;
    padding-left: calc(24px - 7px);
  }

  ul code,
  p code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }

  .twitter-tweet {
    margin: 20px auto !important;
  }

  & #blog_meta_footer {
    margin-top: 15px;

    p {
      margin: 0;
    }

    strong {
      margin-right: 15px;
      min-width: 25px;
    }
  }

  .external-article {
    border: 1px solid #797979;
    border-left: 5px solid #797979;
    padding: 8px 16px;
    margin: 32px 0;
    padding-top: 0;
    transform: scale(1.05);

    a, a h2 {
      margin: 0;
      padding: 0;
    }
    p {
      text-decoration: none;
      margin: 0;
      margin-bottom: 0;
      margin-top: -8px;
    }
    span {
      position: relative;
      top: -8px;
      font-size: 0.75em;
      opacity: 0.75;
    }
  }

  .external-article:hover {
    transition: all 200ms;
    transform: scale(1.075);
  }

  div.github-edit {
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      margin-left: 10px;
    }

    @media only screen and (max-width: 600px) {
      div {
        margin-left: 0px;
      }
      svg {
        display: none;
      }
    }
  }

  div.alert,
  div.github-edit {
    position: relative;
    z-index: 50;
    border: 1px solid;
    border-left: 7.5px solid;
    padding: 5px 7.5px;
    margin: 30px 0;

    p {
      margin: 0;
    }

    &.info {
      border-color: #82c5ff;
      background: #ecf6ff;
      color: #0082f7;
    }

    &.warning {
      border-color: #fff682;
      background: #fffcec;
      color: #a9a522;
    }

    &.danger {
      border-color: #ff8282;
      background: #ffecec;
      color: #f70000;
    }
  }

  blockquote {
    color: #595352;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.846em !important;
    font-style: italic;
    line-height: 1.52em;
  }
`