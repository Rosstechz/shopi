# Shopi Ecommerce App
An Ecommerce web application build with Next.js@15


# Features
-   User Authentication** (Clerk)  
-   Global Cart State Management (Zustand)  
-   Product Listing with API Integration
-   Search & Filtering
-   Sorting & Checkout Process
-   Fully Responsive Design
-   Deployed on Vercel 

Installation and Running Locally
1) Clone the repository locally : git clone https://github.com/Rosstechz/shopi
2) cd shopi
3) run: npm install or npm i
4) Create a .env.local file in the root directory: i.e shopi
5) setup a clerk account for authentication
6) Add the following env keys to .env.local
    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_api_key
    - CLERK_SECRET_KEY=your_clerk_secret_key
    - NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    - NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    - NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    - NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

7) npm run dev
8) Open http://localhost:3000


Tech Stack
    - Frontend: Next.js, Tailwind CSS
    - State Management: Zustand
    - Authentication: Clerk
    - Deployment: Vercel

