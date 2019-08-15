# 学会JavaScript测试你就是同行中最亮的仔（妹）
![顶部图](https://ws1.sinaimg.cn/large/005NRne3gy1g2cmxxl7c5j30nc0c8h1p.jpg)

### 一、几种概念（稍微了解一下）
  #### ATDD： Acceptance Test Driven Development（验收测试驱动开发）

  这是一种在编码开始之前将客户带入测试设计过程的技术。它也是一个协作实践，用户，测试人员和开发人员定义了自动验收标准。 ATDD有助于确保所有项目成员准确理解需要完成和实施的内容。如果系统未通过测试可提供快速反馈，说明未满足要求。验收测试以业务领域术语进行指定。每个功能都必须提供真实且可衡量的业务价值，事实上，如果您的功能没有追溯至至少一个业务目标，那么您应该想知道为什么您要首先实施它。

  #### TDD：Test-driven development （测试驱动开发）

  是一种使用自动化单元测试来推动软件设计并强制依赖关系解耦的技术。使用这种做法的结果是一套全面的单元测试，可随时运行，以提供软件可以正常工作的反馈。TDD重点是培养整个研发过程的节奏感，就像跳踢踏舞一样，“ti-ta-ti”。在编写真正实现功能的代码之前先编写测试，每次测试之后，重构完成，然后再次执行相同或类似的测试。该过程根据需要重复多次，直到每个单元根据所需的规格运行。

  #### BDD：Behavior-Driven Development (行为驱动开发)

  BDD将TDD的一般技术和原理与领域驱动设计(DDD)的想法相结合。 BDD是一个设计活动，您可以根据预期行为逐步构建功能块。BDD的重点是软件开发过程中使用的语言和交互。行为驱动的开发人员使用他们的母语与领域驱动设计的语言相结合来描述他们的代码的目的和好处。使用BDD的团队应该能够以用户故事的形式提供大量的“功能文档”，并增加可执行场景或示例。 BDD通常有助于领域专家理解实现而不是暴露代码级别测试。它通常以GWT格式定义：GIVEN WHEN＆THEN。
### 二、NodeJs中的[Assert模块](http://nodejs.cn/api/assert.html#assert_assert) - 断言
> 模块介绍：assert 模块提供了一组简单的断言测试，可用于测试不变量。存在严格模式（strict）和遗留模式（legacy），但建议仅使用[严格模式](http://nodejs.cn/api/assert.html#assert_strict_mode)。

#### 简单尝试

（当然要先安装好node啦，安装node教程网上好像已经有很多了，我这里就不写了！）
```javascript
var assert = require('assert');

function add (a, b){
  return a + b;
}

assert.equal(6, add(3, 3), '预期 3 + 3 等于 6')
```
![正确输出](https://ws1.sinaimg.cn/large/005NRne3gy1g2cnbul9fzj30g80e1jsr.jpg)
当调用add函数并且执行结果为6，执行不会报错，我们将代码改一下。如下：
```javascript
// assert.equal(6, add(3, 3), '预期 3 + 3 等于 6')
assert.equal(5, add(3, 3), '预期 3 + 3 等于 6')
```
![错误输出](https://ws1.sinaimg.cn/large/005NRne3gy1g2cnfp9ngtj30kz0iktbo.jpg)
我们可以看到抛出了一个错误，错误信息是`预期 3 + 3 等于 6`。
这是nodejs的assert模块简单尝试，更多详细内容可猛戳[Assert模块](http://nodejs.cn/api/assert.html#assert_assert)
**PS: 还有很多断言库比如 [should.js](http://shouldjs.github.io/)、[chai](https://www.chaijs.com/)等等**
### 三、[Mocha](https://mochajs.org/) - 单元测试框架
> Mocha是一个在Node.js和浏览器上运行的功能丰富的JavaScript测试框架，使异步测试变得简单而有趣。 Mocha测试以串行方式运行，允许灵活准确的报告，同时将未捕获的异常映射到正确的测试用例。

#### Mocha初体验
使用npm全局安装：
```bash
$ npm install --global mocha
```
也可以作为项目的依赖进行安装：
```bash
$ npm install --save-dev mocha
```
使用mocha -v可以查看版本号
![mocha版本](https://ws1.sinaimg.cn/large/005NRne3gy1g2co8g24n2j30i20f7wf5.jpg)
新建一个test.js文件，输入如下内容：

```javascript
var assert = require('assert')
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4))
        })
    })
})
```
可以在终端使用`mocha test.js`进行测试，输出结果如下：
![mocha正确结果](https://ws1.sinaimg.cn/large/005NRne3gy1g2codjlj5hj30vd0o9jw8.jpg)
我们将代码修改一下：
```javascript
// assert.equal(-1, [1, 2, 3].indexOf(4))
assert.equal(-1, [1, 2, 3].indexOf(3))
```
![mocha错误结果](https://ws1.sinaimg.cn/large/005NRne3gy1g2cogl2hydj30vd0o9afb.jpg)
给出了`failing`结果，测试不通过，并且给出了`1) should return -1 when the value is not present`的错误信息，准确的告诉我们是哪里没有通过测试！
**PS: 单元测试框架还有 [jest](https://jestjs.io/zh-Hans/)、[jasmine](https://jasmine.github.io/)等等**
### 四、[Karma](http://karma-runner.github.io/3.0/index.html)-测试工具
> 一个测试工具，能让你的代码在浏览器环境下测试。需要它的原因在于，你的代码可能是设计在浏览器端执行的，在node环境下测试可能有些bug暴露不出来；另外，浏览器有兼容问题，karma提供了手段让你的代码自动在多个浏览器（chrome，firefox，ie等）环境下运行。

#### Karma初体验
全局安装 karma
```bash
$ npm install -g karma-cli
```
因为我已经全局安装过了，这里就直接先安装依赖`npm i`,然后执行`karma init`
```javascript
1. Which testing framework do you want to use ? (mocha)
2. Do you want to use Require.js ? (no)
3. Do you want to capture any browsers automatically ? (Chrome)
4. What is the location of your source and test files ? (https://cdn.bootcss.com/jquery/2.2.4/jquery.js, node_modules/should/should.js, test/**.js)
5. Should any of the files included by the previous patterns be excluded ? ()
6. Do you want Karma to watch all the files and run the tests on change ? (yes)
```
然后执行`karma start`效果如下：
![执行成功](https://ws1.sinaimg.cn/large/005NRne3gy1g2cqg8kljij31ic0tdwq3.jpg)

### 五、[Travis CI](https://www.travis-ci.org/) - 持续集成服务
> 目前新兴的开源持续集成构建项目，它与jenkins，GO的很明显的特别在于采用yaml格式，简洁清新独树一帜。

#### 尝试给项目集成Travis CI
猛戳[Travis CI](https://www.travis-ci.org/)打开网站，然后可以选择使用github账号登录如下图：
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cqq7shynj327s1ra7nb.jpg)
这时候我们需要在项目根目录添加`.travis.yml`文件，大致内容如下（具体需要什么请参考官方文档）：
```yml
language: node_js
# nodejs版本
node_js: 
    - '8'

# Travis-CI Caching
cache:
  directories:
    - node_modules


# S: Build Lifecycle
install:
  - npm install
  - export CHROME_BIN=chromium-browser
  - export DISPLAY=:99.0
  - sh -e /etc/init.d/xvfb start

before_script:

# 无其他依赖项所以执行npm run build 构建就行了
script:
  - npm test
```
然后我们将代码提交，我们会看见`Travis CI`自动开始构建
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cwh5kyaej327s1ra1gd.jpg)
我们甚至可以看到详细信息
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cwi6ldjoj327s1rankl.jpg)
以及执行结果
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cwqcstzpj327s1ra1iq.jpg)
然后发现执行以后，并没有自动结束
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cwr5pbalj327s1ra4q1.jpg)
我们只需要修改一下配置，找到`karma.conf.js`：
将`singleRun: false`改为`singleRun: true`，然后将代码再提交一次，我们再看执行结果：
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cx3bw9uyj327s1rab1n.jpg)
喜大普奔，通过测试啦，嘿嘿嘿！！！
其实在github也是可以看到测试的结果啦：
![](https://ws1.sinaimg.cn/large/005NRne3gy1g2cxbjwa7sj327s1ratre.jpg)

**还有很多高级玩法，大家可以去看一下文档！同样可以根据自身爱好集成其他的断言库和测试框架进行测试！**



### 小广告

**我自己运营的公众号，记录我自己的成长！**

公众号：前端曰

公众号ID：js-say

ps：是(yue)不是(ri)



![](https://user-gold-cdn.xitu.io/2019/5/23/16ae4b504a87a348?w=400&h=400&f=jpeg&s=68709)