# Lunch Decision

團隊午餐投票系統（Frontend + Backend）。

- 前端：React
- 後端：Node.js + Express
- 資料庫：PostgreSQL
- 佇列（可選）：Redis + Bull

## 功能簡介

- 建立當日菜單
- 員工以姓名投票（同一天可重複投票，最後一次為準）
- 平日投票時段限制（週一到週五 09:00-12:00）
- 取得今日投票結果
- 排程自動計算結果（週一到週五 11:30）
- Swagger API 文件

## 專案結構

```text
lunch-decision/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── workers/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## 環境需求

- Node.js 18+
- npm 9+
- PostgreSQL 14+
- Redis（可選，用於 Bull Queue）

## 快速開始

### 1. 安裝依賴

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. 建立後端環境變數

在 `backend/` 建立 `.env`：

```env
PORT=5002
DATABASE_URL=postgres://<user>:<password>@localhost:5432/lunch_decision
```

說明：

- `PORT` 建議設定 `5002`（前端預設呼叫 `http://localhost:5002`）
- `DATABASE_URL` 為 PostgreSQL 連線字串

### 3. 初始化資料庫

請先建立資料庫（例如 `lunch_decision`），再執行以下 SQL：

```sql
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS menu (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES employees(id),
  menu_id INTEGER NOT NULL REFERENCES menu(id),
  date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  menu_id INTEGER NOT NULL REFERENCES menu(id)
);
```

可先插入測試使用者：

```sql
INSERT INTO employees (name) VALUES
('Kevin'),
('Alice'),
('Bob')
ON CONFLICT (name) DO NOTHING;
```

### 4. 啟動後端

```bash
cd backend
npm run dev
```

後端啟動後：

- API Base URL: `http://localhost:5002/api`
- Health Check: `http://localhost:5002/health`
- Swagger: `http://localhost:5002/api-docs`

### 5. 啟動前端

```bash
cd frontend
npm start
```

前端網址：`http://localhost:3000`

## API 速覽

- `POST /api/menu`：新增菜單
- `GET /api/menu/today`：查詢今日菜單
- `POST /api/votes`：提交/更新投票
- `POST /api/result/calculate`：手動計算今日結果
- `GET /api/result/today`：取得今日結果

### 範例：新增菜單

```bash
curl -X POST http://localhost:5002/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "牛肉麵",
    "category": "台式",
    "date": "2026-03-22"
  }'
```

### 範例：投票

```bash
curl -X POST http://localhost:5002/api/votes \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "Kevin",
    "menuId": 1
  }'
```

## 排程與 Queue

- 系統會在週一到週五 `11:30` 自動計算結果（`node-cron`）
- Queue 使用 Bull，預設 Redis `127.0.0.1:6379`
- 如果本機沒有 Redis，投票仍可成功寫入資料庫；只是不會成功加入通知任務

## 可用腳本

### backend

- `npm run dev`：開發模式（nodemon）
- `npm start`：正式啟動
- `npm run worker:notification`：啟動通知 worker

### frontend

- `npm start`：開發模式
- `npm run build`：產生正式版
- `npm test`：測試

## 已知注意事項

- 前端 API URL 目前寫死為 `http://localhost:5002`，若更改後端 Port，請同步修改前端程式碼
- `notification.worker.js` 內的通知函式（如 `sendEmail`）目前是預留介面，尚未實作
- 投票時間限制由後端控制；非平日 09:00-12:00 會回傳 `Voting is closed`

## 授權

目前未設定授權條款（License）。
