<template>
    <div class="icon_container">
        <div class="icon">
            <!-- icon -->
            <img :src="userIconUrl" />
            <input class="image_input" type="file" @change="getImageFile" />
        </div>
        <div class="name">
            <!-- name -->
            <div class="name_inner">
                <app-input v-model="userModel.name" class="input" />
                <div>さん</div>
            </div>
        </div>
        <div class="introduce">
            <!-- introduce -->
            <div class="introduce_wapper">
                <div>自己紹介</div>
                <app-input
                    v-model="userModel.introduce"
                    class="input_introduce"
                    placeholder=" 自己紹介を書く"
                ></app-input>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import AppInput from '@/components/Atom/AppInput.vue'
// import { getImage, HTMLInputEvent } from '~/util/imageUtil'
// import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        AppInput,
    },
})
export default class UserEdit extends Vue {
    @Prop({ required: true }) userModel!: UserModel

    get userName() {
        return this.userModel.name
    }

    // @AsyncLoadingAndErrorHandle()
    // public async getImageFile(e: HTMLInputEvent) {
    //     const image = await getImage(e) // resizeしている
    //     await this.userModel.setIcon(image.file)
    // }
}
</script>
<style lang="stylus" scoped>
.icon_container {
    .icon {
        text-align: center;
        position: relative;

        img {
            box-shadow: 0 0 5px $shadowColor;
            border-radius: 10000px;
            width: 200px;
            height: 200px;
            object-fit: cover;

            @media only screen and (max-width: $spSize) {
                width: 100px;
                height: 100px;
            }
        }

        .image_input {
            position: absolute;
            display: inline-block;
            top: 0;
            left: calc(50% - 100px);
            width: 200px;
            height: 200px;
            border-width: inherit;
            border-width: inherit;
            cursor: pointer;
            opacity: 0;

            @media only screen and (max-width: $spSize) {
                width: 100px;
                height: 100px;
                left: calc(50% - 50px);
            }
        }
    }

    .name {
        padding-top: 10px;
        text-align: center;
        font-size: 14px;

        .name_inner {
            display: flex;
            justify-content: center;
            align-items: center;

            .input {
                box-sizing: border-box;
                width: 70%;
                padding-right: 5px;
            }
        }
    }

    .introduce {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        padding: 10px 0px;
        font-size: 14px;


        .introduce_wapper {

            margin-left: auto;
            margin-right: auto;
        }

            .input_introduce {
                border: 1px solid $borderColor;
                box-sizing: border-box;
                width: 75%;
                box-shadow: 0 0 5px $shadowColor;
            }
    }
}
</style>
