/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllUserMast = /* GraphQL */ `
  query FetchAllUserMast {
    fetchAllUserMast {
      createdAt
      email
      introduce
      name
      updatedAt
      userIcon {
        bucket
        key
        region
        url
      }
      userID
    }
  }
`;
export const fetchCommentsByPostID = /* GraphQL */ `
  query FetchCommentsByPostID($postID: ID!) {
    fetchCommentsByPostID(postID: $postID) {
      comment
      commentID
      commentUserID
      createdAt
      postID
    }
  }
`;
export const fetchMyUserMast = /* GraphQL */ `
  query FetchMyUserMast {
    fetchMyUserMast {
      createdAt
      email
      introduce
      name
      updatedAt
      userIcon {
        bucket
        key
        region
        url
      }
      userID
    }
  }
`;
export const fetchPostByPostID = /* GraphQL */ `
  query FetchPostByPostID($postID: ID!) {
    fetchPostByPostID(postID: $postID) {
      createdAt
      deletedAt
      description
      image {
        bucket
        key
        region
        url
      }
      ownerUserID
      postID
    }
  }
`;
export const fetchPostsByOwnerUserID = /* GraphQL */ `
  query FetchPostsByOwnerUserID($userID: ID!) {
    fetchPostsByOwnerUserID(userID: $userID) {
      createdAt
      deletedAt
      description
      image {
        bucket
        key
        region
        url
      }
      ownerUserID
      postID
    }
  }
`;
export const fetchUserMastByUserID = /* GraphQL */ `
  query FetchUserMastByUserID($userID: ID!) {
    fetchUserMastByUserID(userID: $userID) {
      createdAt
      email
      introduce
      name
      updatedAt
      userIcon {
        bucket
        key
        region
        url
      }
      userID
    }
  }
`;
