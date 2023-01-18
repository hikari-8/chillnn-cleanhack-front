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
      createdAt
      deletedAt
      groupID
      limitTime
      raffleID
      raffleStatus
      remindSlackTime
      remindSlackWeek
      slackURL
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        joinUserIDArray
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
      createdAt
      deletedAt
      groupID
      limitTime
      remindSlackTime
      remindSlackWeek
      slackURL
      taskMasterObjectID
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
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
      createdAt
      deletedAt
      groupID
      limitTime
      raffleID
      raffleStatus
      remindSlackTime
      remindSlackWeek
      slackURL
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
        joinUserIDArray
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
      createdAt
      deletedAt
      groupID
      limitTime
      remindSlackTime
      remindSlackWeek
      slackURL
      taskMasterObjectID
      tasks {
        createdAt
        deletedAt
        groupID
        headCount
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
      updatedAt
      userID
    }
  }
`;
