import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const slides = [
  {
    file: 'the-street-food-fighter_upscaled.webp',
    title: 'The Street Food Fighter',
    subtitle: 'Fresh, delicious Asian-inspired fusion street food.',
    link: '/menu',
    buttonText: 'View Our Menu',
  },
  {
    file: 'catering.jpg',
    title: 'Community & Events',
    subtitle: 'From private parties to local festivals, we bring the flavor and fun to every event.',
    link: '/catering',
    buttonText: 'Learn More',
  },
  {
    file: 'fresh-eggrolls.jpg',
    title: 'Always Fresh, Never Frozen!',
    subtitle: 'Our passion for authentic, freshly prepared food shines through every dish.',
    link: '/menu',
    buttonText: 'Browse Menu',
  },
  {
    file: 'foodtruck.jpg',
    title: 'Serving Cedar Rapids',
    subtitle: 'We are proud to serve the Cedar Rapids community with delicious food.',
    link: '/menu',
    buttonText: 'See Locations',
  },
  {
    file: 'our-menu.jpg',
    title: 'More Tasty Surprises',
    subtitle: 'Stay tuned for seasonal specials and limited-time offerings.',
    link: '/menu',
    buttonText: 'View Menu',
  },
  {
    file: 'food-is-love.jpg',
    title: 'Food is Love',
    subtitle: 'Bringing people together one bite at a time.',
    link: '/about',
    buttonText: 'Learn More',
  },
];

export default function HeroCarousel() {
  return (
    <Carousel>
      {slides.map(({ file, title, subtitle, link, buttonText }) => (
        <Carousel.Item key={file}>
          <img
            className="d-block w-100"
            src={`/assets/carousel_images/${file}`}
            alt={title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <Button as={Link} to={link} variant="danger">
              {buttonText}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
