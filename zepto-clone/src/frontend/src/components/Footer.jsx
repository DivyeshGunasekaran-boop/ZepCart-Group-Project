import { Facebook, Instagram, Linkedin, Twitter, Zap } from "lucide-react";

const COMPANY_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Press", href: "#" },
  { label: "Partner With Us", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Twitter", icon, href: "#", color: "#1DA1F2" },
  { label: "Instagram", icon, href: "#", color: "#E1306C" },
  { label: "Facebook", icon, href: "#", color: "#1877F2" },
  { label: "LinkedIn", icon, href: "#", color: "#0A66C2" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="mt-10 border-t border-border"
      style={{ background: "oklch(0.13 0.05 310)" }}
      data-ocid="footer"
    >
      {/* Main footer body */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-primary fill-primary" />
              <span className="text-2xl font-black text-white tracking-tight">
                zepto
              </span>
            </div>
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              India's fastest grocery delivery. Fresh produce, daily essentials
              & more — delivered in 10 minutes.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide uppercase">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-smooth hover:text-white"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide uppercase">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-smooth hover:text-white"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App download */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 tracking-wide uppercase">
              Download App
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Get 10-minute delivery on the go.
            </p>
            {/* Google Play button */}
            <a
              href="#download-android"
              aria-label="Download on Google Play"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 mb-3 transition-smooth hover:opacity-90 w-fit"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span className="text-2xl" aria-hidden="true">
                ▶
              </span>
              <div>
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Get it on
                </p>
                <p className="text-sm font-bold text-white leading-tight">
                  Google Play
                </p>
              </div>
            </a>
            {/* App Store button */}
            <a
              href="#download-ios"
              aria-label="Download on App Store"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-smooth hover:opacity-90 w-fit"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <span className="text-2xl" aria-hidden="true">
                🍎
              </span>
              <div>
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Download on
                </p>
                <p className="text-sm font-bold text-white leading-tight">
                  App Store
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            © {year} Zepto. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            🚀 10-min delivery · 🇮🇳 Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
