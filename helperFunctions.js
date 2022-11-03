const sql = require("mssql");
const sqlConfig = {
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  server: process.env.SERVER_ADDR,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

sql.on("error", (err) => {
  console.log("err: ", err);
});

const getOrders = async () => {
  let pool = await sql.connect(sqlConfig);
  let result = await pool.request().query("SELECT * FROM orders");
  sql.close();
  return result.recordset ? result.recordset : [];
}

const addOrder = async (params) => {
  let { title, displayOrder } = params
  let pool = await sql.connect(sqlConfig);
  await pool
    .request()
    .input("Title", sql.VarChar(50), title)
    .input("DisplayOrder", sql.Int(10), parseInt(displayOrder))
    .query(
      "INSERT INTO orders(Title, DisplayOrder) VALUES(@Title, @DisplayOrder)"
    );
  let result = await pool.request().query("SELECT * FROM orders");
  sql.close();
  return result.recordset ? result.recordset : [];
}

exports.getOrders = getOrders;
exports.addOrder = addOrder
