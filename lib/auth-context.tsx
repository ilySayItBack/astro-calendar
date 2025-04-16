'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, UserProfile } from './supabase';

type AuthContextType = {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isPremium: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            // Fetch user profile
            const { data, error } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (error) throw error;
            setProfile(data);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (!error) {
      // Create user profile after successful signup
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_profiles')
            .insert([
              { 
                id: user.id, 
                email, 
                subscription_status: 'free',
                created_at: new Date().toISOString()
              }
            ])
            .select()
            .single();
          
          if (error) throw error;
          setProfile(data);
        } catch (error) {
          console.error('Error creating user profile:', error);
        }
      }
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const isPremium = profile?.subscription_status === 'premium';

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    isPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 