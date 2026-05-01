import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 mt-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-600 mb-2"><strong>Mind Fiti Initiative (Project MindStrong)</strong></p>
                    <p className="text-gray-600 mb-2"><strong>Effective Date:</strong> January 10, 2026</p>
                    <p className="text-gray-600 mb-8"><strong>Last Updated:</strong> January 10, 2026</p>

                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                        <p className="text-gray-700 mb-4">
                            Welcome to Mind Fiti ("we," "our," or "us"). Mind Fiti is a mental health initiative founded by Leon Nyang dedicated to promoting mental wellness, providing support resources, and creating awareness about mental health issues in Kenya.
                        </p>
                        <p className="text-gray-700 mb-4">
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. This policy is designed to comply with the Data Protection Act, 2019 (Kenya), the Kenya Information and Communications Act (KICA), the Computer Misuse and Cybercrimes Act, 2018, and general data protection principles.
                        </p>
                        <p className="text-gray-700 mb-6">
                            By using Mind Fiti services, you consent to the data practices described in this policy.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Personal Information</h3>
                        <p className="text-gray-700 mb-4">
                            We may collect personal information that you voluntarily provide when you register for our services, subscribe to our newsletter, contact us for support, participate in events, apply for volunteer positions, or make donations.
                        </p>
                        <p className="text-gray-700 mb-4">This information may include:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Full name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Age or date of birth</li>
                            <li>Gender</li>
                            <li>Location (county/town)</li>
                            <li>Educational or professional background (for volunteers)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Health and Sensitive Information</h3>
                        <p className="text-gray-700 mb-4">
                            With your explicit consent, we may collect mental health concerns or conditions, personal experiences, or crisis/emergency contact information. All health information is treated as sensitive data under the Data Protection Act, 2019 and is handled with the highest level of confidentiality.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3 Automatically Collected Information</h3>
                        <p className="text-gray-700 mb-4">
                            When you visit our website, we automatically collect IP address, browser type and version, device information, pages visited and time spent, referring website, and cookies.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-700 mb-4">We use collected information to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Provide mental health resources and support services</li>
                            <li>Respond to your inquiries and requests</li>
                            <li>Send newsletters and updates about our programs</li>
                            <li>Organize and manage events, workshops, and campaigns</li>
                            <li>Process volunteer applications and donations</li>
                            <li>Improve our website and services</li>
                            <li>Conduct research and statistical analysis (anonymized)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How We Share Your Information</h2>
                        <p className="text-gray-700 mb-4 font-semibold">
                            Mind Fiti does NOT sell, rent, or trade your personal information to third parties.
                        </p>
                        <p className="text-gray-700 mb-4">We may share information with:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Service providers (hosting, email, payment processing, analytics)</li>
                            <li>Legal authorities when required by Kenyan law or court order</li>
                            <li>Partner organizations and mental health professionals (with your consent)</li>
                            <li>Emergency services (in situations of immediate risk)</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
                        <p className="text-gray-700 mb-4">
                            We implement appropriate technical and organizational measures including encryption of sensitive data (SSL/TLS), secure servers and databases, access controls, regular security assessments, and staff training on data protection.
                        </p>
                        <p className="text-gray-700 mb-4">
                            In the event of a data breach, we will notify the Office of the Data Protection Commissioner within 72 hours and inform affected individuals without undue delay.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights Under Kenyan Law</h2>
                        <p className="text-gray-700 mb-4">Under the Data Protection Act, 2019, you have the right to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li><strong>Access:</strong> Request access to your personal data we hold</li>
                            <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong>Erasure:</strong> Request deletion of your personal data in certain circumstances</li>
                            <li><strong>Restriction:</strong> Request limitation on how we use your data</li>
                            <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
                            <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
                            <li><strong>Lodge a Complaint:</strong> File a complaint with the Office of the Data Protection Commissioner</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Data Retention</h2>
                        <p className="text-gray-700 mb-4">We retain personal data only as long as necessary:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Active users: Duration of engagement + 2 years</li>
                            <li>Newsletter subscribers: Until you unsubscribe</li>
                            <li>Volunteers: Duration of service + 3 years</li>
                            <li>Donors: 7 years (for tax and accounting purposes)</li>
                            <li>Support services: As required by professional standards or law</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-700 mb-4">
                            We use essential cookies for website functionality, analytics cookies to understand visitor behavior, and preference cookies to remember your settings. You can accept or reject cookies through our cookie banner or adjust your browser settings.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
                        <p className="text-gray-700 mb-4">
                            Our services are not intended for children under 13 years without parental consent. For users aged 13-18, we require parental or guardian consent before collecting personal information.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact Information</h2>
                        <p className="text-gray-700 mb-2"><strong>Mind Fiti Initiative (Project MindStrong)</strong></p>
                        <p className="text-gray-700 mb-2">Founded by: Leon Nyang</p>
                        <p className="text-gray-700 mb-2">Email: info@projectmindstrong.com</p>
                        <p className="text-gray-700 mb-6">Nairobi, Kenya</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Regulatory Authority</h3>
                        <p className="text-gray-700 mb-2"><strong>Office of the Data Protection Commissioner (ODPC)</strong></p>
                        <p className="text-gray-700 mb-2">P.O. Box 24742-00100, Nairobi, Kenya</p>
                        <p className="text-gray-700 mb-2">Email: info@odpc.go.ke</p>
                        <p className="text-gray-700 mb-2">Phone: +254 (020) 2675316</p>
                        <p className="text-gray-700 mb-6">Website: www.odpc.go.ke</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Legal Compliance</h2>
                        <p className="text-gray-700 mb-4">This Privacy Policy complies with:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Data Protection Act, 2019 (Act No. 24 of 2019)</li>
                            <li>Kenya Information and Communications Act (Cap 411A)</li>
                            <li>Computer Misuse and Cybercrimes Act, 2018</li>
                            <li>Constitution of Kenya, 2010 (Right to Privacy - Article 31)</li>
                        </ul>

                        <div className="bg-blue-50 border-l-4 border-primary p-4 mt-8">
                            <p className="text-gray-800">
                                <strong>Note:</strong> This Privacy Policy is a living document and will be reviewed annually or as needed to ensure continued compliance with Kenyan law.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-200">
                        <Link to="/" className="inline-flex items-center text-primary hover:underline">
                            <i className="fas fa-arrow-left mr-2"></i> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
