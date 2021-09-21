/**
 * 专门配置 css 的配置文件
 *  需要具体的插件，可以到这个网站安装下载 https://github.com/postcss/postcss/blob/main/docs/README-cn.md
 */

// 使用 post-css 一定要有指定的支持浏览器  可以在  package.json 中指定  也可以单独创建 .browserslistrc 来指定  指定之后设置的一样post-css的插件才会生效

module.exports = {
	plugins: [require('autoprefixer'), require('cssnano')],
}
