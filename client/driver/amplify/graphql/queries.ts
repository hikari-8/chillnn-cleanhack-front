/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllUserMast = /* GraphQL */ `
  query FetchAllUserMast {
    fetchAllUserMast {
      createdAt
      deletedAt
      email
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
      createdUserID
      deletedAt
      groupID
      groupName
      updatedAt
    }
  }
`;
export const fetchLastRaffleByGroupID = /* GraphQL */ `
  query FetchLastRaffleByGroupID($groupID: ID!) {
    fetchLastRaffleByGroupID(groupID: $groupID) {
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
        raffleItemID
        taskID
        taskName
        updatedAt
        userID
      }
      updatedAt
    }
  }
`;
export const fetchMyUserMast = /* GraphQL */ `
  query FetchMyUserMast {
    fetchMyUserMast {
      createdAt
      deletedAt
      email
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
        raffleItemID
        taskID
        taskName
        updatedAt
        userID
      }
      updatedAt
    }
  }
`;
export const fetchRafflesByGroupID = /* GraphQL */ `
  query FetchRafflesByGroupID($groupID: ID!) {
    fetchRafflesByGroupID(groupID: $groupID) {
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
        raffleItemID
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
      taskMasterObjectID
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
      email
      groupID
      name
      records
      role
      updatedAt
      userID
    }
  }
`;
