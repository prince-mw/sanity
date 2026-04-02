import { getHelpCenterFaqs } from '@/sanity/lib/fetch';
import HelpCenterClient from '@/components/HelpCenterClient';

export const revalidate = 3600;

export default async function HelpCenterPage() {
  const faqs = await getHelpCenterFaqs();

  const clientFaqs = faqs?.length
    ? faqs.map(f => ({ category: f.category, question: f.question, answer: f.answer }))
    : undefined;

  return <HelpCenterClient faqs={clientFaqs} />;
}
