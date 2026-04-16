import { X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LoginModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const backdropRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtp(["", "", "", "", "", ""]);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handlePhoneContinue = () => {
    if (phone.replace(/\D/g, "").length >= 10) {
      setStep("otp");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="login-modal-backdrop"
    >
      <dialog
        open
        className="bg-card rounded-2xl shadow-2xl w-full max-w-[400px] overflow-hidden relative p-0 border border-border"
        aria-label="Login to Zepto"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-smooth"
          aria-label="Close login modal"
          data-ocid="login-modal-close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Purple header */}
        <div className="bg-primary px-6 pt-6 pb-5 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-primary-foreground font-extrabold text-3xl tracking-tighter leading-none">
              zepto
            </span>
            <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 -mt-1.5" />
          </div>
          <p className="text-primary-foreground/80 text-sm font-medium">
            India's #1 Grocery App
          </p>
          <p className="text-primary-foreground/60 text-xs mt-0.5">
            Delivered in 10 minutes ⚡
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {step === "phone" ? (
            <>
              <p className="text-foreground font-semibold text-base mb-4">
                Login or Sign Up
              </p>

              <div className="flex rounded-xl border-2 border-input focus-within:border-primary overflow-hidden mb-4 transition-colors">
                <div className="flex items-center gap-2 px-3 bg-muted border-r border-border">
                  <span className="text-base">🇮🇳</span>
                  <span className="text-sm font-semibold text-foreground">
                    +91
                  </span>
                </div>
                <input
                  ref={inputRef}
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter mobile number"
                  className="flex-1 h-11 px-3 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
                  maxLength={10}
                  data-ocid="phone-input"
                  onKeyDown={(e) => e.key === "Enter" && handlePhoneContinue()}
                />
              </div>

              <button
                type="button"
                onClick={handlePhoneContinue}
                className="w-full h-11 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:opacity-90 active:scale-[0.98] transition-smooth disabled:opacity-50"
                disabled={phone.length < 10}
                data-ocid="phone-continue-btn"
              >
                Continue
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-medium">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button
                type="button"
                className="w-full h-11 flex items-center justify-center gap-2.5 border-2 border-border rounded-xl text-foreground text-sm font-semibold hover:bg-muted transition-smooth"
                data-ocid="google-login-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Sign in with Google
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Go back"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <p className="text-foreground font-semibold text-sm">
                    Enter OTP
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Sent to +91 {phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-5 justify-center">
                {["p0", "p1", "p2", "p3", "p4", "p5"].map((pos, i) => (
                  <input
                    key={pos}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    value={otp[i]}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-input focus:border-primary bg-background text-foreground outline-none transition-colors"
                    data-ocid={`otp-input-${i}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full h-11 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:opacity-90 active:scale-[0.98] transition-smooth disabled:opacity-50"
                disabled={otp.some((d) => d === "")}
                data-ocid="otp-verify-btn"
              >
                Verify OTP
              </button>

              <p className="text-center text-xs text-muted-foreground mt-3">
                Didn't receive OTP?{" "}
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline"
                  data-ocid="resend-otp-btn"
                >
                  Resend
                </button>
              </p>
            </>
          )}

          <p className="text-center text-[11px] text-muted-foreground mt-4 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </dialog>
    </div>
  );
}
