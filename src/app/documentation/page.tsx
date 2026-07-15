import { getDocumentationPageContent } from '@/sanity/lib/fetch';
import DocumentationClient from '@/components/DocumentationClient';

export const revalidate = 30;

export default async function DocumentationPage() {
  const content = await getDocumentationPageContent();

  const clientContent = content ? {
    title: content.title,
    subtitle: content.subtitle,
    endpoints: content.endpoints,
    sdks: content.sdks,
    ctaTitle: content.ctaTitle,
  } : undefined;

  return <DocumentationClient content={clientContent} />;
}
