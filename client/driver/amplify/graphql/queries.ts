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
      selectedOption
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
      members
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
      channelID
      createdAt
      deletedAt
      groupID
      limitHour
      limitMin
      limitTimeUnix
      raffleID
      raffleStatus
      remindSlackHour
      remindSlackMin
      remindTimeUnix
      resultMessage
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        joinUserIDArray
        optionName
        optionValidUsers
        raffleID
        raffleItemID
        taskID
        taskName
        updatedAt
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
      selectedOption
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
      channelID
      createdAt
      deletedAt
      groupID
      limitHour
      limitMin
      limitTimeUnix
      raffleID
      raffleStatus
      remindSlackHour
      remindSlackMin
      remindTimeUnix
      resultMessage
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        joinUserIDArray
        optionName
        optionValidUsers
        raffleID
        raffleItemID
        taskID
        taskName
        updatedAt
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
      channelID
      createdAt
      deletedAt
      groupID
      limitHour
      limitMin
      limitTimeUnix
      raffleID
      raffleStatus
      remindSlackHour
      remindSlackMin
      remindTimeUnix
      resultMessage
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        joinUserIDArray
        optionName
        optionValidUsers
        raffleID
        raffleItemID
        taskID
        taskName
        updatedAt
      }
      updatedAt
    }
  }
`;
export const fetchTaskMasterObject = /* GraphQL */ `
  query FetchTaskMasterObject($groupID: ID!) {
    fetchTaskMasterObject(groupID: $groupID) {
      channelID
      createdAt
      deletedAt
      groupID
      limitHour
      limitMin
      limitTimeUnix
      remindSlackHour
      remindSlackMin
      remindTimeUnix
      taskMasterObjectID
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        optionItem
        taskID
        taskName
        taskStatus
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
      selectedOption
      updatedAt
      userID
    }
  }
`;
