import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, XCircle, AlertTriangle } from 'lucide-react';

export default function QualityCheck({ demoStep }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (demoStep === 'qa-load') {
      setItems([
        { 
          id: 1, 
          type: '内容生成', 
          typeLabel: 'Social Post', 
          preview: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80', 
          contentText: '【精选特写】柔和的光效下，咖啡的醇香似乎能穿透屏幕。品牌包装盒已完美融合，极简而不失张力。#质感摄影 #咖啡品牌',
          score: 98, 
          status: '待审核' 
        }
      ]);
    } else if (demoStep === 'qa-approve') {
      setTimeout(() => {
        setItems(prev => prev.map(i => ({ ...i, status: '已通过' })));
      }, 1500);
    }
  }, [demoStep]);

  return (
    <div className="view-container animate-fade-in">
      <div className="page-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">质检工作台</h1>
          <p className="page-subtitle">审核生成内容与标注结果的质量</p>
        </div>
        <div className="tag warning" style={{ marginTop: '8px' }}><AlertTriangle size={14} style={{marginRight: '4px'}}/> 发现 1 个需要复核的高优先级队列</div>
      </div>

      <div className="glass-panel panel" style={{ minHeight: '500px' }}>
        <div className="panel-header">
          <h2 className="panel-title">待审队列 (1)</h2>
          <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>批量通过</button>
        </div>
        
        <div className="panel-body">
          {items.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>队列表表现为空。等待内容流转。</div>
          ) : (
            <div style={{ display: 'flex', gap: '24px' }}>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel"
                    style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                  >
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)' }}>
                      <span className="tag success">{item.type}</span>
                      <span style={{ color: item.status === '待审核' ? 'var(--warning)' : 'var(--success)', fontWeight: 600, fontSize: '14px' }}>{item.status}</span>
                    </div>
                    <div style={{ padding: '24px', display: 'flex', gap: '24px' }}>
                      <img src={item.preview} style={{ width: '50%', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border)' }} alt="Preview" />
                      
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '12px' }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>推文内容 (Social Copy)</p>
                            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: 'var(--text-primary)' }}>{item.contentText}</p>
                          </div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>AI 真实感预打分 / 品牌一致性</p>
                          <h3 style={{ margin: 0, color: 'var(--accent)', fontSize: '28px' }}>{item.score} <span style={{fontSize:'16px', color:'var(--text-secondary)'}}>/ 100</span></h3>
                        </div>
                        
                        <div style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '8px', fontSize: '13px', border: '1px solid var(--border)' }}>
                          <p style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)', fontWeight: 600 }}>机器预检维度:</p>
                          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--success)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <li>光影自然度符合要求</li>
                            <li>纹理细节清晰</li>
                            <li>无变形/假肢特征</li>
                            <li>内容合规性校验通过</li>
                          </ul>
                        </div>

                        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                          <button className="btn-primary btn-icon" id="btn-qa-pass" style={{ flex: 1, background: 'var(--success)', borderColor: 'var(--success)' }} disabled={item.status === '已通过'}>
                            <CheckSquare size={16}/> 审核通过
                          </button>
                          <button className="btn-secondary btn-icon" style={{ flex: 1, color: 'var(--danger)', borderColor: 'var(--danger)' }} disabled={item.status === '已通过'}>
                            <XCircle size={16}/> 打回大厅
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
