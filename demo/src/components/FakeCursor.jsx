import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// This simulates the user's workflow automatically traversing the PRD features
export default function FakeCursor({ onStepChange, isPlaying }) {
  const [position, setPosition] = useState({ x: -50, y: -50 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    let timeoutIds = [];
    let isCancelled = false;

    const moveAndClick = (elementId, delay, callback) => {
      const id = setTimeout(() => {
        if (isCancelled) return;
        const el = document.getElementById(elementId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Move to center of element
          setPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          
          // Simulate click
          const clickId = setTimeout(() => {
            if (isCancelled) return;
            setIsClicking(true);
            const resetId = setTimeout(() => {
              if (isCancelled) return;
              setIsClicking(false);
              if (callback) callback();
            }, 300);
            timeoutIds.push(resetId);
          }, 800); // Wait for movement to finish
          timeoutIds.push(clickId);
        }
      }, delay);
      timeoutIds.push(id);
    };

    const wait = (ms) => new Promise(resolve => {
      const id = setTimeout(resolve, ms);
      timeoutIds.push(id);
    });

    const runSequence = async () => {
      if (isCancelled) return;
      
      // --- STAGE 1: Project Management ---
      onStepChange('nav-pm', '', 'pm');
      await wait(1500);
      if (isCancelled) return;
      
      moveAndClick('btn-create-proj', 0, () => {
        if (!isCancelled) onStepChange('nav-pm', 'pm-create-proj');
      });
      await wait(4500);
      if (isCancelled) return;

      moveAndClick('btn-add-task', 0, () => {
        if (!isCancelled) onStepChange('nav-pm', 'pm-create-anno');
      });
      await wait(3500);
      if (isCancelled) return;

      moveAndClick('btn-distribute-1', 0, () => {
        if (!isCancelled) onStepChange('nav-pm', 'pm-assign');
      });
      await wait(3000);
      if (isCancelled) return;


      // --- STAGE 2: Content Generation Worker Claims Task ---
      onStepChange('nav-hall', '', 'creator');
      await wait(500);
      moveAndClick('nav-hall', 0, () => {
        if (!isCancelled) onStepChange('nav-hall', '', 'creator');
      });
      await wait(2000);
      if (isCancelled) return;

      moveAndClick('btn-claim-101', 0, () => {
        if (!isCancelled) onStepChange('nav-hall', 'hall-claim-gen');
      });
      await wait(2000);
      if (isCancelled) return;


      // --- STAGE 3: Content Generation ---
      moveAndClick('nav-gen', 0, () => {
        if (!isCancelled) onStepChange('nav-gen', '', 'creator');
      });
      await wait(1500);
      if (isCancelled) return;
      
      onStepChange('nav-gen', 'gen-input', 'creator'); 
      await wait(5500);
      if (isCancelled) return;

      onStepChange('nav-gen', 'gen-pii');
      await wait(4000);
      if (isCancelled) return;

      // Click Auto-Finetune
      moveAndClick('btn-auto-finetune', 0, () => {
        if (!isCancelled) onStepChange('nav-gen', 'gen-finetune');
      });
      await wait(4500);
      if (isCancelled) return;

      moveAndClick('btn-generate-post', 0, () => {
        if (!isCancelled) onStepChange('nav-gen', 'gen-agents');
      });
      await wait(8000);
      if (isCancelled) return;

      // Provide Negative RLHF Feedback
      moveAndClick('btn-thumb-down', 0, () => {
        if (!isCancelled) onStepChange('nav-gen', 'gen-reject');
      });
      await wait(7500); 
      if (isCancelled) return;
      
      // Perform Manual Human Edit
      moveAndClick('btn-human-edit', 0, () => {
        if (!isCancelled) onStepChange('nav-gen', 'gen-edit', 'creator');
      });
      await wait(4000); 
      if (isCancelled) return;

      // AI Optimization of Edit
      moveAndClick('btn-ai-optimize-edit', 0, () => {
        if (!isCancelled) onStepChange('nav-gen', 'gen-ai-edit-opt', 'creator');
      });
      await wait(7000);
      if (isCancelled) return;

      // [Removed Brand IP Fusion as per user request]

      // Submit
      await wait(3000); 
      moveAndClick('btn-submit-post', 0, null);
      await wait(3000); 
      if (isCancelled) return;


      // --- STAGE 4: Quality Assurance (Moved before Annotation) ---
      onStepChange('nav-qa', '', 'qa');
      await wait(500);
      moveAndClick('nav-qa', 0, () => {
        if (!isCancelled) onStepChange('nav-qa', 'qa-load', 'qa');
      });
      await wait(3000);
      if (isCancelled) return;

      moveAndClick('btn-qa-pass', 0, () => {
        if (!isCancelled) onStepChange('nav-qa', 'qa-approve', 'qa');
      });
      await wait(3000);
      if (isCancelled) return;


      // --- STAGE 5: Annotation Worker Claims Task ---
      onStepChange('nav-hall', '', 'annotator');
      await wait(500);
      moveAndClick('nav-hall', 0, () => {
        if (!isCancelled) onStepChange('nav-hall', '', 'annotator');
      });
      await wait(2000);
      if (isCancelled) return;

      moveAndClick('btn-claim-102', 0, () => {
        if (!isCancelled) onStepChange('nav-hall', 'hall-claim-anno');
      });
      await wait(2000);
      if (isCancelled) return;


      // --- STAGE 6: Annotation ---
      moveAndClick('nav-anno', 0, () => {
        if (!isCancelled) onStepChange('nav-anno', '', 'annotator');
      });
      await wait(2000);
      if (isCancelled) return;

      moveAndClick('tool-bbox', 0, () => {
        if (!isCancelled) onStepChange('nav-anno', 'anno-bbox');
      });
      await wait(6000);
      if (isCancelled) return;

      moveAndClick('btn-submit-anno', 0, null);
      await wait(2500);
      if (isCancelled) return;


      // --- STAGE 7: PM Views Dashboard ---
      onStepChange('nav-dash', '', 'pm');
      await wait(500);
      moveAndClick('nav-dash', 0, () => {
        if (!isCancelled) onStepChange('nav-dash', '', 'pm');
      });
      await wait(4000);
      if (isCancelled) return;

      // Loop!
      if (!isCancelled) onStepChange('done', '');
    };

    runSequence();

    return () => {
      isCancelled = true;
      timeoutIds.forEach(clearTimeout);
    };
  }, [isPlaying, onStepChange]);

  if (!isPlaying) return null;

  return (
    <motion.div
      className="fake-cursor"
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isClicking ? 0.8 : 1
      }}
      transition={{ 
        duration: 0.6, 
        ease: "anticipate" 
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2L20 10.6667L12 13L10 21L4 2Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  );
}
