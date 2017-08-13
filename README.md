# gulp-auto
自动构建工具..

## 使用指导

- 自动化构建项目
  - ​将代码clone下来之后首先调用`bower install`
  - 如果是在开发阶段,那么请继续使用`npm install`如果在发布阶段,那么只需要`npm install -production`,只下载发布依赖,不下载生成阶段依赖

#### shortcut(简单使用)
 - `npm run start`即可完成所有任务下载,并为你开启一个`9000`端口的http服务
 - 如果你是在测试极端,那么请调用`npm run test`,会为您开启一个端口为`3000`的http服务


### 开启gulp
 - 如果你想在开发过程中实时同步,那么请使用`gulp`

  - `It's your show time`!