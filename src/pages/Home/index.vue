<!--  -->
<template>
    <!-- 由于已经是全局组件，不需要在这里额外引入，注册 -->
    <div>
        <TypeNav />
        <ListContainer />
        <Brand/>
        <Rank/>
        <Recommend/>
        <Floor/>
    </div>

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'; 
import Brand from '@/pages/Home/Brand';
import Rank from '@/pages/Home/Rank';
import Recommend from '@/pages/Home/Recommend';
import Floor from '@/pages/Home/Floor';
export default {
    name: '',
    components:{
        ListContainer,
        Brand,
        Rank,
        Recommend,
        Floor,
    }
}
</script>

<style scoped>

</style>