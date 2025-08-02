# Email Troubleshooting Guide

## Current Issue: Emails Not Being Received

The contact form is working and SendGrid is processing emails, but you're not receiving them. Here are the likely causes and solutions:

## Most Common Issues:

### 1. **Sender Email Verification**
SendGrid requires you to verify the sender email address. Current from address: `noreply@adaptiveedge.uk`

**Solution**: In your SendGrid dashboard:
1. Go to Settings → Sender Authentication
2. Add and verify `noreply@adaptiveedge.uk` OR use a verified email from your SendGrid account
3. Alternatively, use your verified email address as the sender

### 2. **Notification Email Address**
Currently sending notifications to: `hello@adaptiveedge.uk`

**Solution**: We need your actual email address to receive notifications.

### 3. **Domain Authentication**
For production, you should authenticate your domain `adaptiveedge.uk` in SendGrid.

### 4. **Spam Folder**
Check your spam/junk folder for emails from SendGrid.

## Quick Fixes:

### Fix 1: Use Your Personal Email
Set environment variables in Replit Secrets:
- `NOTIFICATION_EMAIL` = your actual email address
- `SENDGRID_FROM_EMAIL` = your verified SendGrid email

### Fix 2: Use SendGrid's Default Verified Sender
Many SendGrid accounts come with a pre-verified sender. Check your SendGrid dashboard for verified senders.

## Test Email Delivery:

```bash
# Test with your actual email
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"YOUR_EMAIL_HERE","company":"Test","message":"Testing email delivery"}'
```

## Current Email Features:
- ✅ Database storage working
- ✅ SendGrid API connection working  
- ✅ Email templates created
- ❌ Email delivery (verification issue)

## Next Steps:
1. Provide your email address for notifications
2. Check SendGrid dashboard for verified senders
3. Optionally set up domain verification for production