import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { Layers, PenTool, LayoutDashboard, Play, FolderGit2, LayoutList, ShieldCheck } from 'lucide-react';
import Dashboard from './views/Dashboard';
import ContentGeneration from './views/ContentGeneration';
import DataAnnotation from './views/DataAnnotation';
import ProjectManagement from './views/ProjectManagement';
import TaskHall from './views/TaskHall';
import QualityCheck from './views/QualityCheck';
import FakeCursor from './components/FakeCursor';

function App() {
  const [currentView, setCurrentView] = useState('nav-pm');
  const [demoStep, setDemoStep] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRole, setActiveRole] = useState({ id: 'pm', name: '项目经理 (PM)', icon: <LayoutDashboard size={18}/> });

  const roleMap = {
    'pm': { id: 'pm', name: '项目经理 (PM)', icon: <FolderGit2 size={18}/> },
    'creator': { id: 'creator', name: '内容创作员', icon: <PenTool size={18}/> },
    'annotator': { id: 'annotator', name: '数据标注员', icon: <Layers size={18}/> },
    'qa': { id: 'qa', name: '质检专员 (QA)', icon: <ShieldCheck size={18}/> },
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentView('nav-gen');
    setDemoStep('');
  };

  const handleStepChange = useCallback((view, step, roleId) => {
    if (view && view !== 'done') setCurrentView(view);
    if (roleId && roleMap[roleId]) setActiveRole(roleMap[roleId]);
    
    if (view === 'done') {
      setIsPlaying(false);
      setDemoStep('');
      setActiveRole(roleMap['pm']);
    } else {
      setDemoStep(step);
    }
  }, []);

  return (
    <div className="app-container">
      <FakeCursor onStepChange={handleStepChange} isPlaying={isPlaying} />
      
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text text-gradient">OmniDataFlow</span>
        </div>

        <div className="role-switcher-card">
          <div className="role-avatar">
            {activeRole.icon}
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '2px' }}>当前登录角色</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent)' }}>{activeRole.name}</div>
          </div>
        </div>

        <nav className="nav-menu">
          <a 
            id="nav-pm"
            className={`nav-item ${currentView === 'nav-pm' ? 'active' : ''}`}
            onClick={() => setCurrentView('nav-pm')}
          >
            <FolderGit2 size={18} /> 项目管理 (PM)
          </a>
          <a 
            id="nav-hall"
            className={`nav-item ${currentView === 'nav-hall' ? 'active' : ''}`}
            onClick={() => setCurrentView('nav-hall')}
          >
            <LayoutList size={18} /> 任务大厅
          </a>
          <a 
            id="nav-anno"
            className={`nav-item ${currentView === 'nav-anno' ? 'active' : ''}`}
            onClick={() => setCurrentView('nav-anno')}
          >
            <Layers size={18} /> 数据标注
          </a>
          <a 
            id="nav-gen"
            className={`nav-item ${currentView === 'nav-gen' ? 'active' : ''}`}
            onClick={() => setCurrentView('nav-gen')}
          >
            <PenTool size={18} /> 内容创作
          </a>
          <a 
            id="nav-qa"
            className={`nav-item ${currentView === 'nav-qa' ? 'active' : ''}`}
            onClick={() => setCurrentView('nav-qa')}
          >
            <ShieldCheck size={18} /> 质检工作台
          </a>
          <a 
            id="nav-dash"
            className={`nav-item ${currentView === 'nav-dash' ? 'active' : ''}`}
            onClick={() => setCurrentView('nav-dash')}
          >
            <LayoutDashboard size={18} /> 数据看板
          </a>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(127, 90, 240, 0.1)', borderColor: 'rgba(127, 90, 240, 0.3)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--accent)' }}>自动演示</h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
              点击运行完整的产品工作流演示。
            </p>
            <button 
              className="btn-primary" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={startDemo}
              disabled={isPlaying}
            >
              <Play size={16} fill="currentColor" /> {isPlaying ? '演示运行中...' : '开始演示'}
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <AnimatePresence>
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fake-toast"
            >
              <span className="tag primary">系统提示</span> 正在以 <strong>{activeRole.name}</strong> 视角进行演示
            </motion.div>
          )}
        </AnimatePresence>

        {currentView === 'nav-pm' && <ProjectManagement demoStep={demoStep} activeRole={activeRole.id} />}
        {currentView === 'nav-hall' && <TaskHall demoStep={demoStep} activeRole={activeRole.id} />}
        {currentView === 'nav-dash' && <Dashboard demoStep={demoStep} activeRole={activeRole.id} />}
        {currentView === 'nav-gen' && <ContentGeneration demoStep={demoStep} activeRole={activeRole.id} />}
        {currentView === 'nav-anno' && <DataAnnotation demoStep={demoStep} activeRole={activeRole.id} />}
        {currentView === 'nav-qa' && <QualityCheck demoStep={demoStep} activeRole={activeRole.id} />}
      </main>
      <div style={{ position: 'fixed', bottom: '12px', right: '12px', fontSize: '10px', color: 'var(--text-secondary)', opacity: 0.3, pointerEvents: 'none', zIndex: 9999, fontFamily: 'monospace' }}>
        wukun2005@gmail.com
      </div>
    </div>
  );
}

export default App;
