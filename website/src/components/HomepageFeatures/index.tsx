import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.easy.title">Easy to Use</Translate>,
    description: (
      <Translate id="homepage.features.easy.description">
        ko is a simple, yet powerful, tool for managing your react applications
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.flex.title">Flexible</Translate>,
    description: (
      <Translate id="homepage.features.flex.description">
        You can use ko to build your own applications with default
        configuration, or customize it to fit your needs
      </Translate>
    ),
  },
  {
    title: <Translate id="homepage.features.fast.title">Faster</Translate>,
    description: (
      <Translate id="homepage.features.fast.description">
        ko is built on top of Webpack v5 and esbuild, so it is blazing fast
      </Translate>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
