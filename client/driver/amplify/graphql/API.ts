/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GroupMastInput = {
  createdAt: number,
  createdUserID: string,
  deletedAt?: number | null,
  groupID: string,
  groupName?: string | null,
  members: Array< string >,
  updatedAt: number,
};

export type GroupMast = {
  __typename: "GroupMast",
  createdAt: number,
  createdUserID: string,
  deletedAt?: number | null,
  groupID: string,
  groupName?: string | null,
  members: Array< string >,
  updatedAt: number,
};

export type RaffleObjectInput = {
  activeMembers: Array< RaffleJoinUserInput >,
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  limitTime: string,
  raffleID: string,
  raffleStatus: RaffleStatus,
  remindSlackTime: string,
  remindSlackWeek: string,
  slackURL: string,
  tasks: Array< RaffleMastInput >,
  updatedAt: number,
};

export type RaffleJoinUserInput = {
  deletedAt?: number | null,
  groupID: string,
  joinAt: number,
  userID: string,
};

export enum RaffleStatus {
  DONE = "DONE",
  EFFECTIVE = "EFFECTIVE",
  EFFECTIVE_AND_FIXED = "EFFECTIVE_AND_FIXED",
}


export type RaffleMastInput = {
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  headCount: number,
  joinUserIDArray: Array< string >,
  raffleID?: string | null,
  raffleItemID: string,
  taskID: string,
  taskName: string,
  updatedAt: number,
};

export type RaffleObject = {
  __typename: "RaffleObject",
  activeMembers:  Array<RaffleJoinUser >,
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  limitTime: string,
  raffleID: string,
  raffleStatus: RaffleStatus,
  remindSlackTime: string,
  remindSlackWeek: string,
  slackURL: string,
  tasks:  Array<RaffleMast >,
  updatedAt: number,
};

export type RaffleJoinUser = {
  __typename: "RaffleJoinUser",
  deletedAt?: number | null,
  groupID: string,
  joinAt: number,
  userID: string,
};

export type RaffleMast = {
  __typename: "RaffleMast",
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  headCount: number,
  joinUserIDArray: Array< string >,
  raffleID?: string | null,
  raffleItemID: string,
  taskID: string,
  taskName: string,
  updatedAt: number,
};

export type TaskMasterObjectInput = {
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  limitTime?: string | null,
  remindSlackTime?: string | null,
  remindSlackWeek?: string | null,
  slackURL?: string | null,
  taskMasterObjectID: string,
  tasks: Array< TaskMastInput >,
  updatedAt: number,
};

export type TaskMastInput = {
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  headCount: number,
  taskID: string,
  taskName: string,
  taskStatus: TaskStatus,
  updatedAt: number,
};

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}


export type TaskMasterObject = {
  __typename: "TaskMasterObject",
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  limitTime?: string | null,
  remindSlackTime?: string | null,
  remindSlackWeek?: string | null,
  slackURL?: string | null,
  taskMasterObjectID: string,
  tasks:  Array<TaskMast >,
  updatedAt: number,
};

export type TaskMast = {
  __typename: "TaskMast",
  createdAt: number,
  deletedAt?: number | null,
  groupID: string,
  headCount: number,
  taskID: string,
  taskName: string,
  taskStatus: TaskStatus,
  updatedAt: number,
};

export type UserMastInput = {
  createdAt: number,
  deletedAt?: number | null,
  email: string,
  groupID?: string | null,
  name: string,
  records?: Array< string > | null,
  role: string,
  updatedAt: number,
  userID: string,
};

export type UserMast = {
  __typename: "UserMast",
  createdAt: number,
  deletedAt?: number | null,
  email: string,
  groupID?: string | null,
  name: string,
  records?: Array< string > | null,
  role: string,
  updatedAt: number,
  userID: string,
};

export type AddGroupMutationVariables = {
  input: GroupMastInput,
};

export type AddGroupMutation = {
  addGroup:  {
    __typename: "GroupMast",
    createdAt: number,
    createdUserID: string,
    deletedAt?: number | null,
    groupID: string,
    groupName?: string | null,
    members: Array< string >,
    updatedAt: number,
  },
};

