/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addGroup = /* GraphQL */ `
  mutation AddGroup($input: GroupMastInput!) {
    addGroup(input: $input) {
      createdAt
      deletedAt
      groupID
      groupName
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
export const addTaskMasterObject = /* GraphQL */ `
  mutation AddTaskMasterObject($input: TaskMasterObjectInput!) {
    addTaskMasterObject(input: $input) {
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
export const updateUserMast = /* GraphQL */ `
  mutation UpdateUserMast($input: UserMastInput!) {
    updateUserMast(input: $input) {
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
