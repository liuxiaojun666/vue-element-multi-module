
### 基于 vue-cli 2 实现，vue 多模块、vue多项目集成工程
目标：多模块集成的vue项目，多项目共用一份配置，可以互相依赖，也可以独立打包部署

### 使用业务场景
1.如果项目可能有对应多个不同UI界面;对于这样的场景你可能首先会想到，用样式主题就可以实现，基本的样式或者换肤是可以通过样式实现。但如果要实现更复杂的，比如不同两套UI的界面可能功能显示及样式都有差别，那就不得不单独拆成一个项目，但是这样又会造成每个项目很多冗余代码。

2.如果项目有多个子模块(同时子模块之间又存在互相依赖关系)；对于这样的场景是可以把项目独立发布到npm仓库，但是这样又涉及到每个模块都需要独立编译好再发布，实际过程有显得有些繁琐（实际视情况而定）。

对于以上场景可以使用一个项目管理多个子模块也是一个不错的选择。



### 多页面和多模块区别
**多页面**：多页面是指一个项目有多个入口，打包是会生成多个html文件，实际开发过程中都是混合在一个项目中开发；

**多模块**：是指不同的业务模块可以进行拆分；各自独立运行、也可以互相引用，这一点和通过 npm 发布是类似的；对于一些项目本身不允许发布的情况下，既可以独立开发，又不需要发布到共有仓库（当然也可以通过建立私有仓库解决哈）


### 问题:
1,如何划分子模块；
2,如何分离可复用组件；
3,如何独立编译，每个子模块独立打包编译、运行；



### 优点
1,高复用性
2,统一管理依赖库
3,不同模块使用的依赖各自按需打包
4,模块之间相互独立运行、编译、打包
5,模块之间可以直接互相引用，不需要iframe（一般方式是通过iframe嵌入，这样的性能相当差）

``` bash

# （单个模块）新建模块
npm run newProject -- --name 模块名 [--proxyTarget 默认代理地址 --参数名 参数值 --参数名 参数值]
新建项目传入的参数 都可在项目中使用
也可以在 config/moduleConfig.json 中配置参数
process.env.name
process.env.proxyTarget
process.env.参数名
修改项目模板 rc/$template

# （单个模块）编译模块主题 element-ui主题
修改 src/moduleName/assets/element-ui-theme/element-variables.scss
npm run et:模块名

# 修改自定义主题色
修改基本主题 src/comm/assets/themes/index.scss
修改 src/moduleName/assets/themes/index.scss

# （单个模块）启动本地服务
npm run dev:模块名

# （单个模块）启动本地服务 指定代理地址
npm run dev:模块名 -- --proxyTarget=目标代理地址

# （所有模块）编译所有生产包
npm run build

# （单个模块）编译模块生产包
npm run build:模块名

# （所有模块）编译并生成 zip 生产包
npm run build:zip

# （单个模块）编译并生成 zip 生产包
npm run build:模块名:zip

```

参考：Github项目地址 : https://github.com/BothEyes1993/vue-multi-module

<!-- 博客：https://blog.csdn.net/u010633266/article/details/90004694 -->