export type AddRaffleObjectMutationVariables = {
  input: RaffleObjectInput,
};

export type AddRaffleObjectMutation = {
  addRaffleObject:  {
    __typename: "RaffleObject",
    activeMembers:  Array< {
      __typename: "RaffleJoinUser",
      deletedAt?: number | null,
      groupID: string,
      joinAt: number,
      userID: string,
    } >,
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime: string,
    raffleID: string,
    raffleStatus: RaffleStatus,
    remindSlackTime: string,
    remindSlackWeek: string,
    slackURL: string,
    tasks:  Array< {
      __typename: "RaffleMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      joinUserIDArray: Array< string >,
      raffleID?: string | null,
      raffleItemID: string,
      taskID: string,
      taskName: string,
      updatedAt: number,
    } >,
    updatedAt: number,
  },
};

export type AddTaskMasterObjectMutationVariables = {
  input: TaskMasterObjectInput,
};

export type AddTaskMasterObjectMutation = {
  addTaskMasterObject:  {
    __typename: "TaskMasterObject",
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime?: string | null,
    remindSlackTime?: string | null,
    remindSlackWeek?: string | null,
    slackURL?: string | null,
    taskMasterObjectID: string,
    tasks:  Array< {
      __typename: "TaskMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      taskID: string,
      taskName: string,
      taskStatus: TaskStatus,
      updatedAt: number,
    } >,
    updatedAt: number,
  },
};

export type UpdateGroupMutationVariables = {
  input: GroupMastInput,
};

export type UpdateGroupMutation = {
  updateGroup:  {
    __typename: "GroupMast",
    createdAt: number,
    createdUserID: string,
    deletedAt?: number | null,
    groupID: string,
    groupName?: string | null,
    members: Array< string >,
    updatedAt: number,
  },
};

export type UpdateRaffleObjectMutationVariables = {
  input: RaffleObjectInput,
};

export type UpdateRaffleObjectMutation = {
  updateRaffleObject:  {
    __typename: "RaffleObject",
    activeMembers:  Array< {
      __typename: "RaffleJoinUser",
      deletedAt?: number | null,
      groupID: string,
      joinAt: number,
      userID: string,
    } >,
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime: string,
    raffleID: string,
    raffleStatus: RaffleStatus,
    remindSlackTime: string,
    remindSlackWeek: string,
    slackURL: string,
    tasks:  Array< {
      __typename: "RaffleMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      joinUserIDArray: Array< string >,
      raffleID?: string | null,
      raffleItemID: string,
      taskID: string,
      taskName: string,
      updatedAt: number,
    } >,
    updatedAt: number,
  },
};

export type UpdateTaskMasterObjectMutationVariables = {
  input: TaskMasterObjectInput,
};

export type UpdateTaskMasterObjectMutation = {
  updateTaskMasterObject:  {
    __typename: "TaskMasterObject",
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime?: string | null,
    remindSlackTime?: string | null,
    remindSlackWeek?: string | null,
    slackURL?: string | null,
    taskMasterObjectID: string,
    tasks:  Array< {
      __typename: "TaskMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      taskID: string,
      taskName: string,
      taskStatus: TaskStatus,
      updatedAt: number,
    } >,
    updatedAt: number,
  },
};

export type UpdateUserMastMutationVariables = {
  input: UserMastInput,
};

export type UpdateUserMastMutation = {
  updateUserMast:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    groupID?: string | null,
    name: string,
    records?: Array< string > | null,
    role: string,
    updatedAt: number,
    userID: string,
  },
};

export type FetchAllUserMastQuery = {
  fetchAllUserMast:  Array< {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    groupID?: string | null,
    name: string,
    records?: Array< string > | null,
    role: string,
    updatedAt: number,
    userID: string,
  } >,
};

export type FetchGroupByGroupIDQueryVariables = {
  groupID: string,
};

export type FetchGroupByGroupIDQuery = {
  fetchGroupByGroupID?:  {
    __typename: "GroupMast",
    createdAt: number,
    createdUserID: string,
    deletedAt?: number | null,
    groupID: string,
    groupName?: string | null,
    members: Array< string >,
    updatedAt: number,
  } | null,
};

