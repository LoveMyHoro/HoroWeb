<template>
  <div class="music-list-container">
    <h2>音乐列表</h2>
    <div v-for="song in musicList" :key="song.id" class="song-item">
      <img src="/src/assets/images/111.jpg" alt="歌曲封面" class="song-image">
      <div class="song-info">
        <h3>{{ song.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMusicList } from '@/api/music';

const musicList = ref([]);

const getAllMusic = async () => {
    const result = await getMusicList();
    musicList.value = result.data; // 假设返回的数据直接是音乐列表数组
};

getAllMusic();
</script>

<style scoped>
.music-list-container {
  width: 100%;
  max-width: 800px; /* 或者其他合适的宽度 */
  margin: 0 auto;
  padding: 20px;
}

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.song-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.song-info h3 {
  margin: 0;
  font-size: 16px;
}

.song-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
