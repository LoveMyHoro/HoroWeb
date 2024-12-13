<template>
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
          <label for="fileUpload">选择音乐文件上传：</label>
          <input type="file" id="fileUpload" @change="selectFileForUpload">
          <el-button @click="uploadSelectedFile">上传</el-button>
        </div>
      </div>
      <div class="music-list">
        <li v-for="(music, index) in musicList" :key="index" @click="selectMusic(music)">
        {{ music.title }}
      </li>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref ,onMounted} from 'vue';
import { musicUpload ,getMusicList} from '@/api/music';
//1.由于提示用户的操作是成功了还是失败了
import { ElMessage } from 'element-plus';

const audioPlayer = ref(null);
const progressContainer = ref(null);
const isPlaying = ref(false);
const audioSource = ref('/src/assets/music/star.mp3');
const currentTime = ref('00:00');
const duration = ref('00:00');
const progress = ref(0);

//获取音乐名列表
// 新增音乐名字响应式数据
const musicList = ref([]);
const musicName = ref('');


const fetchMusicListFromBackend = async () => {
  const result = await getMusicList();
  musicList.value = result.data; // 假设返回的数据结构中有 title 和 url 属性
};
// 新增函数，用于选择音乐并播放
const selectMusic = async (music) => {
  try {
    // 使用音乐文件的URL更新音频源
    audioSource.value = music.url;
    isPlaying.value = false; // 重置播放状态
    audioPlayer.value.load(); // 加载新的音乐文件
    audioPlayer.value.play(); // 播放音乐
    isPlaying.value = true;
    // 更新音乐名称显示
    musicName.value = music.title;
  } catch (error) {
    ElMessage.error(`无法加载音乐: ${error}`);
  }
};
//设置上传文件的响应式数据
const selectedFileForUpload = ref(null);
const playPause = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.load();
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const updateTime = () => {
  const minutes = Math.floor(audioPlayer.value.currentTime / 60);
  const seconds = Math.floor(audioPlayer.value.currentTime - minutes * 60);
  currentTime.value = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const totalMinutes = Math.floor(audioPlayer.value.duration / 60);
  const totalSeconds = Math.floor(audioPlayer.value.duration - totalMinutes * 60);
  duration.value = `${totalMinutes < 10 ? '0' : ''}${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

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
const selectFileForUpload = (event) => {
  selectedFileForUpload.value = event.target.files[0];
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
    let result=await musicUpload(formData)
    console.log(result.data)
    ElMessage.success("文件上传成功！")
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
html, body {  
  height: 100%;  
  margin: 0;  
}  
/* 1. 整体音乐播放器容器样式 */
.music-player {  
  width: 100%;  
  height: 100%; /* 设置高度为100% */  
  display: flex; /* 使用Flexbox布局 */  
  flex-direction: column; /* 垂直方向排列 */  
  justify-content: center; /* 居中对齐 */  
  align-items: center; /* 水平居中 */  
  background-color: #f0f0f0; /* 设定背景颜色 */  
}  

/* 2. 播放器容器（包含播放器和音乐列表）样式 */
.player-container {  
  display: flex;  
  width: 100%; /* 设置宽度为100% */  
  height: 100%; /* 设置高度为100% */  
  max-width: none; /* 取消最大宽度限制 */  
  padding: 20px;  
}  
.player {  
  flex: 1; /* 让播放器占据剩余空间 */  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
}  
/* 3. 播放器主体样式 */
.player {
  flex: 1; /* 让播放器占据剩余空间 */
  /* 其他样式保持不变 */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* 4. 音乐列表样式 */
.music-list {  
  flex-basis: 200px; /* 设置音乐列表的宽度 */  
  margin-left: 20px;  
  border: 1px solid #e0e0e0;  
  border-radius: 10px;  
  overflow-y: auto; /* 允许滚动 */  
  max-height: 400px; /* 设置最大高度 */  
}  

.music-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.music-list li {
  font-size: 16px; /* 调整字体大小 */
  padding: 10px 15px; /* 为列表项添加内边距 */
  border-bottom: 1px solid #f0f0f0; /* 为列表项添加分隔线 */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 为悬停效果添加过渡 */
}

.music-list li:hover {
  background-color: #f9f9f9; /* 悬停时的背景颜色 */
}

/* 当前播放的音乐项样式 */
.music-list li.active {
  background-color: #e0e0e0; /* 当前播放的音乐项背景颜色 */
  font-weight: bold; /* 加粗当前播放的音乐项 */
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
  max-width: 300px; /* 设置最大宽度 */
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
  color: #666;
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
  color: #333;
  cursor: pointer;
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
  color: #333;
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