export type FetchLastRaffleByGroupIDQueryVariables = {
  groupID: string,
};

export type FetchLastRaffleByGroupIDQuery = {
  fetchLastRaffleByGroupID?:  {
    __typename: "RaffleObject",
    activeMembers:  Array< {
      __typename: "RaffleJoinUser",
      deletedAt?: number | null,
      groupID: string,
      joinAt: number,
      userID: string,
    } >,
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime: string,
    raffleID: string,
    raffleStatus: RaffleStatus,
    remindSlackTime: string,
    remindSlackWeek: string,
    slackURL: string,
    tasks:  Array< {
      __typename: "RaffleMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      joinUserIDArray: Array< string >,
      raffleID?: string | null,
      raffleItemID: string,
      taskID: string,
      taskName: string,
      updatedAt: number,
    } >,
    updatedAt: number,
  } | null,
};

export type FetchMyUserMastQuery = {
  fetchMyUserMast?:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    groupID?: string | null,
    name: string,
    records?: Array< string > | null,
    role: string,
    updatedAt: number,
    userID: string,
  } | null,
};

export type FetchRaffleObjectQueryVariables = {
  raffleID: string,
};

export type FetchRaffleObjectQuery = {
  fetchRaffleObject:  {
    __typename: "RaffleObject",
    activeMembers:  Array< {
      __typename: "RaffleJoinUser",
      deletedAt?: number | null,
      groupID: string,
      joinAt: number,
      userID: string,
    } >,
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime: string,
    raffleID: string,
    raffleStatus: RaffleStatus,
    remindSlackTime: string,
    remindSlackWeek: string,
    slackURL: string,
    tasks:  Array< {
      __typename: "RaffleMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      joinUserIDArray: Array< string >,
      raffleID?: string | null,
      raffleItemID: string,
      taskID: string,
      taskName: string,
      updatedAt: number,
    } >,
    updatedAt: number,
  },
};

export type FetchRafflesByGroupIDQueryVariables = {
  groupID: string,
};

export type FetchRafflesByGroupIDQuery = {
  fetchRafflesByGroupID:  Array< {
    __typename: "RaffleObject",
    activeMembers:  Array< {
      __typename: "RaffleJoinUser",
      deletedAt?: number | null,
      groupID: string,
      joinAt: number,
      userID: string,
    } >,
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime: string,
    raffleID: string,
    raffleStatus: RaffleStatus,
    remindSlackTime: string,
    remindSlackWeek: string,
    slackURL: string,
    tasks:  Array< {
      __typename: "RaffleMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      joinUserIDArray: Array< string >,
      raffleID?: string | null,
      raffleItemID: string,
      taskID: string,
      taskName: string,
      updatedAt: number,
    } >,
    updatedAt: number,
  } >,
};

export type FetchTaskMasterObjectQueryVariables = {
  groupID: string,
};

export type FetchTaskMasterObjectQuery = {
  fetchTaskMasterObject:  {
    __typename: "TaskMasterObject",
    createdAt: number,
    deletedAt?: number | null,
    groupID: string,
    limitTime?: string | null,
    remindSlackTime?: string | null,
    remindSlackWeek?: string | null,
    slackURL?: string | null,
    taskMasterObjectID: string,
    tasks:  Array< {
      __typename: "TaskMast",
      createdAt: number,
      deletedAt?: number | null,
      groupID: string,
      headCount: number,
      taskID: string,
      taskName: string,
      taskStatus: TaskStatus,
      updatedAt: number,
    } >,
    updatedAt: number,
  },
};

export type FetchUserMastByUserIDQueryVariables = {
  userID: string,
};

export type FetchUserMastByUserIDQuery = {
  fetchUserMastByUserID?:  {
    __typename: "UserMast",
    createdAt: number,
    deletedAt?: number | null,
    email: string,
    groupID?: string | null,
    name: string,
    records?: Array< string > | null,
    role: string,
    updatedAt: number,
    userID: string,
  } | null,
};
