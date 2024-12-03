import { Request, Response } from 'express';
import { processCSV } from '../services/csvService';

export const getCSVData = async (req, res) => {
  try {
    const filePath = 'public/data/indian_food.csv';
    
    const csvData = await processCSV(filePath);

    res.status(200).json({ message: 'CSV data fetched successfully', data: csvData });
  } catch (error) {
    const errorMessage = error.message || 'Unknown error';
    res.status(500).json({ error: 'Error fetching CSV data', details: errorMessage });
  }
};


export const getCSVDataForDish = async (req, res) => {
  try {
    const dishName = req.query.name;
    const filePath = 'public/data/indian_food.csv';
    
    const csvData = await processCSV(filePath);

    console.log('CSV Data:', csvData);

    if (dishName) {
      const dishData = csvData.filter((row) => 
        row.name && row.name.trim().toLowerCase() === dishName.trim().toLowerCase()
      );

      if (dishData.length > 0) {
        return res.status(200).json({ message: 'Dish data fetched successfully', data: dishData });
      } else {
        return res.status(404).json({ message: 'Dish not found', data: [] });
      }
    }

    return res.status(200).json({ message: 'All dishes fetched successfully', data: csvData });
  } catch (error) {
    const errorMessage = error.message || 'Unknown error';
    res.status(500).json({ error: 'Error fetching dish data', details: errorMessage });
  }
};
