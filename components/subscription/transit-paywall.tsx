'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscriptionPaywall } from './subscription-paywall';
import { format } from 'date-fns';

type TransitPaywallProps = {
  currentMonthEvents: any[];
  futureEvents: any[];
};

export function TransitPaywall({ currentMonthEvents, futureEvents }: TransitPaywallProps) {
  const { isPremium } = useAuth();
  const [showSubscription, setShowSubscription] = useState(false);

  // Memoize the formatted events to avoid unnecessary re-renders
  const formattedCurrentMonthEvents = useMemo(() => {
    return currentMonthEvents.map(event => ({
      ...event,
      formattedDate: format(new Date(event.date), 'MMMM d, yyyy')
    }));
  }, [currentMonthEvents]);

  const formattedFutureEvents = useMemo(() => {
    return futureEvents.map(event => ({
      ...event,
      formattedDate: format(new Date(event.date), 'MMMM d, yyyy')
    }));
  }, [futureEvents]);

  // If user is premium, show all events
  if (isPremium) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Astrological Transits</h2>
        <div className="grid gap-4">
          {[...formattedCurrentMonthEvents, ...formattedFutureEvents].map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>
                  {event.formattedDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Significance:</strong> {event.significance}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If user wants to see subscription options
  if (showSubscription) {
    return <SubscriptionPaywall />;
  }

  // Free tier - only show current month events
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Current Month Transits</h2>
        <div className="grid gap-4">
          {formattedCurrentMonthEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>
                  {event.formattedDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>Significance:</strong> {event.significance}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Upgrade to Premium</CardTitle>
          <CardDescription>
            Get access to all future transits and personalized astrological insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            As a free user, you can only see transits for the current month. 
            Upgrade to premium to unlock:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start">
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
              <span>All future transits and planetary movements</span>
            </li>
            <li className="flex items-start">
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
              <span>Personalized daily horoscopes</span>
            </li>
            <li className="flex items-start">
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
              <span>Email notifications for important astrological events</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => setShowSubscription(true)}
          >
            Upgrade Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 