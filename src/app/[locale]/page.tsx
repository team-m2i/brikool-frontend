import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import Accueil from '@/app/[locale]/accueil/page';


const HomePage = ({ params: {locale}}: { params: {locale: string}; }) => {
  return (
      <div>
          <LanguageSwitcher classname='z-100 fixed top-[550px] right-[20px]' locale={locale}/>
          <Accueil params={{
        locale: `${locale}`
      }} />
      </div>

  );
}

export default HomePage