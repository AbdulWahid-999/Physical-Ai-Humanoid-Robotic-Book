import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Basics of Humanoid Robotics',
    image: '/img/undraw_docusaurus_react.svg',
    description: 'Explore the fundamental concepts of humanoid robot design, anatomy, and locomotion.',
    link: '/docs/basics-of-humanoid-robotics',
  },
  {
    title: 'Capstone AI Robot Pipeline',
    image: '/img/undraw_docusaurus_react.svg',
    description: 'Understand the end-to-end pipeline for creating intelligent AI-powered robots.',
    link: '/docs/capstone-ai-robot-pipeline',
  },
  {
    title: 'Digital Twin Simulation',
    image: '/img/undraw_docusaurus_react.svg',
    description: 'Learn how to create and use digital twins for robot simulation and testing.',
    link: '/docs/digital-twin-simulation',
  },
  {
    title: 'Introduction to Physical AI',
    image: '/img/undraw_docusaurus_react.svg',
    description: 'A primer on the intersection of physical robotics and artificial intelligence.',
    link: '/docs/introduction-to-physical-ai',
  },
  {
    title: 'ROS 2 Fundamentals',
    image: '/img/undraw_docusaurus_react.svg',
    description: 'Get started with the Robot Operating System 2, the standard for robotics development.',
    link: '/docs/ros-2-fundamentals',
  },
  {
    title: 'Vision Language Action Systems',
    image: '/img/undraw_docusaurus_react.svg',
    description: 'Dive into advanced systems that combine vision, language, and action for robots.',
    link: '/docs/vision-language-action-systems',
  },
];

function Feature({title, image, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCard)}>
      <div className="text--center">
        <img src={image} className={styles.featureImage} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
        <Link className="button button--secondary" to={link}>
          Start Reading
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={clsx('row', styles.featureRow)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
