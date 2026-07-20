-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  created_at timestamp WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Agents table
CREATE TABLE agents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  wallet_address text NOT NULL,
  unified_balance numeric DEFAULT 0,
  status text NOT NULL
);

-- Settlement rules table
CREATE TABLE settlement_rules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  trigger_signal text NOT NULL,
  threshold numeric NOT NULL,
  settlement_amount numeric NOT NULL,
  status text NOT NULL
);

-- RPC for basic table queries
CREATE OR REPLACE FUNCTION get_table_data(table_name text)
RETURNS SETOF json AS $$
BEGIN
  RETURN QUERY EXECUTE format('SELECT json_agg(t) FROM (SELECT * FROM %I) t', table_name);
END;
$$ LANGUAGE plpgsql;
