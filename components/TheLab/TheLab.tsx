import React, { useEffect, useState, useRef } from 'react';
import { Section } from '../Section/Section';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import styles from './TheLab.module.css';

// Generate fake smooth data for graph (Simulated as requested)
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
  const [heapSize, setHeapSize] = useState(0);
  const [renderTime, setRenderTime] = useState(0);
  const [fps, setFps] = useState(60);
  const [chartData, setChartData] = useState(generateData(50));
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>(0);

  // RAF Loop for counting frames
  useEffect(() => {
    const loop = () => {
      frameCount.current++;
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // Interval for updating UI with live data (every 500ms to be readable)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = now - lastTime.current;
      
      // Calculate FPS
      // If elapsed < 1000, we extrapolate? No, just measure frames in this interval.
      // fps = frames / (elapsed / 1000)
      if (elapsed > 0) {
        const currentFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(Math.min(144, currentFps)); // Cap purely for sanity if browser throttles
        
        // Frame Time (ms) = 1000 / fps or just elapsed / frames
        if (frameCount.current > 0) {
           setRenderTime(elapsed / frameCount.current);
        }
      }
      
      // Reset counters
      frameCount.current = 0;
      lastTime.current = now;

      // Heap Size (Genuine)
      // @ts-ignore
      if (window.performance && window.performance.memory) {
         // @ts-ignore
         setHeapSize(window.performance.memory.usedJSHeapSize / 1048576);
      } else {
         // Fallback if API not available (e.g. Firefox)
         setHeapSize(prev => prev + (Math.random() - 0.5)); 
      }

      // Graph Update (Fake)
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = prev[prev.length - 1].value;
        const nextVal = Math.max(10, Math.min(90, lastVal + (Math.random() - 0.5) * 30));
        newData.push({ value: nextVal });
        return newData;
      });

    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="lab" className={styles.section}>
      <div className={styles.grid}>
        {/* Left Info */}
        <div className={styles.leftInfo}>
             <h2 className={styles.heading}>
                Lab
            </h2>
            <p className={styles.description}>
                Optimization is not a step; it is the entire process. 
                This section monitors the current runtime environment in real-time. 
                We pursue the asymptotic limit of zero latency.
            </p>
            {/* Removed Status: Optimized */}
        </div>

        {/* Right Metrics */}
        <div className={styles.rightMetrics}>
            <div className={styles.metricsGrid}>
                <MetricCard 
                    label="JS Heap Size" 
                    value={heapSize.toFixed(1)} 
                    unit="MB" 
                    subtext="Live Memory Usage" 
                />
                <MetricCard 
                    label="Frame Time" 
                    value={renderTime.toFixed(2)} 
                    unit="ms" 
                    subtext="Avg Render Delta" 
                />
                <MetricCard 
                    label="Frame Rate" 
                    value={fps.toString()} 
                    unit="FPS" 
                    subtext="Real-time V-Sync" 
                />
            </div>
            
            {/* Chart Area */}
            <div className={styles.chartContainer}>
                <div className={styles.chartLabel}>CPU_THREAD_UTILIZATION</div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <YAxis hide domain={[0, 100]} />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--accent)" 
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
