import {
    ModelFactory,
    RepositoryContainer,
    UserUsecase,
} from 'chillnn-cleanhack-abr'
import { postMastRepository } from './modules/GraphqlPostMastRepository'
import { commentMastRepository } from './modules/GraphqlCommentMastRepository'
import { userMastRepository } from './modules/GraphqlUserMastRepository'
import { s3Repository } from './modules/S3Repository'

const repositoryContainer = new RepositoryContainer(
    s3Repository,
    postMastRepository,
    userMastRepository,
    commentMastRepository
)

const modelFactory = new ModelFactory(repositoryContainer)

export const userInteractor = new UserUsecase(repositoryContainer, modelFactory)
