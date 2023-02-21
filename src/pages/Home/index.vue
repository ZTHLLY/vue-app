<!--  -->
<template>
    <!-- 由于已经是全局组件，不需要在这里额外引入，注册 -->
    <div>
        <TypeNav />
        <ListContainer />
    </div>

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'; 
export default {
    name: '',
    components:{
        ListContainer
    }
}
</script>

<style scoped>

</style>