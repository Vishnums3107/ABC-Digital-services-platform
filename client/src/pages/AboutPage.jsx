import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaBullseye, FaLightbulb, FaHandshake, FaChartLine } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- Styled Components ---
const PageContainer = styled.div`
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8f9fa;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(45, 62, 80, 0.7), rgba(45, 62, 80, 0.7)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
`;

const Section = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #4299e1;
    margin: 0.75rem auto 0;
    border-radius: 2px;
  }
`;

const StoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ValueCard = styled.div`
  text-align: center;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #4299e1;
  }

  svg {
    font-size: 3rem;
    color: #4299e1;
    margin-bottom: 1rem;
  }
`;

const CtaSection = styled.section`
  background-color: #2d3748;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
`;

const CtaButton = styled.a`
  background: #4299e1;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background: #3182ce;
  }
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
        <HeroTitle>About ABC OFFL</HeroTitle>
        <HeroSubtitle>
          We are the architects of digital transformation, dedicated to empowering businesses with innovative and reliable corporate solutions that drive growth and simplify complexity.
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <StoryContent>
            <div>
              <p>
                Founded in India with a global vision, ABC Corporate Solutions began with a simple mission: to bridge the gap between business ambition and technological capability. We saw countless enterprises struggling with outdated systems and inefficient processes, unable to keep pace with the digital world.
              </p>
              <p style={{ marginTop: '1rem' }}>
                From our origins as a specialized IT consultancy, we have evolved into a full-service digital powerhouse. Today, we offer a comprehensive suite of services—from enterprise web development and AI-driven marketing to robust IT infrastructure and media production—all designed to deliver tangible results and a significant return on investment for our clients worldwide.
              </p>
            </div>
            <StoryImage src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Our Team Collaborating" />
          </StoryContent>
        </Section>

        <Section>
          <SectionTitle>Our Core Values</SectionTitle>
          <ValuesGrid>
            <ValueCard>
              <FaLightbulb />
              <h3>Innovation with Purpose</h3>
              <p>We don’t just use technology; we apply it strategically to solve real-world business challenges and create new opportunities.</p>
            </ValueCard>
            <ValueCard>
              <FaUsers />
              <h3>Client-First Mindset</h3>
              <p>Your success is our ultimate metric. We build lasting partnerships based on trust, transparency, and a deep understanding of your goals.</p>
            </ValueCard>
            <ValueCard>
              <FaHandshake />
              <h3>Integrity and Transparency</h3>
              <p>We believe in honest communication and ethical practices. You can always expect clear insights and straightforward guidance from our team.</p>
            </ValueCard>
            <ValueCard>
              <FaChartLine />
              <h3>Excellence in Execution</h3>
              <p>From initial concept to final delivery, we are committed to the highest standards of quality, ensuring every project is delivered on time and on budget.</p>
            </ValueCard>
          </ValuesGrid>
        </Section>

        <Section>
          <SectionTitle>Mission & Vision</SectionTitle>
          <StoryContent>
            <div>
              <h3><FaBullseye style={{ color: '#4299e1', marginRight: '0.5rem' }} />Our Mission</h3>
              <p>To empower businesses of all sizes with agile, scalable, and secure digital solutions that accelerate transformation and drive sustainable growth in a competitive global market.</p>
            </div>
            <div>
              <h3><FaChartLine style={{ color: '#4299e1', marginRight: '0.5rem' }} />Our Vision</h3>
              <p>To be the most trusted and sought-after digital transformation partner for enterprises worldwide, recognized for our unwavering commitment to innovation, reliability, and client success.</p>
            </div>
          </StoryContent>
        </Section>
      </ContentSection>

      <CtaSection>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Build the Future?</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Let's discuss how our expertise can align with your vision. Contact us today for a free consultation.
        </p>
        <CtaButton href="/apply">Get in Touch</CtaButton>
      </CtaSection>

      <Footer />
    </PageContainer>
  );
};

export default AboutPage;
