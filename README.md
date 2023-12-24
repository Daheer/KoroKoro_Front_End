# KoroKoro 👀
A novel way to view items for sale!

https://github.com/Daheer/KoroKoro_Front_End/assets/34832399/aa54b1eb-508e-48b0-afd5-8d106d3403c7

## Introduction
Ever wished you could spice up your online shopping experience? With KoroKoro, sellers can casually snap a 360-degree video of their product, and voila, we turn it into a nifty 3D version. What makes KoroKoro chill is that it's all about showcasing products in this cool 3D space for a laid-back online shopping vibe. Check it out and add some playful zest to your e-commerce journey!

This repo is for KoroKoro's front-end implementation.

For the back-end, check [here](https://github.com/Daheer/KoroKoro)

## Prerequisites
- NodeJS v21.1.0
- npm v10.2.3

## Installation

```
# Clone this repo
git clone https://github.com/Daheer/KoroKoro_Front_End
cd KoroKoro_Front_End

# Install packages 
npm install --legacy-peer-deps
```

## Usage

### Dev
`npm run dev`

### Production
```
npm run build
npm run start
```

## Folder/Component Structure

```
📦 KoroKoro_Front_End
├─ Dockerfile
├─ app
│  ├─ components
│  │  ├─ AuthUI.js
│  │  ├─ Canvas3D.js
│  │  ├─ CartCounter.js
│  │  ├─ Modal.js
│  │  ├─ Model.js
│  │  ├─ NavBar.js
│  │  ├─ ProductCard.js
│  │  ├─ VideoForm.js
│  │  └─ loading.js
│  ├─ layout.js
│  ├─ loading.js
│  ├─ page.js
│  ├─ product_v2
│  │  └─ [unique_id]
│  │     ├─ loading.js
│  │     └─ page.js
│  ├─ products
│  │  ├─ loading.js
│  │  └─ page.js
│  └─ services
│     ├─ dataOps.js
│     ├─ downloadOps.js
│     └─ supabaseClient.js
├─ font
│  └─ CircularStd-Book.ttf
├─ instrumentation.js
├─ jsconfig.json
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ how_to.mp4
│  ├─ loading3d.gif
│  ├─ view.gif
│  └─ view.png
└─ tailwind.config.js
```

## Contributing
This project is still very barebones and I use weekends to have fun building it. Join me

Fork the repository.
Create your branch.
Make your changes and commit them.
Push to the branch.
Submit a pull request.

Please reach out to me @ suhayrid6@gmail.com, I'd be happy to walk you through the project, including the Supabase database configuration
