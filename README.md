# Product Frame Generator

**Free, open-source tool to create professional product images with custom frames, badges, and marketplace-compliant sizing.**

No signup required. No database. All data stored locally in your browser.

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 📸 Preview

![Product Frame Generator Screenshot](https://raw.githubusercontent.com/Lucenta16/product-frame-generator/main/public/screenshot.png)

## ✨ Features

- 🎨 **Custom Frames & Borders** - Add colored borders with adjustable thickness
- 🏷️ **Badge Overlays** - Multiple pre-designed badges with customizable positioning
- 📐 **Marketplace Presets** - Auto-resize for Amazon (1000x1000, 2000x2000) and eBay (1600x1600, 1000x1000)
- 📦 **Bulk Export** - Export multiple images at once as ZIP files
- 🎯 **Live Preview** - Real-time canvas preview with all customizations
- 💾 **Local Storage** - All projects saved in browser localStorage
- 🚀 **No Backend Required** - Runs entirely in your browser
- 🔓 **100% Free** - No limits, no signup, no tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- (Optional) [Remove.bg API key](https://www.remove.bg/api) for background removal feature

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/product-frame-generator.git
cd product-frame-generator

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# (Optional) Add your Remove.bg API key to .env.local
# REMOVE_BG_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1. **Create a Template** - Click "New Frame Template" and choose your marketplace
2. **Upload Images** - Drag and drop or click to upload product images
3. **Customize** - Adjust borders, colors, backgrounds, and add badges
4. **Export** - Download individual images or bulk export as ZIP

All your templates are automatically saved in your browser's localStorage.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Image Processing:** HTML5 Canvas API
- **Storage:** Browser localStorage
- **Icons:** Lucide React

## 📁 Project Structure

```
├── app/
│   ├── dashboard/          # Template management
│   ├── editor/[projectId]/ # Image editor
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── dashboard/          # Dashboard components
│   └── editor/             # Editor components
├── lib/
│   ├── local-storage.ts    # localStorage utilities
│   └── image-processing.ts # Canvas processing
├── types/
│   └── index.ts            # TypeScript definitions
└── public/
    ├── badges/             # SVG badge files
    └── placeholder.svg     # Default placeholder image
```

## 🎨 Marketplace Presets

### Amazon

- **Standard:** 1000×1000 (minimum zoom requirement)
- **HD:** 2000×2000 (recommended high quality)

### eBay

- **Standard:** 1600×1600 (recommended)
- **Lightweight:** 1000×1000

## 🔧 Configuration

### Environment Variables

Only one optional environment variable:

```env
# Optional: Remove.bg API for background removal
REMOVE_BG_API_KEY=your_api_key_here
```

If not set, the background removal feature will be disabled.

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/product-frame-generator)

1. Click the button above or push to GitHub
2. Import project in Vercel
3. (Optional) Add `REMOVE_BG_API_KEY` environment variable
4. Deploy

### Deploy to Netlify

```bash
npm run build
```

Upload the `.next` folder to Netlify or connect your GitHub repository.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Placeholder image pattern inspired by standard image placeholders
- Built with [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), and [Lucide Icons](https://lucide.dev/)

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/yourusername/product-frame-generator/issues) with:

- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ for marketplace sellers everywhere
