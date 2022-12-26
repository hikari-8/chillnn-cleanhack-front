import {
    IGroupMastRepository,
    GroupMast,
    GroupMastRepositoryCacheAdaptor,
} from 'chillnn-cleanhack-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddGroupMutation,
    AddGroupMutationVariables,
    FetchGroupByGroupIDQuery,
    FetchGroupByGroupIDQueryVariables,
    UpdateGroupMutation,
    UpdateGroupMutationVariables,
} from '~/driver/amplify/graphql/API'

class GraphqlGroupMastRepository implements IGroupMastRepository {
    async addGroup(input: GroupMast): Promise<GroupMast> {
        return (
            await callApi<AddGroupMutation, AddGroupMutationVariables>(
                mutation.addGroup,
                {
                    input,
                }
            )
        ).addGroup
    }

    async updateGroup(input: GroupMast): Promise<GroupMast> {
        return (
            await callApi<UpdateGroupMutation, UpdateGroupMutationVariables>(
                mutation.updateGroup,
                {
                    input,
                }
            )
        ).updateGroup
    }

    // async deleteGroup(GroupID: string): Promise<GroupMast> {
    //     return (
    //         await callApi<DeleteGroupMutation, DeleteGroupMutationVariables>(
    //             mutation.deleteGroup,
    //             {
    //                 GroupID,
    //             }
    //         )
    //     ).deleteGroup
    // }

    async fetchGroupByGroupID(groupID: string): Promise<GroupMast | null> {
        return (
            (
                await callApi<
                    FetchGroupByGroupIDQuery,
                    FetchGroupByGroupIDQueryVariables
                >(query.fetchGroupByGroupID, {
                    groupID,
                })
            ).fetchGroupByGroupID || null
        )
    }
}

export const groupMastRepository = new GroupMastRepositoryCacheAdaptor(
    new GraphqlGroupMastRepository()
)
