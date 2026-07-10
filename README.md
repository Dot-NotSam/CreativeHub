<div align="center">

# 🎨 CreativeHub

### Professional Networking Platform for Creative Professionals

Connect • Showcase • Grow

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4)
![Azure](https://img.shields.io/badge/Microsoft-Azure-0078D4)
![License](https://img.shields.io/badge/License-MIT-success)

</div>

---

# 📖 Overview

CreativeHub is a professional networking platform designed exclusively for creative professionals, including UI/UX designers, graphic designers, photographers, illustrators, video editors, writers, motion designers, 3D artists, and creative developers.

The platform combines professional networking, portfolio presentation, and opportunity discovery into a unified ecosystem where creators can establish their professional identity, showcase their work, connect with industry professionals, and explore creative career opportunities.

---

# 🎯 Problem Statement

Creative professionals often depend on multiple disconnected platforms to manage their professional presence.

- Professional networking on LinkedIn
- Portfolio presentation on Behance or Dribbble
- Career opportunities through job portals

Maintaining separate profiles across multiple platforms makes networking and portfolio management inefficient.

CreativeHub provides a unified platform where creative professionals can network, build portfolios, and discover opportunities from a single place.

---

# 🚀 Key Features

- 👤 Professional Creator Profiles
- 🎨 Portfolio Showcase
- 🤝 Professional Networking
- 🔍 Discover Creative Professionals
- 💼 Creative Job Board
- 📰 Personalized Dashboard
- ❤️ Social Engagement (Likes & Comments)
- 🔐 Secure Authentication
- 🎭 Demo Mode for Quick Evaluation
- 📱 Responsive User Interface

---

# ☁️ Microsoft Azure Architecture

CreativeHub follows a cloud-based architecture designed using Microsoft Azure services to ensure scalability, reliability, and efficient media management.

| Azure Service | Purpose |
|----------------------|------------------------------------------------------------|
| Azure App Service | Hosts the CreativeHub web application |
| Azure SQL Database | Stores user profiles, networking data, job listings, and portfolio metadata |
| Azure Blob Storage | Stores portfolio images, creative assets, and media files |

---

## System Architecture

```text
                    Users
                      │
                      ▼
            Azure App Service
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
 Azure SQL Database      Azure Blob Storage
          │                       │
          └───────────┬───────────┘
                      ▼
                 CreativeHub
```

---

# 🏗 Core Modules

## 👤 Professional Profiles

Users can create a personalized profile containing:

- Profile Picture
- Professional Title
- Biography
- Skills
- Experience
- Social Links
- Portfolio
- Professional Statistics

---

## 🎨 Portfolio Showcase

Creators can showcase their work through portfolio projects containing:

- Project Cover Image
- Project Description
- Creative Category
- Tools & Technologies Used
- Engagement Statistics

---

## 🤝 Professional Networking

CreativeHub enables users to:

- Discover creative professionals
- Send connection requests
- Manage professional connections
- Build their creative network

---

## 💼 Job Opportunities

The integrated job board allows users to:

- Browse creative opportunities
- View detailed job descriptions
- Check required skills
- Apply for positions
- Track application status

---

## 📰 Personalized Dashboard

The dashboard provides quick access to:

- Featured Creatives
- Trending Portfolios
- Suggested Connections
- Latest Opportunities
- Community Activity

---

# 🛠 Technology Stack

| Category | Technology |
|-----------|------------|
| Frontend | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Animations | Framer Motion |
| State Management | React Context API |
| Data Storage | Browser Local Storage |

---

# 📂 Project Structure

```text
src
│
├── app
│   ├── (auth)
│   ├── (dashboard)
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── shared
│   └── ui
│
├── lib
│   ├── AuthContext.tsx
│   ├── AppContext.tsx
│   ├── mockData.ts
│   └── utils.ts
│
├── hooks
│
├── types
│
└── styles
```

---

# 🔒 Authentication

CreativeHub supports two authentication methods.

### Personal Account

Users can create their own account, log in securely, and maintain a personalized experience across sessions.

### Demo Mode

A pre-configured creative profile is available for quick evaluation, allowing users to explore all platform features without creating an account.

---

# 💾 Data Management

The platform maintains persistent application data including:

- User Profiles
- Portfolio Projects
- Professional Connections
- Job Applications
- Activity Feed
- User Preferences

This enables a seamless and consistent user experience across browser sessions.

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18 or above
- npm

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd CreativeHub
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Start the production server

```bash
npm run start
```

---

# 📸 Application Modules

- Landing Page
- Authentication
- Dashboard
- Explore Creatives
- Creator Profiles
- Portfolio Gallery
- Professional Connections
- Job Listings
- Activity Feed

---

# 🔮 Future Enhancements

- AI-powered creator recommendations
- Real-time messaging
- Portfolio analytics
- Recruiter dashboard
- Creative communities
- Event management
- Skill verification
- Team collaboration workspaces

---

# 👨‍💻 Team

Developed by the CreativeHub Team.

---

<div align="center">

### 🎨 CreativeHub

Connecting Creative Minds.

</div>