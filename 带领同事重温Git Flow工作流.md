### 前言

关于`Git Flow` 工作流，我想已经是老生常谈的话题了，但是今天我不得不来重温一下 `Git Flow` 工作流。当我看的代码厂库的时候，我已经开始怀疑人生。乱七八糟的分支，五花八门的提交信息，各种各样的分支名称，没有 `Develop` 分支，没有 `Release`，也没有 `Hotfix`。因此我想我应该好好温习一遍 `Git Flow` 工作流，来改善一下厂库现状。

### 0. Git 工作流

其实 `Git` 不只有 `Git Flow Workflow` 这一种工作流，还有 `Fork Workflow`、`Feature Branch Workflow`、`Distributed Workflows` 等。现在还有 `Github Flow Workflow` 和 `Gitlab Flow Workflow`。

### 1. Git Flow Workflow

Vincent Driessen 2010 年发布出来的他自己的分支管理模型。个人觉得 `Git Flow Workflow` 应该是最常用的 `Git` 工作流了，更多的介绍大家可以看看这个 [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/) （看完这一篇感觉就不用再往下面看我写的这篇了，因为你已经重温了，嘿嘿）。

### 2. Git Flow 长期分支

- `master`
- `develop`

`master`：主分支，这个大家应该不陌生。代码库应该有一个、且仅有一个主分支；提供用户正式使用的版本，都在这个主分支上发布。
`develop`：开发分支，日常使用的开发分支。从 `master` 分支上面分出来的，一般功能开发完成后合并到主分支，并且用主分支进行发布。

```bash
# 创建 develop 分支
git checkout -b develop master

# 切换到 master 分支
git checkout master

# 对 develop 分支进行合并（使用 --no-ff 可以在 git 历史上清晰看见记录）
git merge --no-ff develop
```

### 3. Git Flow 短期分支

- `feature`
- `hotfix`
- `release`
  `feature`：功能分支。也就是大家做需求、功能的时候的分支。从 `develop` 分支上面分出来的，一般功能完成后合并到 `develop` 分支，并且删除功能分支。命名方式一般为 `feature/*` 或 `feature-*`。

```bash
# 创建 feature/x 功能分支
git checkout -b feature/x develop

# 切换 develop 分支
git checkout develop

# 开发完成后，将功能分支 feature/x 合并到 develop 分支（使用 --no-ff 可以在 git 历史上清晰看见记录）
git merge --no-ff feature/x

# 合并完成删除 feature/x 功能分支
git branch -d feature/x
```

![](https://i.loli.net/2019/07/30/5d400382aea8650248.png)

`hotfix`：修补 `bug` 分支/补丁分支。`bug` 这种东西大家都不陌生，`hotfix` 就是用来修补正式发布以后的 `bug` 的分支。从 `master` 分支上面分出来的，一般修复完成后合并到主分支以及开发分支，并且删除补丁分支，用主分支进行发布。命名方式一般为 `hotfix/*` 或 `hotfix-*`。

```bash
# 创建 hotfix/x 补丁分支
git checkout -b hotfix/x master

# 切换到 master 分支
git checkout master

# 修复完成后，将 hotfix/x 补丁分支合并到 master 分支（使用 --no-ff 可以在 git 历史上清晰看见记录）
git merge --no-ff hotfix/x

# 切换到 develop 分支
git checkout develop

# 将 hotfix/x 补丁分支合并到 master 分支
git merge --no-ff hotfix/x

# 对合并生成的新节点，做一个标签（后面重温 tag）
git tag -a 1.1

# 合并完成删除 hotfix/x 补丁分支
git branch -d hotfix/x
```

`release`：预发布分支。发布正式版本之前（开发完成 `develop` 分支合并到 `master` 分支之前），可能需要有一个预发布的版本进行测试。从 `develop` 分支上面分出来的，预发布结束以后，必须合并进 `develop` 和 `master` 分支。命名方式一般为 `release/*` 或 `release-*`。

```bash
# 创建 release/x 补丁分支
git checkout -b release/x develop

# 确认没问题后，切换到 master 分支
git checkout master

# 修复完成后，将 release/x 补丁分支合并到 master 分支（使用 --no-ff 可以在 git 历史上清晰看见记录）
git merge --no-ff release/x

# 切换到 develop 分支
git checkout develop

# 将 hotfix/x 补丁分支合并到 master 分支
git merge --no-ff release/x

# 对合并生成的新节点，做一个标签（后面重温 tag）
git tag -a 1.2

# 合并完成删除 release/x 功能分支
git branch -d release/x
```

### 4. 关于 Tag

`tag` 是 `git` 版本库的一个标记，指向某个 `commit` 的指针。主要用于发布版本的管理，一个版本发布之后，我们可以为 `git`打上 `v.1.0.1`、`v.1.0.2` ...这样的标签。版本代码被打上 `tag` 后就会被封存起来，以后就可以根据相应的 `tag` 找到对应的版本，防止版本代码丢失。

```bash
# 打一个 tag
git tag v1.0.1
```

**我想大家看到这里，不仅又把 `Git Flow` 重温了一遍，一些基础的 `Git` 命令也重温了一遍。**

### 5. Git 提交信息规范

这个其实也是需要大家注意的，写好 `Git` 提交信息并不难，就看大家是不是想去养成这么一个习惯。
格式：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**`Header`（必需）：包括三个字段：`type`（必需）、`scope`（可选）和 `subject`（必需）。**

&emsp;&emsp;`type`：用于说明 commit 的类别，只允许使用下面7个标识。

&emsp;&emsp;&emsp;&emsp;&emsp;`feat`：新功能（feature）

&emsp;&emsp;&emsp;&emsp;&emsp;`fix`：修补bug

&emsp;&emsp;&emsp;&emsp;&emsp;`docs`：文档（documentation）

&emsp;&emsp;&emsp;&emsp;&emsp;`style`： 格式（不影响代码运行的变动）

&emsp;&emsp;&emsp;&emsp;&emsp;`refactor`：重构（即不是新增功能，也不是修改bug的代码变动）

&emsp;&emsp;&emsp;&emsp;&emsp;`test`：增加测试

&emsp;&emsp;&emsp;&emsp;&emsp;`chore`：构建过程或辅助工具的变动

&emsp;&emsp;`scope`：用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

&emsp;&emsp;`subject`：用于 `commit` 目的的简短描述，不超过50个字符。

**`Body`（可选）：对本次 commit 的详细描述，可以分成多行。**
示例：

```
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

注意：

- 使用第一人称现在时，比如使用change而不是changed或changes。
- 永远别忘了第2行是空行。
- 应该说明代码变动的动机，以及与以前行为的对比。

**`Footer`（可选）：**
&emsp;&emsp;1. 如果当前代码与上一个版本不兼容，则 `Footer` 部分以 `BREAKING CHANGE` 开头，后面是对变动的描述、以及变动理由和迁移方法。
&emsp;&emsp;2. 如果当前 `commit` 针对某个 `issue`，那么可以在 `Footer` 部分关闭这个 `issue` 。
&emsp;&emsp;3. 如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。

情况一（示例）：

```
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

情况二（示例）：

```
Closes #234
```

情况三（示例）：

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

# Body部分的格式是固定的，必须写成This reverts commit &lt;hash>.，其中的hash是被撤销 commit 的 SHA 标识符。
```

### 6. 拒绝拖延（感谢关注）

公众号：前端曰

公众号ID：`js-say`

`ps：是(yue)不是(ri)`

![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4b504a87a348?w=400&h=400&f=jpeg&s=68709)