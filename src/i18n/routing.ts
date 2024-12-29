import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'fr', 'ar'];

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: 'en'
});
export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
    createNavigation(routing);