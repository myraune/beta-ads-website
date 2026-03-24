import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const Terms: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for Beta Ads, a native livestream advertising platform by Beta Agency AS. Read our terms covering service usage, intellectual property, and liability."
        canonical="/terms"
      />

      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Terms of Service
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
                These Terms of Service ("Terms") govern your access to and use
                of the services provided by Beta Agency AS ("Beta Ads", "we",
                "us", or "our"), a company registered in Oslo, Norway with
                organization number 933 303 136.
              </p>
              <p className="mt-3">
                By accessing or using our platform, website, or any of our
                services, you agree to be bound by these Terms. If you do not
                agree, you may not use our services.
              </p>
            </section>

            {/* 2. Service Description */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Service Description
              </h2>
              <p>
                Beta Ads is a native livestream advertising platform that
                enables brands and advertisers to display non-intrusive overlay
                advertisements on live streams across platforms such as Twitch,
                YouTube, and Kick. Our services include campaign management,
                creative production, streamer matching, analytics and reporting,
                and related tools and dashboards.
              </p>
            </section>

            {/* 3. Eligibility */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Eligibility
              </h2>
              <p>
                You must be at least 18 years old or the legal age of majority
                in your jurisdiction to use our services. If you are using our
                services on behalf of a company or other legal entity, you
                represent that you have the authority to bind that entity to
                these Terms.
              </p>
            </section>

            {/* 4. User Accounts & Obligations */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. User Accounts and Obligations
              </h2>
              <p>When using our services, you agree to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  Provide accurate, complete, and up-to-date information when
                  creating an account or submitting campaign materials.
                </li>
                <li>
                  Maintain the confidentiality of your account credentials and
                  notify us immediately of any unauthorized access.
                </li>
                <li>
                  Comply with all applicable laws, regulations, and third-party
                  platform policies (e.g., Twitch, YouTube, Kick terms of
                  service).
                </li>
                <li>
                  Not use the platform for any unlawful, fraudulent, or harmful
                  purpose.
                </li>
                <li>
                  Ensure that all advertising content you provide complies with
                  applicable advertising standards and does not infringe on
                  third-party rights.
                </li>
              </ul>
            </section>

            {/* 5. Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Intellectual Property
              </h2>
              <p>
                All content, trademarks, logos, software, and technology
                provided by Beta Ads, including our overlay technology, campaign
                dashboards, and analytics tools, are the exclusive property of
                Beta Agency AS and are protected by Norwegian and international
                intellectual property laws.
              </p>
              <p className="mt-3">
                You retain ownership of any content, artwork, or materials you
                provide for campaigns. By submitting content to our platform,
                you grant Beta Ads a non-exclusive, worldwide, royalty-free
                license to use, display, and distribute that content solely for
                the purpose of delivering and promoting your advertising
                campaigns.
              </p>
              <p className="mt-3">
                You may not copy, reproduce, modify, distribute, or create
                derivative works from any part of our platform or services
                without prior written consent.
              </p>
            </section>

            {/* 6. Payments & Billing */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Payments and Billing
              </h2>
              <p>
                Campaign pricing is determined based on your selected plan,
                scope, and deliverables as agreed upon before campaign launch.
                All fees are stated in the applicable currency and are exclusive
                of VAT unless otherwise indicated.
              </p>
              <p className="mt-3">
                Invoices are due within the timeframe specified in the
                applicable agreement. Late payments may incur interest in
                accordance with the Norwegian Late Payment Interest Act.
              </p>
            </section>

            {/* 7. Campaign Delivery */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Campaign Delivery
              </h2>
              <p>
                We will make commercially reasonable efforts to deliver
                campaigns as agreed. However, we cannot guarantee specific
                impression counts, click-through rates, or other performance
                metrics, as these depend on factors beyond our control, including
                streamer behavior and viewer engagement.
              </p>
              <p className="mt-3">
                Beta Ads reserves the right to reject or remove any advertising
                content that, in our sole discretion, violates these Terms,
                applicable law, or third-party platform guidelines.
              </p>
            </section>

            {/* 8. Limitation of Liability */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, Beta Agency
                AS shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including but not limited to
                loss of revenue, profits, data, or business opportunities,
                arising out of or related to your use of our services.
              </p>
              <p className="mt-3">
                Our total aggregate liability for any claims arising out of or
                relating to these Terms or our services shall not exceed the
                total fees paid by you to Beta Ads during the twelve (12) months
                preceding the claim.
              </p>
              <p className="mt-3">
                Nothing in these Terms shall exclude or limit liability that
                cannot be excluded or limited under applicable Norwegian law.
              </p>
            </section>

            {/* 9. Indemnification */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Beta Agency AS, its
                officers, directors, employees, and agents from any claims,
                losses, or damages, including legal fees, arising out of your
                use of our services, your violation of these Terms, or your
                infringement of any third-party rights.
              </p>
            </section>

            {/* 10. Termination */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Termination
              </h2>
              <p>
                Either party may terminate their use of the services or any
                active campaign agreement by providing written notice in
                accordance with the applicable agreement terms.
              </p>
              <p className="mt-3">
                Beta Ads reserves the right to suspend or terminate your access
                to the platform at any time if you breach these Terms or if we
                reasonably believe that continued access poses a risk to our
                platform, other users, or third parties.
              </p>
              <p className="mt-3">
                Upon termination, any outstanding fees remain due, and
                provisions that by their nature should survive termination
                (including intellectual property, limitation of liability, and
                indemnification) shall continue to apply.
              </p>
            </section>

            {/* 11. Modifications */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. Modifications to Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we make
                material changes, we will notify you by updating the "Last
                updated" date and, where appropriate, providing additional notice
                via email or through our platform. Your continued use of the
                services after such changes constitutes acceptance of the
                revised Terms.
              </p>
            </section>

            {/* 12. Governing Law */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                12. Governing Law and Disputes
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of Norway. Any disputes arising from or related to these
                Terms shall be subject to the exclusive jurisdiction of the
                courts of Oslo, Norway.
              </p>
            </section>

            {/* 13. Contact */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                13. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms, please contact us:
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
                  to="/privacy"
                  className="text-foreground underline underline-offset-4 hover:opacity-80"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
