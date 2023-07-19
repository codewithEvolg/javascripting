const properties = require("./json/properties.json");
const users = require("./json/users.json");

const pg = require('pg');
const Pool = pg.Pool;

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'lightbnb',
  user: process.env.DB_USER || 'oluwagbengaogundare', 
  password: process.env.DB_PASS || '123'
};

const pool = new Pool(config);

pool.connect();

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool.query(`SELECT * FROM users where email=$1;`, [email])
  .then((res)=>{
    const user = res.rows[0];
    return user;
  })
  .catch((err) => {
    console.log(err);
  });;
 };

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 **/
const getUserWithId = function (id) {
  //return Promise.resolve(users[id]);
  return pool.query(`SELECT * FROM users where id=$1;`, [id])
  .then((res)=>{
    const user = res.rows[0];
    return user;
  })
  .catch((err) => {
    console.log(err);
  });;
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const { email, name, password } = user;
  return pool
    .query(
      `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *;`,
      [email, name, password]
    )
    .then((res) => {
      const insertedUser = res.rows[0];
      return insertedUser;
    })
    .catch((err) => {
      console.log(err);
    });
};


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT properties.*, reservations.* FROM reservations 
      INNER JOIN properties ON properties.id = reservations.property_id
       WHERE guest_id = $1 LIMIT $2;`,
      [guest_id, limit]
    )
    .then((res) => {
      const reservations = res.rows;
      return reservations;
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `AND cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_nigh * 100}`);
    queryString += `AND cost_per_night < $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND rating > $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
  const { title, description, number_of_bedrooms, number_of_bathrooms,
    parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street,
    country, city, province, post_code } = user;
  return pool
    .query(
      `INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms,
        parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street,
        country, city, province, post_code) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *;`,
      [title, description, number_of_bedrooms, number_of_bathrooms,
        parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street,
        country, city, province, post_code]
    )
    .then((res) => {
      const insertedProperty = res.rows[0];
      return insertedProperty;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
