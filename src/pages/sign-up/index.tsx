import { useState } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { TrialSignUpForm } from './components/form';
import { SignUpSuccess } from './components/success';

export function SignUpPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <style>
        {`
          html, body {
            background-image: url('${toAbsoluteUrl('/media/background.jpg')}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
          }
        `}
      </style>
      <div className="w-full px-10 lg:px-20">
        <div className="h-10" />
        <Card className="w-full max-w-[800px] mx-auto">
          <CardContent className="relative p-10">
            {isSuccess ? (
              <SignUpSuccess />
            ) : (
              <TrialSignUpForm onSuccess={() => setIsSuccess(true)} />
            )}
          </CardContent>
        </Card>
        <div className="h-10" />
      </div>
    </>
  );
}
