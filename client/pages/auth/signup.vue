<template>
    <div class="auth_signup_container">
        <div>
            <auth-title>新規登録</auth-title>
        </div>
        <div class="input_container">
            <auth-input v-model="email" label="Eメール" class="input_item" />
            <auth-input
                v-model="password"
                label="パスワード"
                type="password"
                class="input_item"
            />
        </div>
        <div class="button_container">
            <app-button :disabled="disabled" @click="authSignUp"
                >新規登録</app-button
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
export default class SignUpPage extends Vue {
    public email: string = ''
    public password: string = ''

    public get disabled() {
        return !this.email || !this.password
    }

    @AsyncLoadingAndErrorHandle()
    public async authSignUp() {
        await authInteractor.signUp(this.email, this.password)
        window.alert(
            '認証用のメールを送信しました。認証コードをご確認ください。'
        )
        this.$router.push({
            name: 'auth-verify',
            query: {
                email: this.email,
                password: this.password,
            },
        })
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
