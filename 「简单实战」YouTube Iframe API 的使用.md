![](https://i.loli.net/2019/07/26/5d3ab77490f8220510.jpg)

### 前言

业务需求需要在自己的网页上嵌入油管（ `youtube` ）上的视频，所以去踩了油管 [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)  的坑。其实和大多数国内视频网站的 `ifram Embed` 方式是相似，比如说爱奇艺、腾讯视频、优酷等。在这些视频网站上你会发现都有分享功能，其中有一项就是通用代码。油管提供的 [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)  也是类似的方案。

### 0. 网页中基本使用

> 要使用 [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)  需要浏览器支持  `postMessage`  功能。

油管上直接放出了代码：

```
<!DOCTYPE html>
<html>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>
```

直接给出了注释，很清晰明了。当然 `https://www.youtube.com/iframe_api` 也是可以直接用 `script` 标签直接引入。其中 `videoId` 可以在油管上找到。我们随便找一个视频就可以在地址栏看到 `https://www.youtube.com/watch?v=PkZNo7MFNFg` 后面的 `v=PkZNo7MFNFg` 这个就是 `videoId` 。

### 1. 基本参数

> 油管的 `IFrame Player API` 可自定义的程度并不高，可能也是出于要保护对自家产品利益的目的，视频播放结束后推荐列表之类的是去不掉的。

| 参数名              | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `autoplay`          | 取值0和1，自动播放。默认为0。（我自己试了好像不生效，[Stack Overflow](https://stackoverflow.com/questions/40685142/youtube-autoplay-not-working) 上有人说改了） |
| `cc_lang_pref`      | 显示字幕的默认语言，取值为 [ISO 639-1双字母语言代码](http://www.loc.gov/standards/iso639-2/php/code_list.php) |
| `cc_load_policy`    | 值：`1`。默认根据用户偏好设置确定的。设为`1`会使系统在默认情况下显示字幕，即使在用户关闭字幕。 |
| `color`             | 进度条颜色，只有两种可选 `red` 和 `white`，设置成 `white` 时，`modestbranding` 无效。 |
| `modestbranding`    | 是否显示 `YouTube` 徽标。                                    |
| `controls`          | 是否显示播放器控件 0 不显示，1 显示，默认 1。                |
| `disablekb`         | 是否允许键盘控制，0 允许，1 不允许，默认 0。                 |
| `enablejsapi`       | 是否允许通过 `IFrame API` 控制播放器。0 不允许，1 允许，默认 0。 |
| `end`               | 播放多少秒后停止。（正整数）                                 |
| `fs`                | 是否显示全屏按钮，0 不显示，1 显示，默认 1。                 |
| `hl`                | 播放器多语言。取值为 [ISO 639-1双字母语言代码。              |
| `iv_load_policy`    | 显示视频注释，而设置为`3`不会显示视频注释。默认值为`1`。（我没发现默认注释是啥玩意） |
| `listType`          | 有效的参数值`playlist`，`search`和`user_uploads`。           |
| `list`              | 结合 `listType` 确定播放列表的内容。                         |
| `loop`              | 循环播放视频，0 不循环，1循环。默认值为 0。单视频时需要在`playlist`放一个相同`videoId` |
| `origin`            | 大致就是安全域名吧。`enablejsapi`为 1 的时候，这个参数是当前域名。 |
| `playlist`          | 要播放的视频列表，以逗号分隔的视频ID。                       |
| `playsinline`       | 控制在 `iOS` 全屏播放。0 全屏，1 不全屏。                    |
| `start`             | 从多少秒开始播放。（正整数）                                 |
| `widget_referrer`   | 看了半天没看明白的 `api` 。(大致好像是表示来源……)            |
| `rel`               | 播放结束后显示相关视频。0 不显示，1 显示。（这个`api`已经修改为0推荐同频道，1推荐相关） |
| `showinfo` （弃用） | 是否显示视频标题和上传者等信息。0 不显示，1 显示。           |

在 `onYouTubeIframeAPIReady` 方法中直接传参就可以了，如下：

```javascript
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'PkZNo7MFNFg',
    playerVars: {
      enablejsapi: 1,
      autoplay: 1,
      controls: 0,
      loop: 1,
      cc_lang_pref: 'en',
      iv_load_policy: 1,		
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
```

### 2. 钩子函数（hook）

从上面的代码案例大家其实也看到了，在 `events` 里面有 `onReady`，`onStateChange` 其实对应的就是相应的钩子函数。

| hook                      | 作用                                                  |
| ------------------------- | ----------------------------------------------------- |
| `onReady`                 | 在播放器准备就绪后触发。                              |
| `onStateChange`           | 视频状态发生改变时会触发。                            |
| `onPlaybackQualityChange` | 视频播放质量发生变化时触发。                          |
| `onPlaybackRateChange`    | 视频播放速率发生变化时触发。                          |
| `onError`                 | 播放器中发生错误时触发。                              |
| `onApiChange`             | 播放器已加载（或卸载）具有公开 `API` 方法的模块触发。 |

使用方法就像案例一样。

### 3. `YT.Player` 对象方法（几个常用的）

| 方法名                                           | 作用                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| `playVideo()`                                    | 播放                                                         |
| `pauseVideo()`                                   | 暂停                                                         |
| `stopVideo()`                                    | 停止                                                         |
| `seekTo(seconds:Number, allowSeekAhead:Boolean)` | 跳转到视频多少秒。`seconds`要跳转的秒数，`allowSeekAhead` 当秒数已经超出已缓冲时间，是否发出请求 |
| `nextVideo()`                                    | 播放下一个视频                                               |
| `previousVideo()`                                | 播放上一个视频                                               |
| `playVideoAt(index:Number)`                      | 播放指定视频（`index` 必传，为视频列表下表）                 |
| `mute()`                                         | 设置为静音                                                   |
| `unMute()`                                       | 取消为静音                                                   |
| `isMuted()`                                      | 获取当前是否静音                                             |
| `setVolume(volume:Number)`                       | 设置播放器的当前音量                                         |
| `getVolume()`                                    | 获取播放器的当前音量                                         |
| `setSize(width:Number, height:Number)`           | 设置视频大小（单位：像素）                                   |
| `getPlayerState()`                               | 返回播放器的状态                                             |
| `getCurrentTime()`                               | 返回视频已播放的时长                                         |
| `getPlaybackQuality()`                           | 当前视频的实际质量                                           |
| `setPlaybackQuality(suggestedQuality:String)`    | 设置当前视频的建议质量。`suggestedQuality` 参数的值可以为`small`、`medium`、`large`、`hd720`、`hd1080`、`highres` 或 `default`。 |
| `getDuration()`                                  | 返回当前正在播放的视频的时长                                 |
| `getVideoUrl()`                                  | 返回当前已加载/正在播放的视频的 `YouTube.com` 网址           |
| `getVideoEmbedCode()`                            | 返回当前已加载/正在播放的视频的嵌入代码。                    |
| `getPlaylist()`                                  | 按当前顺序返回播放列表中视频ID的数组。                       |
| `getPlaylistIndex()`                             | 返回当前正在播放的播放列表中视频的索引。                     |

使用方法我想不用说，大家都知道怎么用啦。`player.playVideo()`

#### 如果需要在 `vue`中使用，大家可以到`github`上搜索一下 `vue-youtube` (当然不是我写的啦！别人的轮子)。 除了上面那些 `youtube iframe api` 还可以播放360全景视频，也有相关的 `API`。这里没有业务需求，也就没有多看。

### 4. 说好的拒绝拖延，我竟然一个多月没有写（感谢关注）

公众号：前端曰

公众号ID：`js-say`

`ps：是(yue)不是(ri)`

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4b504a87a348?w=400&h=400&f=jpeg&s=68709)