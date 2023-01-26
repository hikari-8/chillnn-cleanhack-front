<template>
    <div class="admin_status_mark">
        <!-- optionマーク -->
        <span
            class="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
        >
            <span class="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
            Option
        </span>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({})
export default class AdminStatusMark extends Vue {}
</script>
<style lang="stylus" scoped></style>
