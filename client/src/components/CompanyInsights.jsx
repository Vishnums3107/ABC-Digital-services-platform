import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  margin-bottom: 3rem;
  color: #2d3748;
  text-align: center;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #4299e1;
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const SectionHeader = styled.h3`
  color: #2b6cb0;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #4299e1;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeedbackContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #edf2f7;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }
`;

const FeedbackCard = styled.div`
  min-width: 80%;
  scroll-snap-align: start;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    min-width: 45%;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
  }
`;

const StatNumber = styled.h4`
  font-size: 2.5rem;
  color: #2b6cb0;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const CoreValuesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0;
  list-style: none;
`;

const CoreValueItem = styled.li`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #4299e1;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ebf8ff;
    transform: translateX(5px);
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.active ? '#2b6cb0' : '#718096'};
  border-bottom: 3px solid ${props => props.active ? '#4299e1' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: #2b6cb0;
  }
`;

export default function CompanyInsights() {
  const [activeTab, setActiveTab] = useState('about');
  const feedbacks = [
    {
      name: "Jane Doe, CEO of SoftTech",
      quote: "Their team transformed our operations with modern, scalable tech. Outstanding experience!",
      avatar: "JD"
    },
    {
      name: "John Smith, CTO of FinBridge",
      quote: "Reliable, innovative, and always ahead of the curve. A trusted long-term partner.",
      avatar: "JS"
    },
    {
      name: "Sarah Johnson, Director at HealthPlus",
      quote: "Exceptional problem-solving skills and delivered ahead of schedule. Highly recommended!",
      avatar: "SJ"
    }
  ];

  return (
    <Container>
      <SectionTitle>Who We Are</SectionTitle>
      
      <TabContainer>
        <TabButton 
          active={activeTab === 'about'} 
          onClick={() => setActiveTab('about')}
        >
          About Us
        </TabButton>
        <TabButton 
          active={activeTab === 'values'} 
          onClick={() => setActiveTab('values')}
        >
          Our Values
        </TabButton>
        <TabButton 
          active={activeTab === 'results'} 
          onClick={() => setActiveTab('results')}
        >
          Results
        </TabButton>
      </TabContainer>
      
      {activeTab === 'about' && (
        <Grid>
          <Card>
            <SectionHeader>Our Motive</SectionHeader>
            <p>We aim to empower enterprises with agile digital solutions that accelerate transformation and drive real-world outcomes through cutting-edge technology and strategic thinking.</p>
          </Card>
          
          <Card>
            <SectionHeader>Vision</SectionHeader>
            <p>To become the leading force in next-generation enterprise technology worldwide, recognized for innovation, reliability, and transformative impact.</p>
          </Card>
          
          <Card>
            <SectionHeader>Mission</SectionHeader>
            <p>Deliver scalable, secure, and future-ready digital solutions that solve complex business challenges while maintaining the highest standards of quality and ethics.</p>
          </Card>
        </Grid>
      )}
      
      {activeTab === 'values' && (
        <div>
          <SectionHeader>Our Core Values</SectionHeader>
          <CoreValuesList>
            <CoreValueItem>Innovation with purpose</CoreValueItem>
            <CoreValueItem>Client-first mindset</CoreValueItem>
            <CoreValueItem>Integrity and transparency</CoreValueItem>
            <CoreValueItem>Excellence in execution</CoreValueItem>
            <CoreValueItem>Collaborative approach</CoreValueItem>
            <CoreValueItem>Sustainable growth</CoreValueItem>
          </CoreValuesList>
        </div>
      )}
      
      {activeTab === 'results' && (
        <StatsContainer>
          <StatItem>
            <StatNumber>120+</StatNumber>
            <p>Projects Delivered</p>
          </StatItem>
          <StatItem>
            <StatNumber>75+</StatNumber>
            <p>Clients Worldwide</p>
          </StatItem>
          <StatItem>
            <StatNumber>98%</StatNumber>
            <p>Client Retention</p>
          </StatItem>
          <StatItem>
            <StatNumber>40+</StatNumber>
            <p>Industry Awards</p>
          </StatItem>
        </StatsContainer>
      )}
      
      <SectionHeader style={{ marginTop: '4rem' }}>Customer Feedback</SectionHeader>
      <FeedbackContainer>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              backgroundColor: '#bee3f8', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#2b6cb0',
              fontWeight: 'bold'
            }}>
              {feedback.avatar}
            </div>
            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              "{feedback.quote}"
            </p>
            <p style={{ fontWeight: '600', color: '#4a5568' }}>— {feedback.name}</p>
          </FeedbackCard>
        ))}
      </FeedbackContainer>
    </Container>
  );
}