import React from 'react'
import styled from 'styled-components' 
import HeroSection from './components/HeroSection';
import Trusted from './components/Trusted';
import Services from './components/Services';
import Footer from './components/Footer';
import FeatureProduct from './components/FeatureProduct';
const Home = () => {

  const data={
    name: "ShopKart",
  }
  return (
    <Wrapper className='test'>
      <HeroSection myData={data}/>
      <FeatureProduct/>
      <Services/>
      <Trusted/>
      <Footer/>
    </Wrapper>
  )
};


const Wrapper =styled.section`
background-color: ${({ theme }) => theme.colors.bg};

`;

export default Home;
