import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, MessageSquare, ShieldAlert, Check, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ContentGeneration({ demoStep }) {
  const [prompt, setPrompt] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [logs, setLogs] = useState([]);
  const [generatedMedia, setGeneratedMedia] = useState(null);
  const [generatedText, setGeneratedText] = useState("");
  const [hasPii, setHasPii] = useState(false);
  
  // New state for Negative RLHF & HITL
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [manualEdit, setManualEdit] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showMultiCrop, setShowMultiCrop] = useState(false);
  const [highlight, setHighlight] = useState(null);
  
  const panelBodyRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (panelBodyRef.current) {
      panelBodyRef.current.scrollTop = panelBodyRef.current.scrollHeight;
    }
  }, [logs, prompt, manualEdit, generatedMedia, showMultiCrop, isRegenerating]);

  // Auto-demo simulation logic
  useEffect(() => {
    if (demoStep === 'gen-input') {
      typeString("为最新款的混合咖啡豆生成一篇小红书推文。联系人：john.doe@13800138000.com", setPrompt);
    } else if (demoStep === 'gen-pii') {
      setHasPii(true);
      setTimeout(() => {
        setPrompt("为最新款的混合咖啡豆生成一篇小红书推文。联系人：john.doe@138****8000.com");
        setHasPii(false);
      }, 2000);
    } else if (demoStep === 'gen-finetune') {
      setIsOptimizing(true);
      setTimeout(() => {
        setIsOptimizing(false);
        setOptimizedPrompt("生成一张极具氛围感的静物摄影：在一个复古木质桌面上，放着一杯冒着热气的特调拿铁咖啡。清晨温暖的阳光透过窗户洒落，咖啡表面的油脂清晰可见。照片采用高端杂志风格，8K分辨率，自然光影，避免过于完美的对称构图。");
      }, 3000);
    } else if (demoStep === 'gen-agents') {
      const messages = [
        "[调度智能体] 收到任务，正在制定生成策略...",
        "[收集智能体] 正在从版权库拉取参考素材...",
        "[生成智能体] 基于融合风格生成图片中...",
        "[审核智能体] 正在评估真实感：65/100 (发现轻微瑕疵)",
        "[调度智能体] 内容生成完毕，等待人工审核。"
      ];
      messages.forEach((msg, i) => {
        setTimeout(() => setLogs(prev => [...prev, msg]), i * 1200);
      });
      setTimeout(() => {
        // High quality morning coffee
        setGeneratedMedia("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"); 
        typeString("【新品上市】早晨的第一缕阳光，配上一杯手冲咖啡。沉浸在醇厚豆香中开启元气满满的一天。☀️☕️ #咖啡生活 #职场日常 #精品手持", setGeneratedText);
      }, 6500);
    } else if (demoStep === 'gen-reject') {
      setLogs(prev => [...prev, "[人工反馈] 标记为'虚假/不合格'。请求重试..."]);
      setIsRegenerating(true);
      setTimeout(() => {
        setGeneratedMedia(null);
        setGeneratedText("");
        const retryMessages = [
          "[调度智能体] 启动 RLHF 修正策略...",
          "[生成智能体] 调整参数 (降噪/去AI特征)...",
          "[审核智能体] 重新评估真实感：92/100 (检测通过)",
        ];
        retryMessages.forEach((msg, i) => {
          setTimeout(() => setLogs(prev => [...prev, msg]), i * 1200);
        });
        setTimeout(() => {
          // Much better quality latte
          setGeneratedMedia("https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"); 
          typeString("【氛围感拿铁】温暖日落，醇厚奶泡。这就是生活本该有的样子。☕️✨ #OmniFlowAI #品质生活", setGeneratedText);
          setIsRegenerating(false);
        }, 4000);
      }, 1000);
    } else if (demoStep === 'gen-edit') {
      setIsEditing(true);
      typeString("已确认图片质量。需要修改排版：将Logo变小，光影对比度减弱。并且最好加上我们品牌的包装盒。", setManualEdit);
    } else if (demoStep === 'gen-ai-edit-opt') {
      setHighlight("强化版 HITL：AI 提取复杂意图");
      setLogs(prev => [...prev, "[一键优化意见] 提取意图：1. 缩小Logo 2. 降低对比度的柔和光影 3. 待融合品牌包装盒。"]);
      setIsRegenerating(true);
      setTimeout(() => {
        setLogs(prev => [...prev, "[生成智能体] 正在基于新指令渲染画面..."]);
        setTimeout(() => {
          // Soft lighting, premium look
          setGeneratedMedia("https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"); 
          typeString("【精选特写】柔和的光效下，咖啡的醇香似乎能穿透屏幕。品牌包装盒已完美融合，极简而不失张力。#质感摄影 #咖啡品牌", setGeneratedText);
          setIsRegenerating(false);
          setTimeout(() => setHighlight(null), 2000);
        }, 2500);
      }, 1500);
    }
  }, [demoStep]);

  const typeString = (str, setter) => {
    let i = 0;
    setter("");
    const interval = setInterval(() => {
      setter(prev => prev + str.charAt(i));
      i++;
      if (i >= str.length) clearInterval(interval);
    }, 60);
  };

  return (
    <div className="view-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">内容创作工作台</h1>
          <p className="page-subtitle">多智能体工作流</p>
        </div>
      </div>

      <div className="workflow-section">
        {/* Left Panel: Input & Settings */}
        <div className="glass-panel panel">
          <div className="panel-header">
            <h2 className="panel-title"><MessageSquare size={18} /> 提示词输入</h2>
          </div>
          <div className="panel-body">
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>描述你要生成的内容</label>
              <textarea 
                className="input-field" 
                rows={5} 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                style={{ resize: 'none', borderColor: hasPii ? 'var(--danger)' : 'var(--border)' }}
              />
              <AnimatePresence>
                {hasPii && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', top: '-10px', right: '10px' }}
                  >
                    <span className="tag danger"><ShieldAlert size={14} style={{marginRight: '4px'}}/> 发现敏感信息(PII)！自动打码中...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              className="btn-primary btn-icon" 
              id="btn-auto-finetune"
              disabled={isOptimizing}
              style={{ alignSelf: 'flex-start' }}
            >
              {isOptimizing ? <RefreshCw className="spin" size={18} /> : <Sparkles size={18} />}
              一键优化提示词
            </button>

            <AnimatePresence>
              {optimizedPrompt && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className="diff-view"
                >
                  <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                    <strong>AI 优化结果</strong>
                    <span className="text-secondary" style={{fontSize: '11px'}}>风格: 真实摄影</span>
                  </div>
                  <div className="diff-line removed">- {prompt}</div>
                  <div className="diff-line added">+ {optimizedPrompt}</div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              className="btn-primary" 
              style={{ marginTop: 'auto', background: 'var(--success)' }}
              id="btn-generate-post"
            >
              生成内容 (多智能体)
            </button>
          </div>
        </div>

        {/* Right Panel: Output & RLHF */}
        <div className="glass-panel panel">
          <div className="panel-header">
            <h2 className="panel-title"><ImageIcon size={18} /> 输出与审核</h2>
            <div className="tag success">人工审核 (HITL)</div>
          </div>
          <div className="panel-body" ref={panelBodyRef} style={{ scrollBehavior: 'smooth', position: 'relative' }}>
            
            <AnimatePresence>
              {highlight && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: -20, x: '-50%' }}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    zIndex: 100,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                  }}
                >
                  <div className="tag primary" style={{ padding: '8px 20px', fontSize: '14px', borderRadius: '30px', background: 'var(--bg-glass)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', border: '1px solid var(--accent)' }}>
                    ✨ {highlight}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {logs.length > 0 && (
              <div className="agent-logs">
                {logs.map((log, i) => (
                  <div key={i} className="agent-log-line">{log}</div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {generatedMedia && !isRegenerating && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="media-card"
                  style={{ marginTop: '16px' }}
                >
                  <img src={generatedMedia} alt="Generated Post" />
                  <div className="media-overlay">
                    <button className="btn-secondary" style={{background: 'rgba(0,0,0,0.8)'}} id="btn-edit-layer">在画布中编辑</button>
                  </div>
                  <div style={{ padding: '24px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
                    <div style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
                      <span className="tag primary" style={{ fontSize: '10px' }}>AI 文案</span>
                      <span className="tag warning" style={{ fontSize: '10px' }}>已合规</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 500, letterSpacing: '0.02em' }}>
                      {generatedText}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '16px' }}
                >
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>人工修改意见 (Human-in-the-Loop)</label>
                  <div style={{ position: 'relative' }}>
                    <textarea 
                      className="input-field" 
                      rows={2} 
                      value={manualEdit}
                      readOnly
                      style={{ resize: 'none', background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
                    />
                    <button 
                      className="btn-primary" 
                      id="btn-ai-optimize-edit"
                      style={{ position: 'absolute', right: '8px', bottom: '8px', padding: '4px 8px', fontSize: '11px', background: 'var(--accent)' }}
                    >
                      <Sparkles size={12} style={{marginRight: '4px'}}/> AI 结构化意图
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>



            {generatedMedia && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>RLHF 反馈</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary btn-icon" id="btn-thumb-up" disabled={isRegenerating}><ThumbsUp size={16} /> 满意</button>
                    <button className="btn-secondary btn-icon" id="btn-thumb-down" disabled={isRegenerating}><ThumbsDown size={16} /> 虚假/不合格</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isEditing && <button className="btn-secondary btn-icon" id="btn-human-edit">人工输入</button>}
                  <button className="btn-primary btn-icon" id="btn-submit-post" disabled={isRegenerating}><Check size={18} /> 通过并提交</button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
