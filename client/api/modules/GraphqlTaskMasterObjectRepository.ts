import {
    ITaskMasterObjectRepository,
    TaskMasterObject,
    TaskMasterObjectRepositoryCacheAdaptor,
} from 'chillnn-cleanhack-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddTaskMasterObjectMutation,
    AddTaskMasterObjectMutationVariables,
    FetchTaskMasterObjectQueryVariables,
    FetchTaskMasterObjectQuery,
} from '~/driver/amplify/graphql/API'

class GraphqlTaskMasterObjectRepository implements ITaskMasterObjectRepository {
    async addTaskMasterObject(
        input: TaskMasterObject
    ): Promise<TaskMasterObject> {
        return (
            await callApi<
                AddTaskMasterObjectMutation,
                AddTaskMasterObjectMutationVariables
            >(mutation.addTaskMasterObject, {
                input,
            })
        ).addTaskMasterObject
    }

    // async deleteTaskMasterObject(TaskMasterObjectID: string): Promise<TaskMasterObject> {
    //     return (
    //         await callApi<
    //             DeleteTaskMasterObjectMutation,
    //             DeleteTaskMasterObjectMutationVariables
    //         >(mutation.deleteTaskMasterObject, {
    //             TaskMasterObjectID,
    //         })
    //     ).deleteTaskMasterObject
    // }

    async fetchTaskMasterObject(groupID: string): Promise<TaskMasterObject> {
        return (
            await callApi<
                FetchTaskMasterObjectQuery,
                FetchTaskMasterObjectQueryVariables
            >(query.fetchTaskMasterObject, {
                groupID,
            })
        ).fetchTaskMasterObject
    }

    // async fetchTaskMasterObjectByTaskMasterObjectID(
    //     TaskMasterObjectID: string
    // ): Promise<TaskMasterObject | null> {
    //     return (
    //         (
    //             await callApi<
    //                 FetchTaskMasterObjectByTaskMasterObjectIDQuery,
    //                 FetchTaskMasterObjectByTaskMasterObjectIDQueryVariables
    //             >(query.fetchTaskMasterObjectByTaskMasterObjectID, {
    //                 TaskMasterObjectID,
    //             })
    //         ).fetchTaskMasterObjectByTaskMasterObjectID || null
    //     )
    // }
}

export const taskMasterObjectRepository =
    new TaskMasterObjectRepositoryCacheAdaptor(
        new GraphqlTaskMasterObjectRepository()
    )
