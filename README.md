# Modern Portfolio Website

A beautiful, fully responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 Modern, playful design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Vite
- 🎭 Typewriter effect in hero section
- 🎯 Scroll-triggered animations
- 📧 Contact form with validation
- 🎨 Customizable color scheme
- 💼 Project showcase with hover effects
- 📜 Timeline/experience section
- 📄 Resume download functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## 📝 Customization Guide

### Updating Your Information

All content is stored in easy-to-edit TypeScript files in the `src/data` folder:

#### Personal Info (`src/data/personal.ts`)
- Update your name, title, bio, email, and phone
- Add your social media links
- Update your resume download link

#### Skills (`src/data/skills.ts`)
- Add or remove skills
- Organize by categories

#### Timeline/Experience (`src/data/timeline.ts`)
- Add your work experience
- Update company names, roles, and descriptions

#### Projects (`src/data/projects.ts`)
- Showcase your best projects
- Add project images, descriptions, and tech stacks
- Link to live demos and GitHub repos

#### Resume Highlights (`src/data/resume.ts`)
- List your key achievements
- Customize the resume section content

### Changing Colors

The color scheme is defined in two files:

#### `src/index.css`
Update the HSL color values in the `:root` section:
```css
--primary: 260 80% 65%;      /* Purple-blue */
--accent: 340 75% 65%;       /* Coral-pink */
--background: 220 25% 10%;   /* Dark background */
```

#### `tailwind.config.ts`
Colors are automatically synced from CSS variables. You can add custom animations here.

### Adding/Removing Sections

To add or remove sections, edit `src/pages/Index.tsx`:
```tsx
<Hero />
<About />
<Timeline />
<Projects />
<Resume />
<Contact />
```

### Updating Navigation

Edit the navigation links in `src/components/Header.tsx`:
```tsx
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  // Add more links here
];
```

### Changing Images

- **Profile Picture**: Replace the image URL in `src/components/About.tsx`
- **Project Images**: Update image paths in `src/data/projects.ts`
- Store images in the `public` folder for direct reference

## 🎨 Design Customization

### Animations

Animations are defined in `tailwind.config.ts`. You can:
- Adjust animation timing
- Add new animations
- Modify existing animation effects

### Fonts

Update fonts in `src/index.css`:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

Don't forget to import the font in `index.html` if using Google Fonts.

### Spacing & Layout

Tailwind CSS classes control spacing. Common patterns:
- `py-20 md:py-32` - Padding for sections
- `gap-8` - Spacing between elements
- `max-w-6xl` - Container width

## 📦 Building for Production

Create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` folder.

## 🚀 Deployment

### Lovable Platform (Recommended)

1. Click "Publish" in the Lovable editor
2. Your site will be live instantly

### Other Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

**GitHub Pages:**
- Push to GitHub
- Enable GitHub Pages in repository settings
- Set source to `gh-pages` branch

## 🛠 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Custom CSS + Tailwind

## 📄 Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx   # Navigation
│   ├── Hero.tsx     # Hero section with typewriter
│   ├── About.tsx    # About section
│   ├── Timeline.tsx # Experience timeline
│   ├── Projects.tsx # Project showcase
│   ├── Resume.tsx   # Resume section
│   ├── Contact.tsx  # Contact form
│   └── Footer.tsx   # Footer
├── data/            # Content data files
│   ├── personal.ts  # Personal info
│   ├── skills.ts    # Skills list
│   ├── timeline.ts  # Work history
│   ├── projects.ts  # Project data
│   └── resume.ts    # Resume highlights
├── pages/           # Page components
│   └── Index.tsx    # Main page
└── index.css        # Global styles & design system
```

## 🎯 Performance Tips

- Optimize images (use WebP format when possible)
- Lazy load images for better initial load time
- Keep animations smooth (avoid animating expensive properties)
- Use the production build for deployment



