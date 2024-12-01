import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {Button} from "@/components/ui/button";
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

const HomePage = ({ params: {locale}}: { params: {locale: string}; }) => {
  const t = useTranslations('HomePage');
  return (
      <div>
        <h1>{t('title')}</h1>
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher size={"md"}/>
          <Button><Link href={"/about"}>{t('about')}</Link></Button>

      </div>

  );
}

export default HomePage