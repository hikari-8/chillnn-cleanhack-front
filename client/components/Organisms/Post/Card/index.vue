<template>
    <div>
        <div
            class="image_wrapper"
            :style="{ backgroundImage: `url(${imgUrl})` }"
            @click="isShowModal = true"
        />
        <app-modal v-model="isShowModal">
            <div class="container">
                <!-- 投稿画像 -->
                <div class="img_detail">
                    <img :src="imgUrl" />
                </div>

                <!-- 詳細 -->
                <div class="states_detail">
                    <div class="scroll_comments">
                        <!-- description -->
                        <div class="description_wrapper">
                            <div class="description_detail">
                                {{ description }}
                            </div>
                        </div>
                        <!-- comment wrapper-->
                        <div class="comment_wrapper">
                            <div
                                v-for="commentModel in commentModels"
                                :key="commentModel.commentID"
                                class="comment_row"
                            >
                                {{ commentModel.comment }}
                            </div>
                        </div>
                    </div>
                    <!-- Inputcomment -->
                    <div v-if="commentModel" class="input_comment">
                        <app-input
                            v-model="commentModel.comment"
                            placeholder="Search"
                            type="text"
                        />
                        <app-button
                            class="comment_button"
                            :disabled="activateSubmit"
                            @click="register"
                        >
                            <svg
                                class="input_icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                ></path>
                            </svg>
                        </app-button>
                    </div>
                </div>
            </div>
        </app-modal>
    </div>
</template>
/* eslint-disable no-console */
<script lang="ts">
// RepositoryContainer,
'chillnn-cleanhack-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
// import { userInteractor } from '~/api'
// import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import AppButton from '@/components/Atom/AppButton.vue'
import AppInput from '@/components/Atom/AppInput.vue'

@Component({
    components: {
        AppModal,
        AppButton,
        AppInput,
    },
})
export default class PostCard extends Vue {
    // @Prop({ required: true }) postModel!: PostModel
    // public commentModel: CommentModel | null = null
    // public commentModels: CommentModel[] = []
    public isShowModal: boolean = false

    // public activateSubmit() {
    //     if (this.commentModel!.comment === '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    // 変更点

    // public async created() {
    //     const user = await userInteractor.fetchMyUserModel()
    //     this.commentModel = this.postModel.getCommentModel(user.userID)
    //     this.commentModels = await this.postModel.fetchComments()
    //     this.commentModel.comment = ''
    // }

    // public get imgUrl() {
    //     return this.postModel.imageURL
    // }

    // public get description() {
    //     return this.postModel.description
    // }

    // get comment() {
    //     return this.commentModel?.comment || null
    // }

    // set comment(input: string | null) {
    //     if (input && this.commentModel) {
    //         this.commentModel.comment = input
    //         input = ''
    //     }
    //     console.log(this.commentModel.comment)
    // }

    // @AsyncLoadingAndErrorHandle()
    // public async register() {
    //     if (this.commentModel?.comment) {
    //         await this.commentModel.register()
    //         this.$emit('registered')
    //         this.commentModels = await this.postModel!.fetchComments()
    // let text = document.getElementById('#app-input') as HTMLElement

    // 新しいインスタンスの作成
    //         const user = await userInteractor.fetchMyUserModel()
    //         this.commentModel = this.postModel.getCommentModel(user.userID)
    //     }
    // }

    // @AsyncLoadingAndErrorHandle()
    // public async registered() {
    //     console.log(this.commentModels)
    // }
}
</script>
<style lang="stylus" scoped>
.image_wrapper {
    width: 100%;
    padding-bottom: 100%;
    background-size: cover;
    cursor: pointer;

    img {
        width: 100%;
    }
}

// mordal
.container {
  display: flex;
  height: 50%;
  min-width: 500px;
  border-radius: 8px;
  margin: calc(4vh) 0;
  // height: 90vh;
  text-align: left;

  flex-direction: row;
  margin: 0px 0px 0px;
  flex-shrink: 0;


    .img_detail {
      // width: 80%;
      justify-content: center;
      // min-height: 100%;
      flex-shrink: 0;
        img {
            // width: 200px;
            max-height: 800px;
            max-width: 600px;
            flex-shrink: 0;
        }
  }

// 説明・コメント欄
    .states_detail {
      width: 30%
      height: 500px;
      // max-height: 800px;
      // height: 100%;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;



      .scroll_comments{
        overflow-y: scroll;
        overflow-x: none;
        // height: 100%;
      }





    //説明
        .description_detail {

          // width: 50%;
          // text-align: center;
          // margin-left: auto;
          // margin-right: auto;
          font-size: 1rem;
          color: #808080;
          margin: 1rem;
          flex-shrink: 0;
        }

      }

    //コメント
      .comment_wrapper {
            display: flex;
            // flex-direction: row;
            flex-direction: column;
            font-size: 1rem;
            color: #808080;
            margin: 10px;
            align-content: space-between;
            overflow-y: auto;
            padding-right: 5px;
            flex-shrink: 0;



              .comment_row {
                  box-sizing: border-box;
                  margin-left: 10px;
                  border-bottom: 1px solid;
                  flex-shrink: 0;
                  padding: 10px;
                }

            }
          .input_comment {
              margin: 1rem;
              display: flex;
              height: 20px;
              flex-shrink: 0;
              position: relative;
              bottom: 0;
	            left: 0;



              .input_comment {
                  position: fixed;
                  // background-color: #808080;
                  background-color: rgba(100, 100, 100, 1);
                  border-color: rgba(209, 213, 219, 1);
                  border: 1px solid;
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  flex-shrink: 0;

                  .comment_button{
                    right: 0;
                    position: fixed;
                    flex-shrink: 0;
                    padding: 5px 10px;
                  }
              }



              .input_icon{
                	width: 1.5rem;
                  height: 1.5rem;
                  transform: rotate( 90deg );
                  flex-shrink: 0;
              }
          }

}
</style>
