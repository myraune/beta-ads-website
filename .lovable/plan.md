
# Plan: Improve Search Visibility for "Beta Ads"

## The Problem

When searching "Beta Ads" on Google, your website appears correctly in organic results (position 1), but the **Knowledge Panel** on the right shows an unrelated Indian advertising agency in Kumbakonam, India. This creates brand confusion and undermines trust.

## Root Cause

Google's Knowledge Graph has associated the generic term "Beta Ads" with the Indian company that has:
- An established Google Business Profile
- Reviews (16 Google reviews, 4.7 stars)
- Verified business information

Your Nordic company is newer and lacks a claimed Google Business Profile, so Google defaults to the other entity.

## Solution: Two-Track Approach

### Track 1: External Actions (Required - Cannot Be Done in Code)

These are the most impactful steps and must be done outside the codebase:

| Action | Why It Matters | How to Do It |
|--------|---------------|--------------|
| **Claim Google Business Profile** | This is the #1 way to get your own Knowledge Panel | Go to business.google.com and claim "Beta Ads" as a business in Norway |
| **Verify the business** | Proves you're the real entity | Google will send a postcard or call to verify |
| **Add complete business info** | Helps Google distinguish you | Add photos, hours, services, description, website URL |
| **Get Google Reviews** | Builds authority | Ask clients like Samsung, Kristiania, etc. to leave reviews |
| **Create/Update LinkedIn Company Page** | Strengthens entity signals | Ensure linkedin.com/company/beta-nordic is complete and active |
| **Wikipedia Entry** | Creates strong Knowledge Graph signal | If notable enough, a Wikipedia stub article helps Google identify the entity |

### Track 2: On-Site SEO Improvements (Code Changes)

Your current SEO is good, but we can make targeted improvements to help Google better understand your distinct identity:

#### 1. Add Differentiated Branding in Structured Data

Update the Organization schema to emphasize "Beta Ads Nordic" or "Beta Ads Norway" as a distinct entity:

```text
Current: "name": "Beta Ads"
Better:  "name": "Beta Ads Nordic"
         "legalName": "Beta Ads AS"
```

Add `identifier` with Norwegian business registry number if you have one.

#### 2. Add Person Schema for Andreas Myraune

Create structured data for the founder to strengthen entity association:

```json
{
  "@type": "Person",
  "name": "Andreas Myraune",
  "jobTitle": "Founder & CEO",
  "worksFor": { "@type": "Organization", "name": "Beta Ads Nordic" },
  "sameAs": ["https://linkedin.com/in/andreasmyraune"]
}
```

#### 3. Strengthen Geographic Signals

Add more specific address information if available:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "[Your office address]",
  "addressLocality": "Oslo",
  "postalCode": "[Postal code]",
  "addressCountry": "NO"
}
```

#### 4. Add SameAs Links

Ensure all official profiles are linked in structured data:

```json
"sameAs": [
  "https://www.linkedin.com/company/beta-nordic",
  "https://discord.gg/hNgHCbQUvb",
  "https://instagram.com/betaadsofficial",
  "https://twitter.com/betaads"
]
```

#### 5. Update Title and Meta for Brand Differentiation

Consider updating:

```text
Current: "Beta Ads | Native Twitch Advertising in the Nordics"
Option:  "Beta Ads Nordic | Native Twitch Advertising in Norway, Sweden, Finland"
```

This helps differentiate from the Indian company in search results.

## Technical Implementation

### Files to Modify

1. **index.html** - Update Organization and LocalBusiness schemas with:
   - More specific name ("Beta Ads Nordic")
   - Complete address with city/postal code if available
   - Additional sameAs social profiles
   - Person schema for founder

2. **sitemap.xml** - Add any missing blog post URLs and ensure lastmod dates are current

## Priority Order

1. **Google Business Profile** (External - Highest Impact)
2. **Update structured data** (Code change)
3. **LinkedIn company page optimization** (External)
4. **Collect Google reviews from clients** (External)
5. **Consider "Beta Ads Nordic" branding emphasis** (Brand decision)

## Expected Timeline

- Google Business Profile verification: 1-2 weeks
- Knowledge Panel appearance: 4-8 weeks after verification
- Structured data improvements: Immediate (once implemented)

## Important Note

The Indian company's Knowledge Panel cannot be removed - it's a legitimate business. The goal is to establish your Nordic company as a **separate, distinct entity** so that regional/contextual searches show your panel instead, or so both appear with clear geographic differentiation.
