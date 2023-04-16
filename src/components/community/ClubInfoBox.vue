<template>
  <el-form :model="club" label-width="120px">
    <el-form-item label="Logo">
      <el-upload
        class="upload-container"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        action="/api/upload"
      >
        <div class="image-wrapper">
          <el-image
            class="logo-image"
            :src="imageUrl || 'https://via.placeholder.com/200x150?text=To+Upload'"
            fit="contain"
          />
          <div class="upload-button-wrapper">
            <el-button type="primary" icon="el-icon-upload">{{ uploadButtonText }}</el-button>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              @change="handleFileChange"
              class="file-input"
            />
          </div>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="Name">
      <span class="required-label">*</span>
      <el-input v-model.trim="club.name" />
    </el-form-item>
    <el-form-item label="Description">
      <span class="required-label">*</span>
      <el-input
        type="textarea"
        v-model.trim="club.desc"
        :autosize="{ minRows: 5, maxRows: 10 }"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveClub">{{ saveButtonText }}</el-button>
      <span class="required-label">{{ requiredLabel }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, ElImage, ElMessage, ElUpload } from 'element-plus'

export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElImage,
    ElUpload
  },
  setup() {
    const club = ref({
      logo: '',
      name: '',
      desc: ''
    })
    const imageUrl = ref('')
    const uploadButtonText = ref('Upload Image')
    const saveButtonText = ref('Save Info')
    const requiredLabel = ref('* Required Fields')

    const handleAvatarSuccess = (res) => {
      club.value.logo = res.data.url
      imageUrl.value = `${res.data.url}?v=${new Date().getTime()}`
    }

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        ElMessage.error('Uploaded avatar image must be in JPG or PNG format')
        return false
      }
      if (!isLt2M) {
        ElMessage.error('Uploaded avatar image size cannot exceed 2MB')
        return false
      }

      return true
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        imageUrl.value = event.target.result
      }

      reader.readAsDataURL(file)
    }

    const saveClub = () => {
      // Send request to save information, implementation omitted here
    }

    return {
      club,
      imageUrl,
      uploadButtonText,
      saveButtonText,
      requiredLabel,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleFileChange,
      saveClub
    }
  }
}
</script>

<style scoped>
.logo-image {
  max-width: 200px;
  max-height: 150px;
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-wrapper {
  position: relative;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-button-wrapper {
  position: absolute;
  bottom: -32px; /* 调整按钮位置 */
  left: 50%;
  transform: translateX(-50%);
}

.required-label {
  color: red;
  margin-left: 5px;
  font-weight: bold;
}
</style>
