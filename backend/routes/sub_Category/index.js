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


router.get("/sub_Category", async (req, res) => {
    try {
        const { q } = req.query; // Get the search query from the request
        let rows;
        console.log('q==>',q);
        
        if (q) {
            // If a search query is provided, filter the results
            [rows] = await pool.query(
                "SELECT * FROM Sub_Category WHERE sub_category_name LIKE ?", 
                [`%${q}%`] // Use wildcards for partial matching
            );
        } else {
            // If no search query, return all rows
            [rows] = await pool.query("SELECT * FROM Sub_Category");
        }

        res.send({ data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}).post("/sub_Category/new", async (req, res) => {
    console.log("body0",req.body);
    
    const {sub_Category_name,name,image} = req.body;

    console.log("Image",image)

    await pool.query("INSERT INTO Sub_Category (sub_category_name,Category_name, Image,Status) VALUES (?,?, ?,?)", [sub_Category_name,name, image,"INACTIVE"]);

    res.send({ error: false, message: "Sub_Category Created" });
}).patch("/sub_Category/:id", async (req, res) => {
    const { id } = req.params; // Get the Sub_category ID from the URL params
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
            `UPDATE Sub_Category SET ${fields} WHERE id = ?`,
            values
        );

        // Check if any row was affected
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: true, message: "Sub_Category not found" });
        }

        res.send({ error: false, message: "Sub_Category updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}).delete("/sub_Category/:id", async (req, res) => {
    const { id } = req.params; // Extract the category ID from the request parameters

    try {
        // Execute the DELETE query
        const [result] = await pool.query("DELETE FROM Sub_Category WHERE id = ?", [id]);

        // Check if any row was affected
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: true, message: "Sub_Category not found" });
        }

        res.send({ error: false, message: "Sub_Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;