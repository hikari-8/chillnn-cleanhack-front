<template>
    <!-- ナビゲーションバーの切り替えが難しいので、ここに一旦全てを書いています -->
    <div>
        <div class="flexbox z-stacking flex" v-if="userModel">
            <!-- ナビゲーションバー -->
            <div class="overflow-hidden border-r border-gray-200 shadow-md">
                <div v-if="userModel" class="side_menu_container max-w-sm">
                    <side-menu-template :showSideMenu="showSideMenu">
                        <template>
                            <div class="logo_container p-4 text-center title">
                                <div class="text-xl font-semibold mt-8">
                                    CLEAN HACK
                                </div>
                            </div>
                            <div class="side-menu__logo">
                                <nuxt-link :to="{ name: 'index' }">
                                    <img src="~/assets/img/logo.png" />
                                </nuxt-link>
                            </div>

                            <!-- ホーム -->
                            <div
                                class="content-menu flex"
                                @click="showBody('home')"
                                v-bind:class="{ active: show == '0' }"
                            >
                                <div class="icon mr-2">
                                    <img
                                        src="@/assets/img/icon/home.svg"
                                        class="w-6 h-6 flex-shrink-0"
                                    />
                                </div>
                                <app-side-menu-content
                                    title="ホーム"
                                    text="ホーム"
                                />
                            </div>

                            <!-- くじ -->
                            <div class="flex flex-shrink-0">
                                <div class="icon mr-2 mt-5 md:mt-4">
                                    <img
                                        class="w-6 h-6 flex-shrink-0"
                                        src="@/assets/img/icon/raffle.svg"
                                    />
                                </div>
                                <div class="">
                                    <app-side-menu-summary
                                        title="くじ"
                                        text="くじ"
                                    >
                                        <app-side-menu-sub-content
                                            title="くじをひく"
                                            text="くじをひく"
                                        />
                                        <div
                                            @click="showBody('rEffective')"
                                            v-bind:class="{
                                                active: show == 'rEffective',
                                            }"
                                        >
                                            <app-side-menu-sub-content
                                                title="くじを発行する"
                                                text="くじを発行する"
                                            />
                                        </div>
                                        <div
                                            @click="showBody('rSettings')"
                                            v-bind:class="{
                                                active: show == 'rSettings',
                                            }"
                                        >
                                            <app-side-menu-sub-content
                                                title="くじを設定する"
                                                text="くじを設定する"
                                            />
                                        </div>
                                    </app-side-menu-summary>
                                </div>
                            </div>

                            <!-- グループ -->
                            <div
                                class="content-menu flex"
                                @click="showBody('group')"
                                v-bind:class="{ active: show == 'group' }"
                            >
                                <div class="icon mr-2">
                                    <img
                                        class="w-6 h-6 flex-shrink-0"
                                        src="@/assets/img/icon/group-icon.svg"
                                    />
                                </div>
                                <app-side-menu-content
                                    title="グループ"
                                    text="グループ"
                                />
                                <span
                                    class="inline-flex items-center justify-center px-2 ml-12 text-sm font-medium text-gray-800 bg-gray-200 rounded-full"
                                    >Admin</span
                                >
                            </div>

                            <ul
                                class="pt-4 mt-6 space-y-2 border-t border-gray-200"
                            />
                            <!-- **************************************************************** -->

                            <!-- ユーザー設定 -->
                            <nuxt-link
                                :to="{
                                    name: 'user-userID',
                                    params: { userID: userModel.userID },
                                }"
                                class="link"
                                :userModel="userModel"
                            >
                                <div
                                    class="flex"
                                    v-if="userModel"
                                    @click="showBody('user')"
                                    v-bind:class="{ active: show == 'user' }"
                                >
                                    <div class="icon mr-2">
                                        <img
                                            class="w-6 h-6 flex-shrink-0"
                                            src="@/assets/img/icon/user-circle.svg"
                                        />
                                    </div>
                                    <app-side-menu-content
                                        title="ユーザー設定"
                                        text="ユーザー設定"
                                    />
                                </div>
                            </nuxt-link>

                            <!-- Signin -->
                            <div class="content-menu flex">
                                <div class="icon mr-2">
                                    <img
                                        class="w-6 h-6 flex-shrink-0"
                                        src="@/assets/img/icon/login.svg"
                                    />
                                </div>
                                <app-side-menu-content
                                    title="ログイン"
                                    text="ログイン"
                                    routeName="auth-signin"
                                />
                            </div>

                            <!-- Signup -->
                            <div class="content-menu flex">
                                <div class="icon mr-2">
                                    <img
                                        class="w-6 h-6 flex-shrink-0"
                                        src="@/assets/img/icon/plus.svg"
                                    />
                                </div>
                                <app-side-menu-content
                                    title="新規登録"
                                    text="新規登録"
                                    routeName="auth-signup"
                                />
                            </div>
                        </template>
                    </side-menu-template>
                </div>
            </div>

            <!-- ******************************************************************************************************** -->
            <!-- 切り替わるBody -->
            <div
                class="min-h-full w-[calc(100%-220px)] bg-chillnn-bg-page lg-max:w-full"
            >
                <div class="z-0">
                    <!-- これ以降編集: ナブバーで切り替わる -->
                    <home-body v-if="show == 'home'" :userModel="userModel" />
                    <app-user-edit
                        v-if="show == 'user'"
                        :userModel="userModel"
                    />
                    <app-group-edit
                        v-if="show == 'group'"
                        :groupModel="groupModel"
                        :userModel="userModel"
                    />
                    <app-task-edit
                        v-if="show == 'rSettings'"
                        :userModel="userModel"
                        :taskMasterObjectModel="taskMasterObjectModel"
                    />
                    <app-raffle-edit
                        v-if="show == 'rEffective'"
                        :userModel="userModel"
                        :taskMasterObjectModel="taskMasterObjectModel"
                    />
                    <div v-if="show == '2'">ホームがおされたよ</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import {
    GroupModel,
    UserModel,
    TaskMasterObjectModel,
} from 'chillnn-cleanhack-abr'
// components
import AppSideMenuSummary from '@/components/Organisms/Common/SideMenu/AppSideMenuSummary.vue'
import AppSideMenuContent from '@/components/Organisms/Common/SideMenu/AppSideMenuContent.vue'
import AppSideMenuSubContent from '@/components/Organisms/Common/SideMenu/AppSideMenuSubContent.vue'
import SideMenuTemplate from '~/components/Organisms/Common/SideMenu/SidemenuTemplate.vue'
import AppText from '@/components/Atom/Text/AppText.vue'
import AppUserEdit from '@/components/Organisms/User/Edit/index.vue'
import AppGroupEdit from '@/components/Organisms/Group/index.vue'
import HomeBody from '@/components/Organisms/Home/modules/HomeBody.vue'
import AppTaskEdit from '@/components/Organisms/Task/index.vue'
import AppRaffleEdit from '@/components/Organisms/Raffle/index.vue'
@Component({
    components: {
        AppSideMenuSummary,
        AppSideMenuContent,
        AppSideMenuSubContent,
        SideMenuTemplate,
        AppText,
        AppUserEdit,
        AppGroupEdit,
        HomeBody,
        AppTaskEdit,
        AppRaffleEdit,
    },
})
export default class AppHome extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    @Prop({ required: true }) taskMasterObjectModel!: TaskMasterObjectModel
    public showSideMenu: boolean = true
    public isHome: boolean = true
    public loaded: boolean = false
    public userPageLink: string = ''
    public show: string = 'home'

    public get myLink() {
        if (this.userModel) {
            const myUserID = this.userModel.userID
            this.userPageLink = 'user' + myUserID
            console.log(this.userPageLink)
            return this.userPageLink
        }
    }

    public get iSAdmin() {
        if (this.userModel.role === 'admin') {
            return true
        }
    }

    public showBody(num: string) {
        this.show = num
    }
}
</script>

