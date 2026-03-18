# CMS to Staging Integration Guide

This document describes how to integrate the Sanity CMS with the Moving Walls staging environment at `manage-stg.movingwalls.com`.

## Configuration Overview

### 1. Environment Variables (Studio)

In `studio/.env.local`:

```bash
# Staging deployment URL
SANITY_STUDIO_STAGING_URL=https://manage-stg.movingwalls.com/test

# API key for authentication (get from IT team)
SANITY_STUDIO_STAGING_API_KEY=your-api-key-here
```

### 2. Sanity Dashboard Configuration

Go to **https://manage.sanity.io** → Select your project → **Settings** → **API**

#### CORS Origins
Add these CORS origins:
- `https://manage-stg.movingwalls.com`
- `https://movingwalls.netlify.app`
- `http://localhost:3000` (for development)

Check "Allow credentials" for each.

#### Webhooks (Optional - for automatic sync)
Create a webhook for real-time content sync:

| Setting | Value |
|---------|-------|
| URL | `https://manage-stg.movingwalls.com/test/api/sanity-webhook` |
| Secret | Generate a secure secret and share with IT team |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["blogPost", "caseStudy", "pressRelease", "event", "webinar", "ebook", "whitepaper", "product", "landingPage"]` |

### 3. Staging System Requirements

The staging system at `manage-stg.movingwalls.com/test` needs to expose:

#### Deploy Endpoint
```
POST /api/deploy
Content-Type: application/json
Authorization: Bearer {API_KEY}

Body:
{
  "documentId": "sanity-document-id",
  "documentType": "blogPost",
  "slug": "my-blog-post",
  "title": "My Blog Post",
  "action": "deploy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### Webhook Endpoint (if configured)
```
POST /api/sanity-webhook
Content-Type: application/json
sanity-webhook-signature: {WEBHOOK_SECRET}

Body:
{
  "_id": "document-id",
  "_type": "blogPost",
  "slug": { "current": "my-blog-post" },
  "_rev": "revision-id",
  "operation": "update"
}
```

## Features

### Deploy to Staging Button
A "Deploy to Staging" button appears in the document action menu for:
- Blog Posts
- Case Studies
- Press Releases
- Events
- Webinars
- E-books
- Whitepapers
- Products
- Landing Pages

### Automatic Webhook Sync
When a webhook is configured, content changes are automatically synced to:
1. The Next.js website (cache revalidation)
2. The staging environment (content sync)

## Security Considerations

1. **API Keys**: Never commit API keys to version control. Use environment variables.
2. **Webhook Secrets**: Use a strong, randomly generated secret for webhook verification.
3. **CORS**: Only whitelist trusted domains.
4. **Email Domain Restrictions**: Contact IT to whitelist your email domain for staging access.

## Troubleshooting

### "This email domain is not allowed to request access"
This error comes from the staging system's authentication. Contact your IT team to:
1. Whitelist your email domain
2. Or provide API credentials for the CMS integration

### Deploy button not appearing
1. Check that the document type is in the `deployableTypes` array in `sanity.config.ts`
2. Verify the `SANITY_STUDIO_STAGING_URL` environment variable is set
3. Rebuild and redeploy the Sanity Studio

### Network/CORS errors
1. Verify CORS origins are configured in Sanity Dashboard
2. Check that the staging system accepts requests from your Studio domain
3. Review browser console for specific error messages
