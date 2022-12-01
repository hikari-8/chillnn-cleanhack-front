import { Storage } from '@aws-amplify/storage'
import { S3Object } from 'chillnn-training-abr'
import { awsmobile } from '~/plugins/amplify'

class StorageInteractor {
    public async uploadPublicImg(
        path: string, //
        file: File,
        fileName: string
    ): Promise<S3Object> {
        const suffix: string = file.name.split('.').pop()!
        // 画像のupload
        await Storage.put(`${path}/${fileName}.${suffix}`, file, {
            level: 'public',
            cacheControl: 'public, max-age=86400',
        })
        // s3objectの返信
        return {
            bucket: awsmobile.Storage.AWSS3.bucket,
            key: `public/${path}/${fileName}.${suffix}`,
            region: awsmobile.Storage.AWSS3.region,
            url: `${awsmobile.Storage.AWSS3.baseUrl}/public/${path}/${fileName}.${suffix}`,
        }
    }
}

export const storageInteractor = new StorageInteractor()
