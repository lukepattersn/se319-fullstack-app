import React from 'react';

// Import individual components
import CateringHero from '../components/catering/CateringHero';
import ServicesOverview from '../components/catering/ServicesOverview';
import CateringPackages from '../components/catering/CateringPackages';
import CateringForm from '../components/catering/CateringForm';

const Catering = () => {
  return (
    <main>
      {/* Hero Section with full-width background */}
      <CateringHero />
      
      {/* Services Overview */}
      <ServicesOverview />
      
      {/* Catering Packages */}
      <CateringPackages />
      
      {/* Catering Request Form */}
      <CateringForm />
    </main>
  );
};

export default Catering;