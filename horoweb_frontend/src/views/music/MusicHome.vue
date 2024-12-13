<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="music-player">
          <div class="player-container">
            <div class="player">
              <div class="music-name">
                {{ musicName }}
              </div>
              <div class="album-art">
                <img src="/src/assets/images/music.jpg" alt="Album Art">
              </div>
              <audio ref="audioPlayer" @timeupdate="updateTime" @loadedmetadata="onLoadedMetadata">
                <source :src="audioSource" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <div class="controls">
                <el-button @click="playPause" type="success">
                  <span v-if="isPlaying">Pause</span>
                  <span v-else>Play</span>
                </el-button>
                <div class="progress-container" @click="setProgress" ref="progressContainer">
                  <div class="progress" :style="{ width: `${progress}%` }"></div>
                </div>
                <div class="time">
                  <span>{{ currentTime }}</span> / <span>{{ duration }}</span>
                </div>
              </div>
              <div class="file-input">
    <label ref="fileInputLabel" for="fileUpload">点击选择文件</label>
    <input type="file" id="fileUpload" @change="selectFileForUpload">
    <el-button @click="uploadSelectedFile">上传</el-button>
  </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="300px" class="music-list-sidebar">
  <h2>云音乐列表</h2>
  <ul>
    <li v-for="(music, index) in musicList" :key="index" @click="selectMusic(music)">
      {{ music.title }}
    </li>
  </ul>
</el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { musicUpload, getMusicList } from '@/api/music';
import { ElMessage } from 'element-plus';

const audioPlayer = ref(null);
const progressContainer = ref(null);
const isPlaying = ref(false);
const audioSource = ref('/src/assets/music/star.mp3');
const currentTime = ref('00:00');
const duration = ref('00:00');
const progress = ref(0);
const musicList = ref([]);
const musicName = ref('星星在唱歌');
const selectedFileForUpload = ref(null);
const fetchMusicListFromBackend = async () => {
  const result = await getMusicList();
  musicList.value = result.data;
};

const selectMusic = async (music) => {
  try {
    audioSource.value = music.url;
    isPlaying.value = false;
    audioPlayer.value.load();
    audioPlayer.value.play();
    isPlaying.value = true;
    musicName.value = music.title;
  } catch (error) {
    ElMessage.error(`无法加载音乐: ${error}`);
  }
};

const playPause = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.load();
    audioPlayer.value.play();
  }
  isPlaying.value =!isPlaying.value;
};

const updateTime = () => {
  const minutes = Math.floor(audioPlayer.value.currentTime / 60);
  const seconds = Math.floor(audioPlayer.value.currentTime - minutes * 60);
  currentTime.value = `${minutes < 10? '0' : ''}${minutes}:${seconds < 10? '0' : ''}${seconds}`;

  const totalMinutes = Math.floor(audioPlayer.value.duration / 60);
  const totalSeconds = Math.floor(audioPlayer.value.duration - totalMinutes * 60);
  duration.value = `${totalMinutes < 10? '0' : ''}${totalMinutes}:${totalSeconds < 10? '0' : ''}${totalSeconds}`;

  progress.value = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
};

const setProgress = (e) => {
  const pos = e.clientX - progressContainer.value.getBoundingClientRect().left;
  const percentage = (pos / progressContainer.value.offsetWidth) * 100;
  progress.value = percentage;
  audioPlayer.value.currentTime = (percentage / 100) * audioPlayer.value.duration;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    audioSource.value = URL.createObjectURL(file);
    isPlaying.value = false;
    currentTime.value = '00:00';
    duration.value = '00:00';
    progress.value = 0;
  }
};
const fileInputLabel = ref(null); // 创建一个ref来引用<label>元素
const selectFileForUpload = (event) => {
  const file = event.target.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if(fileExtension!=='mp3'){
    ElMessage.error("请选择一个MP3文件!")
  }else{
    if (file) {
    // 更新<label>元素的文本以显示文件名
    fileInputLabel.value.textContent = file.name;
  }
  selectedFileForUpload.value = event.target.files[0];
  }
};

const onLoadedMetadata = () => {
  const totalMinutes = Math.floor(audioPlayer.value.duration / 60);
  const totalSeconds = Math.floor(audioPlayer.value.duration - totalMinutes * 60);
  duration.value = `${totalMinutes < 10 ? '0' : ''}${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
};

const uploadSelectedFile = async() => {
  if (selectedFileForUpload.value) {
    ElMessage.success("文件开始上传")
    const formData = new FormData();
    formData.append('file', selectedFileForUpload.value);
    //调用后台音乐上传接口
    let result = await musicUpload(formData);
    console.log(result.data)
    ElMessage.success("文件上传成功！")
    setTimeout(() => {
      location.reload();
    }, 1000); // 1000 毫秒等于 1 秒
    }
};

onMounted(() => {
  fetchMusicListFromBackend();
  audioPlayer.value = document.querySelector('audio');
  progressContainer.value = document.querySelector('.progress-container');
  audioPlayer.value.load();

  // 监听音乐播放结束事件，重置播放状态
  audioPlayer.value.addEventListener('ended', () => {
    isPlaying.value = false;
  });
});
</script>

<style scoped>
/* 1. 整体音乐播放器容器样式 */
.music-player {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;

  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

/* 2. 播放器容器（包含播放器和音乐列表）样式 */
.player-container {
  display: flex;
  justify-content: space-between;
}

/* 3. 播放器主体样式 */
.player {
  flex: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* 4. 音乐列表样式（新的侧面块） */

.music-list-sidebar {
  width: 300px; /* 更新宽度 */
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 100%; /* 允许列表根据内容自动扩展 */
  margin-left: 20px; /* 添加左侧边距 */
}
/* 音乐列表标题样式 */
.music-list-sidebar h2 {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}
.music-list-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.music-list-sidebar li {
  font-size: 16px;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.music-list-sidebar li:hover {
  background-color: #f9f9f9;
}

.music-list-sidebar li.active {
  background-color: #e0e0e0;
  font-weight: bold;
}

/* 5. 专辑封面样式 */
.album-art {
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.album-art img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.album-art img:hover {
  transform: scale(1.05);
}

/* 6. 播放控制按钮样式 */
.controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
}

button {
  background-color: #1db954;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

button:hover {
  background-color: #1ed760;
}

/* 7. 音乐播放进度条样式 */
.progress-container {
  flex-grow: 1;
  height: 3px;
  background-color: #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  margin: 0 20px;
  position: relative;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #1db954, #1ed760);
  border-radius: 25px;
}

/* 8. 音乐播放时间显示样式 */
.time {
  font-size: 14px;
  color: 666;
  margin-left: 10px;
}

/* 9. 文件上传相关样式 */
.file-input {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.file-input label {
  margin-right: 10px;
  font-size: 16px;
  color: 333;
  cursor: pointer;
  /* 添加以下样式以显示虚线边框 */
  border: 2px dashed #ccc; /* 虚线边框 */
  padding: 10px; /* 内边距，确保文本不会紧贴边框 */
  border-radius: 4px; /* 边框圆角 */
}

/* 隐藏原生的文件输入框 */
.file-input input[type="file"] {
  display: none;
}

/* 自定义的文件上传按钮样式 */
.file-input.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.file-input.custom-file-upload:hover {
  background-color: #1ed760;
}

/* 用于模拟文件上传按钮的标签样式 */
.file-input.upload-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: 333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  font-size: 16px;
}

.file-input.upload-label:hover {
  background-color: #e9e9e9;
  border-color: #aaa;
}

/* 10. 音乐名称显示样式 */
.music-name {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

</style>