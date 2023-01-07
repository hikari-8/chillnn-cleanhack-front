import {
    IRaffleObjectRepository,
    RaffleObject,
    RaffleObjectRepositoryCacheAdaptor,
} from 'chillnn-cleanhack-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddRaffleObjectMutation,
    AddRaffleObjectMutationVariables,
    UpdateRaffleObjectMutation,
    UpdateRaffleObjectMutationVariables,
    FetchRaffleObjectQueryVariables,
    FetchRaffleObjectQuery,
} from '~/driver/amplify/graphql/API'

class GraphqlRaffleObjectRepository implements IRaffleObjectRepository {
    async addRaffleObject(input: RaffleObject): Promise<RaffleObject> {
        return (
            await callApi<
                AddRaffleObjectMutation,
                AddRaffleObjectMutationVariables
            >(mutation.addRaffleObject, {
                input,
            })
        ).addRaffleObject
    }

    async updateRaffleObject(input: RaffleObject): Promise<RaffleObject> {
        return (
            await callApi<
                UpdateRaffleObjectMutation,
                UpdateRaffleObjectMutationVariables
            >(mutation.updateRaffleObject, {
                input,
            })
        ).updateRaffleObject
    }

    // async deleteRaffleObject(RaffleObjectID: string): Promise<RaffleObject> {
    //     return (
    //         await callApi<
    //             DeleteRaffleObjectMutation,
    //             DeleteRaffleObjectMutationVariables
    //         >(mutation.deleteRaffleObject, {
    //             RaffleObjectID,
    //         })
    //     ).deleteRaffleObject
    // }

    async fetchRaffleObject(raffleID: string): Promise<RaffleObject> {
        return (
            await callApi<
                FetchRaffleObjectQuery,
                FetchRaffleObjectQueryVariables
            >(query.fetchRaffleObject, {
                raffleID,
            })
        ).fetchRaffleObject
    }

    // async fetchRaffleObjectByRaffleObjectID(
    //     RaffleObjectID: string
    // ): Promise<RaffleObject | null> {
    //     return (
    //         (
    //             await callApi<
    //                 FetchRaffleObjectByRaffleObjectIDQuery,
    //                 FetchRaffleObjectByRaffleObjectIDQueryVariables
    //             >(query.fetchRaffleObjectByRaffleObjectID, {
    //                 RaffleObjectID,
    //             })
    //         ).fetchRaffleObjectByRaffleObjectID || null
    //     )
    // }
}

export const raffleObjectRepository = new RaffleObjectRepositoryCacheAdaptor(
    new GraphqlRaffleObjectRepository()
)
