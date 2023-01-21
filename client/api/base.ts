// driverの接続部分を記述
import { API, graphqlOperation } from '@aws-amplify/api'
import { GraphQLResult } from '@aws-amplify/api'
import { ChillnnTrainingError, ErrorCode } from 'chillnn-cleanhack-abr'
/**
 * 型付きのresponseを返す
 * QueryとMutationに用いる
 * @param query
 * @param variables
 */
export async function callApi<U, T>(query: any, variables: T): Promise<U> {
    let res: U
    // queryの内容は、fetchMyUserMastになっているが、 variablesには不特定のJSプリミティブオブジェクトがそのまま入っている
    try {
        const response = (await API.graphql(
            graphqlOperation(query, variables)
        )) as GraphQLResult<U>
        res = response.data!
        console.log('callAPI内のresponse', response)
        // await statusUpdate(options) // アプリケーションステータスの更新
    } catch (err) {
        console.error(err)
        const errorCode = (err as any)?.errors?.[0].message as ErrorCode
        throw new ChillnnTrainingError(errorCode)
    }
    return res
}
