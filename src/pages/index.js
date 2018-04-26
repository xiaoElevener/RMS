import React from 'react';

import styles from './index.css';
import DealShow from './consume/components/DealShow';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <DealShow />
    </div>
  );
}


export default IndexPage;
