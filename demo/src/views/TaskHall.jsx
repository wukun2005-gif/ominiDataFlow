import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PlayCircle } from 'lucide-react';

export default function TaskHall({ demoStep }) {
  const [tasks, setTasks] = useState([
    { id: 101, type: '内容创作', title: '新品咖啡社媒投放图文', reward: '¥15/件', claimed: false },
    { id: 102, type: '数据标注', title: '咖啡拉花图像识别数据集', reward: '¥0.5/框', claimed: false }
  ]);

  useEffect(() => {
    if (demoStep === 'hall-claim-gen') {
      setTimeout(() => {
        setTasks(prev => prev.map(t => t.id === 101 ? { ...t, claimed: true } : t));
      }, 1000);
    } else if (demoStep === 'hall-claim-anno') {
      setTimeout(() => {
        setTasks(prev => prev.map(t => t.id === 102 ? { ...t, claimed: true } : t));
      }, 1000);
    }
  }, [demoStep]);

  return (
    <div className="view-container animate-fade-in">
      <div className="page-header" style={{ alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">任务大厅</h1>
          <p className="page-subtitle">标注员 & 内容创作人员接单广场</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}/>
          <input type="text" className="input-field" placeholder="搜索可用任务..." style={{ paddingLeft: '36px', width: '250px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }} />
        </div>
      </div>

      <div className="stats-grid">
        <AnimatePresence>
          {tasks.map(t => !t.claimed && (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={`tag ${t.type === '数据标注' ? 'warning' : 'success'}`}>{t.type}</span>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '18px' }}>{t.reward}</span>
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: 'var(--text-primary)' }}>{t.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '13px' }}>剩余配额: 852 件</p>
              </div>
              <button className="btn-primary btn-icon" id={`btn-claim-${t.id}`} style={{ marginTop: 'auto', width: '100%' }}>
                <PlayCircle size={16}/> 领取并开始工作
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {tasks.every(t => t.claimed) && (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>没有更多推荐任务了，去喝杯茶吧。</p>
          </div>
        )}
      </div>
    </div>
  );
}
