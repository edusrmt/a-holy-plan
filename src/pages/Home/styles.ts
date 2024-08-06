import styled from "styled-components";

export const OnboardingContainer = styled.div<{ $step: number }>`
  position: absolute;
  width: 100vw;
  min-height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(props) => (props.$step === 1 ? "center" : "stretch")};

  padding: 1rem 1rem 2rem;

  font-family: "Calistoga", serif;
  font-size: 1.5rem;
`;

export const OnboardingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex: 1;
`;

export const OnboardingButton = styled.button`
  width: 100%;
  height: 3rem;

  border: 2px solid #000;
  background-color: #dcc1ff;
  font-size: 1.5rem;
  font-weight: 700;

  margin-top: 1rem;
`;

// First Step

export const UpliftText = styled.div`
  display: flex;
  justify-content: space-between;
  vertical-align: text-top;
`;

export const HolyTitle = styled.h1`
  display: inline;
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  line-height: 1.225em;
`;

// Second Step

export const StepTitle = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

export const TestamentTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 0.75rem;
`;

export const SelectAll = styled.span`
  display: block;
  font-size: 1rem;
  opacity: 0.75;
  text-decoration: underline;
  margin-bottom: 0.5rem;
`;

export const BookName = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0.25rem 0;
`;

// Third Step

export const DurationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const DurationInput = styled.input`
  background-color: transparent;
  border: none;
  font-family: "Anton", sans-serif;
  font-size: 6rem;
  text-align: center;
  width: 60%;
  box-sizing: content-box;
  outline: none;

  appearance: textfield;
  -moz-appearance: textfield;

  &:focus {
    text-decoration: underline;
    text-decoration-thickness: 6px;
    text-underline-offset: 0.5rem;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const EditDurationButton = styled.button`
  background-color: transparent;
  font-size: 4rem;
  font-weight: bold;
  border: none;
`;

// Fourth Step

export const ConfirmationMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem 1rem;
`;

export const BookItem = styled.span`
  text-align: center;
  background-color: #ed9074;
  border-radius: 4px;
`;
