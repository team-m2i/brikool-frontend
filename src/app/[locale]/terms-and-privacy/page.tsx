import React from 'react';
import {getTranslations} from "next-intl/server";
import {BadgeInfo, BookmarkCheck, Check, CircleCheckBig, Hash} from "lucide-react";
import {Logo} from "@/components/ui/logo";

async function Page() {
    const t = await getTranslations('TermsAndPrivacyPage');
    return (
        <div className="container mx-auto p-12 lg:px-56 xl:px-80 text-justify">
            <nav className={"flex items-center justify-center pb-16"}>
                <Logo variant={"full"} width={300} height={250} />
            </nav>
            <h1 className="text-4xl font-bold mb-4 primary-text">{t("title")}</h1>

            <SingleClause title={t("clause.introduction.title")} content={t("clause.introduction.content.description")} />
            <ListClause title={t("clause.userConduct.title")} description={t("clause.userConduct.content.description")} items={JSON.parse(t("clause.userConduct.content.list"))} optional={t("clause.userConduct.content.consequences")}/>
            <ListClause title={t("clause.userResponsibilities.title")} description={t("clause.userResponsibilities.content.description")} items={JSON.parse(t("clause.userResponsibilities.content.list"))} optional={t("clause.userResponsibilities.content.disclaimer")}/>
            <ListClause title={t("clause.intellectualProperty.title")} description={t("clause.intellectualProperty.content.description")} items={JSON.parse(t("clause.intellectualProperty.content.list"))} optional={t("clause.intellectualProperty.content.consequences")}/>
            <ListClause title={t("clause.disclaimer.title")} description={t("clause.disclaimer.content.description")} items={JSON.parse(t("clause.disclaimer.content.list"))} optional={t("clause.disclaimer.content.disclaimer")}/>
            <ListClause title={t("clause.privacyPolicy.title")} description={t("clause.privacyPolicy.content.description")} items={JSON.parse(t("clause.privacyPolicy.content.list"))} optional={t("clause.privacyPolicy.content.consequences")}/>
            <SingleClause title={t("clause.changesToTerms.title")} content={t("clause.changesToTerms.content.description")} />
            <SingleClause title={t("clause.freeOfCharge.title")} content={t("clause.freeOfCharge.content.description")} />
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">{t("clause.contactUs.title")}</h2>
                <p className="secondary-text">
                    {t("clause.contactUs.content.description")} <a href={t("clause.contactUs.content.email")} className="primary-text">{t("clause.contactUs.content.email")}</a>.
                </p>
            </section>
        </div>
    );
}

const SingleClause = ({title, content} : {title: string, content: string}) => (
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 primary-text flex items-center justify-start gap-2"><Hash width={28}/>{title}</h2>
        <p className="secondary-text">{content}</p>
    </section>
);

const ListClause = ({title, description, items, optional}: {
    title: string,
    description: string,
    items: string[],
    optional?: string
}) => (
    <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 primary-text flex items-center justify-start gap-2"><Hash width={28}/> {title}</h2>
        <p className="secondary-text">
            {description}
        </p>
        <ul className="list-none list-inside ml-4 secondary-text mt-2">
            {items.map((item, index) => <li className={"flex items-center justify-start gap-2"} key={index}><CircleCheckBig width={20} className={"text-primary"}/>{item}</li>)}
        </ul>
        {optional && <p className="secondary-text mt-2">{optional}</p>}
    </section>
);
export default Page;
