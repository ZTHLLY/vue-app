<!--  -->
<template>
    <div class="type-nav">
        <div class="container">
            <div  @mouseleave="leaveIndex">
                <h2 class="all">全部商品分类</h2>
                <div class="sort">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1, index) in categoryList.slice(0, 16)" :key="c1.categoryId"
                            :class="{ cur: currentIndex == index }">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-catagoryname="c1.categoryName">{{ c1.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild.slice(0, 9)"
                                    :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-catagoryname="c2.categoryName">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-catagoryname="c3.categoryName">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
//按需加载
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1
        }
    },
    mounted() {
        this.$store.dispatch('categoryList');
    },
    computed: {
        ...mapState({ categoryList: state => state.home.categoryList })
    },
    methods: {
        //节流
        changeIndex:throttle(function(index){
            this.currentIndex = index;
        },20),
        leaveIndex() {
            this.currentIndex = -1;
        },
        goSearch(event){
            //最好的解决方案，编程式导航+事件委派
            //问题：1.如何保证一定点击a标签。2. 如何获取参数【产品名字，id】
            //this.$router.push('/search');
            let element=event.target;//获取当前触发事件的节点，【h3，a，dt....】,需要的是带有data-categoryName的节点【a标签】
            //节点自带dataset属性，可以获取自定义属性和属性值
            // let {categoryname}=element.dataset;
            // if(categoryname){
            //     alert(123);
            // }
            // console.log(element.dataset);
            let {categoryname}=element.dataset;
            if(categoryname){
                alert(123);
            }
        }
    }
};

</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                }

                .cur {
                    background: skyblue;
                }
            }
        }
    }
}</style>