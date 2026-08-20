// ===============================
// VERCEL WEB ANALYTICS
// ===============================
window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};

const vercelAnalyticsScript = document.createElement("script");
vercelAnalyticsScript.src = "/_vercel/insights/script.js";
vercelAnalyticsScript.defer = true;
document.head.appendChild(vercelAnalyticsScript);


// ===============================
// VERCEL SPEED INSIGHTS
// ===============================
window.si = window.si || function () {
  (window.siq = window.siq || []).push(arguments);
};

const vercelSpeedInsightsScript = document.createElement("script");
vercelSpeedInsightsScript.src = "/_vercel/speed-insights/script.js";
vercelSpeedInsightsScript.defer = true;
document.head.appendChild(vercelSpeedInsightsScript);