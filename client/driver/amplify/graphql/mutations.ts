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
      records {
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
export const addTaskMasterObject = /* GraphQL */ `
  mutation AddTaskMasterObject($input: TaskMasterObjectInput!) {
    addTaskMasterObject(input: $input) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: GroupMastInput!) {
    updateGroup(input: $input) {
      createdAt
      createdUserID
      deletedAt
      groupID
      groupName
      records {
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
export const updateTaskMasterObject = /* GraphQL */ `
  mutation UpdateTaskMasterObject($input: TaskMasterObjectInput!) {
    updateTaskMasterObject(input: $input) {
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
