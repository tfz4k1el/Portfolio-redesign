import React, { useEffect, useState } from 'react';
import { Section } from '../Section/Section';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import styles from './TheLab.module.css';

// Generate fake smooth data
const generateData = (length: number) => {
  const data = [];
  let prev = 50;
  for (let i = 0; i < length; i++) {
    const val = Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 20));
    data.push({ value: val });
    prev = val;
  }
  return data;
};

const MetricCard = ({ label, value, unit, subtext }: { label: string, value: string, unit: string, subtext?: string }) => (
  <div className={styles.metricCard}>
    <div className={styles.pulseContainer}>
        <div className={styles.pulseDot} />
    </div>
    <div className={styles.metricLabel}>{label}</div>
    <div className={styles.metricValue}>
        {value}<span className={styles.metricUnit}>{unit}</span>
    </div>
    {subtext && <div className={styles.metricSubtext}>{subtext}</div>}
  </div>
);

export const TheLab: React.FC = () => {
  const [heapSize, setHeapSize] = useState(12.4);
  const [renderTime, setRenderTime] = useState(0.8);
  const [fps, setFps] = useState(60);
  const [chartData, setChartData] = useState(generateData(50));
  
  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setHeapSize(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(1));
      setRenderTime(prev => Math.max(0.1, +(prev + (Math.random() - 0.5) * 0.2).toFixed(2)));
      setFps(prev => Math.min(60, Math.max(55, Math.floor(prev + (Math.random() - 0.5) * 2))));
      
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1].value;
        const nextVal = Math.max(10, Math.min(90, lastVal + (Math.random() - 0.5) * 30));
        newData.push({ value: nextVal });
        return newData;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="lab" className={styles.section}>
      <div className={styles.grid}>
        {/* Left Info */}
        <div className={styles.leftInfo}>
             <h2 className={styles.heading}>
                <span className={styles.headingNumber}>03.</span>
                <span>THE_LAB</span>
            </h2>
            <p className={styles.description}>
                Optimization is not a step; it is the entire process. 
                This section monitors the current runtime environment in real-time. 
                We pursue the asymptotic limit of zero latency.
            </p>
            <div className={styles.status}>
                STATUS: OPTIMIZED
            </div>
        </div>

        {/* Right Metrics */}
        <div className={styles.rightMetrics}>
            <div className={styles.metricsGrid}>
                <MetricCard label="JS Heap Size" value={heapSize.toFixed(1)} unit="MB" subtext="Garbage Collection: Idle" />
                <MetricCard label="Render Cycle" value={renderTime.toFixed(2)} unit="ms" subtext="Paint: Sub-pixel" />
                <MetricCard label="Frame Rate" value={fps.toString()} unit="FPS" subtext="V-Sync: Locked" />
            </div>
            
            {/* Chart Area */}
            <div className={styles.chartContainer}>
                <div className={styles.chartLabel}>CPU_THREAD_UTILIZATION</div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#80DEEA" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#80DEEA" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <YAxis hide domain={[0, 100]} />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#80DEEA" 
                            strokeWidth={1}
                            fillOpacity={1} 
                            fill="url(#colorVal)" 
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </Section>
  );
};
