/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllUserMast = /* GraphQL */ `
  query FetchAllUserMast {
    fetchAllUserMast {
      createdAt
      deletedAt
      groupID
      name
      records
      role
      updatedAt
      userID
    }
  }
`;
export const fetchGroupByGroupID = /* GraphQL */ `
  query FetchGroupByGroupID($groupID: ID!) {
    fetchGroupByGroupID(groupID: $groupID) {
      createdAt
      deletedAt
      groupID
      groupName
      updatedAt
    }
  }
`;
export const fetchMyUserMast = /* GraphQL */ `
  query FetchMyUserMast {
    fetchMyUserMast {
      createdAt
      deletedAt
      groupID
      name
      records
      role
      updatedAt
      userID
    }
  }
`;
export const fetchRaffleObject = /* GraphQL */ `
  query FetchRaffleObject($raffleID: ID!) {
    fetchRaffleObject(raffleID: $raffleID) {
      activeMembers {
        deletedAt
        groupID
        joinAt
        userID
      }
      createdAt
      deletedAt
      groupID
      limitTime
      raffleID
      raffleStatus
      remindSlackTime
      remindSlackWeek
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        raffleID
        taskID
        taskName
        updatedAt
        userID
      }
      updatedAt
    }
  }
`;
export const fetchTaskMasterObject = /* GraphQL */ `
  query FetchTaskMasterObject($groupID: ID!) {
    fetchTaskMasterObject(groupID: $groupID) {
      createdAt
      deletedAt
      groupID
      limitTime
      remindSlackTime
      remindSlackWeek
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        taskID
        taskName
        updatedAt
      }
      updatedAt
    }
  }
`;
export const fetchUserMastByUserID = /* GraphQL */ `
  query FetchUserMastByUserID($userID: ID!) {
    fetchUserMastByUserID(userID: $userID) {
      createdAt
      deletedAt
      groupID
      name
      records
      role
      updatedAt
      userID
    }
  }
`;
