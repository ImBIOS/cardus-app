# 📦 CardusApp TWA

This is the Trusted Web Activity for the CardusApp project. It is a webapp that allows you to create and manage your own personal warehouse/storage/carton.

## 😎 Features

- [ ] Warehouse management
  - [ ] Create warehouse
  - [ ] Add box to warehouse
  - [ ] Manage warehouse access
- [ ] Box management
  - [ ] Create box
  - [ ] Add item to box
  - [ ] Individually manage box access

## 🛠 Develop Locally

### 📄 Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### 🚀 Getting Started

1. Clone the repository
2. Install dependencies with `yarn install`
3. Start the development server with `yarn dev`

### 🏗️ Build

1. Build the project with `yarn build`
2. Start the production server with `yarn start`

### 💻 CORS

#### 🔨 How to Set

1. Edit `cors.json`
2. Run `gcloud storage buckets update gs://BUCKET_NAME --cors-file="cors.json"`

### 🔍 How to Check

```bash
gcloud storage buckets describe gs://BUCKET_NAME --format="default(cors)"
```
