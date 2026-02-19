import React from 'react';
import styled from 'styled-components';

export const MarqueeCarousel: React.FC = () => {
  const tips = [
    { label: 'Burn Emergency:', text: 'Call 9837041574', icon: '🚨' },
    { label: 'Flame / Home Burn:', text: "Cool under water for 20 minutes.", icon: '🔥' },
    { label: 'Electrical Burn:', text: 'If conscious and breathing. Rush to hospital.  If not breathing, start resuscitation.', icon: '⚡️' },
    { label: 'Chemical Burn:', text: 'Rinse immediately. Call 9837041574', icon: '🧪' },
    { label: 'Firework Burn:', text: 'Cool fast. Seek medical help.', icon: '🎆' }
  ];

  return (
    <StyledWrapper>
      <div className="marquee" aria-label="Burn first aid tips">
        <div className="marquee__inner">
          <div className="marquee__group">
            {tips.map((tip, idx) => (
              <div key={idx} className="tip-card">
                <div className="tip-text">
                  <strong>{tip.label}</strong> {tip.text}
                </div>
                <div className="tip-icon">{tip.icon}</div>
              </div>
            ))}
          </div>
          <div className="marquee__group" aria-hidden="true">
            {tips.map((tip, idx) => (
              <div key={`dup-${idx}`} className="tip-card">
                <div className="tip-text">
                  <strong>{tip.label}</strong> {tip.text}
                </div>
                <div className="tip-icon">{tip.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .marquee {
    overflow: hidden;
    width: 100%;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%);
    border-radius: 20px;
    padding: 14px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 6%,
      black 94%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 6%,
      black 94%,
      transparent 100%
    );
  }

  .marquee__inner {
    display: flex;
    width: max-content;
    animation: marquee 45s linear infinite;
  }

  .marquee__group {
    display: flex;
    gap: 14px;
  }

  .tip-card {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 7px;
    padding: 8px 18px 8px 20px;
    background: linear-gradient(135deg, #e85454 0%, #cfac5b 50%, #f84a4a 100%);
    border-radius: 50px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15),
                0 2px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    transition: transform 0.3s ease;
  }

  .tip-card:hover {
    transform: translateY(-2px);
  }

  .tip-text {
    color: #ffffff;
    font-size: 1.0rem;
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  .tip-text strong {
    font-weight: 700;
  }

  .tip-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #e8f0f8 0%, #f5f9fc 100%);
    border-radius: 50%;
    font-size: 1.65rem;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;
