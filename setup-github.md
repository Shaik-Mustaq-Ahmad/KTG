# Krishna Tech Guru - GitHub Setup Guide

## Project Structure

Create the following directory structure in your local project:

```
krishna-tech-guru/
├── public/
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── ImageCarousel.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── VerifyOTP.tsx
│   │   ├── Courses.tsx
│   │   ├── Home.tsx
│   │   └── Live.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Setup Steps

1. **Initialize the project:**
   ```bash
   mkdir krishna-tech-guru
   cd krishna-tech-guru
   npm create vite@latest . -- --template react-ts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm install @hookform/resolvers framer-motion lucide-react react-hook-form react-router-dom yup
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Copy all file contents from this Bolt project to your local files**

4. **Initialize Git and push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Krishna Tech Guru application"
   git branch -M main
   git remote add origin https://github.com/yourusername/krishna-tech-guru.git
   git push -u origin main
   ```

## Key Features Included

- ✅ Complete authentication system with OTP verification
- ✅ Professional navbar with KTG branding
- ✅ Interactive image carousel
- ✅ Courses marketplace with pricing
- ✅ Live sessions with Zoom integration
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ Payment gateway ready (Stripe integration)

## Environment Variables

Create a `.env` file for any environment variables:

```env
VITE_APP_NAME=Krishna Tech Guru
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

## Deployment

The application is ready for deployment on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Next Steps

1. Set up Stripe for payment processing
2. Configure real OTP service (Twilio, etc.)
3. Add backend API integration
4. Set up database (if needed)
5. Configure CI/CD pipeline