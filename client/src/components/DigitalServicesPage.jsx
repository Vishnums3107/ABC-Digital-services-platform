import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronRight, FiChevronLeft, FiExternalLink, FiCheckCircle, FiPlay } from 'react-icons/fi';

// Styled Components
const ProductContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ProductHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2.75rem;
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.2;
`;

const ProductTagline = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 2rem;
`;

const MediaGallery = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const MediaImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
`;

const MediaControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const MediaDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.5)'};
  cursor: pointer;
  padding: 0;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  svg {
    color: #4299e1;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const ServiceTabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ServiceTab = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  font-weight: 600;
  color: ${props => props.active ? '#2b6cb0' : '#718096'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.active ? '#4299e1' : 'transparent'};
  }

  &:hover {
    color: #2b6cb0;
  }
`;

const ServiceBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: ${props => {
    switch(props.service) {
      case 'webDevelopment': return '#ebf8ff';
      case 'digitalMarketing': return '#fff5f5';
      case 'itSolutions': return '#f0fff4';
      case 'socialMedia': return '#faf5ff';
      case 'mediaSolutions': return '#fffaf0';
      default: return '#ebf8ff';
    }
  }};
  color: ${props => {
    switch(props.service) {
      case 'webDevelopment': return '#2b6cb0';
      case 'digitalMarketing': return '#c53030';
      case 'itSolutions': return '#2f855a';
      case 'socialMedia': return '#6b46c1';
      case 'mediaSolutions': return '#b7791f';
      default: return '#2b6cb0';
    }
  }};
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const TestimonialSlider = styled.div`
  margin: 4rem 0;
  position: relative;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const CtaSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f7fafc 0%, #ebf8ff 100%);
  border-radius: 12px;
  margin-top: 3rem;
`;

