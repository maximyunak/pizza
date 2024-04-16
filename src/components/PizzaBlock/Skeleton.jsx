import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="125" r="125" />
    <rect x="0" y="276" rx="9" ry="9" width="280" height="18" />
    <rect x="0" y="314" rx="9" ry="9" width="280" height="88" />
    <rect x="0" y="426" rx="10" ry="10" width="90" height="30" />
    <rect x="130" y="415" rx="18" ry="18" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
