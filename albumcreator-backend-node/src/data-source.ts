import "reflect-metadata"
import dotenv from 'dotenv';
import { DataSource } from "typeorm"
import { Album } from "./models/album"
import { Artist } from "./models/artist"
import { Genre } from "./models/genre"
import { Track } from "./models/track"

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Album, Artist, Genre, Track],
  synchronize: false,
  logging: false,
})
