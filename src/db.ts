import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query("SELECT 1", (err: any) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Connected!");
});

const createTable = async (tableName: string, columns: string) => {
  try {
    const result = await pool.query(`SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = '${tableName}'
    )`);
    if (!result.rows[0].exists) {
      await pool.query(`CREATE TABLE ${tableName} (${columns})`);
      console.log(`Table ${tableName} created successfully!`);
    } else {
      console.log(`Table ${tableName} already exists.`);
    }
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
  }
};

createTable(
  "users",

  `
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  wallet TEXT NOT NULL,
  contact_details TEXT NULL,
  password TEXT NOT NULL,
  img TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  country TEXT DEFAULT NULL,
  created_at TEXT DEFAULT NULL,
  role TEXT NOT NULL
  `
);

createTable(
  "collections",

  `
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  url TEXT,
  description TEXT,
  logo_image TEXT,
  banner_image TEXT,
  kind JSON,
  category JSON,
  sub_category JSON,
  collection_address TEXT DEFAULT NULL,
  blockchain TEXT
  `
);

createTable(
  "nft",

  `

  id SERIAL PRIMARY KEY,

  name TEXT NOT NULL,

  description TEXT NOT NULL,

  royalty_commission INTEGER NOT NULL,

  primary_owner TEXT NOT NULL,

  secondary_owner JSON,

  type TEXT NOT NULL,

  category TEXT NOT NULL,

  img TEXT NOT NULL,

  collection_id INTEGER NOT NULL REFERENCES collections(id),

  kind TEXT NOT NULL,

  properties JSON NOT NULL,

  blockchain TEXT NOT NULL,

  supply_quantity INTEGER NOT NULL,

  contact_address TEXT NOT NULL,

  token_id TEXT NOT NULL,

  token_standard TEXT NOT NULL,

  creator_fee TEXT NOT NULL,

  open_auction JSON,

  fix_price JSON,

  mystery_box JSON,

  level INTEGER NOT NULL,

  sub_category TEXT NOT NULL,

  insurance_per_hour DECIMAL(10, 0) NOT NULL,

  listingid TEXT DEFAULT NULL,

  created_at TIMESTAMP DEFAULT NULL

  `
);

createTable(
  "nft_transaction",

  `

  id SERIAL PRIMARY KEY,

  nfttoken_id INTEGER NOT NULL,

  nft_id INTEGER NOT NULL REFERENCES nft(id),

  buyer TEXT NOT NULL,

  seller TEXT NOT NULL,

  transaction_hash TEXT NOT NULL,

  transaction_time TIMESTAMP NOT NULL,

  price INTEGER NOT NULL

  `
);

createTable(
  "staking",

  `

  id SERIAL PRIMARY KEY,

  time TEXT NOT NULL,

  type TEXT NOT NULL,

  created_by INTEGER NOT NULL REFERENCES users(id),

  created_at TEXT DEFAULT NULL,

  creator_wallet TEXT NOT NULL,

  staked_user INTEGER NOT NULL REFERENCES users(id),

  staked_at TEXT DEFAULT NULL,

  collection_id INTEGER NOT NULL,

  nft_id INTEGER NOT NULL

  `
);

createTable(
  "stake_transactions",

  `

  id SERIAL PRIMARY KEY,

  stake_id INTEGER NOT NULL REFERENCES staking(id),

  staker_wallet TEXT NOT NULL,

  nft_id INTEGER NOT NULL,

  collection_id INTEGER NOT NULL,

  amount TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT now()

  `
);

export const query = (text: string, params: any[]) => pool.query(text, params);
export default pool;

// MYSQL CODE

// import mysql from "mysql";

// var pool = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "sql",
// });

// pool.connect(function (err: any) {
//   console.log(err);
//   if (err) throw err;
//   console.log("Connected!");
//   // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//   // con.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("Table created");
//   // });
// });

// const createTable = async (tableName: string, columns: string) => {
//   try {
//     const result: mysql.Query = await pool.query(
//       `SELECT COUNT(*) AS table_exists FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'your_database_name' AND TABLE_NAME = '${tableName}'`
//     );
//     // console.log(result);
//     if (!result) {
//       await pool.query(`CREATE TABLE ${tableName} (${columns})`);
//       console.log(`Table ${tableName} created successfully!`);
//     } else {
//       console.log(`Table ${tableName} already exists.`);
//     }
//   } catch (error) {
//     console.error(`Error creating table ${tableName}:`, error);
//   }
// };

