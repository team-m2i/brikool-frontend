import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {Button} from "@/components/ui/button";
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import {auth} from "@/lib/auth";
import {getTranslations} from "next-intl/server";

const HomePage = async({ params: {locale}}: { params: {locale: string}; }) => {
  const t = await getTranslations('HomePage');
    const session = await auth()
    console.log(session)
  return (
      <div>
        <h1>{t('title')}</h1>
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher size={"md"}/>
          <Button><Link href={"/about"}>{t('about')}</Link></Button>
          {JSON.stringify(session)}
      </div>

  );
}

export default HomePage