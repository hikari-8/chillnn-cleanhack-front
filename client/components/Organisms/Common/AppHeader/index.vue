<template>
    <div class="app_header_container">
        <nuxt-link :to="{ name: 'index' }" tag="div" class="left_container">
            <!-- left -->
            <div class="logo">
                <img src="~/assets/img/icon.png" />
            </div>
            <div class="title text-xl font-semibold text-white">
                <div>CLEAN HACK</div>
                <!-- <img src="~/assets/img/CHILLSTAGRAM.png" /> -->
            </div>
        </nuxt-link>

        <!-- <nuxt-link
            :to="{ name: 'user-userID', params: { userID: userModel.userID } }"
            tag="div"
            class="right_container"
        > -->
        <!-- right -->
        <div
            class="right_container edit_button text-sm font-semibold text-white"
        >
            Welcome Back !! {{ name }}さん
        </div>
        <!-- <div class="icon">
            <img :src="userModel.userIcon" />
        </div> -->
        <!-- </nuxt-link> -->
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { UserModel } from 'chillnn-cleanhack-abr'

@Component({})
export default class AppHeader extends Vue {
    @Prop({ required: true }) userModel!: UserModel

    public get name() {
        return this.userModel.name
    }
}
</script>
<style lang="stylus" scoped>
.app_header_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px $sidePaddingPC;
    // background-color: #83E5DF;
    background-color: #4CD9D0;

    // @media only screen and (max-width: $spSize) {
    //     padding: 15px $sidePaddingSP;
    // }

    .left_container {
        display: flex;
        align-items: center;
        height: 50px;
        cursor: pointer;

        .logo {
            width: 30px;
            height: 30px;

            // @media only screen and (max-width: $spSize) {
            //     width: 20px;
            //     height: 20px;
            // }

            img {
                width: 100%;
            }
        }

        .title {
            padding-left: 10px;
            width: 200px;
            height: auto;

            // @media only screen and (max-width: $spSize) {
            //     padding-left: 5px;
            //     width: 100px;
            // }

            img {
                width: 100%;
            }
        }
    }

    .right_container {
        display: flex;
        align-items: center;
        text-align: right;
        cursor: pointer;
        font-size: 14px;

        // @media only screen and (max-width: $spSize) {
        //     font-size: 12px;
        // }

        .icon {
            width: 40px;
            height: 40px;
            padding-left: 10px;
            border-radius: 100px;

            // @media only screen and (max-width: $spSize) {
            //     width: 25px;
            //     height: 25px;
            //     padding-left: 5px;
            //     border-radius: 100px;
            // }

            img {
                object-fit: cover;
                border-radius: 100px;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
