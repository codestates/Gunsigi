import React from 'react';
import '../styles/SucessEmailSend.scss';

function SucessEmailSend() {
  return (
    <div className="SucessEmailSend_conatiner">
      <div className="SucessEmailSend">
        <div className="success">
          <div className="check">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip" />
                <span className="icon-line line-long" />
                <div className="icon-circle" />
                <div className="icon-fix" />
              </div>
            </div>
            <p>이메일이 성공적으로 발송되었습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SucessEmailSend;
