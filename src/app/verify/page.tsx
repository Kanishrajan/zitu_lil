
'use client';

import { useState } from 'react';
import { Check, User, Building, Banknote, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactVerificationStep } from '@/components/verify/contact-step';
import { CompanyDetailsStep } from '@/components/verify/company-step';
import { PayoutDetailsStep } from '@/components/verify/payout-step';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Contact', icon: User },
  { id: 2, name: 'Business', icon: Building },
  { id: 3, name: 'Payout', icon: Banknote },
];

export default function VerificationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinish = () => {
    // In a real app, this would be the final submission
    console.log('Verification finished');
    router.push('/');
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="space-y-8">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={cn('relative', stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20 flex-1' : '')}>
                {step.id < currentStep ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-primary" />
                    </div>
                    <div
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary"
                    >
                      <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                    </div>
                  </>
                ) : step.id === currentStep ? (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-700" />
                    </div>
                    <div
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background"
                      aria-current="step"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-700" />
                    </div>
                    <div
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-700 bg-background"
                    >
                       <step.icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
        
        <div className="animate-in fade-in-50 duration-500">
            {currentStep === 1 && <ContactVerificationStep onNext={handleNextStep} />}
            {currentStep === 2 && <CompanyDetailsStep onNext={handleNextStep} />}
            {currentStep === 3 && <PayoutDetailsStep onNext={handleNextStep} />}
            {currentStep === 4 && (
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                            <ShieldCheck className="h-10 w-10 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl">Verification Submitted</CardTitle>
                        <CardDescription>
                            Your information has been submitted for review. We will notify you once your account is activated. This usually takes 1-2 business days.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                       <Button onClick={handleFinish}>Go to Dashboard</Button>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
