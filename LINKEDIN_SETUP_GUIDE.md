# LinkedIn Sign-In API Setup Guide

## 🚀 Quick Start (5-10 minutes)

### Step 1: Create LinkedIn App

1. **Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)**
2. **Sign in** with your LinkedIn account
3. **Click "Create App"**

### Step 2: Fill App Details

- **App name**: `CV Builder`
- **LinkedIn page**: Your personal LinkedIn page (or create a company page)
- **App logo**: Upload any logo (optional)
- **Legal agreement**: Check the box to agree

### Step 3: Configure App Settings

1. **Go to "Products" tab**
2. **Request "Sign In with LinkedIn"** (it's FREE!)
3. **Wait for approval** (usually instant)

### Step 4: Get API Credentials

1. **Go to "Auth" tab**
2. **Copy your credentials:**
   - Client ID
   - Client Secret

### Step 5: Add Redirect URLs

In the "Auth" tab, add these redirect URLs:
```
http://localhost:3000/auth/linkedin/callback
http://localhost:3000/
```

### Step 6: Update Your .env File

Replace the placeholder values in `cv-builder-backend/.env`:

```env
# Replace these with your actual LinkedIn app credentials
LINKEDIN_CLIENT_ID=your_actual_client_id
LINKEDIN_CLIENT_SECRET=your_actual_client_secret  
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/linkedin/callback
```

### Step 7: Restart Your Backend

```bash
# Stop the current backend (Ctrl+C)
# Then restart:
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

## ✅ Test the Integration

1. **Go to** `http://localhost:3000`
2. **Click "Create Resume"** 
3. **You should see two LinkedIn import options:**
   - **"Sign in with LinkedIn"** (Real OAuth - NEW!)
   - **"Import from LinkedIn URL"** (Demo mode)

4. **Click "Sign in with LinkedIn"**
5. **You'll be redirected to LinkedIn for authentication**
6. **Grant permissions and return to your app**
7. **Your profile data will be automatically imported!**

## 📊 What Data You Get (FREE API)

### ✅ Available Data:
- **Name**: First and last name
- **Headline**: Professional title/headline  
- **Location**: City and country
- **Industry**: Professional industry
- **Email**: Email address (with permission)
- **Summary**: Professional summary (if available)
- **Profile Picture**: Profile image URL

### ❌ NOT Available (Free API):
- Detailed work experience history
- Education history
- Skills and endorsements  
- Connections
- Company details

## 🔧 Troubleshooting

### Common Issues:

**1. "LinkedIn OAuth not configured" message**
- Check that you've replaced the placeholder values in `.env`
- Restart your backend server
- Make sure there are no extra spaces in the credentials

**2. "Invalid redirect URI" error**
- Make sure you've added `http://localhost:3000/auth/linkedin/callback` to your LinkedIn app
- Check that the URL is exactly the same (no trailing slashes)

**3. "App not approved" error**
- Make sure you've requested the "Sign In with LinkedIn" product
- Wait a few minutes for approval (usually instant)

**4. "Invalid client credentials" error**
- Double-check your Client ID and Client Secret
- Make sure you copied them correctly from LinkedIn Developer Portal

## 🚀 Production Setup

For production deployment, also add:

```env
LINKEDIN_REDIRECT_URI=https://yourdomain.com/auth/linkedin/callback
```

And add the production redirect URL to your LinkedIn app.

## 📈 Next Steps

Once basic import is working, you can enhance it by:

1. **Storing OAuth tokens** for repeat imports
2. **Adding profile picture import**
3. **Implementing token refresh**
4. **Adding more detailed error handling**

## 🎯 Success Criteria

You'll know it's working when:

1. ✅ You see "Sign in with LinkedIn" button (not config message)
2. ✅ Clicking it redirects to LinkedIn 
3. ✅ After authentication, you return to your app
4. ✅ Your CV is automatically filled with your LinkedIn data
5. ✅ No console errors in browser or backend

## 🔒 Security Notes

- **Client Secret**: Keep this secret! Never expose in frontend code
- **HTTPS**: Use HTTPS in production
- **Token Storage**: Consider secure token storage for production
- **Rate Limits**: LinkedIn has rate limits, but they're generous for normal use

---

**Need Help?**
- LinkedIn Developer Docs: https://docs.microsoft.com/en-us/linkedin/
- API Support: Check LinkedIn Developer Portal support section

**Estimated Setup Time**: 5-10 minutes
**Cost**: 100% FREE ✅