import styled from "styled-components";

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.div`
  color: #ffffff;
  font-size: 20px;
  margin-left: 10px;
`;

export const WordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const WordChip = styled.span`
  min-width: 60px;
  padding: 4px;
  text-align: center;
  background-color: #ffffff;
  display: inline-block;
  margin: 4px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #808080;
  &:hover {
    background-color: #dddddd;
  }
`;

export const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// モーダルウィンドウ
export const ModalWindow = styled.section`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 80%;
`;

// モーダルタイトル
export const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

// 閉じるボタン
export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

// モーダルコンテンツ
export const ModalContent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

// ボタンコンテナ
export const ButtonContainer = styled.div`
  justify-content: space-between;
  margin-top: 12px;
`;

// ボタン
export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &.closeButton {
    background-color: #ccc;
    color: #333;
  }

  &.nextButton {
    background-color: #007bff;
    color: #fff;
  }
`;

// セレクトボックス
export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #4b5563;
  border-radius: 4px;
`;

export const ErrContainer = styled.div`
  width: 100%;
  height: 24px;
  margin: 6px 0;
`;
