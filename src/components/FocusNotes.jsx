import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Compass,
  CheckCircle,
  Clock,
  Layers
} from "lucide-react";

/**
 * Exactly 3 focus notes slides as required by the assignment
 */
const FOCUS_SLIDES = [
  {
    id: 1,
    tag: "Time Management",
    icon: Clock,
    title: "Master the 90-Minute Focus Block",
    summary:
      "Deep work flourishes in 90-minute ultradian rhythm intervals followed by a 15-minute mental reset. Silence notifications to protect deep concentration.",
    tip: "Batch shallow tasks like email into designated afternoon windows."
  },
  {
    id: 2,
    tag: "Priority Matrix",
    icon: Layers,
    title: "The Eisenhower Decision Rule",
    summary:
      "Distinguish between what is truly urgent and what is genuinely important. Spend at least 60% of your energy on non-urgent, high-leverage strategic initiatives.",
    tip: "If a task takes under 2 minutes, complete it immediately rather than queuing."
  },
  {
    id: 3,
    tag: "Execution Routine",
    icon: Compass,
    title: "Daily Shutdown & Tomorrow Prep",
    summary:
      "Close every work session by reviewing completed tasks and earmarking the top 3 critical outcomes for tomorrow morning. This eliminates morning decision fatigue.",
    tip: "Identify your single 'One Big Thing' before checking your inbox."
  }
];

/**
 * FocusNotes Carousel Component
 * Features:
 * - Exactly 3 slides
 * - Previous & Next circular navigation
 * - Indicator dots with active state highlighting
 * - Touch & keyboard accessibility
 */
export default function FocusNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Circular navigation: Next
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FOCUS_SLIDES.length);
  };

  // Circular navigation: Prev
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FOCUS_SLIDES.length - 1 : prev - 1));
  };

  // Jump to specific slide
  const handleGoTo = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  const activeSlide = FOCUS_SLIDES[currentIndex];
  const ActiveIcon = activeSlide.icon;

  return (
    <section
      className="focus-notes-carousel"
      aria-roledescription="carousel"
      aria-label="Daily Focus Notes & Strategies"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="carousel-glass-decor" aria-hidden="true" />

      <div className="carousel-header">
        <div className="carousel-title-group">
          <div className="carousel-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Focus Notes & Insights</span>
          </div>
          <span className="carousel-counter" aria-live="polite">
            Slide {currentIndex + 1} of {FOCUS_SLIDES.length}
          </span>
        </div>

        {/* Previous and Next Controls */}
        <div className="carousel-nav-buttons">
          <button
            type="button"
            className="carousel-btn carousel-btn--prev"
            onClick={handlePrev}
            aria-label="Previous slide"
            title="Previous note (Arrow Left)"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="carousel-btn carousel-btn--next"
            onClick={handleNext}
            aria-label="Next slide"
            title="Next note (Arrow Right)"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Active Slide Display */}
      <div
        className="carousel-slide-content"
        role="group"
        aria-roledescription="slide"
        aria-label={`${currentIndex + 1} of ${FOCUS_SLIDES.length}: ${activeSlide.title}`}
      >
        <div className="slide-icon-wrapper" aria-hidden="true">
          <ActiveIcon size={24} />
        </div>

        <div className="slide-body">
          <div className="slide-meta">
            <span className="slide-tag">{activeSlide.tag}</span>
          </div>
          <h3 className="slide-title">{activeSlide.title}</h3>
          <p className="slide-summary">{activeSlide.summary}</p>
          <div className="slide-tip-box">
            <Lightbulb size={16} className="tip-icon" aria-hidden="true" />
            <span className="tip-text"><strong>Pro Tip:</strong> {activeSlide.tip}</span>
          </div>
        </div>
      </div>

      {/* Navigation Indicator Dots */}
      <div
        className="carousel-indicators"
        role="tablist"
        aria-label="Select a focus note slide"
      >
        {FOCUS_SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              className={`carousel-dot ${isActive ? "carousel-dot--active" : ""}`}
              onClick={() => handleGoTo(index)}
            />
          );
        })}
      </div>
    </section>
  );
}
