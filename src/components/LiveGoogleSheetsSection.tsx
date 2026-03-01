import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LiveGoogleSheetsSection: React.FC = () => {
  useEffect(() => {
    // 스크립트를 동적으로 추가
    const script = document.createElement('script');
    script.innerHTML = `
      // 사용자님의 실제 구글 시트 데이터 주소입니다.
      const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOJs6RZA8wrfrX9f4vInsZgKW7v8fchOvgcGLF4NP2S-colHrOFKhkicpKg_UI7Tsxk8fAVteVGkbG/pub?gid=449167275&single=true&output=csv";
      
      async function updateDisplay() {
        try {
          const response = await fetch(csvUrl);
          const data = await response.text();
          const rows = data.split('\\n').slice(1); // 첫 번째 줄(제목) 제외
          const container = document.getElementById('live-meeting-box');
          if (!container) return;
          
          container.innerHTML = ''; // 로딩 문구 삭제
          
          rows.forEach(row => {
            const columns = row.split(',');
            // 보통 '일정' 텍스트는 B열(columns[1])에 있습니다.
            const scheduleText = columns[1] ? columns[1].replace(/"/g, '') : columns[0].replace(/"/g, '');
            
            if (scheduleText.trim() && !scheduleText.includes("타임스탬프")) {
              const card = document.createElement('div');
              // 현재 사이트 디자인과 어울리는 깔끔한 스타일
              card.style = "background:#fff; border-radius:15px; padding:25px; box-shadow:0 8px 20px rgba(0,0,0,0.06); width:300px; border-top:5px solid #ff4757; font-weight:bold; color:#333; line-height:1.5;";
              card.innerHTML = '<span style="color:#ff4757; font-size:12px; display:block; margin-bottom:5px;">[실시간 연동]</span>' + scheduleText;
              container.appendChild(card);
            }
          });
        } catch (e) {
          const loadingText = document.getElementById('loading-text');
          if (loadingText) {
            loadingText.innerText = "일정을 불러올 수 없습니다.";
          }
        }
      }
      
      // 페이지 로드 후 실행
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateDisplay);
      } else {
        updateDisplay();
      }
    `;
    
    document.head.appendChild(script);
    
    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">실시간 일정 업데이트</h3>
        <p className="text-muted-foreground">구글 시트에서 직접 연동되는 최신 일정입니다</p>
      </div>
      
      {/* 사용자 제공 HTML 구조 */}
      <div 
        id="live-meeting-box" 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <p id="loading-text">데이터를 불러오는 중입니다...</p>
      </div>
    </motion.div>
  );
};

export default LiveGoogleSheetsSection;