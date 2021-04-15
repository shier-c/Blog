### GO环境搭建


### 01.安装GO编译器
https://golang.org/dl/

### 02.配置环境PATH
```bash
export PATH=$PATH:/usr/local/go/bin
```

### 03.配置
创建工作目录，例如：WorkSpace
```bash
/Users/chan/WorkSpace/go
- bin # go install 编译生成的可执行文件
- pkg # go install 编译生成的包文件
- src # 放我们以后编写的所有go代码和依赖
  - blog
    - app.go
  - crm
    - main.go
```

### 04.添加环境变量
添加到.zshrc或者.bash_profile（用户环境变量）
```bash
# GO安装目录
export GOROOT=/usr/local/go
# 代码和编译之后的文件相关代码
export GOPATH=/Users/chan/WorkSpace/Go
# 放编译之后的文件
export GOBIN=/Users/chan/WorkSpace/Go/bin
```

### 05.测试环境是否搭建完成

在app.go中添加代码
```go
package main

import "fmt"

func main() {
	fmt.Println("hello world!!!")
}
```

#### 05.1.go run运行
```
~/WorkSpace/Go/src/blog
base ❯go run app.go
```

#### 05.2.go build编译运行
```bash
~/WorkSpace/Go/src/blog
base ❯ go build
# 运行
~/WorkSpace/Go/src/blog
base ❯./blog
```

#### 05.3.go install
```
~/WorkSpace/Go/src/blog
base ❯ go install
```