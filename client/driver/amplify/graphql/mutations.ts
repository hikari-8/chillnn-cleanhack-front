/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addGroup = /* GraphQL */ `
  mutation AddGroup($input: GroupMastInput!) {
    addGroup(input: $input) {
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
export const addRaffleObject = /* GraphQL */ `
  mutation AddRaffleObject($input: RaffleObjectInput!) {
    addRaffleObject(input: $input) {
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
export const addTaskMasterObject = /* GraphQL */ `
  mutation AddTaskMasterObject($input: TaskMasterObjectInput!) {
    addTaskMasterObject(input: $input) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: GroupMastInput!) {
    updateGroup(input: $input) {
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
export const updateRaffleObject = /* GraphQL */ `
  mutation UpdateRaffleObject($input: RaffleObjectInput!) {
    updateRaffleObject(input: $input) {
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
export const updateTaskMasterObject = /* GraphQL */ `
  mutation UpdateTaskMasterObject($input: TaskMasterObjectInput!) {
    updateTaskMasterObject(input: $input) {
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
export const updateUserMast = /* GraphQL */ `
  mutation UpdateUserMast($input: UserMastInput!) {
    updateUserMast(input: $input) {
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
