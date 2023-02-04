const config = require('./data/SiteConfig');
const {getSrc} = require("gatsby-plugin-image")
const {toPostInfo} = require('./src/postUtils.js');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    title: config.siteTitle,
    titleTemplate: '%s | The Nameless Site',
    siteUrl: config.siteUrl + pathPrefix,
    siteDescription: config.siteDescription,
    pathPrefix: config.pathPrefix,
    siteTitleAlt: config.siteTitleAlt,
    userTwitter: config.userTwitter,
    userDescription: config.userDescription,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      copyright: config.copyright
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/assets`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/posts`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'nav',
        path: `${__dirname}/content/nav`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- excerpt -->',
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800
            }
          },
          {
            resolve: 'gatsby-remark-embed-youtube',
            options: {
              width: 800,
              height: 400
            }
          },

          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-emoji'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#c62828'
      }
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage(
              filter: {
                path: {
                  regex: "${regexExcludeRobots}"
                }
              }
            ) {
              nodes {
                path
              }
            }
        }`
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.image_url = [
            config.siteUrl,
            getSrc(ref.query.file.childImageSharp)
          ].join('/');
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          return ret;
        },
        query: `
        {
          file(name: {eq: "Gavin-December-1989"}) {
            childImageSharp {
              gatsbyImageData(layout: FIXED, height: 32, width: 32)
            }
          }
          site {
            siteMetadata {
              rssMetadata {
                site_url
                siteUrl: site_url
                feed_url
                title
                description
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            title: config.siteTitle,
            serialize(ctx) {
              const {rssMetadata} = ctx.query.site.siteMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => {
                const postInfo = toPostInfo(edge.node);
                return {
                  date: postInfo.date,
                  title: postInfo.title,
                  description: postInfo.excerpt,
                  url: rssMetadata.site_url + postInfo.slug,
                  guid: rssMetadata.site_url + postInfo.slug,
                  custom_elements: [{'content:encoded': postInfo.html}]
                };
              });
            },
            query: `
            {
              allMarkdownRemark(
                filter: {fields: {sourceInstanceName: {eq: "blog"}}}
                sort: {fields: {date: DESC}}
                limit: 1000
              ) {
                edges {
                  node {
                    id
                    html
                    excerpt
                    fields {
                      slug
                      date
                      tags
                    }
                    frontmatter {
                      title
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/.well-known/matrix/*': [
            'Content-Type: application/json',
            'Access-Control-Allow-Origin: *',
            'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization'
          ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.siteUrl + pathPrefix
      }
    },
  ],
};
