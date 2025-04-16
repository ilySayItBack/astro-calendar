'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase, updateSubscriptionStatus } from '@/lib/supabase';
import { EmailCapture } from './email-capture';

type SubscriptionTier = {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
};

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    interval: 'month',
    features: [
      'Full access to all astrological transits',
      'Personalized daily horoscopes',
      'Email notifications for important astrological events',
      'Advanced birth chart analysis',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 99.99,
    interval: 'year',
    features: [
      'All monthly features',
      '2 months free compared to monthly plan',
      'Annual astrological forecast',
      'Priority support',
    ],
  },
];

export function SubscriptionPaywall() {
  const { user, isPremium } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const handleSubscribe = useCallback(async () => {
    if (!user) {
      setShowEmailCapture(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      // In a real implementation, you would integrate with a payment processor like Stripe
      // For this example, we'll simulate a successful payment
      
      // Calculate subscription end date
      const endDate = new Date();
      if (selectedTier === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      
      // Update user's subscription status in Supabase
      await updateSubscriptionStatus(
        user.id, 
        'premium', 
        endDate.toISOString()
      );
      
      // Reload the page to reflect the new subscription status
      window.location.reload();
    } catch (error) {
      console.error('Error processing subscription:', error);
      alert('There was an error processing your subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [user, selectedTier]);

  if (isPremium) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Premium Subscription Active</CardTitle>
          <CardDescription>
            You have full access to all astrological features and updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Thank you for supporting our service. You can manage your subscription in your account settings.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (showEmailCapture) {
    return <EmailCapture />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
        <p className="text-muted-foreground mt-2">
          Get full access to all astrological features and personalized updates.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {subscriptionTiers.map((tier) => (
          <Card 
            key={tier.id} 
            className={`relative ${selectedTier === tier.id ? 'border-primary' : ''}`}
          >
            {selectedTier === tier.id && (
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                Selected
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">${tier.price}</span>
                <span className="text-muted-foreground">/{tier.interval}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={selectedTier === tier.id ? 'default' : 'outline'}
                onClick={() => setSelectedTier(tier.id)}
              >
                {selectedTier === tier.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          size="lg" 
          className="px-8"
          onClick={handleSubscribe}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Subscribe Now'}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Secure payment processing. Cancel anytime.
        </p>
      </div>
    </div>
  );
} 