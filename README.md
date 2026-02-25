VC Intelligence Interface

Precision AI Scout for Venture Capital

A production-quality full-stack SaaS-style application designed to simulate a modern VC sourcing workflow.

This project combines a structured discovery interface with live AI-powered website enrichment to transform public company data into actionable intelligence.

---

🔗 Live Links

- Deployed App: https://vc-intelligence-navy.vercel.app
- 
- GitHub Repository: https://github.com/sudarshanpatil03/vc-intelligence

---

🧠 Product Vision

Venture capital sourcing is repetitive, fragmented, and thesis-dependent.

This application models a workflow-driven intelligence system:

Discover → Evaluate → Enrich → Explain → Act

It demonstrates how a VC team could:

- Search and filter companies
- Open structured company profiles
- Pull live public web data
- Extract AI-generated insights
- Save companies to lists
- Add contextual notes
- Export structured data

The system is designed to feel like a real internal VC tool — clean, fast, and workflow-oriented.

---

✨ Core Features

1️⃣ Company Discovery

- Search companies by name
- Filter by sector and location
- Clean, sortable interface
- Responsive design

2️⃣ Company Profile

Each company has a structured profile containing:

- Overview (name, domain, sector, location)
- Notes (auto-saved in localStorage)
- Save-to-list functionality
- Signals timeline (mock events)

---

3️⃣ Live AI Enrichment (MVP End-to-End)

Clicking “Enrich”:

1. Sends the company domain to a secure server API
2. Fetches public homepage content
3. Extracts readable text
4. Sends text to OpenAI for structured extraction
5. Returns:

- Summary (1–2 sentences)
- What the company does (3–6 bullets)
- Keywords
- Derived signals (e.g., blog, careers page)
- Source URL + timestamp

Enrichment is:

- Server-side only
- API key protected via environment variables
- Cached locally to avoid repeated calls
- Displayed with loading + error states

This fulfills the “one working enrichment path end-to-end” MVP requirement.

---

4️⃣ Lists & Actions

- Save companies to lists
- Persist lists in localStorage
- Export as JSON
- Export as CSV
- Remove items

---

5️⃣ Saved Searches

- Save search queries
- Re-run saved searches
- Persistent in localStorage

---

🏗 Architecture Overview

Frontend

- Next.js 14 (App Router)
- React
- Tailwind CSS
- Client-side state + localStorage persistence

Backend

- Next.js API Route ("/api/enrich")
- Axios for fetching public HTML
- Cheerio for text extraction
- OpenAI API for structured AI extraction

Data Flow

User clicks Enrich
        ↓
POST /api/enrich
        ↓
Fetch public website HTML
        ↓
Extract visible text
        ↓
Send to OpenAI
        ↓
Return structured JSON
        ↓
Render in UI

---

🔐 Security Considerations

- "OPENAI_API_KEY" stored in environment variables
- Enrichment executed server-side only
- No API keys exposed in client bundle
- Public website content only
- No access control evasion

---

🛠 Tech Stack

Layer| Technology
Framework| Next.js 14
Language| TypeScript
Styling| Tailwind CSS
AI| OpenAI API
Scraping| Axios + Cheerio
Storage| localStorage
Deployment| Vercel

---

📂 Project Structure

/app
  /companies
  /companies/[id]
  /lists
  /saved
  /api/enrich
/components
/data/companies.json
/lib

---

⚙️ Local Setup

1. Clone Repo

git clone https://github.com/sudarshanpatil03/vc-intelligence.git
cd vc-intelligence

2. Install Dependencies

npm install

3. Create Environment File

Create ".env.local":

OPENAI_API_KEY=your_api_key_here

4. Run Development Server

npm run dev

Open:
http://localhost:3000/companies

---

🌍 Deployment

Deployed via Vercel.

Steps:

1. Push to GitHub
2. Import into Vercel
3. Add environment variable:
   OPENAI_API_KEY=your_api_key_here
4. Deploy

---

🎯 What This Demonstrates

- Workflow-first product thinking
- Secure API design
- Live enrichment integration
- Clean UI & state management
- Practical MVP delivery within time constraints
- Production-ready deployment

---

🚀 Future Improvements (Stretch Targets)

- Queue + rate limiting
- Persistent backend storage
- Vector search / similarity
- Thesis scoring engine
- Integrations (Slack / CRM)
- Caching layer

---

👤 Author

Sudarshan Patil

GitHub: https://github.com/sudarshanpatil03

---

📜 License

Built as part of a VC sourcing interface assignment.
