# CallAI — 扫码一键呼叫 AI 点餐

**中文** | [English](#english)

顾客扫描二维码后，打开品牌落地页，点击一个按钮即可直接呼叫 AI 点餐助手。所有内容（电话号码、品牌名称、营业时间）均在管理后台配置，无需修改代码。

---

## 功能特点

- **一键拨打** — 点击按钮直接通过 `tel:` 拨出绑定电话
- **中英双语** — 右上角切换，自动识别浏览器语言
- **管理后台** — 登录后修改电话、品牌信息、颜色，实时生效
- **二维码生成** — 填入公网 URL 即可生成可打印二维码
- **密码保护** — 所有修改需验证管理员密码
- **无需重启** — 保存即生效，无需重新部署

---

## 项目结构

```
├── server.js          # Express 后端
├── config.json        # 配置存储（电话、品牌信息、密码）
├── package.json
└── public/
    ├── index.html     # 顾客落地页
    └── admin.html     # 管理后台（需登录）
```

---

## 快速启动

**1. 安装依赖**
```bash
npm install
```

**2. 启动服务**
```bash
npm start
```

**3. 打开浏览器**

| 页面 | 地址 |
|------|------|
| 顾客落地页 | http://localhost:3000/index.html |
| 管理后台   | http://localhost:3000/admin.html |

默认管理员密码：`admin123`，首次登录后请立即修改。

---

## 配置说明

所有配置在 **admin.html** 后台管理，无需手动编辑文件：

| 字段 | 说明 |
|------|------|
| 客服电话 | 顾客拨打的号码，支持 `+1 (212) 555-1234` 格式 |
| 品牌名称（中/英） | 落地页显示的餐厅名称 |
| 副标题（中/英） | 品牌名下方的说明文字 |
| 营业时间（中/英） | 页面底部展示的营业时间 |
| 品牌主色 | Logo 背景颜色 |
| 落地页 URL | 部署后的公网地址，用于生成二维码 |

---

## API 接口

| 方法 | 接口 | 说明 |
|------|------|------|
| `GET`  | `/api/config` | 获取公开配置（不含密码） |
| `POST` | `/api/config` | 保存配置（需在 body 中传 `password`） |
| `POST` | `/api/password` | 修改管理员密码 |

---

## 部署

支持任意 Node.js 托管平台，可通过环境变量指定端口：

```bash
PORT=8080 npm start
```

部署完成后，将公网地址（如 `https://your-app.vercel.app/index.html`）填入后台「落地页 URL」，点击生成二维码并打印。

---

## 美国电话号码格式

推荐使用 E.164 国际格式：

```
+12125551234
+14078639062
```

`phone` 字段可以包含括号、连字符等格式符，系统会在生成 `tel:` 链接时自动清除。

---

---

<a name="english"></a>

# CallAI — Scan-to-Call with AI Ordering

[中文](#callaI--扫码一键呼叫-ai-点餐) | **English**

Customers scan a QR code, land on a branded page, and tap one button to call your AI ordering agent. All content is managed from a password-protected admin panel — no code editing required.

---

## Features

- **One-tap calling** — `tel:` link dials instantly on mobile
- **Bilingual** — Chinese / English toggle, auto-detects browser language
- **Admin panel** — update phone, brand info, and colors without touching code
- **QR code generator** — enter your public URL, generate and print
- **Password protected** — login required to save any changes
- **Live config** — updates take effect immediately for all visitors

---

## Quick Start

```bash
npm install
npm start
```

| Page | URL |
|------|-----|
| Customer page | http://localhost:3000/index.html |
| Admin panel   | http://localhost:3000/admin.html |

Default password: `admin123` — change it after first login.

---

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/config` | Get public config (no password) |
| `POST` | `/api/config` | Save config (requires `password` in body) |
| `POST` | `/api/password` | Change admin password |

---

## US Phone Format

Use E.164 format: `+12125551234` — dashes and parentheses are stripped automatically.
