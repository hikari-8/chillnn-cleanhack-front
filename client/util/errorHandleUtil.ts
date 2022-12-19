import { ChillnnTrainingError } from 'chillnn-cleanhack-abr'
import { IInfoObject } from '~/store/modules/info'

export function errorHandle(err: ChillnnTrainingError): IInfoObject {
    if (process.env.ENV === 'dev' || !process.env.ENV) {
        // tslint:disable-next-line: no-console
        // eslint-disable-next-line no-console
        console.error(err)
        console.error('errorHandleのprocess.env:', process.env)
    }
    return {
        type: 'ERROR',
        errCode: err.chillnnErrorCode,
        message: err.getMessage(),
    }
}
