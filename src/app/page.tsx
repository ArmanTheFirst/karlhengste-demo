import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the default locale (en)
  redirect('/en');
  
  // This won't be rendered, but it's here to make TypeScript happy
  return null;
}
