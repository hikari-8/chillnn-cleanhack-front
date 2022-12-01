<template>
    <div class="auth_signup_container">
        <div>
            <auth-title>メール認証</auth-title>
        </div>
        <div class="input_container">
            <auth-input v-model="email" label="Eメール" class="input_item" />
            <auth-input
                v-model="password"
                label="パスワード"
                type="password"
                class="input_item"
            />
            <auth-input
                v-model="verifyCode"
                label="認証コード"
                class="input_item"
            />
        </div>
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
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// component
import AuthTitle from '@/components/Organisms/Auth/AuthTitle.vue'
import AuthInput from '@/components/Organisms/Auth/AuthInput.vue'
import AppButton from '@/components/Atom/AppButton.vue'
import LinkButton from '@/components/Atom/LinkButton.vue'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    layout: 'auth',
    components: {
        AuthTitle,
        AuthInput,
        AppButton,
        LinkButton,
    },
})
export default class VerifyPage extends Vue {
    public email: string = ''
    public password: string = ''
    public verifyCode: string = ''

    public get disabled() {
        return !this.email || !this.password || !this.verifyCode
    }

    @AsyncLoadingAndErrorHandle()
    public async verifyAndSignIn() {
        await authInteractor.signUpConfirmed(this.email, this.verifyCode)
        await authInteractor.signIn(this.email, this.password)
        this.$router.push({
            name: 'index',
        })
    }

    public created() {
        const email = this.$route.query.email
        const password = this.$route.query.password
        this.email = (typeof email === 'string' && email) || ''
        this.password = (typeof password === 'string' && password) || ''
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
