<template>
    <el-row class="history">
        <el-col :span="4" :offset="2" style=" min-width: 150px;">
            <div class="horcenter">
                <el-scrollbar max-height="75vh">
                    <el-menu :gutter="20" min-width="500px" :default-active="ref(1)">
                        <el-menu-item v-for="report in store.state.reports" :key="report.reportName"
                            :index="`/history/${report.reportName}`"
                            @click="reportParameters = report.reportParameters">
                            <span>{{ report.reportName }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-col>

        <el-col :span="12" style="padding-left:10px ;padding-right:10px;">
            <div class="horcenter" style="padding-top: 20px;">
                <el-scrollbar max-height="75vh">
                    <p class="horcenter" v-for="parameter in reportParameters" :key="parameter.parameterName">
                        {{ parameter.parameterName }}
                        ： {{ parameter.parameterVal }}
                    </p>
                </el-scrollbar>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="horcenter">
                <UploadButton></UploadButton>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import UploadButton from './UploadButton.vue';
import { RouterLink, RouterView } from 'vue-router'
import store from '../store/index.js';


import { reactive, ref } from 'vue'

const reportParameters = ref([])



</script>

<style>
.history {
    margin-top: 5vh;
}
</style>