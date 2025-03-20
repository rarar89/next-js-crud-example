# Next.js CRUD Example

This project demonstrates a complete CRUD (Create, Read, Update, Delete) application built with Next.js 15, React 19, and TypeScript. It showcases modern web development practices with a clean, responsive UI.

## Features

- **Full CRUD Operations**: Create, read, update, and delete products
- **Modern Stack**: Built with Next.js 15 and React 19
- **TypeScript**: Type-safe development experience
- **SWR**: Data fetching with stale-while-revalidate strategy
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Optimistic UI Updates**: Immediate UI feedback with proper error handling

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/next-js-crud-example.git
   cd next-js-crud-example
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Key Technologies

- **Next.js**: React framework with server-side rendering and routing
- **React**: UI library for building component-based interfaces
- **TypeScript**: Static type checking for JavaScript
- **SWR**: React Hooks for data fetching
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting
- **Geist Fonts**: Modern, clean typography

## API Integration

The application connects to a RESTful API for product management. The API endpoints include:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch a single product
- `POST /products` - Create a new product
- `PUT /products/:id` - Update an existing product
- `DELETE /products/:id` - Delete a product

## Development

### Commands

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app/)
