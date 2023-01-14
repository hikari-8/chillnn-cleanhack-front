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
                <div class="button_container flex justify-center mb-2">
                    <app-button :disabled="disabled" @click="signIn"
                        >ログイン</app-button
                    >
                </div>
                <div class="link_container flex justify-center">
                    <link-button
                        :to="{
                            name: 'auth-signup',
                            query: { groupID: groupID },
                        }"
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
    public groupID: string = ''

    public get disabled() {
        return !this.email || !this.password
    }

    @AsyncLoadingAndErrorHandle()
    public async signIn() {
        await authInteractor.signIn(this.email, this.password)
        // console.log((this.email, this.password))
        console.log(this.groupID, 'push前のgourpID')
        if (this.groupID === '' || this.groupID == undefined) {
            console.log('indexに分岐しました')
            this.$router.push({
                name: 'index',
            })
        } else {
            console.log('groupIDに分岐しました')
            this.$router.push({
                name: 'group-groupID',
                params: { groupID: this.groupID },
            })
        }
        // console.log((this.email, this.password))
    }

    public created() {
        console.log('signin.vueです')
        console.log(
            'signin内のthis.$route.query.groupID',
            this.$route.query.groupID
        )
        const groupID = this.$route.query.groupID
        console.log('signin内のgroupID', groupID)
        this.groupID = (typeof groupID === 'string' && groupID) || ''
        console.log('signin内のthis.groupID', this.groupID)
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
