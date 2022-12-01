<template>
    <div class="auth_input_container">
        <div class="label">{{ label }}</div>
        <div class="input">
            <app-input v-model="localValue" :type="type" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
// component
import AppInput from '@/components/Atom/AppInput.vue'

@Component({
    components: {
        AppInput,
    },
})
export default class AuthInput extends AppInput {
    @Prop({ required: true }) label!: string | number
}
</script>
<style lang="stylus" scoped>
.auth_input_container {
    .label {
        font-size: 14px;
    }

    .input {
    }
}
</style>
