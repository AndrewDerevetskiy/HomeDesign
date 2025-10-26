
HomeDesign — повний проект (UA) для деплою

Структура:
- client/   — React frontend (UA)
- server/   — Node.js backend (Express)
- README.md — інструкції

DEploy overview (recommended):
1. Push repository to GitHub.
2. Create MongoDB Atlas cluster and copy MONGO_URI.
3. On Render: create Web Service with root=server; set MONGO_URI, CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET as env vars; Deploy and run `npm run seed` in Shell.
4. On Vercel: import project, set root=client, set VITE_API_URL to your backend URL, Deploy.
5. Test frontend and Designer page (add objects, save design).

If you want, I will help at each step.
