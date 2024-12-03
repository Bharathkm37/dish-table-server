import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getCSVData, getCSVDataForDish } from './controllers/csvController';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/get-csv-data', getCSVData);
app.get('/api/get-dish-details', getCSVDataForDish);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
