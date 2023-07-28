// SUPABASE CLIENT
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://dovnlmvinygyjcdoxfkp.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdm5sbXZpbnlneWpjZG94ZmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA0Mzg4NDcsImV4cCI6MjAwNjAxNDg0N30.UB_fOweX253d86cp4FZ62F_RO_ZfH8z2oNTnPo_yJpQ'


// Create a single supabase client for interacting with your database
const supabase = createClient(   
    supabaseUrl,
    supabaseKey
)


export default supabase