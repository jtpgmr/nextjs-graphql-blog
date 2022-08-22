import { gql, GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(endpoint);

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);

  return data.postsConnection.edges;
};

export const getRelatedPosts = async (slug, categories) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const data = await graphQLClient.request(query, { slug, categories });

  return data.posts;
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_DESC
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`;

  const data = await graphQLClient.request(query);

  return data.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const data = await graphQLClient.request(query);

  return data.categories;
};

// Blog Post Page Slug Details
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          json
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const data = await graphQLClient.request(query, { slug });

  return data.post;
};
