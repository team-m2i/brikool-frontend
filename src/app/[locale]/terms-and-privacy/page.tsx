import React from 'react';

function Page() {
    return (
        <div className="container mx-auto p-12 lg:px-56 xl:px-80 text-justify">
            <h1 className="text-4xl font-bold mb-4 primary-text">Terms and Privacy Policy</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Introduction</h2>
                <p className="secondary-text">
                    Welcome to Brikool, a local freelance platform designed to connect clients with talented freelancers. By accessing or using Brikool, you agree to comply with and be bound by the following terms and conditions. Please read them carefully as they contain important information about your rights and obligations.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">User Conduct</h2>
                <p className="secondary-text">
                    We are committed to maintaining a safe and respectful community. The following activities are strictly prohibited on Brikool:
                </p>
                <ul className="list-disc list-inside ml-4 secondary-text">
                    <li>Engaging in fraud, scams, or abuse</li>
                    <li>Promoting violence, threats, or intimidation</li>
                    <li>Posting obscene, offensive, or defamatory content</li>
                    <li>Participating in hate speech, racism, or discriminatory behavior</li>
                </ul>
                <p className="secondary-text">
                    Any user found violating these guidelines may face suspension or account termination. We take reports of misconduct seriously and will investigate all cases thoroughly.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">User Responsibilities</h2>
                <p className="secondary-text">
                    Users are responsible for ensuring the accuracy and legality of their actions on the platform. Clients must only post legitimate job offers, and freelancers must provide truthful information in their profiles and communications.
                </p>
                <p className="secondary-text">
                    Users should maintain the confidentiality of their account credentials. Brikool is not liable for any loss due to unauthorized access resulting from the user&apos;s failure to safeguard their information.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Account Suspension and Termination</h2>
                <p className="secondary-text">
                    We reserve the right to suspend or terminate accounts if users violate our terms, fail to comply with legal obligations, or engage in activities that harm the platform&apos;s integrity. Our decisions in such matters are final.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Intellectual Property</h2>
                <p className="secondary-text">
                    All content, features, and functionalities on Brikool, including design, trademarks, and logo, are the intellectual property of Brikool. Unauthorized copying, redistribution, or exploitation of our content is prohibited.
                </p>
                <p className="secondary-text">
                    Users retain the rights to any content they post on the platform but grant Brikool a non-exclusive license to use, display, and modify content as needed to support platform functions.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Privacy Policy</h2>
                <p className="secondary-text">
                    We value your privacy and are committed to protecting your personal information. By using Brikool, you consent to the collection and use of your data as outlined in this policy.
                </p>
                <ul className="list-disc list-inside ml-4 secondary-text">
                    <li>We collect information you provide during registration and use of Brikool, such as name, email, and payment details.</li>
                    <li>We use this information to provide, improve, and personalize our services.</li>
                    <li>We do not share your personal data with third parties without your consent, except when required by law or for platform security.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Data Security</h2>
                <p className="secondary-text">
                    We implement technical measures to protect your personal information from unauthorized access or disclosure. However, we cannot guarantee complete data security, and users are advised to take personal security measures as well.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Open and Free Access</h2>
                <p className="secondary-text">
                    Brikool is open to the public and free to use. We do not offer premium subscriptions or paid services. Users are welcome to join and participate without cost.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Changes to Terms and Privacy Policy</h2>
                <p className="secondary-text">
                    We may update these terms and our privacy policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any significant changes by posting the new terms on Brikool. Continued use of the platform after updates signifies your acceptance.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Disclaimer of Liability</h2>
                <p className="secondary-text">
                    Brikool is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform. We provide the platform &quot;as-is&quot; without any warranties, and users assume all responsibility for their activities.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 primary-text">Contact Us</h2>
                <p className="secondary-text">
                    If you have any questions or concerns about these terms or our privacy policy, please contact us at <a href="mailto:support@brikool.com" className="primary-text">support@brikool.com</a>.
                </p>
            </section>
        </div>
    );
}

export default Page;
