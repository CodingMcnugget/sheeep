let video;
let playButton;
let videoAspectRatio;
let startSize = 120896; // 开始大小
let endSize = 4; // 结束大小

function setup() {
  // 根据浏览器窗口大小创建画布
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  fill(255);
  noStroke();

  // 加载视频文件
  video = createVideo(['sheep.mp4'], videoLoaded);
  video.hide(); // 不使用HTML5默认的视频播放器控件
}

function videoLoaded() {
  playButton = createButton('Play Video');
  playButton.position(19, 19);
  playButton.mousePressed(toggleVideo); // 用户点击按钮后播放视频
  
  // 获取视频宽高比
  videoAspectRatio = video.width / video.height;
  resizeCanvas(windowWidth, windowHeight); // 确保画布尺寸与窗口匹配
}

function toggleVideo() {
  if (video.time() === 0) {
    video.play();
    playButton.hide(); // 开始播放后隐藏播放按钮
  } else if (video.paused()) {
    video.play();
  } else {
    video.pause();
  }
}

function draw() {
  background(0);

  if (video.width) { // 确保视频尺寸已知
    // 计算以窗口的相对较短边为基准的视频尺寸
    let windowAspectRatio = width / height;
    let videoDrawWidth, videoDrawHeight;
    if (windowAspectRatio > videoAspectRatio) {
      // 窗口比视频更宽，以高为基准缩放视频
      videoDrawHeight = height;
      videoDrawWidth = videoAspectRatio * videoDrawHeight;
    } else {
      // 窗口比视频更窄，以宽为基准缩放视频
      videoDrawWidth = width;
      videoDrawHeight = videoDrawWidth / videoAspectRatio;
    }

    // 计算视频绘制的起始点，以使其居中
    let videoDrawX = (width - videoDrawWidth) / 2;
    let videoDrawY = (height - videoDrawHeight) / 2;

    // 绘制视频
    image(video, videoDrawX, videoDrawY, videoDrawWidth, videoDrawHeight);
    
    // 字幕倒数
    if (video.duration()) {
      let currentSize = lerp(startSize, endSize, video.time() / video.duration());
      textAlign(CENTER, BOTTOM);
      text(currentSize.toFixed(0) + "kb", width / 2, height - 10);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
