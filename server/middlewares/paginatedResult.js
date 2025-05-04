import { connectToDatabase } from "../lib/db.js";

function paginatedResultsSQL(tableName, unAllowedColumns = []) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const db = await connectToDatabase();

      // Get all column names from the table
      const [columnsResult] = await db.execute(`SHOW COLUMNS FROM ${tableName}`);
      const allColumns = columnsResult.map(col => col.Field);

      // Filter out the disallowed columns
      const allowedColumns = allColumns.filter(col => !unAllowedColumns.includes(col));
      const selectedColumns = allowedColumns.join(", ");

      const [totalResult] = await db.execute(`SELECT COUNT(*) AS count FROM ${tableName}`);
      const total = totalResult[0].count;

      const [rows] = await db.execute(
        `SELECT ${selectedColumns} FROM ${tableName}  ORDER BY id DESC LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const results = {
        next: offset + limit < total ? { page: page + 1, limit } : null,
        previous: offset > 0 ? { page: page - 1, limit } : null,
        results: rows,
        total_data: total
      };

      res.paginatedResults = results;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database error' });
    }
  };
}
export { paginatedResultsSQL };