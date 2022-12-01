import { Component, Vue } from 'nuxt-property-decorator'
import { ChillnnTrainingError, ErrorCode } from 'chillnn-cleanhack-abr'
import { authInteractor } from '@/driver/amplify/auth'

/**
 * ABRのinterceptor
 */
@Component({})
class AuthDecorator extends Vue {
    /**
     * 最も下につける
     */
    public Auth() {
        const res: MethodDecorator = (
            _: object,
            __: string | symbol,
            descriptor: PropertyDescriptor
        ) => {
            const method = descriptor.value // もともとのメソッドを退避しておきます。
            descriptor.value = async function () {
                const isSignIn = await authInteractor.isSignIn()
                if (!isSignIn) {
                    if (process.client) {
                        setTimeout(() => {
                            window.location.href = '/auth/signin'
                        }, 1000)
                    }
                    throw new ChillnnTrainingError(
                        ErrorCode.chillnnTraining_401_notSignIn
                    )
                }
                // methodの実行
                const ret = await method.apply(this, arguments)
                // 事後処理
                return ret
            }
        }
        return res
    }
}

export const Auth = new AuthDecorator().Auth()
