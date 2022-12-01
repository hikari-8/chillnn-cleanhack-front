import {
    IPostMastRepository,
    PostMast,
    PostMastRepositoryCacheAdaptor,
} from 'chillnn-cleanhack-abr'
import { callApi } from '../base'
import * as query from '@/driver/amplify/graphql/queries'
import * as mutation from '@/driver/amplify/graphql/mutations'
import {
    AddPostMutation,
    AddPostMutationVariables,
    DeletePostMutation,
    DeletePostMutationVariables,
    FetchPostByPostIDQuery,
    FetchPostByPostIDQueryVariables,
    FetchPostsByOwnerUserIDQuery,
    FetchPostsByOwnerUserIDQueryVariables,
} from '~/driver/amplify/graphql/API'

class GraphqlPostMastRepository implements IPostMastRepository {
    async addPost(input: PostMast): Promise<PostMast> {
        return (
            await callApi<AddPostMutation, AddPostMutationVariables>(
                mutation.addPost,
                {
                    input,
                }
            )
        ).addPost
    }

    async deletePost(postID: string): Promise<PostMast> {
        return (
            await callApi<DeletePostMutation, DeletePostMutationVariables>(
                mutation.deletePost,
                {
                    postID,
                }
            )
        ).deletePost
    }

    async fetchPostsByOwnerUserID(userID: string): Promise<PostMast[]> {
        return (
            await callApi<
                FetchPostsByOwnerUserIDQuery,
                FetchPostsByOwnerUserIDQueryVariables
            >(query.fetchPostsByOwnerUserID, {
                userID,
            })
        ).fetchPostsByOwnerUserID
    }

    async fetchPostByPostID(postID: string): Promise<PostMast | null> {
        return (
            (
                await callApi<
                    FetchPostByPostIDQuery,
                    FetchPostByPostIDQueryVariables
                >(query.fetchPostByPostID, {
                    postID,
                })
            ).fetchPostByPostID || null
        )
    }
}

export const postMastRepository = new PostMastRepositoryCacheAdaptor(
    new GraphqlPostMastRepository()
)
