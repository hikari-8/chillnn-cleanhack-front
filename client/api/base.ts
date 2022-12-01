/* eslint-disable */
// driverの接続部分を記述
import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { ChillnnTrainingError, ErrorCode } from 'chillnn-cleanhack-abr'

/**
 * 型付きのresponseを返す
 * QueryとMutationに用いる
 * @param query
 * @param variables
 */
export async function callApi<U, T>(query: any, variables: T): Promise<U> {
    try {
        const response = (await API.graphql(
            graphqlOperation(query, variables as {})
        )) as GraphQLResult<U>
        return response.data!
        // await statusUpdate(options) // アプリケーションステータスの更新
    } catch (err) {
        const errorCode = (err as any)?.errors?.[0].message as ErrorCode
        throw new ChillnnTrainingError(errorCode)
    }
}