const CtaButton = styled.button`
  background: #4299e1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #2b6cb0;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

// Product Data
const services = {
  webDevelopment: {
    name: "Enterprise Web Development",
    tagline: "Build high-performance web applications that scale",
    description: "Our full-stack development services deliver custom web applications with modern architectures, optimized performance, and enterprise-grade security.",
    features: [
      "React/Node.js development",
      "Progressive Web Apps",
      "Headless CMS integration",
      "API development",
      "Web performance optimization",
      "24/7 monitoring"
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Web development' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Code review' }
    ]
  },
  digitalMarketing: {
    name: "Digital Marketing Solutions",
    tagline: "Convert more leads with AI-powered campaigns",
    description: "Our marketing automation platform combines analytics with machine learning to deliver personalized customer journeys that maximize conversions.",
    features: [
      "SEO optimization",
      "PPC campaign management",
      "Marketing automation",
      "Conversion rate optimization",
      "Customer journey mapping",
      "ROI analytics dashboard"
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Marketing analytics' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Social media marketing' }
    ]
  },
  itSolutions: {
    name: "IT Solutions & Support",
    tagline: "Proactive IT infrastructure management",
    description: "End-to-end IT solutions including cloud migration, cybersecurity, and 24/7 system monitoring with guaranteed SLAs.",
    features: [
      "Cloud architecture design",
      "Network security",
      "Data backup solutions",
      "IT helpdesk support",
      "Compliance management",
      "Disaster recovery"
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'IT infrastructure' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'IT support' }
    ]
  },
  socialMedia: {
    name: "Social Media Management",
    tagline: "Strategic social presence that drives engagement",
    description: "Complete social media management including content creation, community management, and performance analytics across all platforms.",
    features: [
      "Content strategy development",
      "Platform-specific campaigns",
      "Influencer partnerships",
      "Community management",
      "Crisis management",
      "Performance analytics"
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Social media metrics' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162616475-465b9b3698c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Content calendar' }
    ]
  },
  mediaSolutions: {
    name: "Media Production Services",
    tagline: "Professional content creation at scale",
    description: "High-quality video production, graphic design, and multimedia content tailored for digital platforms and marketing campaigns.",
    features: [
      "Video production",
      "Motion graphics",
      "Brand identity design",
      "Photography services",
      "Audio production",
      "Content localization"
    ],
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Video production' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Graphic design' }
    ]
  }
};

const testimonials = [
  {
    name: "Alex Rivera",
    title: "Marketing Director, TechCorp",
    quote: "Their digital marketing strategies increased our lead conversion by 150% in just 3 months.",
    service: "digitalMarketing",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Sharma",
    title: "CIO, Global Retail",
    quote: "The web application they built handles 50,000 concurrent users with zero downtime.",
    service: "webDevelopment",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "James Wilson",
    title: "CEO, Media Group",
    quote: "Their media production quality surpassed all our expectations.",
    service: "mediaSolutions",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const DigitalServicesPage = () => {
  const [activeService, setActiveService] = useState('webDevelopment');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % services[activeService].media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + services[activeService].media.length) % services[activeService].media.length);
  };

  const selectMedia = (index) => {
    setCurrentMediaIndex(index);
  };

  const filteredTestimonials = testimonials.filter(t => t.service === activeService);

  return (
    <ProductContainer>
      <ServiceTabs>
        {Object.keys(services).map((serviceKey) => (
          <ServiceTab 
            key={serviceKey}
            active={activeService === serviceKey}
            onClick={() => {
              setActiveService(serviceKey);
              setCurrentMediaIndex(0);
            }}
          >
            {services[serviceKey].name}
            <ServiceBadge service={serviceKey}>
              {serviceKey === 'webDevelopment' && 'DEV'}
              {serviceKey === 'digitalMarketing' && 'MARKETING'}
              {serviceKey === 'itSolutions' && 'IT'}
              {serviceKey === 'socialMedia' && 'SOCIAL'}
              {serviceKey === 'mediaSolutions' && 'MEDIA'}
            </ServiceBadge>
          </ServiceTab>
        ))}
      </ServiceTabs>

      <ProductHeader>
        <div>
          <ProductTitle>{services[activeService].name}</ProductTitle>
          <ProductTagline>{services[activeService].tagline}</ProductTagline>
          <p>{services[activeService].description}</p>
          <CtaButton>
            Get Started <FiExternalLink />
          </CtaButton>
        </div>
        <MediaGallery>
          {services[activeService].media[currentMediaIndex].type === 'image' ? (
            <MediaImage 
              src={services[activeService].media[currentMediaIndex].url} 
              alt={services[activeService].media[currentMediaIndex].alt} 
            />
          ) : (
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <img 
                src={services[activeService].media[currentMediaIndex].thumbnail} 
                alt="Video thumbnail" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <FiPlay style={{ color: '#4299e1', fontSize: '24px' }} />
              </div>
            </div>
          )}
          <NavButton className="prev" onClick={prevMedia}>
            <FiChevronLeft />
          </NavButton>
          <NavButton className="next" onClick={nextMedia}>
            <FiChevronRight />
          </NavButton>
          <MediaControls>
            {services[activeService].media.map((_, index) => (
              <MediaDot 
                key={index} 
                active={index === currentMediaIndex} 
                onClick={() => selectMedia(index)}
              />
            ))}
          </MediaControls>
        </MediaGallery>
      </ProductHeader>

      <h2 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '1.5rem' }}>Key Features</h2>
      <FeatureGrid>
        {services[activeService].features.map((feature, index) => (
          <FeatureCard key={index}>
            <FiCheckCircle size={24} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>{feature}</h3>
              <p style={{ color: '#718096', margin: 0 }}>Learn more →</p>
            </div>
          </FeatureCard>
        ))}
      </FeatureGrid>

      {filteredTestimonials.length > 0 && (
        <>
          <h2 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '1.5rem' }}>Client Success</h2>
          <TestimonialSlider>
            {filteredTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <Avatar src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <blockquote style={{ fontStyle: 'italic', color: '#4a5568', margin: '0 0 1rem 0' }}>
                    "{testimonial.quote}"
                  </blockquote>
                  <p style={{ fontWeight: '600', color: '#2d3748', margin: '0 0 0.25rem 0' }}>
                    {testimonial.name}
                  </p>
                  <p style={{ color: '#718096', margin: 0 }}>{testimonial.title}</p>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialSlider>
        </>
      )}

      <CtaSection>
        <h2 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '1rem' }}>Ready to Transform Your Digital Presence?</h2>
        <p style={{ color: '#4a5568', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Our experts will help you select the right services for your business goals.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CtaButton>
            Get Free Consultation <FiExternalLink />
          </CtaButton>
          <CtaButton style={{ background: 'white', color: '#4299e1', border: '1px solid #4299e1' }}>
            View Case Studies
          </CtaButton>
        </div>
      </CtaSection>
    </ProductContainer>
  );
};

export default DigitalServicesPage;