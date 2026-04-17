import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SPFooter } from "@/components/sections/SPFooter";

const Privacy: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Beta Ads"
        description="Privacy Policy for Beta Ads by Beta Agency AS. How we collect, use, and protect your data in compliance with GDPR and Norwegian data protection law."
        canonical="/privacy"
        noindex={true}
      />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">
            Last updated: March 24, 2026
          </p>

          <div className="space-y-10 text-base leading-7 text-muted-foreground">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p>
                Beta Agency AS ("Beta Ads", "we", "us", or "our"), organization
                number 933 303 136, is the data controller responsible for the
                processing of personal data described in this Privacy Policy. We
                are committed to protecting your privacy and processing your
                personal data in accordance with the EU General Data Protection
                Regulation (GDPR) and the Norwegian Personal Data Act.
              </p>
              <p className="mt-3">
                This Privacy Policy explains how we collect, use, store, and
                share your personal data when you visit our website, use our
                platform, or interact with our services.
              </p>
            </section>

            {/* 2. Data We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Data We Collect
              </h2>
              <p>We may collect the following categories of personal data:</p>

              <h3 className="text-base font-semibold text-foreground mt-4 mb-2">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Contact information: name, email address, phone number, and
                  company name when you fill out forms, request a demo, or
                  contact us.
                </li>
                <li>
                  Account information: credentials and profile details if you
                  create an account on our platform.
                </li>
                <li>
                  Campaign data: advertising materials, brand assets, and
                  campaign preferences submitted through our platform.
                </li>
                <li>
                  Communications: messages and correspondence when you contact
                  our support or sales team.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-4 mb-2">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Device and browser information: IP address, browser type,
                  operating system, device identifiers, and screen resolution.
                </li>
                <li>
                  Usage data: pages visited, time spent on pages, click
                  patterns, referring URLs, and navigation paths.
                </li>
                <li>
                  Cookies and similar technologies: see Section 5 for details on
                  our use of cookies.
                </li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-4 mb-2">
                2.3 Information from Third Parties
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Streaming platform data: publicly available data from Twitch,
                  YouTube, or Kick when matching streamers for campaigns.
                </li>
                <li>
                  Analytics providers: aggregated data from analytics services
                  we use to improve our platform.
                </li>
              </ul>
            </section>

            {/* 3. How We Use Your Data */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. How We Use Your Data
              </h2>
              <p>
                We process your personal data for the following purposes and
                legal bases:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <span className="text-foreground font-medium">
                    Service delivery
                  </span>{" "}
                  (contractual necessity): To provide our advertising platform
                  services, manage campaigns, and fulfill our obligations.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Communication
                  </span>{" "}
                  (contractual necessity / legitimate interest): To respond to
                  your inquiries, send service-related notices, and provide
                  customer support.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Marketing
                  </span>{" "}
                  (consent / legitimate interest): To send newsletters, market
                  insights, and promotional content. You may opt out at any
                  time.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Analytics and improvement
                  </span>{" "}
                  (legitimate interest): To analyze usage patterns, improve our
                  website and services, and develop new features.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Legal compliance
                  </span>{" "}
                  (legal obligation): To comply with applicable laws,
                  regulations, and legal processes.
                </li>
              </ul>
            </section>

            {/* 4. Data Sharing */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Data Sharing and Transfers
              </h2>
              <p>
                We do not sell your personal data. We may share your data with:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <span className="text-foreground font-medium">
                    Service providers:
                  </span>{" "}
                  Trusted third-party providers who assist us in operating our
                  platform, including hosting, analytics, email delivery, and
                  payment processing. These providers are contractually obligated
                  to protect your data.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Streaming platforms:
                  </span>{" "}
                  Limited data shared with Twitch, YouTube, or Kick as necessary
                  for campaign delivery.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Legal requirements:
                  </span>{" "}
                  When required by law, regulation, or legal process, or to
                  protect our rights and safety.
                </li>
              </ul>
              <p className="mt-3">
                Some of our service providers may be located outside the
                EEA. When transferring data outside the EEA, we ensure
                appropriate safeguards are in place, such as Standard
                Contractual Clauses approved by the European Commission.
              </p>
            </section>

            {/* 5. Cookies */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Cookies and Tracking Technologies
              </h2>
              <p>Our website uses the following types of cookies:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <span className="text-foreground font-medium">
                    Strictly necessary cookies:
                  </span>{" "}
                  Required for the website to function properly (e.g., session
                  management, security). These do not require consent.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Analytics cookies:
                  </span>{" "}
                  Used to understand how visitors interact with our website
                  (e.g., Google Analytics). These are only placed with your
                  consent.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Marketing cookies:
                  </span>{" "}
                  Used to deliver relevant advertising and track campaign
                  performance. These are only placed with your consent.
                </li>
              </ul>
              <p className="mt-3">
                You can manage your cookie preferences through your browser
                settings or our cookie consent banner. Disabling certain cookies
                may affect the functionality of our website.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain personal data only for as long as necessary to fulfill
                the purposes described in this policy, unless a longer retention
                period is required by law. Specifically:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  Account and campaign data: retained for the duration of your
                  account or business relationship, plus up to 12 months after
                  termination.
                </li>
                <li>
                  Contact form submissions: retained for up to 24 months.
                </li>
                <li>
                  Analytics data: retained in anonymized or aggregated form for
                  up to 26 months.
                </li>
                <li>
                  Financial records: retained as required by Norwegian accounting
                  law (currently 5 years).
                </li>
                <li>
                  Newsletter subscriptions: retained until you unsubscribe.
                </li>
              </ul>
            </section>

            {/* 7. Your Rights (GDPR) */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Your Rights Under GDPR
              </h2>
              <p>
                As a data subject, you have the following rights under the GDPR:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <span className="text-foreground font-medium">
                    Right of access:
                  </span>{" "}
                  You may request a copy of the personal data we hold about you.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Right to rectification:
                  </span>{" "}
                  You may request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Right to erasure:
                  </span>{" "}
                  You may request deletion of your personal data, subject to
                  legal retention requirements.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Right to restrict processing:
                  </span>{" "}
                  You may request that we limit how we process your data.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Right to data portability:
                  </span>{" "}
                  You may request your data in a structured, commonly used,
                  machine-readable format.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Right to object:
                  </span>{" "}
                  You may object to processing based on legitimate interest or
                  for direct marketing purposes.
                </li>
                <li>
                  <span className="text-foreground font-medium">
                    Right to withdraw consent:
                  </span>{" "}
                  Where processing is based on consent, you may withdraw it at
                  any time without affecting the lawfulness of prior processing.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:hello@betaads.no"
                  className="text-foreground underline underline-offset-4 hover:opacity-80"
                >
                  hello@betaads.no
                </a>
                . We will respond within 30 days as required by GDPR.
              </p>
            </section>

            {/* 8. Data Security */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized access,
                alteration, disclosure, or destruction. These measures include
                encryption in transit and at rest, access controls, and regular
                security assessments.
              </p>
              <p className="mt-3">
                While we take reasonable steps to protect your data, no method
                of transmission or storage is completely secure. We cannot
                guarantee absolute security.
              </p>
            </section>

            {/* 9. Children */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Children's Privacy
              </h2>
              <p>
                Our services are not directed at individuals under the age of
                18. We do not knowingly collect personal data from children. If
                we become aware that we have collected data from a child, we
                will take steps to delete that data promptly.
              </p>
            </section>

            {/* 10. Changes */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable law. When we make
                material changes, we will update the "Last updated" date and, if
                appropriate, notify you via email or through our platform.
              </p>
            </section>

            {/* 11. Supervisory Authority */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Supervisory Authority
              </h2>
              <p>
                If you believe that our processing of your personal data
                violates the GDPR, you have the right to lodge a complaint with
                the Norwegian Data Protection Authority (Datatilsynet):
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-foreground font-medium">Datatilsynet</p>
                <p>
                  Website:{" "}
                  <a
                    href="https://www.datatilsynet.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 hover:opacity-80"
                  >
                    www.datatilsynet.no
                  </a>
                </p>
              </div>
            </section>

            {/* 12. Contact */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                12. Contact Information
              </h2>
              <p>
                For any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-foreground font-medium">Beta Agency AS</p>
                <p>Oslo, Norway</p>
                <p>Organization number: 933 303 136</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:hello@betaads.no"
                    className="text-foreground underline underline-offset-4 hover:opacity-80"
                  >
                    hello@betaads.no
                  </a>
                </p>
              </div>
            </section>

            {/* Footer link */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm">
                See also our{" "}
                <Link
                  to="/terms"
                  className="text-foreground underline underline-offset-4 hover:opacity-80"
                >
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <SPFooter />
    </>
  );
};

export default Privacy;
