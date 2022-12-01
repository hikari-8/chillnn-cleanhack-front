import { Auth } from '@aws-amplify/auth'
import { Scalars } from 'chillnn-training-abr'

class AuthInteractor {
    public async isSignIn(): Promise<boolean> {
        try {
            await Auth.currentAuthenticatedUser({
                bypassCache: false,
            })
            return true
        } catch (err) {
            return false
        }
    }

    public async signIn(email: Scalars['AWSEmail'], password: string) {
        return await Auth.signIn(email, password)
    }

    public async completeNewPassword(user: any, password: string) {
        return await Auth.completeNewPassword(user, password, {})
    }

    public async signOut() {
        await Auth.signOut()
    }

    public async signUp(email: Scalars['AWSEmail'], password: string) {
        await Auth.signUp({
            username: email,
            password,
        })
    }

    public async signUpConfirmed(
        email: Scalars['AWSEmail'],
        confirmationCode: string
    ) {
        await Auth.confirmSignUp(email, confirmationCode)
    }

    public async signUpResend(email: Scalars['AWSEmail']): Promise<void> {
        await Auth.resendSignUp(email)
    }

    public async resetPassword(
        oldPassword: string,
        newPassword: string
    ): Promise<void> {
        const user = await Auth.currentUserInfo()
        await Auth.changePassword(user, oldPassword, newPassword)
    }

    public async forgotPassword(email: Scalars['AWSEmail']): Promise<void> {
        await Auth.forgotPassword(email)
    }

    public async resetPasswordConfirm(
        email: Scalars['AWSEmail'],
        code: string,
        newPassword: string
    ): Promise<void> {
        await Auth.forgotPasswordSubmit(email, code, newPassword)
    }
}

export const authInteractor = new AuthInteractor()
