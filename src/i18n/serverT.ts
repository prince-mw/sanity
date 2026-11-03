import { getRequestLocale } from "./serverLocale";
import { getMessage, messagesMap } from "./messages";

// Translator for server components (which can't use the useLocale hook): same keys and
// English fallback as the client-side t().
export async function getServerT() {
  const locale = await getRequestLocale();
  const messages = messagesMap[locale];
  return (key: string) => getMessage(messages, key);
}
