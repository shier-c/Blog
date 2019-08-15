![](https://i.loli.net/2019/08/07/KQpm9oIMy8zCuVa.png)
### 前言
本人前端不太懂 `Centos` 上面的东西，这两天在搞阿里云的 `Ecs` 在上面安装 `Python` 环境，刚开始直接在官网下载了源码包编译安装了 `Python3.7.4`。但其实部署项目的时候大多会涉及到多项目以及 `Python` 的版本、环境不同，所以可以多版本 `Python` + 虚拟环境。
### 0. Pyenv 安装篇
* 需要先安装依赖：
```bash
yum -y install git gcc make patch zlib-devel gdbm-devel openssl-devel sqlite-devel bzip2-devel readline-devel
```
* 安装 `Pyenv` 以及 `pyenv-virtualenv` 插件
```bash
curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```
> 如果又遇到权限的问题，可以使用 `sudo`，下同（我是用的 `root` 账号）。

安装完之后可以看到这么一个提示：
![](https://i.loli.net/2019/08/07/Q1EtamhwUCXNG8Y.png)
```bash
export PATH="/root/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```
字面意思把给出来的代码加到 `.bashrc` 文件当中。（用 `vi` 或者 `vim` 都可以）
添加好以后使用 `source .bashrc` 使其生效。然后我们可以用 `pyenv version` 检测是否已经成功。
### 1. Python 安装篇
* 安装 `Python`
我们可以使用命令 `pyenv install --list` 查看可安装版本。如图我们可以看到有很多版本，我这里也没有全部截图出来，大家挑选自己需要的版本。
![Python list](https://i.loli.net/2019/08/07/aZN8Qj5eKR3gDBF.png)
接着我们使用命令 `pyenv install 3.6.9` 安装 `Python 3.6.9`，或者你可以在后面接其他版本号。
我自己安装了三个版本，这个是其中两个：
![Python 3.6.9](https://i.loli.net/2019/08/07/aEMkAVIlurUD9nL.png)
![Python 3.5.7](https://i.loli.net/2019/08/07/B1iS3unaEK7xLNl.png)
我们可以测试一下，建两个目录，分别在目录下设置不同的 `Python` 版本：
![](https://i.loli.net/2019/08/07/2TuLFzxSREpMwnU.png)
### 2. pyenv-virtualenv 使用篇
`pyenv-virtualenv` 是用来创建一个干净的虚拟 `Python` 环境的。在我们需要区分环境的时候我们就可以用到他。
* 创建虚拟环境
```bash
# pyenv virtualenv 已安装版本号 虚拟环境名称
pyenv virtualenv 3.5.7 Test_3.5
```
* 进入虚拟环境
```bash
# pyenv activate 虚拟环境名称
pyenv activate Test_3.5
```
* 退出虚拟环境
```bash
# pyenv activate 虚拟环境名称
pyenv deactivate
```
![](https://i.loli.net/2019/08/07/q5ImdJCxofzgwKB.png)
从图中可以看到我创建了两个虚拟环境，两个虚拟环境的 `Python` 版本也是不一样的。
### 3. 常用命令令篇
```bash
# 查看pyenv支持的版本
pyenv install --list

# 查看已安装版本
pyenv versions

# 安装某个版本
pyenv install 3.6.9

# 卸载某个版本
pyenv uninstall 3.6.9

# 设置当前使用版本
pyenv local 3.6.9

# 设置全局使用版本
pyenv global 3.6.9

# 设置系统使用版本
pyenv shell 3.6.3

# 查看已存在虚拟环境
pyenv virtualenvs

# 创建某个版本的虚拟环境
pyenv virtualenv 3.6.9 env369

# 进入虚拟环境
pyenv activate env369

# 退出虚拟环境
pyenv deactivate

# 删除虚拟环境
pyenv virtualenv-delete env369
```
下面列出所有的命令，我也没有全部用过（手动黑人问号）：
```bash
activate
commands
completions
deactivate
doctor
exec
global
help
hooks
init
install
installer
local
offline-installer
prefix
rehash
root
shell
shims
uninstall
update
version
--version
version-file
version-file-read
version-file-write
version-name
version-origin
versions
virtualenv
virtualenv-delete
virtualenv-init
virtualenv-prefix
virtualenvs
whence
which
```
![](https://i.loli.net/2019/08/07/f78pisnqltMmOPy.png)
