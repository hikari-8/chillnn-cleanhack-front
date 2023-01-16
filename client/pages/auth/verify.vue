<template>
    <div class="auth_signup_container">
        <div>
            <app-title>メール認証</app-title>
        </div>
        <!-- input areas -->
        <div>
            <div class="flex justify-center">
                <div class="">
                    <div class="label font-semibold mb-4">Eメール</div>
                    <app-base-input v-model="email" class="mb-4 w-96" />
                    <div class="label font-semibold mb-4 w-96">パスワード</div>
                    <app-base-input
                        v-model="password"
                        type="password"
                        class="mb-4"
                    />
                    <div class="label font-semibold mb-4 w-96">認証コード</div>
                    <app-base-input v-model="verifyCode" class="mb-4" />
                </div>
            </div>
            <div>
                <div class="button_container">
                    <app-button :disabled="disabled" @click="verifyAndSignIn"
                        >認証</app-button
                    >
                </div>
                <div class="link_container">
                    <link-button :to="{ name: 'auth-signin' }"
                        >アカウントをお持ちの方はこちら</link-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import { UserModel } from 'chillnn-cleanhack-abr'

// component
import AuthTitle from '@/components/Organisms/Auth/AuthTitle.vue'
import AuthInput from '~/components/Organisms/Auth/UserNameInput.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import LinkButton from '@/components/Atom/LinkButton.vue'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    layout: 'auth',
    components: {
        AuthTitle,
        AppTitle,
        AuthInput,
        AppButton,
        LinkButton,
        AppBaseInput,
    },
})
export default class VerifyPage extends Vue {
    public email: string = ''
    public password: string = ''
    public verifyCode: string = ''
    public groupID: string = ''

    public get disabled() {
        return !this.email || !this.password || !this.verifyCode
    }

    @AsyncLoadingAndErrorHandle()
    public async verifyAndSignIn() {
        await authInteractor.signUpConfirmed(this.email, this.verifyCode)
        await authInteractor.signIn(this.email, this.password)
        if (this.groupID === '') {
            this.$router.push({
                name: 'index',
            })
        } else {
            this.$router.push({
                name: 'group',
                params: { groupID: this.groupID },
            })
        }
    }

    public created() {
        const email = this.$route.query.email
        const password = this.$route.query.password
        const groupID = this.$route.query.groupID
        this.email = (typeof email === 'string' && email) || ''
        this.password = (typeof password === 'string' && password) || ''
        this.groupID = (typeof groupID === 'string' && groupID) || ''
    }
}
</script>
<style lang="stylus" scoped>
.auth_signup_container {
    padding: 80px 80px 60px;

    @media only screen and (max-width: $spSize) {
        padding: 50px 20px;
    }

    .input_container {
        .input_item {
            padding-bottom: 20px;
        }
    }

    .button_container {
        padding: 10px 0;
        text-align: center;
    }

    .link_container {
        text-align: center;
    }
}
</style>
