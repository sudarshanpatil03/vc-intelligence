import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain required" }, { status: 400 });
    }

    let summary = `${domain} operates in the technology space.`;
    let whatTheyDo = ["Provides digital products", "Serves global customers"];
    let keywords = ["technology", "software"];
    let signals = ["Public website"];

    if (domain.includes("stripe")) {
      summary =
        "Stripe is a global payments infrastructure company enabling businesses to accept and manage online payments.";
      whatTheyDo = [
        "Online payment processing",
        "Developer payment APIs",
        "Global financial infrastructure",
      ];
      keywords = ["payments", "fintech", "API", "billing"];
      signals = ["Has developer docs", "Has global presence"];
    } else if (domain.includes("razorpay")) {
      summary =
        "Razorpay provides payment gateway and banking solutions for businesses in India.";
      whatTheyDo = [
        "Payment gateway",
        "Business banking",
        "Subscription billing",
      ];
      keywords = ["payments", "india", "fintech", "gateway"];
      signals = ["India focused", "Has dashboard"];
    } else if (domain.includes("notion")) {
      summary =
        "Notion is a productivity platform combining notes, docs, and project management.";
      whatTheyDo = [
        "Knowledge management",
        "Team collaboration",
        "Workspace platform",
      ];
      keywords = ["productivity", "notes", "workspace", "collaboration"];
      signals = ["Has templates", "Has integrations"];
    } else if (domain.includes("freshworks")) {
      summary =
        "Freshworks builds SaaS products for customer support and business automation.";
      whatTheyDo = [
        "Customer support software",
        "CRM tools",
        "Business automation",
      ];
      keywords = ["SaaS", "CRM", "support", "automation"];
      signals = ["Enterprise customers", "Cloud based"];
    } else if (domain.includes("zoho")) {
      summary =
        "Zoho provides a full suite of business, productivity, and SaaS applications.";
      whatTheyDo = [
        "Business software suite",
        "CRM and finance tools",
        "Cloud applications",
      ];
      keywords = ["SaaS", "CRM", "business", "cloud"];
      signals = ["Large product suite", "Global customers"];
    } else if (domain.includes("paypal")) {
      summary =
        "PayPal is a global digital payments platform for individuals and businesses.";
      whatTheyDo = [
        "Digital wallet",
        "Online payments",
        "Financial services",
      ];
      keywords = ["payments", "fintech", "wallet", "global"];
      signals = ["Public company", "Global users"];
    }

    return NextResponse.json({
      provider: "mock",
      result: {
        summary,
        what_they_do: whatTheyDo,
        keywords,
        derived_signals: signals,
      },
      source: `https://${domain}`,
      time: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Enrichment failed" },
      { status: 500 }
    );
  }
}