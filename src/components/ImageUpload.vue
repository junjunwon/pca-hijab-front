<template>
  <div>
    <input type="file" @change="onFileChange">
    <button @click="uploadImage">Upload</button>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async uploadImage() {
      if (!this.file) return;

      let formData = new FormData();
      formData.append('file', this.file);

      try {
        const response = await axios.post('/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Image uploaded:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
};
</script>
