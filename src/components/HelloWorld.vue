<template>
    <div class="hello">
        <van-tabs v-model="month">
            <van-tab :title="b.month" :name="b.month" v-for="(b,index1) in monthData" :key="index1">
                <van-row type="flex" align="center" gutter="24" v-for="(a,index) in b.resultsData" :key="index">
                    <van-col class="col" span="4">
                        {{a.day}}
                    </van-col>
                    <van-col class="col" span="10">
                        <div v-if="index==0">{{a.results}}</div>
                        <van-field clearable input-align="center" border type='number' v-model="a.results" placeholder="请输入今日业绩" v-else />
                    </van-col>
                    <van-col class="col" span="10">
                        <div v-if="index==0">{{a.person}}</div>
                        <van-field clearable input-align="center" border type='number' v-model="a.person" placeholder="请输入今日人数" v-else />
                    </van-col>
                </van-row>
                <van-row type="flex" align="center" gutter="24">
                    <van-col class="col" span="4">
                        总数
                    </van-col>
                    <van-col class="col" span="10">
                        <van-field clearable input-align="center" border v-model="totalResults" type='number' readonly placeholder="今日业绩总数" />
                    </van-col>
                    <van-col class="col" span="10">
                        <van-field clearable input-align="center" border v-model="totalPerson" type='number' readonly placeholder="今日人数总数" />
                    </van-col>
                </van-row>
            </van-tab>
        </van-tabs>

    </div>

</template>

<script>
import { Col, Row, Tab, Tabs, Field } from 'vant'
import 'vant/lib/button/style'
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
    components: {
        [Col.name]: Col,
        [Row.name]: Row,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Field.name]: Field,
    },
    data() {
        return {
            activeName: 'second',
            month: String(new Date().getMonth() + 1),
            totalPerson: 0,
            totalResults: 0,
            monthData: [],
        }
    },
    conputed: {},
    watch: {
        monthData: {
            handler(newVal) {
                let locIndex = null
                this.monthData.map((a, index) => {
                    if (a.month == this.month) {
                        locIndex = index
                    }
                })
                if (
                    newVal.length != 0 &&
                    newVal[locIndex].resultsData.length != 0
                ) {
                    this.calresult(newVal[locIndex].resultsData)
                    this.calrperson(newVal[locIndex].resultsData)
                    localStorage.setItem(
                        'monthData',
                        JSON.stringify(this.monthData)
                    )
                }
            },
            deep: true,
        },
    },
    mounted() {
        this.monthData = localStorage.getItem('monthData')
            ? JSON.parse(localStorage.getItem('monthData'))
            : []

        this.initData()
    },
    methods: {
        initData() {
            let days = new Date().getDate()
            let month = String(new Date().getMonth() + 1)
            if (this.monthData.length == 0) {
                let monthArr = {
                    month,
                    resultsData: [
                        { day: '日', results: '业绩', person: '人数' },
                    ],
                }
                for (let i = 0; i < days; i++) {
                    monthArr.resultsData.push({
                        day: i + 1,
                        results: null,
                        person: null,
                    })
                }
                this.monthData.push(monthArr)
            } else if (
                !this.monthData.map((a) => {
                    if (a.month == month) {
                        return true
                    } else {
                        return false
                    }
                })
            ) {
                let monthArr = {
                    month,
                    resultsData: [
                        { day: '日', results: '业绩', person: '人数' },
                    ],
                }
                for (let i = 0; i < days; i++) {
                    monthArr.resultsData.push({
                        day: i + 1,
                        results: null,
                        person: null,
                    })
                }
                this.monthData.push(monthArr)
            }
        },
        calresult(arr) {
            this.totalResults = 0
            arr.slice(1).forEach((a) => {
                this.totalResults += Number(a.results)
            })
        },
        calrperson(arr) {
            this.totalPerson = 0
            arr.slice(1).forEach((a) => {
                this.totalPerson += Number(a.person)
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.hello {
}
</style>


