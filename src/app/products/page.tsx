import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Products | MovingWalls',
  description: 'Explore MovingWalls OOH advertising platform and products.',
};

export default function ProductsPage() {
  // Redirect to platform page which showcases all products
  redirect('/platform');
}
