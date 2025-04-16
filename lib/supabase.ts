import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Types for our database tables
export type UserProfile = {
  id: string;
  email: string;
  created_at: string;
  subscription_status: 'free' | 'premium';
  subscription_end_date?: string;
};

export type AstroEvent = {
  id: string;
  user_id: string;
  event_type: string;
  event_date: string;
  description: string;
  significance: string;
  created_at: string;
};

// Helper functions for database operations
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function createUserProfile(userId: string, email: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        { 
          id: userId, 
          email, 
          subscription_status: 'free',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function updateSubscriptionStatus(userId: string, status: 'free' | 'premium', endDate?: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ 
        subscription_status: status,
        subscription_end_date: endDate
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error updating subscription status:', error);
    throw error;
  }
}

export async function saveAstroEvent(userId: string, event: Omit<AstroEvent, 'id' | 'user_id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('astro_events')
      .insert([
        { 
          user_id: userId,
          event_type: event.event_type,
          event_date: event.event_date,
          description: event.description,
          significance: event.significance,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data as AstroEvent;
  } catch (error) {
    console.error('Error saving astro event:', error);
    throw error;
  }
}

export async function getUserAstroEvents(userId: string, startDate?: string, endDate?: string) {
  try {
    let query = supabase
      .from('astro_events')
      .select('*')
      .eq('user_id', userId);
    
    if (startDate) {
      query = query.gte('event_date', startDate);
    }
    
    if (endDate) {
      query = query.lte('event_date', endDate);
    }
    
    const { data, error } = await query.order('event_date', { ascending: true });
    
    if (error) throw error;
    return data as AstroEvent[];
  } catch (error) {
    console.error('Error fetching astro events:', error);
    throw error;
  }
} 