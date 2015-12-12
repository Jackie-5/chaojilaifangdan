## 如需启用本项目,需要装载node环境

### 项目说明

> jade做html
> stylus做css
> 模块化js方法遵循CMD规范 用gulp-browserify 来编译
> doc为项目所有提供的文件文件.

### 前端配置

下载项目后需 `npm install` 

#### `gulp build` 为编译文件

> 用于测试环境使用

#### `gulp server` 为启用本地服务(本地服务在 gulp build 后即可启用)

> 服务启用后 链接为 http://localhost:8000/目录(或者文件名字)

#### `gulp release` 为发布线上文件(压缩js,css)

> 当所有的调试已经做好用release版本来发布最终页面,到线上后会把js和css压缩.