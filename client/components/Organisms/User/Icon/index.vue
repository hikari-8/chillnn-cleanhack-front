<template>
    <div class="icon_container">
        <div class="icon">
            <!-- icon -->
            <img :src="userIconUrl" />
        </div>
        <div class="name">
            <!-- name -->
            <div>{{ userName }}さん</div>
            <div v-if="showEdit" class="edit_button" @click="openModal">
                <img src="~/assets/img/edit.svg" />
            </div>
        </div>
        <div class="introduce">
            <!-- introduce -->
            <div>{{ introduce }}</div>
        </div>
        <!-- edit -->
        <app-modal v-model="showEditModal">
            <user-edit :user-model="userModel" @registered="closeModal" />
        </app-modal>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// component
import AppModal from '@/components/Organisms/Common/AppModal/index.vue'
import UserEdit from '@/components/Organisms/User/Edit/index.vue'

@Component({
    components: {
        AppModal,
        UserEdit,
    },
})
export default class UserIcon extends Vue {
    @Prop({ required: true }) userModel!: UserModel
    @Prop({ default: () => false }) showEdit!: boolean

    public showEditModal = false
    public openModal() {
        this.showEditModal = true
    }

    public closeModal() {
        this.showEditModal = false
    }

    get userName() {
        return this.userModel.name
    }
}
</script>
<style lang="stylus" scoped>
.icon_container {
    text-align: center;

    .icon {
        display: inline-block;
        height: 200px;
        width: 200px;
        max-width: 100%;

        @media only screen and (max-width: $spSize) {
            height: 100px;
            width: 100px;
        }

        img {
            object-fit: cover;
            box-shadow: 0 0 5px $shadowColor;
            border-radius: 10000px;
            width: 100%;
            height: 100%;
        }
    }

    .name {
        padding-top: 10px;
        text-align: center;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: $spSize) {
            font-size: 12px;
        }

        .introduce {
          padding-top: 10px;
          text-align: center;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .edit_button {
            cursor: pointer;
            padding-left: 15px;
            width: 20px;
            height: 20px;
            margin-bottom: 5px;

            @media only screen and (max-width: $spSize) {
                width: 15px;
                height: 15px;
                padding-left: 5px;
                margin-bottom: 2px;
            }

            img {
                width: 100%;
            }
        }
    }
}
</style>
