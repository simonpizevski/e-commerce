# Fullstack Ecommerce

## Description

A fullstack ecommerce application built with Next.js, React, TypeScript, MongoDB, and Stripe.

## Technologies Used

- Next.js
- TypeScript
- MongoDB
- Stripe
- Cloudinary
- NextAuth.js

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/simonpizevski/e-commerce.git
    ```
2. Navigate to the project directory:
    ```sh
    cd your-repo
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```dotenv
MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_FOLDER=ecommerce
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key