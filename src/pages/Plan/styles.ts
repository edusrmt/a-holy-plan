import styled from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  min-height: 100vh;

  p {
    font-size: 2.5rem;
  }
`;

export const PlanResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 720px;

  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const HolyTitle = styled.h1`
  display: inline;
  font-family: 'Anton', sans-serif;
  font-size: 2rem;
  line-height: 1.225em;
  color: #000;
`;

export const DownloadButton = styled.button`
  width: 50%;
  height: 2rem;

  border: 2px solid #000;
  background-color: #dcc1ff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

export const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: max-content auto;

  width: 100%;
  font-size: 1.5rem;

  border: 2px solid #000;
`;

export const DayLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  background-color: #ec704b;
  border-bottom: 2px solid #000;
`;

export const DayReading = styled.span`
  padding: 1rem;
  background-color: #eee0ff;
  border-bottom: 2px solid #000;
`;

export const Credits = styled.div`
  a:link,
  a:visited {
    color: #000;
  }
`;
