<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 22:35:09
 * @LastEditTime: 2019-08-20 22:35:09
 * @LastEditors: your name
 -->
### 前言
由于个人学习需要，所以来研究一下怎么安装 `Spark`，但是由于个人的经济资源有限，所以还没有上集群，这里先试一下单机版的 `Spark`。后期有扩展的话，同步更新集群安装教程。

> 以下一切操作都基于 `root` 用户。

### 0. 安装 Scala
#### 0.1 安装前
在安装 `Spark` 之前需要先安装一下 `Scala`，因为 `Spark` 依赖于 `Scala`。所以我们先安装一下 `Scala`，先到[Scala官网](https://www.scala-lang.org/download/2.12.2.html)上下载一下 `Scala` 的压缩包。

![](https://i.loli.net/2019/08/20/mHhxCEvWcPIrn67.png)

然后我们将压缩包上传到 Centos 服务器上，怎么上传这里就不做细说。
我们将压缩包放到 `/opt/scala` 目录下，然后将其解压。

解压命令
```bash
tar -xvf scala-2.12.2.tgz
```

![](https://i.loli.net/2019/08/20/dqo3iWJDB5FhlZf.png)

#### 0.2 配置环境变量
在 `/etc/profile` 中添加环境变量，添加 `export SCALA_HOME=/opt/scala/scala-2.12.2` 并在 `path` 中加入 `${SCALA_HOME}/bin:`。

下面是我的环境变量。

```bash
export JAVA_HOME=/usr/local/java/jdk1.8.0_221
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export SCALA_HOME=/opt/scala/scala-2.12.2
export PATH=${JAVA_HOME}/bin:${SCALA_HOME}/bin:$PATH
```

![](https://i.loli.net/2019/08/21/h512XcEvRSAqHWZ.png)

然后我们可以验证一下 `scala`:

![](https://i.loli.net/2019/08/21/kSOLVl3nXfWPuI7.png)

到这里 `scala` 安装就完成了，接下来就是 `Spark` 的安装啦~~~

### 1. 安装 Spark

#### 1.1 下载以及解压
与 `Scala` 相同我们先去逛网下载一下包，然后上传到服务器。

![](https://i.loli.net/2019/08/21/7Rfym9LbO2EQnPi.png)

同理，我们将压缩包放到 `/opt/spark` 目录下，然后将其解压。

解压命令
```bash
tar -xvf spark-2.4.3-bin-hadoop2.7.tgz
```

#### 1.2 配置环境变量

大同小异，在 `/etc/profile` 中添加环境变量，添加 `export SPARK_HOME=/opt/spark/spark-2.4.3-bin-hadoop2.7` 并在 `path` 中加入 `${SPARK_HOME}/bin:`。

下面是我的环境变量。

```bash
export JAVA_HOME=/usr/local/java/jdk1.8.0_221
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export SCALA_HOME=/opt/scala/scala-2.12.2
export SPARK_HOME=/opt/spark/spark-2.4.3-bin-hadoop2.7
export PATH=${JAVA_HOME}/bin:${SPARK_HOME}/bin:${SCALA_HOME}/bin:$PATH
```

![](https://i.loli.net/2019/08/21/g6Q2rFLWdSVlAoK.png)

#### 1.3 配置 Spark
首先进入到解压文件的 `conf` 目录下，也就是是 `/opt/spark/spark-2.4.3-bin-hadoop2.7/conf/`，我们可以看到有一个模板文件，我们 `copy` 一份。
```bash
cp spark-env.sh.template spark-env.sh
```

![](https://i.loli.net/2019/08/21/MkvREJ6j53KPnLQ.png)

我们对拷贝的文件进行编辑，加入以下内容：

```bash
export JAVA_HOME=/usr/local/java/jdk1.8.0_221
export SCALA_HOME=/opt/scala/scala-2.12.2
export SPARK_HOME=/opt/spark/spark-2.4.3-bin-hadoop2.7
export SPARK_MASTER_IP=learn
export SPARK_EXECUTOR_MEMORY=1G
```

同样我们拷贝一份 `slaves`

```bash
cp slaves.template slaves
```

编辑 `slaves`，内容为 `localhost`:

```bash
localhost
```

然后我们可以进行测试，`/opt/spark/spark-2.4.3-bin-hadoop2.7` 在这个目录下执行：
```bash
./bin/run-example SparkPi 10
```
在这我们可以看到已经执行成功。

![](https://i.loli.net/2019/08/21/72BafZqwFprDxyc.png)

#### 1.4 启动 Spark Shell

跟上面一样也是在 `/opt/spark/spark-2.4.3-bin-hadoop2.7` 目录下，执行：

```bash
./bin/spark-shell
```

我们可以看到以下结果：

![](https://i.loli.net/2019/08/21/OaqPNupy4FJWmhl.png)

到这为止，单机版的 `Spark` 就安装完毕了~~~