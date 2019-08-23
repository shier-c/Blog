<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 23:19:00
 * @LastEditTime: 2019-08-23 22:14:43
 * @LastEditors: Please set LastEditors
 -->
### 前言
实在是菜的抠脚，对 Java 是真一窍不通，开始在网上找了相关的教程，但是始终没有跑起来。最后结合多篇教程，还是跑起来了第一个 Demo。

### 0. IDEA 上安装 Scala 插件

这一步其实是非常容易的，但是我这一步搞了一个多小时。其实主要原因还是因为 `QIANG` 的原因，导致老是下载失败，也没去找其他方法。可以在这里搜索插件然后直接安装，但是我这网络的问题下载很慢，或者下载一半的时候直接失败。后来在网上找了说可以下载插件包直接导入。在那个设置图标里面有一个 `Install Plugin From Disk` 本地安装插件。插件下载地址 [https://plugins.jetbrains.com/](https://plugins.jetbrains.com/) ，顺便也放出来 [Scala下载地址](https://plugins.jetbrains.com/plugin/1347-scala/versions)，直接搜索下载想要的版本，然后导入重启 IDEA 就可以了。

![](https://i.loli.net/2019/08/22/kPXDhFbEMTQLgHY.png)

![](https://i.loli.net/2019/08/22/tVkpXYDK7y5Huh6.png)

### 1. 创建项目

创建项目其实不是很难了，但是我还是踩到坑里去了。当时找了一个教程，照着那个来死活搞不好，后面才发现是自己蠢了。回归正题，直接创建一个新项目。

![](https://i.loli.net/2019/08/23/Tn1SZBl9GkXtPDI.png)

这里我们选择 `Maven` 项目：

![](https://i.loli.net/2019/08/23/7SmLgF9oa3d1BwK.png)

![](https://i.loli.net/2019/08/23/YzEmcia8oJFfPkZ.png)

![](https://i.loli.net/2019/08/23/PWng67ZtqkThf3i.png)

创建成功后我们修改一下项目配置：

![](https://i.loli.net/2019/08/23/Mje6lmJc7YUySvi.png)

![](https://i.loli.net/2019/08/23/8DVgSoWwCFUTtcb.png)

这里会出现几个选项选择 `Scala SDK` 然后我们会看到如下列表，若列表内没有内容，可以点击 `Download` 下载你想要的版本。

![](https://i.loli.net/2019/08/23/db6C1m4ypzPog8l.png)

接着我们修改一下 `pom.xml`，代码如下（后面有截图），修改完后会提示 `Import Maven` （在右下角）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.jsay</groupId>
    <artifactId>spark</artifactId>
    <version>1.0-SNAPSHOT</version>

    <name>spark</name>
    <url>http://maven.apache.org</url>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-core_2.11</artifactId>
            <version>2.2.0</version>
        </dependency>

    </dependencies>

</project>
```

![](https://i.loli.net/2019/08/23/7WNSM8BIC5uX4hE.png)

创建一个 `scala` 目录，然后将其设置为 `Sources Root`：

![](https://i.loli.net/2019/08/23/XBxhy76S1ULrG58.png)

接着创建一个 `Scala Class`，填入名称选择 `Object`：

![](https://i.loli.net/2019/08/23/mXPtf9q8JgBW4u6.png)

![](https://i.loli.net/2019/08/23/JTgWm2KnifIw9Ra.png)

在上面完成之后，写一个小 `Demo`，我也不太懂这是啥意思（抄袭的被人的测试 `Demo` ）代码如下:

```scala
package org.jsay

import org.apache.spark.{SparkConf, SparkContext}

object count {
  def main(args: Array[String]): Unit={
    val conf = new SparkConf()
      .setAppName("first spark app(scala)")
      .setMaster("local[1]");

    new SparkContext(conf)
      .parallelize(List(1,2,3,4,5,6))
      .map(x=>x*x)
      .filter(_>10)
      .collect()
      .foreach(println);
  }
}
```

![](https://i.loli.net/2019/08/23/FEReuAgQjsLqozt.png)

然后直接右键选择 `Run`，运行结果如下，主要看输出的 `16`，`25`，`36`：

![](https://i.loli.net/2019/08/23/F6i1usPde2QW7b5.png)

到这里基本上就已经成了，可以继续学习 `Spark` 的运用了。