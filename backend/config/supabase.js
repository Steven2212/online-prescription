const { createClient } = require("@supabase/supabase-js");

//Supabase to store the prescription pdf.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;