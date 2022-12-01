import {
    ICommentMastRepository,
    CommentMast,
    CommentMastRepositoryCacheAdaptor,
} from 'chillnn-cleanhack-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddCommentMutation,
    AddCommentMutationVariables,
    // DeleteCommentMutation,
    // DeleteCommentMutationVariables,
    // FetchCommentByCommentIDQuery,
    // FetchCommentByCommentIDQueryVariables,
    FetchCommentsByPostIDQuery,
    FetchCommentsByPostIDQueryVariables,
} from '~/driver/amplify/graphql/API'

class GraphqlCommentMastRepository implements ICommentMastRepository {
    async addComment(input: CommentMast): Promise<CommentMast> {
        return (
            await callApi<AddCommentMutation, AddCommentMutationVariables>(
                mutation.addComment,
                {
                    input,
                }
            )
        ).addComment
    }

    // async deleteComment(commentID: string): Promise<CommentMast> {
    //     return (
    //         await callApi<
    //             DeleteCommentMutation,
    //             DeleteCommentMutationVariables
    //         >(mutation.deleteComment, {
    //             commentID,
    //         })
    //     ).deleteComment
    // }

    async fetchCommentsByPostID(postID: string): Promise<CommentMast[]> {
        return (
            await callApi<
                FetchCommentsByPostIDQuery,
                FetchCommentsByPostIDQueryVariables
            >(query.fetchCommentsByPostID, {
                postID,
            })
        ).fetchCommentsByPostID
    }

    // async fetchCommentByCommentID(
    //     commentID: string
    // ): Promise<CommentMast | null> {
    //     return (
    //         (
    //             await callApi<
    //                 FetchCommentByCommentIDQuery,
    //                 FetchCommentByCommentIDQueryVariables
    //             >(query.fetchCommentByCommentID, {
    //                 commentID,
    //             })
    //         ).fetchCommentByCommentID || null
    //     )
    // }
}

export const commentMastRepository = new CommentMastRepositoryCacheAdaptor(
    new GraphqlCommentMastRepository()
)
