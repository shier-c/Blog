### 前言

这几天看学习视频，看到一个很好玩的东西 `Jupyter Notebook`，但是视频上面都是安装的本地的。于是乎我想着，自己买的服务器闲着也是闲着就拿出来装一个，这样的话可以“云”使用。

### 0. 安装篇

这里我就直接使用 `pyenv` 的虚拟环境去安装，之前我有写过 `Centos 7.4` 安装 `pyenv`，以及虚拟环境的使用。不知道的大家可以去看一下这篇文章[《Centos 7.4 多版本Python以及虚拟环境安装》](https://www.toobugs.com/post/2019/08/07/39)。

**先创建一个虚拟环境**

创建一个 `Python v3.6.9` 的虚拟环境，并进入环境。直接上命令吧：

```bash
# 创建
pyenv virtualenv 3.6.9 Jupyter_3.6

# 进入
pyenv activate Jupyter_3.6
```

接着就是简单粗暴的安装：

```bash
pip install ipython

pip install jupyter
```
其实到这里安装环节应该说是差不多了，但是要运行起来还需要配置一下。

下面放一下安装截图：

`ipython` 安装

![ipython安装结果](https://i.loli.net/2019/08/08/OGXADL7hgiQMyR8.png)

`jupyter` 安装

![jupyter安装结果](https://i.loli.net/2019/08/08/Vw8AiWBI5UzOyrK.png)

### 1. 配置篇

**生成配置文件**

```bash
# 如果是root用户要加 --allow-root (我用的 root )
jupyter notebook --generate-config --allow-root
```
![](https://i.loli.net/2019/08/08/bliITEM52ptefLV.png)

这里再使用 `ipython` 生成一下秘钥：
```bash
# 进入 ipython
ipython

# 这个是进入 ipython 后系统输出的
Python 3.6.9 (default, Aug  8 2019, 17:18:19)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.7.0 -- An enhanced Interactive Python. Type '?' for help.

# In 是输入，Out 是输出
# 引包
In [1]: from notebook.auth import passwd
In [2]: passwd()
Enter password:
Verify password:
# 记住这个秘钥
Out[2]: 'sha1:5d8d5d6ea2a5:04a*************************3c24b7280b67'
# 退出
In [3]: exit()
```

![](https://i.loli.net/2019/08/08/aj6WlmbMgRrVi79.png)

下面修改配置文件：

```bash
# 对外提供访问的ip
c.NotebookApp.ip = '0.0.0.0'
# 对外提供访问的端口
c.NotebookApp.port = 37197
# 启动不打开浏览器
c.NotebookApp.open_browser = False
# 上面生成的秘钥
c.NotebookApp.password = 'sha1:5d8d5d6ea2a5:04a*************************3c24b7280b67'
# 设置jupyter启动后默认文件夹
c.NotebookApp.notebook_dir = u'/root/jupyter/jupyter_dir'
# 允许root用户执行
c.NotebookApp.allow_root = True
```

**安装插件、使用主题**

```bash
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
pip install jupyterthemes  # 安装
jt -t chesterish  # 使用chesterish主题（可能需要重启jupyter）
jt -r  # 恢复默认主题
```

**运行**

```bash
jupyter notebook
```

已经正常运行，可以打开服务器的 `IP:PORT` 就可以看到运行效果啦：

![](https://i.loli.net/2019/08/08/HIWgplV5ZcTd4nm.png)

然后登录的话就是刚刚我们设置的密码，当然不是秘钥啦，是变成秘钥前输入了两次那个密码。
右上角那里有个 `New` 创建一个新文件，然后选 `Python 3` 啦。

![](https://i.loli.net/2019/08/08/WJRrThHlYDxaACd.png)

![](https://i.loli.net/2019/08/08/RDvIJWiYoKVT5UN.png)

到这里安装已经完成啦，安心食用吧！
