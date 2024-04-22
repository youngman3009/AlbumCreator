import "reflect-metadata";
import { app } from './app';
import { AppDataSource } from "./data-source";

// Initialise database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection successful")
    
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Error: ", error))
