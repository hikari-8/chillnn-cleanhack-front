<template>
    <div>
        <div
            v-if="userModel"
            class="side_menu_container max-w-sm p-6 border-r border-gray-200 shadow-md overflow-hidden"
        >
            <side-menu-template :showSideMenu="showSideMenu">
                <template>
                    <div class="side-menu__logo">
                        <nuxt-link :to="{ name: 'index' }">
                            <img src="~/assets/img/icon.png" />
                        </nuxt-link>
                    </div>

                    <!-- ホーム -->
                    <div class="content-menu flex">
                        <div class="icon mr-2">
                            <svg
                                aria-hidden="true"
                                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    fill="#000000"
                                    d="M21.66,10.25l-9-8a1,1,0,0,0-1.32,0l-9,8a1,1,0,0,0-.27,1.11A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.93-.64A1,1,0,0,0,21.66,10.25ZM13,20H11V17a1,1,0,0,1,2,0Zm5,0H15V17a3,3,0,0,0-6,0v3H6V12H18ZM5.63,10,12,4.34,18.37,10Z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <app-side-menu-content
                            title="ホーム"
                            text="ホーム"
                            routeName="auth-signin"
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
                            <app-side-menu-summary title="くじ" text="くじ">
                                <app-side-menu-sub-content
                                    title="くじをひく"
                                    text="くじをひく"
                                />
                                <app-side-menu-sub-content
                                    title="くじを発行する"
                                    text="くじを発行する"
                                />
                                <app-side-menu-sub-content
                                    title="くじを設定する"
                                    text="くじを設定する"
                                />
                            </app-side-menu-summary>
                        </div>
                    </div>

                    <!-- グループ -->
                    <div class="content-menu flex">
                        <div class="icon mr-2">
                            <svg
                                aria-hidden="true"
                                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    fill="#000000"
                                    d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <app-side-menu-content
                            title="グループ"
                            text="グループ"
                            routeName="auth-signin"
                        />
                        <span
                            class="inline-flex items-center justify-center px-2 ml-12 text-sm font-medium text-gray-800 bg-gray-200 rounded-full"
                            >Admin</span
                        >
                    </div>

                    <ul class="pt-4 mt-6 space-y-2 border-t border-gray-200" />

                    <!-- ユーザー設定 -->
                    <nuxt-link
                        :to="{
                            name: 'user-userID',
                            params: { userID: userModel.userID },
                        }"
                        class="link"
                        :userModel="userModel"
                    >
                        <div class="flex" v-if="userModel">
                            <div class="icon mr-2">
                                <svg
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        fill="#000000"
                                        d="M12,2A10,10,0,0,0,4.65,18.76h0a10,10,0,0,0,14.7,0h0A10,10,0,0,0,12,2Zm0,18a8,8,0,0,1-5.55-2.25,6,6,0,0,1,11.1,0A8,8,0,0,1,12,20ZM10,10a2,2,0,1,1,2,2A2,2,0,0,1,10,10Zm8.91,6A8,8,0,0,0,15,12.62a4,4,0,1,0-6,0A8,8,0,0,0,5.09,16,7.92,7.92,0,0,1,4,12a8,8,0,0,1,16,0A7.92,7.92,0,0,1,18.91,16Z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
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
                            <svg
                                aria-hidden="true"
                                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    fill="#000000"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
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
                            <svg
                                aria-hidden="true"
                                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    fill="#000000"
                                    d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-cleanhack-abr'
// components
import AppSideMenuSummary from '@/components/Organisms/Common/SideMenu/AppSideMenuSummary.vue'
import AppSideMenuContent from '@/components/Organisms/Common/SideMenu/AppSideMenuContent.vue'
import AppSideMenuSubContent from '@/components/Organisms/Common/SideMenu/AppSideMenuSubContent.vue'
import SideMenuTemplate from '~/components/Organisms/Common/SideMenu/SidemenuTemplate.vue'
import AppText from '@/components/Atom/Text/AppText.vue'

@Component({
    components: {
        AppSideMenuSummary,
        AppSideMenuContent,
        AppSideMenuSubContent,
        SideMenuTemplate,
        AppText,
    },
})
export default class SideMenu extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    public showSideMenu: boolean = true
    public isHome: boolean = true
    public loaded: boolean = false
    public userPageLink: string = ''

    public get myLink() {
        if (this.userModel) {
            const myUserID = this.userModel.userID
            this.userPageLink = 'user' + myUserID
            return this.userPageLink
        }
    }

    public get iSAdmin() {
        if (this.userModel.role === 'admin') {
            return true
        }
    }
}
</script>

<style lang="stylus" scoped>
.side_menu_container {
    border-right: 1px solid $background-layer-color-10;
    z-index: 81;
    min-width: 220px;
    width: 250px
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;

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
