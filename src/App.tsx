import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { TrialSignUpForm } from './pages/form';

export function App() {
  return (
    <>
      <style>
        {`
          html, body {
            background-image: url('${toAbsoluteUrl('/media/sub.jpg')}');
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
            <TrialSignUpForm />
          </CardContent>
        </Card>
        <div className="h-10" />
      </div>
    </>
  );
}
