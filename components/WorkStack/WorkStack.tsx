import React from 'react';
import { PROJECTS } from '../../constants';
import { Section } from '../Section/Section';
import WideCard from '../WideCard/WideCard';
import styles from './WorkStack.module.css';

export const WorkStack: React.FC = () => {
  return (
    <Section id="work">
       <div className={styles.sectionHeader}>
            <h2 className={styles.heading}>
                <span className={styles.headingNumber}>02.</span>
                <span>PROJECT_INDEX</span>
            </h2>
            <span className={styles.totalRecords}>
                Total Records: {PROJECTS.length}
            </span>
       </div>
      
      <div className={styles.stack}>
        {PROJECTS.map((project) => (
            <WideCard 
                key={project.id}
                title={project.title}
                role={project.role}
                description={project.description}
                tags={project.tech}
                desktopImg={project.desktopImg}
                mobileImg={project.mobileImg}
                mobileImages={project.mobileImages}
            />
        ))}
      </div>
    </Section>
  );
};
