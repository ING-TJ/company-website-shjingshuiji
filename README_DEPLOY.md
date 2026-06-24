# 上海晶水济环保科技有限公司官网部署说明

本目录为“上海晶水济环保科技有限公司”的极简静态官网，可直接部署到 GitHub Pages。

## 域名规划

- 规划主域名：`shjingshuiji.cn`
- 联系邮箱占位：`contact@shjingshuiji.cn`
- 当前不创建 `CNAME` 文件，避免在 DNS 尚未配置前提前绑定域名。

## 当前文件

- `index.html`：首页
- `about.html`：公司介绍
- `services.html`：技术服务
- `contact.html`：联系我们
- `privacy.html`：隐私政策
- `assets/styles.css`：全站样式
- `assets/main.js`：导航与首页视觉效果
- `assets/brand-mark.svg`：站点标识
- `assets/favicon.svg`：浏览器图标
- `robots.txt`：搜索引擎访问规则
- `.nojekyll`：GitHub Pages 静态部署标记

## 本地预览

方式一：直接打开 `index.html`。

方式二：在本目录启动本地静态服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/
```

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库，例如 `company-website-shjingshuiji`。
2. 将本目录中的全部文件提交到该仓库。
3. 进入仓库 `Settings` -> `Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 构建完成。
7. 先记录 GitHub Pages 地址，通常类似：

```text
https://<github-username>.github.io/company-website-shjingshuiji/
```

## 后续绑定 shjingshuiji.cn

在 GitHub Pages 地址可以正常访问后，再配置自定义域名：

1. 回到 GitHub 仓库 `Settings` -> `Pages`。
2. 在 `Custom domain` 中填写 `shjingshuiji.cn` 并保存。
3. GitHub 可能会在仓库中生成或要求添加 `CNAME` 文件，内容为：

```text
shjingshuiji.cn
```

4. 再回到域名 DNS 控制台，按照 GitHub Pages 设置页和官方文档提示添加 DNS 解析记录。
5. DNS 生效后，在 GitHub Pages 中开启 `Enforce HTTPS`。

注意：DNS 记录值以 GitHub Pages 设置页和 GitHub 官方文档的最新提示为准。不要在 GitHub Pages 地址可访问前提前添加解析记录。

## 项目边界

- 不修改 ING 项目代码。
- 不修改 Xcode project。
- 不接 Supabase。
- 不处理 App Store Connect。
- 不提交 App Store。
