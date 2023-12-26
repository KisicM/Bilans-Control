// mongo-init.js

// Create a new database and user
db = db.getSiblingDB('reports');
db.createUser({
  user: 'admin',
  pwd: 'pass',
  roles: [
    {
      role: 'readWrite',
      db: 'reports'
    }
  ]
});

// Optional: Create collections or perform additional initialization steps
