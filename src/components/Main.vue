<template>
    <section id="hero" data-v-9e9e3e87>
        <div class="container">
            <el-image style="width: auto; max-width: 288px;" :src="logo" fit="scale-down" />
        </div>
        <h1 class="tagline" data-v-9e9e3e87>
            <span class="accent" data-v-9e9e3e87>星愿</span>
            <br data-v-9e9e3e87>
        </h1>
        <h1 class="subtagline" data-v-9e9e3e87>自闭症儿童协同干预辅助系统领航者</h1>
        
        <UploadButton></UploadButton>
    </section>
    <section id="highlights" class="vt-box-container" data-v-9e9e3e87>
        <div class="vt-box" data-v-9e9e3e87>
            <h2 data-v-9e9e3e87>智能分析</h2>
            <p data-v-9e9e3e87> 该系统利用精心训练的模型，对上传的儿童自闭症视频进行智能分析。它能够识别关键的行为特征，从而提供准确的诊断结果。 </p>
        </div>
        <div class="vt-box" data-v-9e9e3e87>
            <h2 data-v-9e9e3e87>自动报告生成</h2>
            <p data-v-9e9e3e87> 用户上传视频后，系统自动生成详细的儿童自闭症诊断报告。这样，医生和家长可以快速了解孩子的状况，无需手动整理和分析视频数据。</p>
        </div>
        <div class="vt-box" data-v-9e9e3e87>
            <h2 data-v-9e9e3e87>安全保障</h2>
            <p data-v-9e9e3e87> 系统严格遵循隐私和数据保护法规。上传的视频不会保存，诊断报告仅可自己查阅，确保敏感信息不会外泄。 </p>
        </div>
    </section>
</template>

<script setup>
import UploadButton from './UploadButton.vue';
import logo from '../assets/自闭症logo.png'
</script>
