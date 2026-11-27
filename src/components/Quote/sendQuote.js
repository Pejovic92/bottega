import { quoteFields } from "./quoteOptions";

// Sends a quote request through Web3Forms (web3forms.com, free plan), which emails it to the
// address the key is registered with: bottega.furniture@gmail.com. The key is meant to be
// public (all it can do is send to that inbox), so it sits here in the code.
// Web3Forms only takes requests from a browser, and it blocks some domains by default (on the
// free plan it won't approve free subdomains of hosting platforms, such as *.netlify.app). If the
// form works locally but not on the live site, ask their support to approve the domain.
const WEB3FORMS_KEY = "7fcbd7a9-05b3-40ed-a3cf-9327f5450e0a";

// Resolves once Web3Forms has accepted the request; throws on a network error, after 20 seconds
// without an answer, or when Web3Forms refuses it. The answers go as plain form data rather than
// JSON: a JSON body would make the browser ask permission first (a CORS preflight), one more
// request that can fail.
const sendQuote = async (answers) => {
  const name = answers.name.trim();
  const email = answers.email.trim();
  const body = new FormData();
  body.append("access_key", WEB3FORMS_KEY);
  body.append("subject", `Upit za ponudu – ${name}`);
  body.append("from_name", "Bottega sajt");
  // Replying to the email then goes straight to the visitor, when they gave an address.
  if (email) body.append("replyto", email);
  quoteFields(answers).forEach(([label, value]) => body.append(label, value));

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
    signal: AbortSignal.timeout?.(20000),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) {
    throw new Error(result.message || `Web3Forms answered ${response.status}`);
  }
};

export default sendQuote;
