# 01: Frontend Example - GitHub Actions

**Simple deployment with GitHub Secrets** - No backend required!

👉 **Need more security?** See [../02-backend-netlify-functions/](../02-backend-netlify-functions/) for serverless backend approach

👉 **Need full backend server?** See [../03-backend-express-server/](../03-backend-express-server/) for full backend server approach

---

## 🎯 What This Demonstrates

**Frontend-only approach** - No backend server needed!

### How It Works:
1. Your code uses a placeholder: `__API_KEY__`
2. GitHub Actions replaces it during deployment
3. The real key is injected into your deployed site

### Technologies:
- Vanilla JavaScript (no framework)
- GitHub Actions (automated deployment)
- GitHub Secrets (key storage)
- GitHub Pages (free hosting)

### Best For:
- ✅ Free APIs (OpenWeather, News, etc.)
- ✅ Learning projects and homework
- ✅ Public data APIs
- ✅ Simple projects without backend

### NOT For:
- ❌ Payment APIs (Stripe, PayPal)
- ❌ Expensive APIs with billing
- ❌ Production apps with sensitive data
- ❌ APIs requiring true server-side security

**For those cases, see [02: Backend method](../02-backend-netlify-functions/)**

## 📁 Files

- `index.html` - Main page with UI
- `script.js` - JavaScript with `__API_KEY__` placeholder
- `.github/workflows/deploy.yml` - GitHub Actions workflow

## 🚀 How to Use This Example

### 1. Get an API Key

1. Go to [OpenWeather](https://openweathermap.org/api)
2. Sign up for free account
3. Get your API key from dashboard

### 2. Set Up Repository

```bash
# Create new repository on GitHub
# Clone it locally
git clone https://github.com/yourusername/weather-app.git
cd weather-app

# Copy these files into your repository
cp -r 01-frontend-github-actions/* .

# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

### 3. Add GitHub Secret

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `API_KEY`
5. Value: Your OpenWeather API key
6. Click **Add secret**

### 4. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save

### 5. Deploy

Push to main branch (or wait for the push from step 2):

```bash
git push origin main
```

GitHub Actions will:
1. Checkout your code
2. Replace `__API_KEY__` with your actual key
3. Deploy to GitHub Pages

Your site will be live at: `https://yourusername.github.io/weather-app/`

## 🔍 How It Works

### Before Deployment (in GitHub repository)
```javascript
const API_KEY = '__API_KEY__';  // Placeholder
```

### During Deployment (GitHub Actions)
```bash
sed -i "s/__API_KEY__/your_real_key/g" script.js
```

### After Deployment (on GitHub Pages)
```javascript
const API_KEY = 'your_real_key';  // Injected
```

## ⚠️ Important Notes

1. **The API key is visible in the deployed site's source code**
   - This is acceptable for free APIs like OpenWeather
   - NOT acceptable for paid/sensitive APIs
   - For sensitive keys, use [02: Backend method](../02-backend-netlify-functions/)

2. **Never commit your real API key**
   - Always use the placeholder `__API_KEY__`
   - Let GitHub Actions inject the real key

3. **Test locally first**
   - You can temporarily replace the placeholder locally
   - Just don't commit the real key!

## 🐛 Troubleshooting

**"Invalid API key" error**
- Check the secret name is exactly `API_KEY`
- Verify the key is correct in GitHub Secrets
- Wait a few minutes after creating the secret

**"Workflow not running"**
- Check Settings → Pages → Source is "GitHub Actions"
- Verify `.github/workflows/deploy.yml` exists
- Check the Actions tab for errors

**"City not found"**
- Try a different city name
- Use city names without special characters
- Try "New York" or "London"

## 📚 Learn More

- **02: Backend Alternative**: [../02-backend-netlify-functions/](../02-backend-netlify-functions/) for true key security
- **03: Backend Alternative**: [../03-backend-express-server/](../03-backend-express-server/) for complete backend server
- **Quick Reference**: [../QUICK-REFERENCE.md](../QUICK-REFERENCE.md)
- **Main Guide**: [../README.md](../README.md)
- [OpenWeather API Docs](https://openweathermap.org/api)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

## 🎓 Assignment

Modify this example to:
1. Use a different API (news, photos, etc.)
2. Add more features (forecast, maps, etc.)
3. Improve the styling
4. Add error handling

Good luck! 🚀
