# 📦 CardusApp TWA

This is the Trusted Web Activity for the CardusApp project. It is a webapp that allows you to create and manage your own personal warehouse/storage/carton.

## 😎 Features

- [ ] Feature: Box
  - [x] Create Box
    - [x] Add Box Name
    - [x] Add Box Location
    - [x] Add Box Image
    - [x] Use Google Cloud Storage API
  - [x] Create Item in Box
    - [x] Add Item Name
    - [x] Add Item Meta Search Keywords
    - [x] Delete Item Meta Search
    - [x] Add Item Image
    - [x] Delete Item Image
    - [x] Auto Label Image with AI
  - [x] Read Box
    - [x] Read Box Detail
    - [x] Read All Box
  - [ ] Update box detail
  - [x] Delete Box
    - [x] Delete Box Image
  - [x] Read All Item in Box
  - [x] Update Item Detail
  - [x] Delete Item
  - [ ] Print Box QR Code
- [ ] Feature: Search
  - [ ] Semantic Search Item
  - [ ] Locate Item-in-Box by QR Scan
- [ ] Feature: Scan QR
  - [ ] Open Box Data by Scan
  - [ ] Box Privacy & Authorization
- [ ] Feature: Trusted Web Activity
  - [ ] Build TWA
  - [ ] Publish to Google Play Store
- [ ] Testing
  - [ ] Unit Testing
  - [ ] Integration Testing
  - [ ] E2E Testing
- [ ] Storybook
  - [x] Create Storybook
  - [ ] Deploy Storybook

## 📜 To-Do

- [ ] Migrate `pagesDir` to `appDir`
- [ ] Migrate to `PNPM` and `turborepo`
- [ ] Research `tensorflow` and `Google Vision API`

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

#### 🔍 How to Check

```bash
gcloud storage buckets describe gs://BUCKET_NAME --format="default(cors)"
```
