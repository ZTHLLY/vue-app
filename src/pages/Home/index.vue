<!--  -->
<template>
    <!-- 由于已经是全局组件，不需要在这里额外引入，注册 -->
    <div>
        <TypeNav />
        <ListContainer />
        <Brand/>
        <Rank/>
        <Recommend/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    </div>

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'; 
import Brand from '@/pages/Home/Brand';
import Rank from '@/pages/Home/Rank';
import Recommend from '@/pages/Home/Recommend';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import { mapState } from 'vuex';
export default {
    name: '',
    components:{
        ListContainer,
        Brand,
        Rank,
        Recommend,
        Like,
        Floor,
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList,
        })
    }
}
</script>

<style scoped>

</style>