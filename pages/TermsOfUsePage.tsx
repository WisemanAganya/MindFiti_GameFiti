import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUsePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 mt-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
                        <i className="fas fa-arrow-left mr-2"></i> Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">TERMS OF USE</h1>
                    <p className="text-gray-600 mb-2"><strong>Mind Fiti Initiative</strong></p>
                    <p className="text-gray-600 mb-2"><strong>Effective Date:</strong> January 10, 2026</p>
                    <p className="text-gray-600 mb-8"><strong>Last Updated:</strong> January 10, 2026</p>

                    <div className="prose prose-lg max-w-none">
                        {/* Section 1: Acceptance of Terms */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. ACCEPTANCE OF TERMS</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Agreement to Terms</h3>
                        <p className="text-gray-700 mb-4">
                            Welcome to Mind Fiti. By accessing or using our website, services, programs, or resources ("Services"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use our Services.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Legal Capacity</h3>
                        <p className="text-gray-700 mb-4">By using our Services, you represent that:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>You are at least 18 years of age, OR</li>
                            <li>You are 13-17 years with parental/guardian consent, OR</li>
                            <li>You are accessing general educational content without registration</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.3 Changes to Terms</h3>
                        <p className="text-gray-700 mb-4">
                            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of Services after changes constitutes acceptance of the modified Terms.
                        </p>

                        {/* Section 2: About Mind Fiti */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. ABOUT MIND FITI</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Mission and Purpose</h3>
                        <p className="text-gray-700 mb-4">Mind Fiti is a mental health initiative founded by Leon Nyang, dedicated to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Promoting mental health awareness in Kenya</li>
                            <li>Providing accessible mental health resources</li>
                            <li>Supporting individuals experiencing mental health challenges</li>
                            <li>Reducing stigma around mental illness</li>
                            <li>Advocating for better mental health policies</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Non-Professional Services Disclaimer</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <p className="text-gray-800 font-semibold mb-2">IMPORTANT:</p>
                            <p className="text-gray-700 mb-2">Mind Fiti provides educational resources, peer support, and advocacy services. We are NOT:</p>
                            <ul className="list-disc pl-6 mb-2 text-gray-700">
                                <li>A substitute for professional medical or psychiatric care</li>
                                <li>Licensed mental health practitioners</li>
                                <li>Emergency crisis intervention services</li>
                                <li>A diagnostic or treatment facility</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                            <p className="text-gray-800 font-semibold mb-2">If you are experiencing a mental health emergency, please contact:</p>
                            <ul className="list-none mb-2 text-gray-700">
                                <li><strong>Emergency Services:</strong> 999 or 112</li>
                                <li><strong>Kenya Red Cross:</strong> 1199</li>
                                <li><strong>Befrienders Kenya:</strong> +254 722 178 177</li>
                                <li>Nearest hospital emergency department</li>
                            </ul>
                        </div>

                        {/* Section 3: Use of Services */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. USE OF SERVICES</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Permitted Use</h3>
                        <p className="text-gray-700 mb-4">You may use our Services for:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Accessing mental health educational resources</li>
                            <li>Participating in community support programs</li>
                            <li>Attending workshops and events</li>
                            <li>Volunteering opportunities</li>
                            <li>Making donations</li>
                            <li>Subscribing to newsletters</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Prohibited Use</h3>
                        <p className="text-gray-700 mb-4">You agree NOT to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Use Services for any unlawful purpose</li>
                            <li>Impersonate any person or entity</li>
                            <li>Harass, threaten, or harm others</li>
                            <li>Share false or misleading information</li>
                            <li>Violate others' privacy or confidentiality</li>
                            <li>Distribute spam or unsolicited communications</li>
                            <li>Upload viruses or malicious code</li>
                            <li>Scrape or data-mine our website</li>
                            <li>Use Services to promote competing services</li>
                            <li>Violate any Kenyan laws or regulations</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.3 User Conduct in Support Spaces</h3>
                        <p className="text-gray-700 mb-4">In peer support forums or group sessions, you must:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Respect others' privacy and confidentiality</li>
                            <li>Be supportive and non-judgmental</li>
                            <li>Avoid giving medical or diagnostic advice</li>
                            <li>Report concerning behavior to moderators</li>
                            <li>Follow facilitator guidance</li>
                        </ul>

                        {/* Section 4: User Accounts */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. USER ACCOUNTS AND REGISTRATION</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Account Creation</h3>
                        <p className="text-gray-700 mb-4">Some Services require registration. You agree to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Provide accurate and complete information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of unauthorized access</li>
                            <li>Accept responsibility for all activities under your account</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Account Termination</h3>
                        <p className="text-gray-700 mb-4">We reserve the right to suspend or terminate accounts that:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Violate these Terms</li>
                            <li>Engage in harmful behavior</li>
                            <li>Provide false information</li>
                            <li>Remain inactive for extended periods</li>
                        </ul>
                        <p className="text-gray-700 mb-4">You may terminate your account at any time by contacting us.</p>

                        {/* Section 5: Intellectual Property */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. INTELLECTUAL PROPERTY RIGHTS</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.1 Mind Fiti Content</h3>
                        <p className="text-gray-700 mb-4">All content on our website, including but not limited to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Text, graphics, logos, images</li>
                            <li>Videos, audio files, documents</li>
                            <li>Software, code, design</li>
                            <li>"Mind Fiti" name and branding</li>
                        </ul>
                        <p className="text-gray-700 mb-4">is the intellectual property of Mind Fiti Initiative or Leon Nyang, protected under:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>The Copyright Act, 2001 (Cap 130)</li>
                            <li>The Trade Marks Act, Cap 506</li>
                            <li>International copyright treaties</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.2 Limited License</h3>
                        <p className="text-gray-700 mb-4">We grant you a limited, non-exclusive, non-transferable license to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Access and view website content for personal use</li>
                            <li>Download resources for personal mental health education</li>
                            <li>Share content with proper attribution</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.3 Restrictions</h3>
                        <p className="text-gray-700 mb-4">You may NOT:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Reproduce content for commercial purposes</li>
                            <li>Modify or create derivative works</li>
                            <li>Remove copyright or proprietary notices</li>
                            <li>Use Mind Fiti branding without written permission</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.4 User-Generated Content</h3>
                        <p className="text-gray-700 mb-4">By submitting content (stories, testimonials, comments), you grant Mind Fiti:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>A worldwide, royalty-free license to use, reproduce, and distribute</li>
                            <li>The right to edit for clarity or appropriateness</li>
                            <li>The right to remove content that violates Terms</li>
                        </ul>
                        <p className="text-gray-700 mb-4">You retain ownership but guarantee:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>You have rights to submitted content</li>
                            <li>Content does not violate third-party rights</li>
                            <li>Content is not defamatory or illegal</li>
                        </ul>

                        {/* Section 6: Privacy */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. PRIVACY AND DATA PROTECTION</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.1 Privacy Policy</h3>
                        <p className="text-gray-700 mb-4">
                            Your use of Services is also governed by our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, which complies with the Data Protection Act, 2019.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.2 Confidentiality</h3>
                        <p className="text-gray-700 mb-4">We maintain confidentiality of personal stories and experiences shared in support services, subject to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Legal obligations to report harm or abuse</li>
                            <li>Emergency situations requiring intervention</li>
                            <li>Consent for testimonials or case studies (anonymized)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.3 Data Security</h3>
                        <p className="text-gray-700 mb-4">While we implement security measures, you acknowledge that:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>No internet transmission is completely secure</li>
                            <li>You share information at your own risk</li>
                            <li>You should not share highly sensitive information via unsecured channels</li>
                        </ul>

                        {/* Section 7: Donations */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. DONATIONS AND FINANCIAL TRANSACTIONS</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.1 Voluntary Donations</h3>
                        <p className="text-gray-700 mb-4">Donations to Mind Fiti are voluntary and support our mental health programs.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.2 Tax Receipts</h3>
                        <p className="text-gray-700 mb-4">We provide donation receipts where applicable under Kenyan tax law.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.3 Refund Policy</h3>
                        <p className="text-gray-700 mb-4">Donations are generally non-refundable unless:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Charged in error</li>
                            <li>Duplicate transactions occur</li>
                            <li>Required by law</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.4 Payment Processing</h3>
                        <p className="text-gray-700 mb-4">Third-party payment processors handle transactions. Their terms apply in addition to ours.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.5 Use of Funds</h3>
                        <p className="text-gray-700 mb-4">Donations support:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Mental health awareness campaigns</li>
                            <li>Free resources and programs</li>
                            <li>Community outreach initiatives</li>
                            <li>Operational costs</li>
                            <li>Staff and volunteer training</li>
                        </ul>

                        {/* Section 8: Disclaimers */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. DISCLAIMERS AND LIMITATIONS</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.1 No Medical Advice</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <p className="text-gray-800 font-semibold mb-2">CRITICAL DISCLAIMER:</p>
                            <p className="text-gray-700 mb-2">Mind Fiti content is for informational and educational purposes only. It does NOT constitute:</p>
                            <ul className="list-disc pl-6 mb-2 text-gray-700">
                                <li>Medical, psychiatric, or psychological advice</li>
                                <li>Diagnosis or treatment recommendations</li>
                                <li>Emergency crisis intervention</li>
                                <li>Licensed professional counseling</li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.2 Seek Professional Help</h3>
                        <p className="text-gray-700 mb-4">Always consult qualified mental health professionals for:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Diagnosis and treatment</li>
                            <li>Medication management</li>
                            <li>Crisis intervention</li>
                            <li>Therapy or counseling</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.3 "As Is" Services</h3>
                        <p className="text-gray-700 mb-4">Services are provided "as is" and "as available" without warranties of any kind, including:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Accuracy or completeness of information</li>
                            <li>Uninterrupted or error-free operation</li>
                            <li>Fitness for a particular purpose</li>
                            <li>Non-infringement</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.4 Third-Party Content</h3>
                        <p className="text-gray-700 mb-4">We may link to external websites or resources. We are not responsible for:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Accuracy of third-party content</li>
                            <li>Privacy practices of other sites</li>
                            <li>Services provided by external organizations</li>
                        </ul>

                        {/* Section 9: Limitation of Liability */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. LIMITATION OF LIABILITY</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.1 General Limitations</h3>
                        <p className="text-gray-700 mb-4">To the fullest extent permitted by Kenyan law, Mind Fiti, Leon Nyang, and associated parties shall NOT be liable for:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Any indirect, incidental, consequential, or punitive damages</li>
                            <li>Loss of profits, data, or opportunities</li>
                            <li>Personal injury or emotional distress</li>
                            <li>Decisions made based on our content</li>
                            <li>Actions taken in reliance on information provided</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.2 Maximum Liability</h3>
                        <p className="text-gray-700 mb-4">Our total liability shall not exceed the amount you paid to Mind Fiti in the past 12 months (if any).</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.3 Exceptions</h3>
                        <p className="text-gray-700 mb-4">These limitations do not apply where prohibited by Kenyan law or in cases of:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Gross negligence or willful misconduct</li>
                            <li>Fraud or fraudulent misrepresentation</li>
                            <li>Death or personal injury caused by our negligence</li>
                        </ul>

                        {/* Section 10: Indemnification */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. INDEMNIFICATION</h2>
                        <p className="text-gray-700 mb-4">
                            You agree to indemnify and hold harmless Mind Fiti, Leon Nyang, staff, volunteers, and partners from any claims, damages, or expenses arising from:
                        </p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Your violation of these Terms</li>
                            <li>Your use or misuse of Services</li>
                            <li>Your violation of others' rights</li>
                            <li>Your violation of Kenyan laws</li>
                        </ul>

                        {/* Section 11: Dispute Resolution */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. DISPUTE RESOLUTION</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.1 Governing Law</h3>
                        <p className="text-gray-700 mb-4">These Terms are governed by the laws of the Republic of Kenya.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.2 Jurisdiction</h3>
                        <p className="text-gray-700 mb-4">Any disputes shall be subject to the exclusive jurisdiction of Kenyan courts.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.3 Mediation First</h3>
                        <p className="text-gray-700 mb-4">Before initiating legal proceedings, parties agree to attempt good-faith mediation.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">11.4 Arbitration (Optional)</h3>
                        <p className="text-gray-700 mb-4">Disputes may be referred to arbitration under the Arbitration Act, 1995 (Cap 49).</p>

                        {/* Section 12: Compliance */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. COMPLIANCE WITH KENYAN LAW</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">12.1 Legal Framework</h3>
                        <p className="text-gray-700 mb-4">Our Services comply with:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Constitution of Kenya, 2010 (Articles 31, 43)</li>
                            <li>Data Protection Act, 2019</li>
                            <li>Computer Misuse and Cybercrimes Act, 2018</li>
                            <li>Kenya Information and Communications Act</li>
                            <li>Mental Health Act, 1989 (Cap 248)</li>
                            <li>Public Health Act (Cap 242)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">12.2 Reporting Obligations</h3>
                        <p className="text-gray-700 mb-4">We cooperate with law enforcement and regulatory authorities as required by Kenyan law.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">12.3 Cybersecurity</h3>
                        <p className="text-gray-700 mb-4">We comply with cybersecurity requirements under the Computer Misuse and Cybercrimes Act, 2018.</p>

                        {/* Section 13: Volunteers and Partners */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. VOLUNTEER AND PARTNERSHIP TERMS</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">13.1 Volunteers</h3>
                        <p className="text-gray-700 mb-4">Volunteers agree to:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Undergo training and orientation</li>
                            <li>Maintain confidentiality</li>
                            <li>Follow ethical guidelines</li>
                            <li>Report concerns appropriately</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">13.2 Partners</h3>
                        <p className="text-gray-700 mb-4">Partnership arrangements are governed by separate written agreements.</p>

                        {/* Section 14: Termination */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. TERMINATION</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">14.1 By You</h3>
                        <p className="text-gray-700 mb-4">You may stop using our Services at any time by:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Ceasing access to the website</li>
                            <li>Unsubscribing from communications</li>
                            <li>Requesting account deletion</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">14.2 By Mind Fiti</h3>
                        <p className="text-gray-700 mb-4">We may suspend or terminate access if you:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Violate these Terms</li>
                            <li>Engage in harmful conduct</li>
                            <li>Pose a risk to others</li>
                            <li>Provide false information</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">14.3 Effect of Termination</h3>
                        <p className="text-gray-700 mb-4">Upon termination:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>Your right to use Services ceases immediately</li>
                            <li>Certain provisions survive (liability, indemnification, etc.)</li>
                            <li>We may retain information as required by law</li>
                        </ul>

                        {/* Section 15: General Provisions */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. GENERAL PROVISIONS</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.1 Entire Agreement</h3>
                        <p className="text-gray-700 mb-4">These Terms, together with our Privacy Policy, constitute the entire agreement between you and Mind Fiti.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.2 Severability</h3>
                        <p className="text-gray-700 mb-4">If any provision is found unenforceable, the remaining provisions continue in effect.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.3 Waiver</h3>
                        <p className="text-gray-700 mb-4">Failure to enforce any provision does not waive our right to enforce it later.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.4 Assignment</h3>
                        <p className="text-gray-700 mb-4">We may assign these Terms. You may not assign your rights without our written consent.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.5 Force Majeure</h3>
                        <p className="text-gray-700 mb-4">We are not liable for delays or failures due to circumstances beyond our reasonable control.</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">15.6 Language</h3>
                        <p className="text-gray-700 mb-4">These Terms are provided in English. In case of translation discrepancies, the English version prevails.</p>

                        {/* Section 16: Contact Information */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">16. CONTACT INFORMATION</h2>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16.1 General Inquiries</h3>
                        <p className="text-gray-700 mb-2"><strong>Mind Fiti Initiative</strong></p>
                        <p className="text-gray-700 mb-2">Founded by: Leon Nyang</p>
                        <p className="text-gray-700 mb-2">Email: info@projectmindstrong.com</p>
                        <p className="text-gray-700 mb-6">Nairobi, Kenya</p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16.2 Emergency Resources</h3>
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                            <p className="text-gray-800 font-semibold mb-2">If you are in crisis:</p>
                            <ul className="list-none mb-2 text-gray-700">
                                <li><strong>Emergency Services:</strong> 999 or 112</li>
                                <li><strong>Kenya Red Cross:</strong> 1199</li>
                                <li><strong>Befrienders Kenya:</strong> +254 722 178 177</li>
                                <li>Nearest hospital emergency department</li>
                            </ul>
                        </div>

                        {/* Section 17: Acknowledgment */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">17. ACKNOWLEDGMENT</h2>
                        <p className="text-gray-700 mb-4">By using Mind Fiti Services, you acknowledge that:</p>
                        <ul className="list-disc pl-6 mb-4 text-gray-700">
                            <li>You have read and understood these Terms</li>
                            <li>You agree to be bound by these Terms</li>
                            <li>You understand Mind Fiti is not a substitute for professional mental health care</li>
                            <li>You will seek professional help when needed</li>
                            <li>You accept the limitations and disclaimers stated herein</li>
                        </ul>

                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8 mb-6">
                            <p className="text-gray-800 font-semibold mb-2">IMPORTANT MENTAL HEALTH NOTICE:</p>
                            <p className="text-gray-700 mb-2">If you are experiencing thoughts of self-harm or suicide, please seek immediate help:</p>
                            <ul className="list-none mb-2 text-gray-700">
                                <li>Call emergency services: 999 or 112</li>
                                <li>Contact Kenya Red Cross: 1199</li>
                                <li>Visit your nearest hospital emergency department</li>
                                <li>Call Befrienders Kenya: +254 722 178 177</li>
                            </ul>
                            <p className="text-gray-700 font-semibold mt-2">Your life matters. Help is available.</p>
                        </div>

                        <div className="bg-blue-50 border-l-4 border-primary p-4 mt-8">
                            <p className="text-gray-800 text-center font-semibold">
                                Thank you for supporting Mind Fiti's mission to promote mental wellness in Kenya.
                            </p>
                        </div>

                        <p className="text-gray-600 text-sm mt-8 text-center italic">
                            These Terms of Use were last updated on January 10, 2026 and are reviewed regularly to ensure compliance with Kenyan law and best practices in mental health advocacy.
                        </p>
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

export default TermsOfUsePage;
