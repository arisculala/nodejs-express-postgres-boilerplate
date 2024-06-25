#!/bin/bash

# Variables
PGUSER="postgres"
PGPASSWORD="postgres"
PGHOST="localhost"
PGPORT="5432"
PGDATABASE="nodejs-express-postgres-db"

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# Set the SQL file path relative to the script's directory
SQL_FILE="$DIR/initialize_db.sql"

# Export PostgreSQL credentials (avoid prompting for password)
export PGPASSWORD=$PGPASSWORD

# Check if PostgreSQL service is running
if pg_isready -h $PGHOST -p $PGPORT; then
  echo "PostgreSQL is running."
else
  echo "PostgreSQL is not running. Please start the PostgreSQL service."
  exit 1
fi

# Check if the nodejs-express-postgres-boilerplate-db database exists
DB_EXIST=$(psql -U $PGUSER -h $PGHOST -p $PGPORT -tAc "SELECT 1 FROM pg_database WHERE datname='$PGDATABASE'")

if [ "$DB_EXIST" != "1" ]; then
  echo "Database $PGDATABASE does not exist. Creating database..."
  createdb -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE
else
  echo "Database $PGDATABASE already exists."
fi

# Run the SQL script to initialize the database
echo "Initializing the database with $SQL_FILE..."
psql -U $PGUSER -h $PGHOST -p $PGPORT -d $PGDATABASE -f $SQL_FILE

echo "Database initialization completed."
