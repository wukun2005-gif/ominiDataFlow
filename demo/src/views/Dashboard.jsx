import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setMounted(true);
    // Generate mock data for the chart
    const data = Array.from({ length: 7 }, (_, i) => ({
      name: `周${['一', '二', '三', '四', '五', '六', '日'][i]}`,
      "活跃用户": Math.floor(Math.random() * 500) + 2000,
      "生成内容": Math.floor(Math.random() * 2000) + 5000
    }));
    setChartData(data);
  }, []);

  const stats = [
    { label: '累计标注数量', value: '45,231', trend: '+12.5%', isUp: true, icon: CheckCircle2, color: 'var(--success)' },
    { label: '已生成内容数', value: '12,840', trend: '+34.2%', isUp: true, icon: BarChart3, color: 'var(--accent)' },
    { label: '日活跃用户 (DAU)', value: '3,842', trend: '+5.1%', isUp: true, icon: Users, color: 'var(--warning)' },
    { label: '"AI假感"打回率', value: '14.2%', trend: '-25.8%', isUp: false, icon: TrendingUp, color: 'var(--danger)' },
  ];

  return (
    <div className="view-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">平台数据看板</h1>
          <p className="page-subtitle">性能指标与任务追踪</p>
        </div>
        <button className="btn-secondary" id="btn-export-report">导出报告</button>
      </div>

      <div className="stats-grid">
        <AnimatePresence>
          {mounted && stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel stat-card"
            >
              <div className="stat-icon-wrapper" style={{ color: stat.color, borderColor: 'var(--border)' }}>
                <stat.icon size={24} />
              </div>
              <h2 className="stat-value">{stat.value}</h2>
              <p className="stat-label" style={{ margin: '8px 0 0 0' }}>{stat.label}</p>
              <span className={`stat-trend ${stat.isUp ? 'up' : 'down'}`}>
                {stat.trend} {stat.isUp ? '↑' : '↓'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="glass-panel" style={{ padding: '24px', height: '400px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '16px', color: 'var(--text-primary)' }}>平台活动趋势 (近7日)</h3>
        <div style={{ flex: 1, width: '100%' }}>
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-glass)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="生成内容" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="活跃用户" stroke="var(--warning)" strokeWidth={3} dot={{ r: 4, fill: 'var(--bg-primary)', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