<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}

.title {
  color: #4CD9D0;
}
.side_menu_container {
    border-right: 1px solid $background-layer-color-10;
    z-index: 81;
    min-width: 220px;
    width: 250px
    padding: 20px;
    box-sizing: border-box;

    .divider {
        width: 100%;
        margin: 10px 0 0;
        border-bottom: 1px solid $boundaryBlack;

        &.space-t {
            // margin-top: 20px;
        }
    }

    .content-menu {
        margin-top: 15px;
    }

    .side-menu__logo {
        margin: 0 auto;
        z-index: 5;
        margin: 30px 0;

        & img {
            margin: 0 auto;
            width: 50%;
            height: auto;
        }
    }




    .request_num {
        position: absolute;
        top: 14px;
        right: 0px;
        background-color: #DA9293;
        font-size: 10px;
        width: 18px;
        height: 18px;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: white;
    }

    .side-menu__side-menu-button-block {
        position: absolute;
        display: none;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
    }

    .side_menu_copyright {
        font-size: 10px;
        text-align: left;
        margin: 0 0 100px 0;
    }

    .side_menu_version {
        border-top: 1px solid $boundaryBlack;
        font-size: 10px;
        color: #b5b5b5;
        position: sticky;
        bottom: 0;
        padding: 5px 0 10px 3px;
        margin: 0;
        background-color: $color-background-sidemenu;
    }

    .side-menu__sub-content-block {
        margin: 80px 0 15px 0;

        @media only screen and (max-width: 1023px) {
            margin: 20px;
        }
    }

    .side-menu__sub-content {
        margin: 8px 0;
        font-size: 12px;

        @media only screen and (max-width: 1023px) {
            margin: 0px;
        }
    }

    .side-menu__log-out {
        text-decoration: none;
        cursor: pointer;
        margin: 8px 0;
    }

    .side-menu__about-us {
        text-decoration: none;
        cursor: pointer;
        margin: 8px 0;
    }
}

.modal_wrapper {
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
