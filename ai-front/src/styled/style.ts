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
