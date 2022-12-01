import {
    ModelFactory,
    RepositoryContainer,
    UserUsecase,
} from 'chillnn-cleanhack-abr'
import { groupMastRepository } from './modules/GraphqlGroupMastRepository'
import { taskMasterObjectRepository } from './modules/GraphqlTaskMasterObjectRepository'
import { raffleObjectRepository } from './modules/GraphqlRaffleObjectRepository'
import { userMastRepository } from './modules/GraphqlUserMastRepository'
import { s3Repository } from './modules/S3Repository'

const repositoryContainer = new RepositoryContainer(
    s3Repository,
    userMastRepository,
    taskMasterObjectRepository,
    raffleObjectRepository,
    groupMastRepository
)

const modelFactory = new ModelFactory(repositoryContainer)

export const userInteractor = new UserUsecase(repositoryContainer, modelFactory)
