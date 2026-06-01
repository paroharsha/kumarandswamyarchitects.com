/* global React, Band, Button */

function GetToKnowUs({ onLearnMore }) {
  return (
    <Band variant="cream">
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 56,
          color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0, lineHeight: 1.1,
          textShadow: '0 2px 12px rgba(9,20,5,0.08)',
        }}>Get to Know Us</h2>
        <p style={{
          fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 18,
          lineHeight: 1.6, color: '#091405', maxWidth: 640, margin: '32px auto 40px',
        }}>
          We are a family-owned business in our third generation, with a legacy of over 55 years. Our core philosophy has always been to create user-friendly and safe environments. While we are based in Bangalore, we have collaborated with institutions nationwide. Click "learn more" to discover our story!
        </p>
        <Button variant="outline" onClick={onLearnMore}>Learn more</Button>
      </div>
    </Band>
  );
}

Object.assign(window, { GetToKnowUs });
