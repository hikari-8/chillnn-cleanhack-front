<template>
    <div class="auth_signup_container mx-auto p-32 w-600px">
        <div>
            <app-title>新規登録 🎉</app-title>
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
                </div>
            </div>
            <div>
                <div class="button_container mb-2">
                    <app-button :disabled="disabled" @click="authSignUp"
                        >新規登録</app-button
                    >
                </div>
                <div class="link_container">
                    <link-button
                        :to="{
                            name: 'auth-signin',
                            query: { groupID: groupID },
                        }"
                        >アカウントをお持ちの方はこちら</link-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import AuthTitle from '@/components/Organisms/Auth/AuthTitle.vue'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AuthInput from '~/components/Organisms/Auth/UserNameInput.vue'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import LinkButton from '@/components/Atom/LinkButton.vue'
import { authInteractor } from '~/driver/amplify/auth'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppBaseInput from '@/components/Atom/Input/AppBaseInput.vue'

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
export default class SignUpPage extends Vue {
    public email: string = ''
    public password: string = ''
    public groupID: string = ''

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
                groupID: this.groupID,
            },
        })
    }

    public created() {
        const groupID = this.$route.query.groupID
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
