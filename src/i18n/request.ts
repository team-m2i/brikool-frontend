import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as string)) notFound();

    return {
        messages: {
            ...(await import(`../../messages/${locale}/homepage.json`)).default,
            ...(await import(`../../messages/${locale}/lang.json`)).default,
            ...(await import(`../../messages/${locale}/common.json`)).default,
            ...(await import(`../../messages/${locale}/loginPage.json`)).default,
            ...(await import(`../../messages/${locale}/registerPage.json`)).default,
            ...(await import(`../../messages/${locale}/newFreelancerPage.json`)).default,
            ...(await import(`../../messages/${locale}/forgotPasswordPage.json`)).default,
            ...(await import(`../../messages/${locale}/resetPasswordPage.json`)).default,
            ...(await import(`../../messages/${locale}/infoPage.json`)).default,
    },
    };
});