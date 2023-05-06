<template>
  <div>
    <el-card>
      <el-form label-position="top" ref="form" :model="formData">
        <el-form-item label="Title">
          <el-input
            v-model="formData.title"
            placeholder="Input a title"
          ></el-input>
        </el-form-item>
        <el-form-item label="Summary">
          <el-input
            v-model="formData.summary"
            type="textarea"
            maxlength="1000px"
            show-word-limit
            placeholder="Input a summary(less than 200 words)"
            :autosize="{ minRows: 5, maxRows: 10 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="cover image">
          <el-upload
            action="/api/upload/cover"
            accept="image/*"
            :on-success="handleUploadSuccess"
          >
            <el-button type="primary">Image Upload</el-button>
          </el-upload>
          <img v-if="formData.cover" :src="formData.cover" alt="封面图片" />
        </el-form-item>
        <el-form-item label="Editor">
          <ckeditor
            v-model="formData.content"
            :editor="editor"
            :config="editorConfig"
            @ready="onReady"
          ></ckeditor>
        </el-form-item>
        <el-form-item label="video">
          <el-upload
            action="/api/upload/video"
            accept="video/*"
            :on-success="handleVideoUploadSuccess"
          >
            <el-button type="primary">Video Upload</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { CKEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default {
  name: "UploadBox",
  data() {
    return {
      formData: {
        title: "",
        summary: "",
        cover: "",
        content: "",
        videoUrl: "",
      },
      editor: ClassicEditor,
      editorConfig: {
        height: "500px",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        var address = "http://localhost:3001/uploadEvent";
        const response = await axios.post(address, this.formData);
        if (response.status === 200 || response.status === 201) {
          this.$message.success("活动已成功提交");
          this.resetForm();
        } else {
          this.$message.error("提交失败，请稍后重试");
          console.error("response.status==" + response.status);
        }
      } catch (error) {
        console.error("Error:", error);
        this.$message.error("提交失败，请稍后重试");
      }
    },
    resetForm() {
      this.formData = {
        title: "",
        summary: "",
        cover: "",
        content: "",
        videoUrl: "",
      };
    },
    handleUploadSuccess(response, file) {
      this.formData.cover = URL.createObjectURL(file.raw);
    },
    handleVideoUploadSuccess(response, file) {
      this.formData.videoUrl = URL.createObjectURL(file.raw);
    },

    onReady(evt) {
      // 更新 CKEditor 内容样式，在编辑器上方隐藏段落元素
      evt.plugins.get("Paragraph").toModel = () => {
        return this.editor.model.schema.createText("");
      };
    },
  },
  components: {
    ckeditor: CKEditor,
  },
};
</script>

<style scoped></style>
