<template>
    <div class="mx-auto py-32 auth_container w-600px" v-if="userModel">
        <div class="font-semibold mb-8 text-2xl">Home 🏠</div>
        <div
            v-if="!isNameUpdated"
            class="input_container flex font-semibold mb-4"
        >
            <div class="mt-12">
                ようこそCLEAN HACKへ　🎉
                <br />
                ユーザー設定からお名前を登録してください！
            </div>
        </div>
        <div v-if="isNameUpdated" class="input_container font-semibold mb-4">
            <div>
                <div>
                    おかえりなさい！
                    {{ userModel.name }}
                    さん！🎉
                </div>
            </div>
        </div>
        <raffle-join-card
            :userModel="userModel"
            :groupModel="groupModel"
            :lastRaffle="lastRaffle"
            :isAlreadyJoined="isAlreadyJoined"
            :islastRaffleDone="islastRaffleDone"
            @joinGroup="joinGroup"
            @registered="registered"
        />
        <div class="input_container font-bold mb-4 text-xl mt-20">
            How To Use 💡
        </div>
        <div
            class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-10 text-align items-center"
        >
            <div
                class="text-lg font-semibold tracking-tight text-gray-900"
                @click="changeAccodionView"
            >
                <div class="">
                    <div
                        @click="isShow = !isShow"
                        class="app-side-menu-summary"
                        :class="{ 'app-side-menu-summary--opened': isShow }"
                    >
                        <h2>　Admin用 使い方ガイド</h2>
                        <transition name="accordion">
                            <div
                                v-show="isShow"
                                class="app-side-menu-summary__contents"
                            >
                                <slot></slot>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="mt-8" v-if="isAccodionOpen">
                    <div class="mx-3"><how-to-use /></div>
                </div>
            </div>
        </div>
        <div
            class="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between mt-4 text-align items-center"
        >
            <div
                class="text-lg font-semibold tracking-tight text-gray-900"
                @click="changeMemberAccodionView"
            >
                <div class="">
                    <div
                        @click="isShow = !isShow"
                        class="app-side-menu-summary"
                        :class="{ 'app-side-menu-summary--opened': isShow }"
                    >
                        <h2>　Member用 使い方ガイド</h2>
                        <transition name="accordion">
                            <div
                                v-show="isShow"
                                class="app-side-menu-summary__contents"
                            >
                                <slot></slot>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="mt-8" v-if="isMemberAccodionOpen">
                    <div class="mt-10 mx-3"><how-to-use-member /></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    UserModel,
    GroupModel,
    RaffleObjectModel,
    RaffleJoinUserModel,
    RaffleJoinUser,
    RaffleStatus,
} from 'chillnn-cleanhack-abr'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
// component
import AppButton from '@/components/Atom/Button/AppButton.vue'
import { AsyncLoadingAndErrorHandle } from '~/util/decorator/baseDecorator'
import RaffleJoinCard from '@/components/Organisms/Raffle/modules/RaffleJoinCard.vue'
import HowToUse from '@/components/Organisms/Home/modules/HowToUse.vue'
import HowToUseMember from '@/components/Organisms/Home/modules/HowToUseMember.vue'

@Component({
    components: {
        AppButton,
        RaffleJoinCard,
        HowToUse,
        HowToUseMember,
    },
})
export default class HomeBody extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ required: true }) groupModel!: GroupModel
    isNameUpdated: boolean = false
    @Prop({ required: true }) lastRaffle!: RaffleObjectModel
    @Prop({ required: true }) isAlreadyJoined!: boolean
    @Prop({ required: true }) islastRaffleDone!: boolean
    public blancLastraffle: RaffleObjectModel | null = null
    public joinUserModel: RaffleJoinUserModel | null = null
    public blancJoinUserArray: RaffleJoinUser[] = []
    public memberList: string[] = []
    public justDisplay: boolean = false
    public isAccodionOpen: boolean = false
    public isMemberAccodionOpen: boolean = false
    public isShow: boolean = false

    public async created() {
        //名前を登録してあるかどうか
        if (this.userModel.name !== '名無し') {
            this.isNameUpdated = true
        }
    }
    public changeAccodionView() {
        console.log('押されてる')
        this.isAccodionOpen = !this.isAccodionOpen
    }
    public changeMemberAccodionView() {
        this.isMemberAccodionOpen = !this.isMemberAccodionOpen
    }

    @AsyncLoadingAndErrorHandle()
    public async registered() {
        this.$emit('registered')
    }

    @AsyncLoadingAndErrorHandle()
    public async joinGroup() {
        this.$emit('joinGroup')
    }
}
</script>
<style lang="stylus" scoped>
.auth_container {
    width: 600px;
}

.app-side-menu-summary {
    cursor: pointer;
    position: relative;
    // margin: 15px 0 0px 0;
    padding-left: 16px;

    @media only screen and (max-width: 1023px) {
        background-color: white;
        // margin: 20px 0 0px 0;
    }

    &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: 0px;
        width: 10px;
        height: 10px;
        border: 0px;
        border-bottom: solid 2px #4c4c4c;
        border-right: solid 2px #4c4c4c;
        transform: rotate(-45deg);
    }

    .large {
        display: inline-block;
    }
}

.app-side-menu-summary--opened {
    &:before {
        top: 9px;
        left: 1px;
        transform: rotate(45deg);
    }
}

.accordion-enter-active, .accordion-leave-active {
    transition: all 0.4s;
    overflow: hidden;
}

.accordion-enter, .accordion-leave-to {
    height: 0;
    transition: all 0.4s;
}
</style>
