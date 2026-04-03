<div align="center">
  <h1>🚀 BoomOpen Workflow Kit</h1>
  <p><strong>Multi-agent orchestration and elite workflow framework for AI coding assistants</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
</div>

---

*(Vietnamese document is available below / Bản tiếng Việt ở bên dưới)*

## 🇬🇧 English Documentation

### What is BoomOpen Workflow Kit?
**BoomOpen Workflow Kit** is an advanced, open-source AI workforce operating system designed to transform a single AI coding assistant into a highly coordinated team of specialist agents. Combining the hardcore **38 Boom Elite Core Skills** with the vast **1400+ Matrix Skill Library (HSOL)**, it provides structural rigor to AI tools like Cursor, Claude Code, Copilot, and Gemini.

### 🌟 Key Features
- **Write Less, Architect More**: Enforces production-grade coding standards via built-in logic engines (SPIE v3 Debugger, Master Planner v4.0).
- **Environment Agnostic Setup**: Install once to your global directory (`~/.cursor/`, `~/.gemini/`) and it applies to all your projects seamlessly.
- **Smart Router Architecture**: Built-in routing via commands like `/code`, `/plan`, `/debug` which automatically delegate tasks to the right AI agents based on complexity variants (`:fast`, `:hard`, `:team`).
- **Strict Quality Gates**: Over 5 phases of requirement gathering, brainstorming, planning, and TDD-based execution are strictly enforced to prevent AI hallucinations and context slipping.

### 💻 Supported AI Tools
| Tool | Support Level | Installation Path |
|------|--------------|-------------------|
| **Cursor** | ✅ Full | `~/.cursor/` |
| **Antigravity (Gemini)** | ✅ Full | `~/.gemini/` |
| **Claude Code** | ✅ Full | `~/.claude/` |
| **GitHub Copilot** | ✅ Full | `~/.copilot/` |
| **Codex** | ✅ Full | `~/.codex/` |

---

### ⚙️ Installation

**1. Using npx (Global Package)**
```bash
npx @boomopen/workflow-kit install cursor       # Setup for Cursor
npx @boomopen/workflow-kit install antigravity  # Setup for Gemini
npx @boomopen/workflow-kit install --all        # Setup for all supported tools
```

**2. From Source (Local Repository)**
```bash
# Clone the repository
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Install into your tool
node cli/install.js install cursor
node cli/install.js install --all
```

---

### 🚀 Quick Start
Once installed, simply open your AI chat interface (e.g., Cursor Chat) and type one of the router commands:

- `/code:fast "add dark mode"` — Execute a simple feature.
- `/plan:hard "build payment module"` — Trigger the Master Planner v4 to build an architectural blueprint.
- `/debug:hard "auth failed in production"` — Trigger the SPIE (Systematic Problem Investigation Engine) to find the root cause.
- `/test:hard "login components"` — Run the Test Engineer v3.0 logic for RED-GREEN-REFACTOR.
- `/orchestrate "build new fullstack SaaS"` — Spawn a multi-agent team to collaborate.

---

### 🗑️ Uninstall
```bash
npx @boomopen/workflow-kit uninstall cursor
# OR locally:
node cli/install.js uninstall cursor
```

<br/>

---

<br/>

## 🇻🇳 Hướng Dẫn Sử Dụng (Tiếng Việt)

### BoomOpen Workflow Kit là gì?
**BoomOpen Workflow Kit** là một hệ điều hành mã nguồn mở dành cho AI coding assistant. Khung làm việc này giúp biến một AI thông thường thành một đội ngũ gồm nhiều Đặc vụ (Agents) chuyên biệt. Với bộ lõi thiện chiến gồm **38 Boom Elite Core Skills** kết hợp cùng thư viện khổng lồ **1400+ Matrix Skills (HSOL)**, hệ thống áp đặt tư duy phát triển phần mềm và tiêu chuẩn code cực kỳ nghiêm ngặt cho các công cụ như Cursor, Claude Code, hay Copilot.

### 🌟 Tính năng nổi bật
- **Kiến trúc Router Thông minh**: Giao tiếp thông qua các tập lệnh tinh gọn như `/code`, `/plan`, `/debug` đi kèm các cấp độ (`:fast`, `:hard`, `:team`) giúp AI tự biết cách chia nhỏ công việc.
- **Tiêu chuẩn Production-Grade**: Áp đặt các Engine độc quyền như *SPIE v3 Debugger* (phân tích lỗi 5-Whys) hay *Master Planner v4.0* (lên kế hoạch chống bỏ sót code).
- **Cài đặt 1 lần cho mọi dự án**: Cấu hình sẽ tự động tiêm thẳng vào thư mục toàn cục (Global) của trình soạn thảo, dùng được cho 100% các dự án của bạn.

### 💻 Các công cụ AI được Hỗ trợ
Hệ thống hiện tại hỗ trợ cài đặt toàn cục và tự động áp dụng các quy tắc cho:
- **Cursor** (`~/.cursor/`)
- **Antigravity - Gemini** (`~/.gemini/`)
- **Claude Code** (`~/.claude/`)
- **GitHub Copilot** (`~/.copilot/`)
- **Codex** (`~/.codex/`)

---

### ⚙️ Cài đặt

**1. Cài đặt trực tiếp qua NPX**
```bash
npx @boomopen/workflow-kit install cursor       # Cài đặt cho Cursor
npx @boomopen/workflow-kit install antigravity  # Cài đặt cho Gemini
npx @boomopen/workflow-kit install --all        # Cài đặt cho toàn bộ tools
```

**2. Cài đặt từ mã nguồn gốc (Source)**
```bash
# Tải mã nguồn về máy
git clone https://github.com/Kennyboom/BoomOpen-Workflow-Kit.git
cd BoomOpen-Workflow-Kit

# Chạy lệnh cài đặt thẳng vào môi trường Editor
node cli/install.js install cursor
node cli/install.js install --all
```

---

### 🚀 Khởi động nhanh (Cách sử dụng)
Sau khi cài đặt xong, hãy mở phần Chat của AI (vd: Cursor Chat) và gõ ngay các tập lệnh sau:

- `/code:fast "thêm nút dark mode"` — Build tính năng nhanh và gọn.
- `/plan:hard "xây hệ thống thanh toán"` — Kích hoạt Master Planner lên kế hoạch tỉ mỉ trước khi code.
- `/debug:hard "lỗi xác thực đăng nhập"` — Gọi chuyên gia gỡ rối giải quyết tận gốc vấn đề theo phương pháp 5-Whys.
- `/test:hard "login flow"` — Đảm bảo tính năng được test theo tiêu chuẩn TDD v3.0.
- `/orchestrate "xây hẳn hệ thống SaaS"` — Kích hoạt toàn bộ đội ngũ Đặc vụ AI cùng làm việc nhóm.

---

### 🗑️ Gỡ cài đặt
```bash
npx @boomopen/workflow-kit uninstall cursor
# HOẶC từ source code:
node cli/install.js uninstall cursor
```

<br/>
<div align="center">
  <b>BoomOpen Workflow Kit</b> — <i>Code less. Architect more.</i>
</div>
