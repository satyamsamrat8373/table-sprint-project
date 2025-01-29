const router = require('express').Router();
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'system',
  database: 'Kodnestbank',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


router.get("/category", async (req, res) => {
    try {
        const { q } = req.query; // Get the search query from the request
        let rows;

        if (q) {
            // If a search query is provided, filter the results
            [rows] = await pool.query(
                "SELECT * FROM Category WHERE Category_name LIKE ?", 
                [`%${q}%`] 
            );
        } else {
            // If no search query, return all rows
            [rows] = await pool.query("SELECT * FROM Category");
        }

        res.send({ data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}).post("/category/new",async (req,res)=>{

    const {Category_Name,image} = req.body;

    console.log("Image",image)
   

    await pool.query("INSERT INTO Category (Category_Name, Image,Status) VALUES (?, ?,?)", [Category_Name, image,"INACTIVE"]);

    res.send({ error: false, message: "Category Created" });
}).patch("/category/:id", async (req, res) => {
    const { id } = req.params; // Get the category ID from the URL params
    const payload = req.body; // Get the update payload from the request body

    try {
        // Check if the payload is empty
        if (Object.keys(payload).length === 0) {
            return res.status(400).send({ error: true, message: "No fields to update" });
        }

        // Dynamically build the SET clause for the UPDATE query
        const fields = Object.keys(payload)
            .map((key) => `${key} = ?`) // e.g., "name = ?", "description = ?"
            .join(", ");

        const values = Object.values(payload); // Get the values to bind

        // Add the ID to the values for the WHERE clause
        values.push(id);

        // Execute the query
        const [result] = await pool.query(
            `UPDATE Category SET ${fields} WHERE id = ?`,
            values
        );

        // Check if any row was affected
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: true, message: "Category not found" });
        }

        res.send({ error: false, message: "Category updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}).delete("/category/:id", async (req, res) => {
    const { id } = req.params; // Extract the category ID from the request parameters

    try {
        // Execute the DELETE query
        const [result] = await pool.query("DELETE FROM Category WHERE id = ?", [id]);

        // Check if any row was affected
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: true, message: "Category not found" });
        }

        res.send({ error: false, message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;