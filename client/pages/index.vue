<template>
    <div>
        <div class="">CleanHack</div>
        <div class="">Home</div>
        <br />
        <br />
        <div class="flexbox z-stacking flex">
            <div>
                <!-- ナビゲーションバー -->
                <side-menu :userModel="userModel" />
            </div>

            <div
                class="min-h-full w-[calc(100%-220px)] bg-chillnn-bg-page lg-max:w-full"
            >
                <div class="z-0 min-h-screen">
                    <!-- これ以降編集: ナブバーで切り替わる -->

                    <div
                        v-if="userModel"
                        class="mx-auto py-32 auth_container w-600px"
                    >
                        <div class="font-semibold mb-8 text-2xl">
                            ユーザー設定 👤
                        </div>

                        <!-- ユーザー名 -->
                        <div class="alluser_area mb-14" v-if="userModel">
                            <user-edit
                                :user-model="userModel"
                                label="ユーザー名"
                                :description="true"
                                class="mb-4"
                            />
                            <div class="button_container">
                                <app-button @click="register">更新</app-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- テスト -->
        <app-home :userModel="userModel" />

        <!--ナブバーの実装が完了するまで残す -->
        <div v-if="userModel">
            <app-button class="mt-2">
                <nuxt-link
                    :to="{
                        name: 'user-userID',
                        params: { userID: userModel.userID },
                    }"
                    tag="div"
                    class="link"
                    :userModel="userModel"
                    >Go to your user settings
                </nuxt-link>
            </app-button>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'
import AppButton from '@/components/Atom/Button/AppButton.vue'
import SideMenu from '@/components/Organisms/Home/SideMenu.vue'
import UserEdit from '@/components/Organisms/User/Edit/modules/UserEdit.vue'
import AppUserEdit from '@/components/Organisms/User/Edit/index.vue'
import AppHome from '@/components/Organisms/Home/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

// component
@Component({
    components: {
        AppButton,
        SideMenu,
        UserEdit,
        AppUserEdit,
        AppHome,
    },
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
    }

    @AsyncLoadingAndErrorHandle()
    public async register() {
        if (!this.userModel?.name) {
            return console.error('ユーザー名を入力してください')
        }
        await this.userModel.register()
        this.$emit('registered')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}
</style>
