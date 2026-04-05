import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Maximize, FileAudio, Video } from 'lucide-react';

export default function DataAnnotation({ demoStep }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    if (demoStep === 'anno-bbox') {
      setTimeout(() => setBoxes([{ x: 20, y: 30, w: 40, h: 45, label: '人物' }]), 1500);
      setTimeout(() => setBoxes(prev => [...prev, { x: 65, y: 55, w: 25, h: 20, label: '咖啡杯' }]), 3500);
    }
  }, [demoStep]);

  return (
    <div className="view-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">多媒体数据标注</h1>
          <p className="page-subtitle">多模态标注工作台</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary btn-icon active" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}><MousePointer2 size={16}/> 图片</button>
          <button className="btn-secondary btn-icon"><Video size={16}/> 视频</button>
          <button className="btn-secondary btn-icon"><FileAudio size={16}/> 语音</button>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
        {/* Tools Sidebar */}
        <div style={{ width: '60px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: '16px' }}>
          <div className="stat-icon-wrapper" style={{ cursor: 'pointer', background: 'var(--accent)' }} id="tool-bbox">
            <Maximize size={20} color="white" />
          </div>
          <div className="stat-icon-wrapper" style={{ cursor: 'pointer' }}>
            <MousePointer2 size={20} />
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, backgroundColor: '#111', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '80%', height: '80%', background: 'url(https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=800&q=80) center/cover', borderRadius: '8px', overflow: 'hidden' }}>
            
            {/* Draw Bounding Boxes */}
            {boxes.map((box, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: 'absolute',
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.w}%`,
                  height: `${box.h}%`,
                  border: '2px solid var(--success)',
                  backgroundColor: 'rgba(44, 182, 125, 0.2)',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ background: 'var(--success)', color: 'white', fontSize: '12px', padding: '2px 6px', fontWeight: 'bold' }}>
                  {box.label}
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Properties Panel */}
        <div style={{ width: '280px', borderLeft: '1px solid var(--border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>属性</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {boxes.map((box, i) => (
              <div key={i} style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>{box.label}</span>
                  <span className="tag success">有效</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  X: {box.x}% Y: {box.y}% W: {box.w}% H: {box.h}%
                </div>
              </div>
            ))}
            {boxes.length === 0 && <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>未选中任何目标</p>}
          </div>

          <button className="btn-primary" style={{ marginTop: 'auto' }} id="btn-submit-anno" disabled={boxes.length === 0}>
            提交任务 (2)
          </button>
        </div>
      </div>
    </div>
  );
}
