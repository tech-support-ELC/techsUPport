const Sequelize = require('sequelize')
const config = require('./config')

const db = new Sequelize(config);

const Patient = db.define('patient', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

async function connect() {
  try {
    await db.sync()
    console.log('db synced')
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    // This is a global Mocha hook used for resource cleanup.
    // Otherwise, Mocha v4+ does not exit after tests.
    if (process.env.NODE_ENV === 'test') {
      after('close database connection', () => db.close())
    } else {
      console.log('closing db connection')
      await db.close()
      console.log('db connection close')
    }
  }
}

connect()


module.exports = {
  db,
  Patient
}
