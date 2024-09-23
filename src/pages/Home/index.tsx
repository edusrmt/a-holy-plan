import { ChangeEvent, useContext, useState } from 'react';
import {
  BookName,
  HolyTitle,
  OnboardingButton,
  OnboardingContainer,
  OnboardingContent,
  TestamentTitle,
  StepTitle,
  UpliftText,
  DurationInput,
  EditDurationButton,
  DurationContainer,
  SelectAll,
  BooksGrid,
  ConfirmationMessage,
  BookItem,
  TestamentContainer,
} from './styles';

import { BibleInfo } from '../../api/bibleInfo';
import { SelectableItem } from './components/SelectableItem';
import { useNavigate } from 'react-router-dom';
import { BiblePlanContext } from '../../contexts/BiblePlanContext';
import { getChaptersCount } from '../../utils/getChaptersCount';

export function Home() {
  const { setPlanParams } = useContext(BiblePlanContext);
  const navigate = useNavigate();

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | null>(1);
  const [maxDuration, setMaxDuration] = useState(0);

  const nextStep = () => {
    if (onboardingStep == 2) {
      const sortedBooks: string[] = [];

      BibleInfo.books.forEach((book) => {
        if (selectedBooks.includes(book.abbrev)) {
          sortedBooks.push(book.abbrev);
        }
      });

      setSelectedBooks(sortedBooks);
      setMaxDuration(getChaptersCount(sortedBooks));
    }

    setOnboardingStep(onboardingStep + 1);
  };

  const toggleBook = (abbrev: string) => {
    if (selectedBooks.includes(abbrev)) {
      setSelectedBooks(selectedBooks.filter((book) => book !== abbrev));
      return;
    }

    setSelectedBooks([...selectedBooks, abbrev]);
  };

  const toggleTestament = (testament: string) => {
    const booksToAdd: string[] = [];

    BibleInfo.books
      .filter((book) => book.testament == testament)
      .forEach((book) => {
        if (!selectedBooks.includes(book.abbrev)) {
          booksToAdd.push(book.abbrev);
        }
      });

    setSelectedBooks([...selectedBooks, ...booksToAdd]);
  };

  const changeDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue === '') {
      setDuration(null);
      return;
    }

    if (!/^\d+$/.test(newValue)) {
      return;
    }
    setDuration(parseInt(newValue));
  };

  const blurDuration = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setDuration(1);
    }

    if (Number(event.target.value) > maxDuration) {
      setDuration(maxDuration);
    }
  };

  const addToDuration = (value: number) => {
    const newDuration = (duration ?? 0) + value;

    if (newDuration <= 0 || newDuration > maxDuration) {
      return;
    }

    setDuration(newDuration);
  };

  const confirmPlan = () => {
    setPlanParams(duration ?? 1, selectedBooks);
    navigate('/plan');
  };

  return (
    <OnboardingContainer $step={onboardingStep}>
      {onboardingStep == 1 && (
        <>
          <OnboardingContent>
            <p>PROCURANDO UM BOM</p>
            <em>PLANO DE LEITURA BÍBLICA?</em>
            <UpliftText>
              <span>TEMOS</span>
              <HolyTitle>A Holy Plan!</HolyTitle>
            </UpliftText>
          </OnboardingContent>

          <OnboardingButton onClick={nextStep}>Começar</OnboardingButton>
        </>
      )}

      {onboardingStep == 2 && (
        <>
          <StepTitle>O que você vai ler?</StepTitle>
          <OnboardingContent>
            {['old', 'new'].map((testament) => {
              return (
                <TestamentContainer key={testament}>
                  <TestamentTitle>
                    {testament === 'old' ? 'Antigo' : 'Novo'} Testamento
                  </TestamentTitle>
                  <SelectAll onClick={() => toggleTestament(testament)}>
                    Selecionar todos
                  </SelectAll>

                  {BibleInfo.books
                    .filter((book) => book.testament === testament)
                    .map((book) => (
                      <SelectableItem
                        toggleFunction={() => toggleBook(book.abbrev)}
                        isSelected={selectedBooks.includes(book.abbrev)}
                        key={book.abbrev}
                      >
                        <BookName>{book.name}</BookName>
                      </SelectableItem>
                    ))}
                </TestamentContainer>
              );
            })}
          </OnboardingContent>

          <OnboardingButton
            onClick={nextStep}
            disabled={selectedBooks.length == 0}
          >
            Avançar
          </OnboardingButton>
        </>
      )}

      {onboardingStep === 3 && (
        <>
          <StepTitle>Em quantos dias?</StepTitle>
          <OnboardingContent>
            <DurationContainer>
              <EditDurationButton onClick={() => addToDuration(-1)}>
                -
              </EditDurationButton>
              <DurationInput
                type="number"
                min="1"
                max={maxDuration}
                onChange={changeDuration}
                onBlur={blurDuration}
                value={duration ?? ''}
              />
              <EditDurationButton onClick={() => addToDuration(1)}>
                +
              </EditDurationButton>
            </DurationContainer>
          </OnboardingContent>
          <OnboardingButton onClick={nextStep}>Avançar</OnboardingButton>
        </>
      )}

      {onboardingStep === 4 && (
        <>
          <StepTitle>Tudo certo?</StepTitle>
          <OnboardingContent>
            <ConfirmationMessage>
              Ler {selectedBooks.length} livro{selectedBooks.length > 1 && 's'}{' '}
              em {duration} dias!
            </ConfirmationMessage>

            <BooksGrid>
              {selectedBooks.map((book) => (
                <BookItem key={book}>{book}</BookItem>
              ))}
            </BooksGrid>
          </OnboardingContent>
          <OnboardingButton onClick={confirmPlan}>Confirmar</OnboardingButton>
        </>
      )}
    </OnboardingContainer>
  );
}
