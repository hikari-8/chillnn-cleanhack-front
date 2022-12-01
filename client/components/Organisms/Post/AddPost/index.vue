<template>
    <div class="image_add_container">
        <div class="image">
            <img v-if="base64" :src="base64" class="image_item" />
            <div v-else class="image_item_blanc">
                ここをクリックして画像をアップロード
            </div>
            <input class="image_input" type="file" @change="getImageFile" />
        </div>
        <div class="caption">
            <!-- {{ postModel.description }} -->
            <div class="input_description_wapper">
                <div>キャプション</div>
                <textarea
                    v-model="postModel.description"
                    class="input_description"
                    placeholder=" キャプションを書く"
                ></textarea>
            </div>
        </div>
        <div class="button">
            <app-button :disabled="!base64" @click="register">Share</app-button>
        </div>
    </div>
</template>
<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/AppButton.vue'
// import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
// import { HTMLInputEvent, getImage } from '~/util/imageUtil'

@Component({
    components: {
        AppButton,
    },
})
export default class AddPost extends Vue {
    // @Prop({ required: true }) postModel!: PostModel
    public base64: string = ''

    // get description() {
    //     return this.postModel.description
    // }

    // set description(input: string) {
    //     this.postModel.description = input
    //     console.log(this.postModel.description)
    // }

    // @AsyncLoadingAndErrorHandle()
    // public async getImageFile(e: HTMLInputEvent) {
    //     const image = await getImage(e) // resizeしている
    //     this.base64 = image.base64
    //     await this.postModel.setImage(image.file)
    // }

    // @AsyncLoadingAndErrorHandle()
    // public async register() {
    //     await this.postModel.register()
    //     this.$emit('registered')
    // }
}
</script>
<style lang="stylus" scoped>
.image_add_container {
    .image {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;

        .image_item {
            width: 300px;
            height: 300px;
        }

        img {
            object-fit: cover;
        }

        .image_item_blanc {
            box-sizing: border-box;
            border-radius: 5px;
            width: 300px;
            height: 300px;
            border: solid 1px $borderColor;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $backgroundColor;
            font-size: 14px;

            @media only screen and (max-width: $spSize) {
                font-size: 10px;
            }
        }

        .image_input {
            position: absolute;
            display: inline-block;
            top: 0;
            left: calc(50% - 150px);
            width: 300px;
            height: 300px;
            border-width: inherit;
            border-width: inherit;
            cursor: pointer;
            opacity: 0;

            @media only screen and (max-width: $spSize) {
                width: 300px;
                height: 300px;
                left: calc(50% - 150px);
            }
        }
    }

    .caption {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1rem;

        .input_description_wapper {
            margin-left: auto;
            margin-right: auto;

        }

        .input_description {
            width: 300px;
            border-radius: 0.375rem;
            border-width: 2px;
        }
    }

    .button {
        margin: 20px auto 0;
        display: inline-block;
        text-align: center;
        width: 100%;
    }
}
</style>
