import { IS3Repository, S3Object } from 'chillnn-cleanhack-abr'
import { storageInteractor } from '~/driver/amplify/storage'

class S3Repository implements IS3Repository {
    fetchObject<T>(_s3Object: S3Object): Promise<T> {
        throw new Error('Method not implemented.')
    }

    addFile(uniquePath: string, file: File): Promise<S3Object> {
        return storageInteractor.uploadPublicImg(
            uniquePath,
            file,
            `${new Date().getTime()}`
        )
    }

    getSampleImage(): S3Object {
        return {
            key: '',
            bucket: '',
            url: 'https://picsum.photos/300/300',
            region: '',
        }
    }
}

export const s3Repository = new S3Repository()
