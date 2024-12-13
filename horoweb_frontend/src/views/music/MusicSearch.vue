<template>  
  <div class="search-container">  
    <el-input  
      v-model="searchKeyword"  
      placeholder="请输入关键词"  
      @keyup.enter="handleSearch"  
    />  
    <el-button type="primary" @click="handleSearch">搜索</el-button>  
    <div class="search-results">  
      <div v-for="song in searchResults" :key="song.id" class="song-item" @click="playSong(song.id)">  
        <img :src="song.picPath" alt="歌曲封面" class="song-image">  
        <div class="song-info">  
          <h3>{{ song.name }}</h3>  
          <p>{{ song.artists.map(artist => artist.name).join('/') }}</p>  
        </div>  
      </div>  
    </div>  
    <!-- 音乐播放器 -->  
    <div v-if="currentSong" class="music-player">  
      <el-card class="player-card" :body-style="{ padding: '10px' }">  
        <div class="player-info-wrapper">  
          <img :src="currentSong.picPath" alt="歌曲封面" class="player-image" />  
          <div class="player-info">  
            <h3>{{ currentSong.name }}</h3>  
            <p>{{ currentSong.artists.map(artist => artist.name).join('/') }}</p>  
          </div>  
        </div>  
        <audio ref="audio" :src="currentSongUrl" @timeupdate="updateProgress" @ended="onSongEnd"></audio>  
        <div class="controls">  
          <el-button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</el-button>  
          <div class="progress-container" @click="setProgress">  
            <div class="progress-bar" :style="{ width: progressWidth }"></div>  
          </div>  
        </div>  
      </el-card>  
    </div>  
  </div>  
</template>  

<script setup>  
import { ref, watch } from 'vue';  
import { musicSearch } from '@/api/music';  
import { nextTick } from 'vue';  

const searchKeyword = ref('');  
const searchResults = ref([]);  
const currentSong = ref(null); // 当前播放的歌曲  
const currentSongUrl = ref(''); // 当前播放的歌曲URL  
const isPlaying = ref(false); // 播放状态  
const progressWidth = ref('0%'); // 进度条宽度  
const audio = ref(null); // Audio element reference  

const handleSearch = async () => {  
  if (searchKeyword.value.trim() === '') {  
    return;  
  }  
  const response = await musicSearch({ keyword: searchKeyword.value });  
  console.log(response.data)
  searchResults.value = response.data.songs;  
};  

const playSong = (id) => {  
  currentSong.value = searchResults.value.find(song => song.id === id);  
  currentSongUrl.value = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;  
  isPlaying.value = true;  

  nextTick(() => {  
    audio.value.play();  
  });  
};  

const togglePlay = () => {  
  if (isPlaying.value) {  
    audio.value.pause();  
  } else {  
    audio.value.play();  
  }  
  isPlaying.value = !isPlaying.value;  
};  

const updateProgress = () => {  
  if (audio.value) {  
    const percentage = (audio.value.currentTime / audio.value.duration) * 100;  
    progressWidth.value = `${percentage}%`;  
  }  
};  

const setProgress = (event) => {  
  const progressContainer = event.currentTarget;  
  const clickX = event.clientX - progressContainer.getBoundingClientRect().left;  
  const width = progressContainer.offsetWidth;  
  const percentage = clickX / width;  
  audio.value.currentTime = percentage * audio.value.duration;  
};  

const onSongEnd = () => {  
  isPlaying.value = false;  
  progressWidth.value = '0%'; // Reset progress bar on song end  
};  

watch(currentSong, (newSong) => {  
  if (newSong) {  
    // Reset progress and play the new song  
    progressWidth.value = '0%';  
    if (audio.value) {  
      audio.value.pause();  
      audio.value.currentTime = 0; // Reset time  
      audio.value.src = currentSongUrl.value; // Update source  
      audio.value.play();  
    }  
  }  
});  
</script>  

<style scoped>  
.search-container {  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
}  

.el-input {  
  margin-right: 10px;  
  width: 300px;  
}  

.search-results {  
  margin-top: 20px;  
  width: 100%;  
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

.song-info {  
  h3 {  
    margin: 0;  
  }  
  p {  
    margin: 0;  
  }  
}  

.music-player {  
  position: fixed;  
  left: 0;  
  bottom: 0;  
  width: 100%;  
  z-index: 1000; /* 确保播放器在其他内容之上 */  
}  

.player-card {  
  width: 100%;  
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */  
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */  
}  

.player-image {  
  width: 120px; /* Adjust the width of the player image */  
  height: auto; /* Maintain aspect ratio */  
  margin-bottom: 10px;  
}  

.player-info-wrapper {  
  display: flex;  
  flex-direction: column; /* Stack image above text */  
  align-items: center; /* Center align the items */  
}  

.player-info {  
  text-align: center;  
}  

.controls {  
  display: flex;  
  align-items: center;  
  justify-content: space-between;  
  padding: 10px 0;  
}  

.progress-container {  
  flex-grow: 1;  
  height: 5px;  
  background: #e0e0e0;  
  cursor: pointer;  
  margin-left: 10px;  
}  

.progress-bar {  
  height: 100%;  
  background: #3f51b5; /* Customize the color of the progress bar */  
  transition: width 0.1s ease;  
}  
</style>