# 莉莉（dsh-lily-theme-evelyn）

《鸣潮》莉莉主题的 DeepSeek Harness 插件：像素窗框、全息立绘卡、4K 开屏、两段视频背景，以及一整套薰衣草紫 / 幽兰色 UI。

An unofficial, non-commercial fan theme for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) — pixel window frame, holographic portrait card, 4K splash, two looping video backdrops and an orchid-purple skin. Forked from [EITAOT/dsh-yeermu-theme](https://github.com/EITAOT/dsh-yeermu-theme).

## 装之前

- DSH `>= 0.2.2-rc.1`（`engines.dsh` 已声明）
- 仓库约 20 MB（视频素材约 18 MB）：**首次安装会克隆整个仓库**，慢是正常的
- 装完**需要重启一次**宿主，主题才会加载

## 安装

从仓库装：

```sh
dsh plugin --profile <profile> add https://github.com/Lin-Liszt/dsh-Lily-theme
```

或者用 Release 里的预构建包（免克隆）：

```sh
dsh plugin --profile <profile> add https://github.com/Lin-Liszt/dsh-Lily-theme/releases/download/v2.2.0/dsh-lily-theme-evelyn.tgz
```

桌面端也可以直接在插件市场里搜「莉莉」一键安装。

## 装上以后

| 模块 | 说明 |
|---|---|
| 像素窗框 | 顶部标题栏 + 三边框，纯浮层实现，不改应用视口 |
| 侧栏 | 像素字标与打字机状态条，九句台词按序轮替 |
| 输入框下三块 | 左「日历 · 天气」、中「全息终端」（立绘点击轮换 + 实时 tok/s）、右「系统监控」 |
| 开屏动画 | 4K 莉莉开屏，可点击或按键跳过 |
| 视频背景 | 两段可选（绮丽幻梦 · 莉莉 / 少女的梦 · 莉莉），走 Host 的 Range 流式路由 |
| 消息气泡 | 粉紫渐变描边 + 外发光，跟随深浅模式 |
| 设置分区 | 设置 → 莉莉：界面不透明度、背景视频强度与压暗、影片选择、固定台词、开屏动画与声音，以及角色扮演开关 |
| 上下文压缩面板 | 设置 → 莉莉 末尾；**需另装 [`billion-context-dsh`](https://www.npmjs.com/package/billion-context-dsh)**，未装则不渲染 |
| 余额芯片 | 读 DSH 登录账号的钱包余额 |
| 天气 | 固定坐标（广东东莞）的真实预报，来自 [Open-Meteo](https://open-meteo.com)，Host 侧缓存 10 分钟 |

Host 侧路由（`index.js`）提供视频 Range 流、像素字体、天气、余额、设置与角色扮演的读写。

## 换天气坐标

默认查东莞。想换城市，不需要改代码：把坐标写进 `~/.dsh/aemeath-theme/weather.json`（与 `persona.json` 同目录；目录前缀沿用内部命名，后续版本会统一）

```json
{ "latitude": 23.0207, "longitude": 113.7518, "label": "星炬学院" }
```

文件优先于内置默认值，每次拉取（10 分钟一次）重新读取；文件损坏或坐标越界时静默回退。

## 素材、署名与许可

- 角色、世界观、台词与官方美术 © 库洛游戏（Kuro Games）
- 背景视频与开屏壁纸均取自 Wallpaper Engine 创意工坊（应用 431960），作者为 B站 UP 主 **@炑月烟火**
- 两段背景与开屏的创意工坊 ID、逐条溯源见 [CREDITS.md](CREDITS.md)
- 本插件代码与样式：Fork 自 [EITAOT](https://github.com/EITAOT/dsh-yeermu-theme) 的曳尔沐主题，由 Evelyn 改造
- 许可：[CC BY-NC 4.0](LICENSE) —— **禁止任何商业使用**

完整声明（含下架联系方式）见 [NOTICE.md](NOTICE.md)。

## 已知限制

- 目前没有仓库内的截图（商店页从 README 抽取，抽不到就只显示图标）
- 仓库体积主要来自视频；不想要可以在装好后自行替换 `assets/` 里的同名文件
- 内部路由与状态目录仍沿用 `/aemeath-theme`、`~/.dsh/aemeath-theme` 的旧前缀（代码与 Aemeath 主题同源），后续版本会统一改为 Lily 命名

## 开发

资源都在仓库根：`index.js`（Host 半）、`client.js`（Client 半，单文件预构建，无构建步骤）、`cordis.patch.yml`（bundle 补丁层）、`locale/`（插件卡片文案）、`assets/`。

发布新版本：

```sh
node scripts/pack-release.mjs    # 产出 dist/dsh-lily-theme-evelyn.tgz 与 sha256
```

`dist/dsh-lily-theme-evelyn.tgz` 保持不带版本号，市场条目用**带 tag 的固定地址**，下次发版不会 404。
