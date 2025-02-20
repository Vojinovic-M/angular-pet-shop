# Angular Pet Shop

A full-featured pet shop web application built with Angular. This project simulates a real-world pet shop by providing a comprehensive platform for browsing products, managing orders, and handling user accounts — all wrapped in a modern, responsive design.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Overview

The Angular Pet Shop project is designed to offer a seamless and engaging experience for pet owners. Users can browse a rich catalog of pet products, manage their shopping carts, and place orders using a responsive interface powered by Angular. While this repository contains the frontend application, the backend (Spring Boot) resides in a separate repository: [spring-pet-shop](https://github.com/Vojinovic-M/spring-pet-shop)

## Features

- **Responsive Design:** Interface built with Tailwind CSS and Preline UI.
- **User Authentication:** 
  - Standard email/password login.
  - Google Sign-In integration.
- **Product Catalog:** Browse, search, and filter an extensive list of pets with detailed descriptions.
- **Shopping Cart & Checkout:** Easily add items to your cart and complete purchases.
- **Order Management:** View order history and track the status of your orders.
- **Real-Time Data Updates:** Enjoy dynamic content updates for a smooth user experience.

## Technology Stack

- **Frontend:** Angular 19, Tailwind CSS, Preline UI
- **Backend:** Spring Boot, MySQL database
- **Authentication:** OAuth2 (Google) and BasicAuth custom authentication

## Installation

### Frontend Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/AngularPetShop.git
   cd AngularPetShop
2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Run the Development Server:**
    ```bash
    ng serve
    ```
Open http://localhost:4200/ to view the application. The app will automatically reload if you change any source files.

## Usage

With both the frontend and backend applications running, you can:
- Browse and search for pets.
- Sign up or log in to manage your account and orders.
- Add products to your cart and proceed through the checkout process.
- View order history and track the status of your orders.

## Project Structure
```bash
├── rasabot/ # Rasa AI configuration
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── chat/ # Chatbot
│ │ │ ├── footer/ # Footer
│ │ │ ├── header/ # Header
│ │ │ ├── rating/ # Modal for rating pets
│ │ │ ├── search/ # Search bar for the browse page
│ │ │ └── theme-toggle/ # Dark/light theme
│ │ ├── interceptors/ # Currently has an error interceptor
│ │ ├── pages/
│ │ │ ├── about/ # About page
│ │ │ ├── browse/ # Browse pets
│ │ │ ├── cart/ # Shopping cart
│ │ │ ├── home/ # Home page
│ │ │ ├── order/ # Order section on user's profile
│ │ │ ├── pet/ # Individual pet pages
│ │ │ ├── shipping/ # Shipping prices page (placeholder for now)
│ │ │ └── user/
│ │ │ │ ├── dashboard/ # User dashboard
│ │ │ │ ├── edit/ # Edit user profile
│ │ │ │ ├── login/ # Login page
│ │ │ │ └── signup/ # Signup page
│ │ ├── pipes/ # Uses a pipe for translating communication between Angular and Rasa
│ │ └── services/
│ │ │ ├── auth-google.service.ts # Google authentication
│ │ │ ├── auth-user.service.ts # Authentication for users in the database
│ │ │ ├── axios.service.ts # Axios for communcation with the backend
│ │ │ ├── cart.service.ts # Enables cart functionalities
│ │ │ ├── order.service.ts # Enables order functionalities
│ │ │ ├── storage.service.ts # Local storage configuration
│ │ │ ├── theme.service.ts # Theme configuration
│ │ │ └── web.service.ts # Communication with Rasa + backend rendering of pets
│ ├── assets/ # Images, favicon, shipping.json for shipping prices
│ └── models/ # Models for mapping different entities
```
## Contributing

Contributions are welcome! To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/YourFeature).
- Commit your changes and push your branch.
- Open a pull request describing your changes.
