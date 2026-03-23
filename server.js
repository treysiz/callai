const express = require("express");
const fs      = require("fs");
const path    = require("path");
const cors    = require("cors");

const app        = express();
const PORT       = process.env.PORT || 3000;
const CONFIG_PATH = path.join(__dirname, "config.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── 读取配置 ──────────────────────────────────────────────
function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

// ── GET /api/config  前端读取配置（不含密码）────────────────
app.get("/api/config", (req, res) => {
  const cfg = readConfig();
  const { adminPassword, ...pub } = cfg;   // 去掉密码字段
  res.json(pub);
});

// ── POST /api/config  管理员保存配置 ─────────────────────
app.post("/api/config", (req, res) => {
  const { password, ...fields } = req.body;
  const cfg = readConfig();

  if (password !== cfg.adminPassword) {
    return res.status(401).json({ ok: false, message: "密码错误 / Wrong password" });
  }

  // 允许更新的字段白名单
  const allowed = [
    "phone", "brandName", "brandNameEn",
    "brandDesc", "brandDescEn",
    "businessHours", "businessHoursEn",
    "brandColor",
  ];

  allowed.forEach(key => {
    if (fields[key] !== undefined) cfg[key] = fields[key];
  });

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), "utf8");
  res.json({ ok: true, message: "保存成功 / Saved" });
});

// ── POST /api/password  修改管理员密码 ───────────────────
app.post("/api/password", (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ ok: false, message: "新密码至少 6 位 / Min 6 chars" });
  }
  const cfg = readConfig();
  if (oldPassword !== cfg.adminPassword) {
    return res.status(401).json({ ok: false, message: "原密码错误 / Wrong password" });
  }
  cfg.adminPassword = newPassword;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), "utf8");
  res.json({ ok: true, message: "密码已更新 / Password updated" });
});

app.listen(PORT, () => {
  console.log(`✅ 服务已启动：http://localhost:${PORT}`);
  console.log(`   落地页：http://localhost:${PORT}/index.html`);
  console.log(`   管理后台：http://localhost:${PORT}/admin.html`);
});
