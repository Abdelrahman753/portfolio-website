# Abdelrahman Mahmoud - Portfolio Website
👋 Hi, I'm Abdelrahman Mahmoud — a DevOps & Cloud Engineer passionate about automation, infrastructure, and building modern web applications.
A modern, responsive portfolio website built with Next.js, showcasing DevOps and Cloud Engineering projects with a stunning dark theme featuring glassmorphism effects and blue-purple gradients.

## 🚀 Features

- **Modern Design**: Dark theme with glassmorphism cards, gradient text, and smooth animations
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **SEO Optimized**: Proper meta tags, semantic HTML, and accessibility features
- **Static Export Ready**: Configured for deployment to AWS S3 + CloudFront
- **Performance**: Fast loading with optimized assets and Next.js optimizations

## 📋 Pages

- **Home**: Hero section with professional photo and call-to-action buttons
- **About**: Background, skills, certifications, and education
- **Projects**: Showcase of technical projects with tech stack tags
- **Contact**: Contact form with validation and contact information

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: AWS S3 + CloudFront (static hosting)

## 🎨 Color Palette

- Deep Navy: `#0b1226`
- Blue-Purple Gradient: `#0f172a` → `#2b2e8a`
- Cyan Accent: `#00d1ff`
- Soft Glow: `rgba(0, 209, 255, 0.12)`

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

1. **Create production build**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Test production build locally** (optional):
   \`\`\`bash
   npm start
   \`\`\`

## 🌐 AWS S3 + CloudFront Deployment

### Step 1: Configure Next.js for Static Export

The project is already configured with `output: 'export'` in `next.config.mjs`. This generates a static `out/` folder.

### Step 2: Build Static Files

\`\`\`bash
npm run build
\`\`\`

This creates an `out/` directory with all static files.

### Step 3: Create S3 Bucket

1. Go to AWS S3 Console
2. Click "Create bucket"
3. Choose a unique bucket name (e.g., `abdelrahman-portfolio`)
4. Select your preferred region
5. **Uncheck** "Block all public access" (we'll use CloudFront for access control)
6. Create bucket

### Step 4: Configure S3 Bucket for Static Hosting

1. Go to bucket → **Properties** tab
2. Scroll to "Static website hosting"
3. Click "Edit" and enable it
4. Set **Index document**: `index.html`
5. Set **Error document**: `404.html`
6. Save changes

### Step 5: Upload Files to S3

Using AWS CLI:

\`\`\`bash
aws s3 sync out/ s3://your-bucket-name --delete
\`\`\`

Or use the AWS Console to upload the `out/` folder contents.

### Step 6: Create CloudFront Distribution

1. Go to AWS CloudFront Console
2. Click "Create Distribution"
3. **Origin Settings**:
   - Origin Domain: Select your S3 bucket
   - Origin Access: Choose "Origin access control settings (recommended)"
   - Create new OAC if needed
4. **Default Cache Behavior**:
   - Viewer Protocol Policy: "Redirect HTTP to HTTPS"
   - Allowed HTTP Methods: GET, HEAD
   - Cache Policy: "CachingOptimized"
5. **Settings**:
   - Price Class: Choose based on your needs
   - Alternate Domain Names (CNAMEs): Add your custom domain if you have one
   - SSL Certificate: Use default or add custom certificate
   - Default Root Object: `index.html`
6. Create distribution

### Step 7: Update S3 Bucket Policy

CloudFront will provide a bucket policy. Copy it and:

1. Go to S3 bucket → **Permissions** tab
2. Edit **Bucket Policy**
3. Paste the CloudFront policy
4. Save changes
 

### Step 8: Configure Custom Error Pages (Optional)

In CloudFront distribution settings:

1. Go to **Error Pages** tab
2. Create custom error response:
   - HTTP Error Code: 404
   - Customize Error Response: Yes
   - Response Page Path: `/404.html`
   - HTTP Response Code: 404

### Step 9: Wait for Deployment

CloudFront deployment takes 10-20 minutes. Check status in the console.

### Step 10: Access Your Site

Once deployed, access your site via the CloudFront domain:
\`\`\`
https://d1234567890.cloudfront.net
\`\`\`

## 🔄 Updating Your Site

After making changes:

1. **Rebuild**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Sync to S3**:
   \`\`\`bash
   aws s3 sync out/ s3://your-bucket-name --delete
   \`\`\`

3. **Invalidate CloudFront Cache**:
   \`\`\`bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   \`\`\`

## 🎯 Custom Domain Setup (Optional)

1. **Register domain** (Route 53, GoDaddy, etc.)
2. **Request SSL certificate** in AWS Certificate Manager (us-east-1 region)
3. **Add CNAME** to CloudFront distribution settings
4. **Update DNS** records to point to CloudFront domain

## 🧠 Future Improvements
- Add CI/CD pipeline (GitHub Actions → AWS S3)
- Integrate AWS Lambda for contact form (email sending)
- Add light/dark theme toggle
- Optimize images with Next.js Image component

## ♿ Accessibility

- Semantic HTML elements (`<main>`, `<nav>`, `<footer>`)
- ARIA labels for icon-only buttons
- Alt text for all images
- Keyboard navigation support
- Sufficient color contrast ratios
- Focus indicators for interactive elements

## 📱 Mobile Testing

Test on various devices:
- iOS Safari (iPhone)
- Android Chrome
- Tablet devices
- Desktop browsers (Chrome, Firefox, Safari, Edge)

Use browser DevTools responsive mode for quick testing.

## 🔧 Customization

### Update Personal Information

- Edit contact details in `app/contact/page.tsx`
- Update social links in `components/navbar.tsx` and `components/footer.tsx`
- Modify bio in `app/about/page.tsx`

### Add/Remove Projects

Edit the `projects` array in `app/projects/page.tsx`

### Change Colors

Modify color tokens in `app/globals.css` under the `:root` selector

### Replace Profile Image

Add your image to `public/` and update the image source in `app/page.tsx`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions, please open an issue on GitHub or contact via the website's contact form.

---

Built with ❤️ using Next.js and TailwindCSS
