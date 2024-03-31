<template>
    <el-upload class="hourcenter" :action="`http://localhost:8080/upload?username=${store.state.username}`"
        :on-success="handleSuccess" :limit="1" :on-exceed="handleExceed"ref="upload">
        <p class="actions" data-v-9e9e3e87>
            <a class="get-started" data-v-9e9e3e87>
                <spap>上传视频</spap>
                <el-icon class="get-started">
                    <Upload />
                </el-icon>
            </a>
        </p>
        <template #tip>
            <div class="el-upload__tip" style="margin: auto; max-width: 100%;text-align: center;">
                <span>低于500MB</span>
            </div>
        </template>
    </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import router from '@/router';
import store from '../store/index.js';
import 'vue-router'

function handleSuccess() {
    axios.post('http://localhost:8080/history', {
        username: store.state.username
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        store.commit('setReport', response.data)
        router.push("/history")
    }).catch(function (error) {
        ElMessage({
            message: '网络异常',
            type: 'error'
        })
    })
}
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
  upload.value.submit()
  router.push("/history")
}

</script>