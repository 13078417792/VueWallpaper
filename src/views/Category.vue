<template>
    <category-item />
</template>

<script>
    import CategoryItem from './Home/Category'
    import NavLayout from '@components/NavLayout'
    import SaveScrollMixin from '@src/mixins/save-scroll'

    export default {
        name: "Category",
        mixins:[SaveScrollMixin],
        components:{CategoryItem,NavLayout},

    }
</script>

<style scoped>

</style>