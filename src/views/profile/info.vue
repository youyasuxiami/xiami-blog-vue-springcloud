<template>
  <div class="app-container">
    <el-form
      ref="form"
      v-loading="formLoading"
      :data="form"
      element-loading-text="加载中..."
      :model="form"
      label-width="120px"
      @keyup.enter.native="onSubmit"
    >
      <!--      <el-input v-model="form.id" type="hidden"/>-->
      <!--      <image-cropper url="https://httpbin.org/post" img-format="jpg" img-bgc="#fff" v-if="show"-->
      <!--                     :lang-ext="{hint: '点击，或拖动图片至此处(*^_^*)'}"-->
      <!--                     :value="show"-->
      <!--                     field="avatar1"-->
      <!--                     ki="0"-->
      <!--                     :allowImgFormat="allowImgFormat"-->
      <!--                     @crop-success="cropSuccess"-->
      <!--                     @crop-upload-success="cropUploadSuccess"-->
      <!--                     @crop-upload-fail="cropUploadFail"-->
      <!--                     :no-rotate="false"-->
      <!--                     :headers="headers"-->
      <!--                     :params="otherParams"></image-cropper>-->
      <el-form-item label="头像" prop="status">
        <pan-thumb :image="form.avatar" @click.native="toggleShow"/>
        <image-cropper
          v-model="show"
          field="img"
          :size="50"
          :width="300"
          :height="300"
          ki="0"
          :allowImgFormat="allowImgFormat"
          :url="url"
          :headers="headers"
          img-format="png"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
        />
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickName"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.createTime" :disabled="true"/>
      </el-form-item>
      <el-form-item label="最后登录">
        <el-input v-model="form.loginTime" :disabled="true"/>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="form.status">
          <el-radio label="0">禁用</el-radio>
          <el-radio label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.ps"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {info, update} from '../../api/profile'
  import ImageCropper from 'vue-image-crop-upload'
  import PanThumb from '@/components/PanThumb'
  export default {
    name: 'ProfileInfo',
    data() {
      return {
        otherParams: {
          token: '123456798',
          name: 'img'
        },
        formLoading: true,
        form: {
          // id:'',
          avatar: '',
          name: "",
          nickName: '',
          email: '',
          createTime: '',
          loginTime: '',
          status: '',
          ps: '',
        },
        show: true,//默认不显示头像修改框
        url: process.env.VUE_APP_BASE_API + '/upload',
        // params: {
        //   access_token: getToken()
        // },
        headers: {
          smail: '*_~'
        },
        allowImgFormat: [
          'gif',
          'jpg',
          'png'
        ]
      }
    },
    url: process.env.VUE_APP_BASE_API + '/upload',
    // params: {
    //   access_token: getToken()
    // },
    headers: {
      smail: '*_~'
    },
    components: {ImageCropper, PanThumb},
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        info(this.$store.getters.name).then(response => {
          this.form = response.data
          this.formLoading = false
          console.log("111111")
        })
      },
      onSubmit() {
        this.formLoading = true
        update(this.form).then(response => {
          this.formLoading = false
          this.$message({
            message: response.message,
            type: 'success'
          })
        }).catch(() => {
          this.formLoading = false
        })
        if (this.form.name == this.$store.getters.name) {
          this.$store.dispatch('user/setAvatar', this.form.avatar)
        }
      },
      toggleShow() {
        this.show = !this.show
      },
      /**
       *
       * @param image
       * @param field
       */
      cropSuccess(image, field) {
        this.form.avatar = image
      },
      /**
       * 上传成功
       * @param jsonData 服务器返回数据，已进行 JSON 转码
       * @param field
       */
      cropUploadSuccess(jsonData, field) {
        this.form.avatar = jsonData.data.path
      },
      /**
       * 上传失败
       * @param status 服务器返回的失败状态码
       * @param field
       */
      cropUploadFail(status, field) {
      },
    }
  }
</script>
<style scoped>
</style>
