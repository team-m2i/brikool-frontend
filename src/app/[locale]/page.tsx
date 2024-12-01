import {useTranslations} from 'next-intl';
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Accueil from '@/app/[locale]/accueil/page';


const HomePage = ({ params: {locale}}: { params: {locale: string}; }) => {
  const t = useTranslations('HomePage');
  return (
      <div>
        {/* <h1>{t('title')}</h1>
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher size={"md"}/> */}
          {/* <Button><Link href={"/about"}>{t('about')}</Link></Button> */}
          <Accueil params={{
        locale: `${locale}`
      }} />
      </div>

  );
}

export default HomePage