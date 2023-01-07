<template>
    <div class="auth_signin_container mx-auto p-32 w-600px">
        <div>
            <app-title>ログイン 🏃</app-title>
        </div>
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
                <div class="button_container flex justify-center">
                    <app-button :disabled="disabled" @click="signIn"
                        >ログイン</app-button
                    >
                </div>
                <div class="link_container flex justify-center">
                    <link-button :to="{ name: 'auth-signup' }"
                        >アカウントをお持ちでない方はこちら</link-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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
        AppBaseInput,
        AuthInput,
        AppButton,
        LinkButton,
    },
})
export default class SignInPage extends Vue {
    public email: string = ''
    public password: string = ''

    public get disabled() {
        return !this.email || !this.password
    }

    @AsyncLoadingAndErrorHandle()
    public async signIn() {
        await authInteractor.signIn(this.email, this.password)
        // console.log((this.email, this.password))
        this.$router.push({
            name: 'index',
        })
        // console.log((this.email, this.password))
    }
}
</script>
<style lang="stylus" scoped>
.auth_signin_container {
    padding: 80px 80px 60px;

    @media only screen and (max-width: $spSize) {
        padding: 50px 20px;
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
