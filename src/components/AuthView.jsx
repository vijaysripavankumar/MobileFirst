import React, { useState } from "react";
import {
  Target,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { DEMO_ACCOUNTS } from "../data/defaultUser";

/**
 * Authentication view supporting Sign In, Sign Up, and 1-Click Demo Login
 */
export default function AuthView({ onLogin, onContinueAsGuest }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "vijay.kumar@example.com",
    password: "password123",
    rememberMe: true
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate initials from name or email
    const displayName = isSignUp
      ? formData.name.trim()
      : formData.name.trim() || formData.email.split("@")[0].replace(".", " ");

    const initials = displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    const userObj = {
      id: `user-${Date.now()}`,
      name: displayName,
      email: formData.email.trim(),
      role: isSignUp ? "Team Member" : "Product Lead",
      avatarInitials: initials
    };

    onLogin(userObj);
  };

  const handleDemoLogin = (account) => {
    onLogin(account);
  };

  return (
    <div className="auth-page-container">
      {/* Decorative backdrop gradients */}
      <div className="auth-decor-circle-1" aria-hidden="true" />
      <div className="auth-decor-circle-2" aria-hidden="true" />

      <div className="auth-card">
        {/* Card Header & Brand */}
        <div className="auth-header">
          <div className="auth-brand-logo" aria-hidden="true">
            <Target size={26} className="auth-logo-icon" />
          </div>
          <h1 className="auth-title">FocusBoard</h1>
          <p className="auth-subtitle">
            {isSignUp
              ? "Create your workspace account to organize tasks"
              : "Welcome back! Sign in to access your task dashboard"}
          </p>
        </div>

        {/* 1-Click Demo Quick Logins */}
        <div className="demo-login-box">
          <div className="demo-login-header">
            <Zap size={15} className="demo-zap-icon" />
            <span>Fast Evaluator Demo Login:</span>
          </div>
          <div className="demo-accounts-row">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                type="button"
                className="demo-account-chip"
                onClick={() => handleDemoLogin(acc)}
                title={`Quick sign in as ${acc.name}`}
              >
                <span className="demo-chip-avatar">{acc.avatarInitials}</span>
                <span className="demo-chip-name">{acc.name}</span>
                <ArrowRight size={13} className="demo-chip-arrow" />
              </button>
            ))}
          </div>
        </div>

        <div className="auth-divider">
          <span>or continue with credentials</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="auth-name" className="form-label">
                Full Name
              </label>
              <div className="auth-input-wrap">
                <User size={17} className="auth-input-icon" aria-hidden="true" />
                <input
                  id="auth-name"
                  name="name"
                  type="text"
                  className={`auth-input ${errors.name ? "form-input--error" : ""}`}
                  placeholder="e.g. Vijay Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              {errors.name && <span className="form-error-msg">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email" className="form-label">
              Email Address
            </label>
            <div className="auth-input-wrap">
              <Mail size={17} className="auth-input-icon" aria-hidden="true" />
              <input
                id="auth-email"
                name="email"
                type="email"
                className={`auth-input ${errors.email ? "form-input--error" : ""}`}
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="form-error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="auth-password-header">
              <label htmlFor="auth-password" className="form-label">
                Password
              </label>
              {!isSignUp && (
                <span className="auth-hint-text">Demo password: password123</span>
              )}
            </div>
            <div className="auth-input-wrap">
              <Lock size={17} className="auth-input-icon" aria-hidden="true" />
              <input
                id="auth-password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`auth-input ${errors.password ? "form-input--error" : ""}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span className="form-error-msg">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn--primary auth-submit-btn">
            <span>{isSignUp ? "Create Workspace Account" : "Sign In to FocusBoard"}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>

        {/* Footer switch & Guest link */}
        <div className="auth-footer">
          <p className="auth-toggle-mode">
            {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={() => {
                setIsSignUp((prev) => !prev);
                setErrors({});
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <button
            type="button"
            className="auth-guest-link"
            onClick={onContinueAsGuest}
          >
            Or explore dashboard in Guest Preview mode →
          </button>
        </div>
      </div>
    </div>
  );
}
