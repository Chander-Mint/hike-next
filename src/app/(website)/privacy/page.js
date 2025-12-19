export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div
        className="relative w-full h-[40vh] sm:h-[50vh] md:h-[63vh] bg-cover bg-center flex items-end justify-center pb-6 sm:pb-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/common-banner.webp')`,
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-[69px] font-bold text-white tracking-wider text-center px-4">
          Privacy Policy
        </h1>
      </div>

      <div className="container mx-auto px-11 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Privacy Policy</h2>
          <p>Welcome to Hike Adventure. This Privacy Policy governs the privacy of users of our website www.hike.com . We are committed to protecting your personal data and complying with India's data protection laws, including the Information Technology Act, 2000, and its rules.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Proctive Approach To Privacy</h2>
          <p>We are committed to safeguarding your privacy. If we ask for personal information, it will only be used as described in this policy.</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>We implement measures to protect your data at every stage of your interaction with us.</li>
            <li>We comply with all Indian national laws and requirements for user privacy.</li>
            <li>We regularly review our policies to ensure transparency and accountability.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <p>We collect the following data to provide and improve our services:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong className="text-gray-800">Personal Details:</strong> Name, email, phone number, address, and emergency contact details.</li>
            <li><strong className="text-gray-800">Booking Information:</strong> Trip preferences, payment details (processed securely via third-party gateways), and transaction history.</li>
            <li><strong className="text-gray-800">Health & Safety Data:</strong> Medical conditions, allergies, or fitness levels relevant to your adventure activities.</li>
            <li><strong className="text-gray-800">Technical Data:</strong> IP address, browser type, device information, and cookies (see Section 8).</li>
            <li><strong className="text-gray-800">Feedback:</strong> Reviews, surveys, or preferences to enhance your experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
          <p>Your data is used to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Process bookings, payments, and service</li>
            <li>Communicate trip updates, safety guidelines, or promotional offers (with your consent)</li>
            <li>Ensure your safety during adventures (e.g., sharing medical data with certified guides)</li>
            <li>Improve our Site, services, and marketing</li>
            <li>Meet legal obligations (e.g., tax compliance or responding to lawful requests)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security & Retention</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong className="text-gray-800">Security Measures:</strong> We use SSL encryption, secure servers, and restricted access to protect your data</li>
            <li><strong className="text-gray-800">Retention Period:</strong> Data is stored only as long as necessary for the purposes outlined here or as required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights and Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Access, Correct, or Delete your personal information</li>
            <li>Withdraw Consent for marketing communications (use the "unsubscribe" link in emails)</li>
            <li>Request a Copy of your data in a portable format</li>
            <li>Lodge a Complaint with Indian authorities if you believe your rights are violated</li>
          </ul>
          <p className="mt-2">To exercise these rights, email us at <a href="mailto:info@hike.com" className="text-blue-600">info@hike.com</a>. We are committed to respond within 20 working days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third Party Services</h2>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong className="text-gray-800">Payment Gateways:</strong> We partner with trusted providers (e.g., Razorpay, PayPal) who handle payments. Their privacy policies govern your payment data.</li>
            <li><strong className="text-gray-800">External Links:</strong> Our Site may link to third-party websites (e.g., travel blogs). We are not responsible for their content or privacy practices.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Obligations</h2>
          <p>By using our Site, you agree to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Not misuse the Site for unlawful activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates To This Policy</h2>
          <p>We may update this policy to reflect changes in laws or services. The "Last Updated" date at the top will indicate revisions. Continued use of the Site means you accept the updated terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law & Jurisdiction</h2>
          <p>These Terms & Conditions/Privacy Policy, and any disputes arising out of or related to the services provided by Hike Adventure (including but not limited to the use of the website www.hike.com), shall be governed by and construed in accordance with the laws of India, without regard to conflict of laws principles.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exclusive Jurisdiction</h2>
          <p>Any legal proceedings, claims, or disputes arising in connection with Hike Adventure, its services, or this agreement shall be subject to the exclusive jurisdiction of the courts in [Dharamshala/Shimla/Kullu], Himachal Pradesh, India.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="mb-3">For questions, requests, or concerns:</p>
          <p className="mb-3"><strong className="text-gray-800">Email:</strong> <a href="mailto:info@hike.com" className="text-blue-600">info@hike.com</a></p>
          <p className="mb-3"><strong className="text-gray-800">Contact:</strong> +91 9056536447</p>
          <p className=""><strong className="text-gray-800">Address:</strong> Hike Adventure,</p>
          <p>Plot No 78, Industrial Area Phase I,</p>
          <p>Chandigarh 160002</p>
        </section>
      </div>
    </div>
  );
}