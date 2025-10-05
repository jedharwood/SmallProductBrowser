# SmallProductBrowser

A full-stack product browser application with .NET 9 WebApi backend and Vite/React TypeScript frontend with responsive Tailwind styling.

## Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### Running the Backend (API)

1. Navigate to the API directory:
   ```bash
   cd SmallProductBrowser-API\SmallProductBrowser
   ```

2. Restore dependencies and build:
   ```bash
   dotnet restore
   dotnet build
   ```

3. Run the API:

   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:7168` (or check the console output for the exact URL).

### Running the Frontend (UI)

1. Navigate to the UI directory:
   ```bash
   cd SmallProductBrowser-UI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or check the console output for the exact URL).

## Testing

### Frontend Tests
```bash
cd SmallProductBrowser-UI
npm test
```

## Project Structure

```
SmallProductBrowser/
├── SmallProductBrowser-API/     # .NET Web API backend
│   └── SmallProductBrowser/
└── SmallProductBrowser-UI/      # React TypeScript frontend
```

## Features

- Product browsing and search
- Shopping cart functionality
- Responsive design with Tailwind CSS
- TypeScript for type safety
- React Query for data fetching and caching
- Unit and integration tests

## Potential gotchas

When testing this setup on another machine the CORS failed because the frontend port switched from `http://localhost:5173` to `http://localhost:5174`. If experiencing CORS issues you may need to check the url of the UI and add it to the CORS origins on line 22 of `SmallProductBrowser-API\SmallProductBrowser\Program.cs`