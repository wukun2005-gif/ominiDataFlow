import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, UserCheck, Plus, Clock } from 'lucide-react';

export default function ProjectManagement({ demoStep }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (demoStep === 'pm-create-proj') {
      setTimeout(() => setShowModal(true), 1000);
      setTimeout(() => { setShowModal(false); setTasks([{ id: 1, type: '内容创作', status: '待分配', title: '新品咖啡社媒投放图文', assignees: 0 }]) }, 3000);
    } else if (demoStep === 'pm-create-anno') {
      setTimeout(() => setShowModal(true), 500);
      setTimeout(() => { setShowModal(false); setTasks(prev => [...prev, { id: 2, type: '数据标注', status: '待分配', title: '咖啡拉花图像识别数据集', assignees: 0 }]) }, 2500);
    } else if (demoStep === 'pm-assign') {
      setTimeout(() => {
        setTasks(prev => prev.map(t => ({ ...t, status: '已分发 (任务大厅)', assignees: 2 })));
      }, 1500);
    }
  }, [demoStep]);

  return (
    <div className="view-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">项目管理工作台</h1>
          <p className="page-subtitle">项目创建与任务分发池</p>
        </div>
        <button className="btn-primary btn-icon" id="btn-create-proj"><FolderPlus size={18}/> 新建项目</button>
      </div>

      <div className="glass-panel panel" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <div className="panel-header">
          <h2 className="panel-title">当前项目任务列队</h2>
          <button className="btn-secondary btn-icon" id="btn-add-task" style={{ padding: '6px 12px', fontSize: '13px' }}><Plus size={14}/> 添加任务</button>
        </div>
        <div className="panel-body">
          {tasks.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              暂无追踪的任务，请点击东北角创建项目。
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AnimatePresence>
                {tasks.map(t => (
                  <motion.div 
                    key={t.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel"
                    style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                  >
                    <div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <span className={`tag ${t.type === '数据标注' ? 'warning' : 'success'}`}>{t.type}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '16px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {t.status}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><UserCheck size={12}/> 需要人数: {t.assignees || 10}</span>
                      </div>
                    </div>
                    <button className="btn-secondary" id={`btn-distribute-${t.id}`} disabled={t.status.includes('已分发')}>一键分发到大厅</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
          >
            <div className="glass-panel" style={{ width: '400px', padding: '24px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)' }}>系统处理中...</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>正在生成任务配置并提交到数据库流转。</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
