#!/bin/sh
psql "$DATABASE_URL" -f /app/db/schema.sql
