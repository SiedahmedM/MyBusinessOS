import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveDemoRequest(data: {
  session_id: string;
  business_type: string;
  description?: string;
}) {
  try {
    console.log('Saving demo request:', data);
    const { data: result, error } = await supabase
      .from('demo_requests')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    console.log('Demo request saved:', result);
    return result;
  } catch (error) {
    console.error('Error saving demo request:', error);
    return null;
  }
}

export async function saveContactLead(data: {
  name: string;
  email: string;
  business_type?: string;
  message?: string;
}) {
  try {
    console.log('Saving contact lead:', data);
    const { data: result, error } = await supabase
      .from('contact_leads')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    console.log('Contact lead saved:', result);
    return result;
  } catch (error) {
    console.error('Error saving contact lead:', error);
    return null;
  }
}

export async function saveROICalculation(data: {
  calculator_type: string;
  input_values: Record<string, number>;
  results: Record<string, number>;
}) {
  try {
    console.log('Saving ROI calculation:', data);
    const { data: result, error } = await supabase
      .from('roi_calculations')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    console.log('ROI calculation saved:', result);
    return result;
  } catch (error) {
    console.error('Error saving ROI calculation:', error);
    return null;
  }
}