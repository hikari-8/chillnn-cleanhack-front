<template>
    <!-- 一旦、user/index.vueで作って、cognito周りができたら_userIDにつなげる -->
    <div class="user_detail_container">
        <!-- 管理者のみアクセスできる -->
        <div>マスターデータ</div>
        <div class="mx-auto py-32 auth_container">
            <auth-input v-model="name" label="グループ名" class="input_item" />
            <div class="font-semibold">掃除場所登録</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppTitle from '@/components/Atom/Text/AppTitle.vue'
import AuthInput from '~/components/Organisms/Auth/InlineTypeInput.vue'
import AppInput from '@/components/Atom/AppInput.vue'
// import { UserModel } from 'chillnn-cleanhack-abr'
// import { userInteractor } from '~/api'
// component

@Component({
    components: {
        AppTitle,
        AuthInput,
        AppInput,
    },
})
export default class UserPage extends Vue {
    // public myUserModel: UserModel | null = null
    // public userModel: UserModel | null = null
    public name: string = ''
    // public isShowModal: boolean = false
    // public async created() {
    //     const userID = this.$route.params.userID
    //     this.myUserModel = await userInteractor.fetchMyUserModel()
    //     this.userModel = await userInteractor.fetchUserModelByUserID(userID)
    // }
    // public get isMyPage() {
    //     return (
    //         this.myUserModel &&
    //         this.myUserModel.userID === this.$route.params.userID
    //     )
    // }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}

.user_detail_container {
    padding: 50px 0;

    .user_icon_wrapper {
        margin: 50px auto 50px;

        @media only screen and (max-width: $spSize) {
            margin: 0 auto;
        }
    }

    .image_table_wrapper {
        margin-top: 50px;
        border-top: 1px solid $borderColor;
        display: flex;
        flex-wrap: wrap;

        .image_card_item {
            width: 32%;
            margin-top: 10px;
            margin-right: 2%;

            @media only screen and (max-width: $spSize) {
                margin-top: 10px;
            }

            &.three {
                margin-right: 0;
            }
        }
    }

    .button_container {
        position: fixed;
        right: 10%;
        bottom: 10%;

        @media only screen and (max-width: $spSize) {
            right: 20px;
            bottom: 20px;
        }

        .button {
            cursor: pointer;
            width: 50px;
            height: 50px;
            border-radius: 30px;
            box-shadow: 0 0 10px 0 $shadowColor;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            font-size: 24px;
        }
    }
}
</style>
