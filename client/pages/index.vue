<template>
    <div>
        <div class="">CleanHack</div>
        <div class="">Home</div>
        <br />
        <br />
        <nuxt-link :to="{ name: 'auth-signin' }" tag="div" class="link"
            >Sign Up
        </nuxt-link>

        <div v-if="userModel">
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
        </div>
    </div>
</template>
<script lang="ts">
import { UserModel } from 'chillnn-cleanhack-abr'
import { Component, Vue } from 'nuxt-property-decorator'
import { userInteractor } from '~/api'

// component
@Component({
    components: {},
})
export default class Top extends Vue {
    public userModel: UserModel | null = null
    public async created() {
        this.userModel = await userInteractor.fetchMyUserModel()
    }
}
</script>
<style lang="stylus" scoped></style>
