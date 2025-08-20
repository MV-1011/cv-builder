# MongoDB Atlas Setup Guide for CV Builder

## Step 1: Get Your MongoDB Connection String

1. **Log in to MongoDB Atlas**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Sign in to your account

2. **Navigate to Your Cluster**
   - Click on your cluster name
   - Click the "Connect" button

3. **Choose Connection Method**
   - Select "Connect your application"
   - Choose "Driver: Python" and "Version: 3.12 or later"

4. **Copy Connection String**
   - You'll see a connection string like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2: Configure Your Application

1. **Update the .env file** in `cv-builder-backend/.env`:
   ```env
   # Replace with your actual credentials
   MONGODB_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
   DATABASE_NAME=cv_builder
   ```

   Example:
   ```env
   MONGODB_URL=mongodb+srv://myuser:mypass123@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   DATABASE_NAME=cv_builder
   ```

2. **Important Notes:**
   - Replace `YOUR_USERNAME` with your database username
   - Replace `YOUR_PASSWORD` with your database password
   - Replace `YOUR_CLUSTER` with your cluster name (e.g., cluster0.abcde)
   - Make sure to URL-encode special characters in your password:
     - `@` becomes `%40`
     - `:` becomes `%3A`
     - `/` becomes `%2F`
     - `?` becomes `%3F`
     - `#` becomes `%23`

## Step 3: Configure Network Access

1. **In MongoDB Atlas Dashboard:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Either:
     - Add your current IP address for development
     - Add `0.0.0.0/0` to allow access from anywhere (less secure, only for development)

## Step 4: Create Database User (if needed)

1. **In MongoDB Atlas Dashboard:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password
   - Grant "Read and write to any database" permission

## Step 5: Initialize the Database

1. **Run the setup script:**
   ```bash
   cd cv-builder-backend
   python setup_database.py
   ```

   This will:
   - Create the `cv_builder` database
   - Create collections: `templates`, `resumes`, `users`
   - Add sample templates
   - Create necessary indexes

## Step 6: Test the Connection

1. **Start the backend server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

2. **Check the API:**
   - Go to http://localhost:8000/docs
   - Try the `/api/templates` endpoint to see if templates are loaded

## Troubleshooting

### Connection Timeout Error
- Check your IP is whitelisted in Network Access
- Verify your connection string is correct
- Ensure your cluster is running (not paused)

### Authentication Failed
- Double-check username and password
- Make sure special characters in password are URL-encoded
- Verify the user exists in Database Access

### SSL Certificate Error
If you get SSL errors, you can modify the connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true
```
(Note: Only use `tlsAllowInvalidCertificates=true` for development)

### DNS Resolution Error
- Make sure you're using the correct cluster address
- Try using the legacy connection string (mongodb:// instead of mongodb+srv://)
- Check your internet connection

## Security Best Practices

1. **Never commit .env file to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. **Use IP Whitelisting**
   - Only allow specific IPs in production
   - Use VPN or static IPs for better security

3. **Create Limited User Roles**
   - Don't use admin credentials for the application
   - Create a user with only necessary permissions

4. **Enable MongoDB Atlas Security Features**
   - Enable audit logs
   - Set up alerts for suspicious activity
   - Use encryption at rest

## Sample .env for Quick Setup

```env
# MongoDB Atlas Connection
MONGODB_URL=mongodb+srv://cvbuilder:YourSecurePassword123@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=cv_builder

# Security
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Next Steps

After successful setup:
1. Start the backend: `uvicorn main:app --reload`
2. Start the frontend: `cd ../cv-builder-frontend && npm start`
3. Access the application at http://localhost:3000