// // createTable(
// //   "users",
// //   `
// //   id INT AUTO_INCREMENT PRIMARY KEY,
// //   name TEXT NOT NULL,
// //   email VARCHAR(255) NOT NULL UNIQUE,
// //   wallet TEXT NOT NULL,
// //   contact_details TEXT NULL,
// //   role TEXT NOT NULL,
// //   password TEXT NOT NULL,
// //   img TEXT DEFAULT NULL,
// //   address TEXT DEFAULT NULL,
// //   country TEXT DEFAULT NULL,
// //   created_at TEXT DEFAULT NULL
// //   `
// // );

// // createTable(
// //   "stalking",
// //   `
// //   id INT AUTO_INCREMENT PRIMARY KEY,
// //   time TEXT NOT NULL,
// //   type TEXT NOT NULL,
// //   creator_wallet TEXT NOT NULL,
// //   nft_id INT NOT NULL,
// //   collection_id INT NOT NULL,
// //   created_by INTEGER NOT NULL REFERENCES users(id),
// //   created_at TEXT DEFAULT NULL,
// //   stalked_user INTEGER NOT NULL REFERENCES users(id),
// //   stalked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP `
// // );

// // createTable(
// //   "collections",
// //   `id INT AUTO_INCREMENT PRIMARY KEY,
// //      user_id INTEGER NOT NULL REFERENCES users(id),
// //      name TEXT NOT NULL,
// //      url TEXT,
// //      description TEXT,
// //      logo_image TEXT,
// //      featured_image TEXT,
// //      banner_image TEXT,
// //      kind JSON,
// //      category JSON,
// //      sub_category JSON,
// //      collection_address TEXT DEFAULT NULL,
// //      blockchain TEXT`
// // );

// // createTable(
// //   "nft",
// //   "id INT AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, royalty_commission INTEGER NOT NULL, primary_owner TEXT NOT NULL, secondary_owner JSON, type TEXT NOT NULL, category TEXT NOT NULL, img TEXT NOT NULL, collection_id INTEGER NOT NULL REFERENCES collections(id), kind TEXT NOT NULL, properties JSON NOT NULL, blockchain TEXT NOT NULL, supply_quantity INTEGER NOT NULL, contact_address TEXT NOT NULL, token_id TEXT NOT NULL, token_standard TEXT NOT NULL, creator_fee TEXT NOT NULL, open_auction JSON, fix_price JSON, mystery_box JSON, level INTEGER NOT NULL, sub_category TEXT NOT NULL, insurance_per_hour NUMERIC NOT NULL, listingid TEXT DEFAULT NULL, created_at TEXT DEFAULT NULL"
// // );

// // createTable(
// //   "nftorders",
// //   "id INT PRIMARY KEY, player_id INTEGER NOT NULL REFERENCES players(id), nft_id INTEGER NOT NULL REFERENCES nfts(id), user_id INTEGER NOT NULL REFERENCES developers(id)"
// // );

// // createTable(
// //   "nftmarket",
// //   "id INT PRIMARY KEY, nft_id INTEGER NOT NULL REFERENCES nfts(id), listing BOOLEAN NOT NULL, seller TEXT NOT NULL, resell BOOLEAN NOT NULL, reselling_price FLOAT DEFAULT NULL, reselling_listingid INTEGER DEFAULT NULL, reselling_name TEXT DEFAULT NULL"
// // );

// // createTable(
// //   "nft_transaction",
// //   "id INT PRIMARY KEY, nfttoken_id INTEGER NOT NULL, nft_id INTEGER NOT NULL REFERENCES nfts(id), buyer TEXT NOT NULL, seller TEXT NOT NULL, transaction_hash TEXT NOT NULL, transaction_time TEXT NOT NULL, price INTEGER NOT NULL"
// // );

// export const query = (text: string, params: any[]) => pool.query(text, params);
// export default pool;
