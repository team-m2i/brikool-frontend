import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {

    let locale = await requestLocale
    // Validate that the incoming `locale` parameter is valid
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: {
            ...(await import(`../../messages/${locale}/homepage.json`)).default,
            ...(await import(`../../messages/${locale}/lang.json`)).default,
            ...(await import(`../../messages/${locale}/common.json`)).default,
            ...(await import(`../../messages/${locale}/loginPage.json`)).default,
            ...(await import(`../../messages/${locale}/registerPage.json`)).default,
            ...(await import(`../../messages/${locale}/newFreelancerPage.json`)).default,
            ...(await import(`../../messages/${locale}/forgotPasswordPage.json`)).default,
            ...(await import(`../../messages/${locale}/resetPasswordPage.json`)).default,
            ...(await import(`../../messages/${locale}/confirmEmailPage.json`)).default,
            ...(await import(`../../messages/${locale}/infoPage.json`)).default,
            ...(await import(`../../messages/${locale}/termsAndPrivacyPage.json`)).default,
    },
    };
});