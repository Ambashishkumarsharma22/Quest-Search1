# Quest Search

Quest Search is a full-stack application designed to provide advanced search functionality for a questions database. The project features a robust backend built with ConnectRPC and a responsive frontend developed using Vite, React, and TypeScript. It leverages modern technologies and deployment strategies to ensure a seamless and efficient user experience.

## Folder Structure

```
project-root/
├── apps/
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── ... (other backend files)
│   ├── frontend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── ... (other frontend files)
├── proto/
│   ├── connectrpc/
│   │   └── questions/
│   │       └── v1/
│   │           └── questions.proto
│   ├── buf.yaml
│   └── buf.gen.yaml
├── docker-compose.yml
└── package.json
```

## Deployed Application

The application is deployed and accessible via the following links:
- Frontend: [https://questsearchfrontend.azurewebsites.net/](https://questsearchfrontend.azurewebsites.net/)
- Backend: [https://questsearchbackend.azurewebsites.net/](https://questsearchbackend.azurewebsites.net/)

## Running Locally

To run the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/HarshitShukla-dev/Quest-search
   cd Quest-search
   ```

2. **Using Docker Compose:**

   - Ensure you have Docker and Docker Compose installed.
   - Set the `MONGODB_URI` environment variable with your MongoDB connection string.
   - Run the following command to start the services:

     ```bash
     docker-compose up --build
     ```

3. **Running Manually:**

   - Create `.env` files in `apps/backend` based on `.env.example`.
   - Navigate to the root directory and run following commands in different terminals:

     ```bash
     npm run start:backend
     npm run start:frontend
     ```

4. **Access the Application:**

   - Alternatively, you can access the deployed application directly:
     - Frontend: [https://questsearchfrontend.azurewebsites.net/](https://questsearchfrontend.azurewebsites.net/)
     - Backend: [https://questsearchbackend.azurewebsites.net/](https://questsearchbackend.azurewebsites.net/)
