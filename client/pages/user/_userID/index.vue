<template>
    <div class="user_detail_container">
        <div v-if="userModel" class="user_icon_wrapper">
            <!-- icon -->
            <user-icon :user-model="userModel" :show-edit="isMyPage" />
        </div>
        <div class="image_table_wrapper">
            <!-- images -->
            <div
                v-for="(postModel, idx) in postModels"
                :key="postModel.postID"
                class="image_card_item"
                :class="{ three: !((1 + idx) % 3) }"
            >
                <post-card :post-model="postModel" />
            </div>
        </div>
        <div v-show="isMyPage" class="button_container">
            <div class="button" @click="openModal">＋</div>
        </div>
        <app-model v-model="isShowModal">
            <add-post
                v-if="blancPost"
                :post-model="blancPost"
                @registered="registered"
            />
        </app-model>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PostModel, UserModel, CommentModel } from 'chillnn-training-abr'
import { userInteractor } from '~/api'
// component
import UserIcon from '@/components/Organisms/User/Icon/index.vue'
import PostCard from '@/components/Organisms/Post/Card/index.vue'
import AppModel from '@/components/Organisms/Common/AppModal/index.vue'
import AddPost from '@/components/Organisms/Post/AddPost/index.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'

@Component({
    components: {
        UserIcon,
        PostCard,
        AppModel,
        AddPost,
    },
})
export default class UserPage extends Vue {
    public myUserModel: UserModel | null = null
    public userModel: UserModel | null = null
    public commentModel: CommentModel | null = null
    public postModels: PostModel[] = []
    public isShowModal: boolean = false
    public async created() {
        const userID = this.$route.params.userID
        this.myUserModel = await userInteractor.fetchMyUserModel()
        this.userModel = await userInteractor.fetchUserModelByUserID(userID)
        this.postModels = await this.userModel.fetchMyPosts()
    }

    public get isMyPage() {
        return (
            this.myUserModel &&
            this.myUserModel.userID === this.$route.params.userID
        )
    }

    public blancPost: PostModel | null = null
    public openModal() {
        if (this.userModel) {
            this.blancPost = this.userModel.createNewPost()
            this.isShowModal = true
        }
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.blancPost = null
        this.postModels = await this.userModel!.fetchMyPosts()
        this.isShowModal = false
    }
}
</script>
<style lang="stylus" scoped>
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
