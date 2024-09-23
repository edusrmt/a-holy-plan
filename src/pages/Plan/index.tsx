import {
  useContext,
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from 'react';
import { BiblePlanContext } from '../../contexts/BiblePlanContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DayLabel,
  HolyTitle,
  LoadingContainer,
  PlanResultContainer,
  PlanGrid,
  DayReading,
  Credits,
  DownloadButton,
} from './styles';
import generatePlan from '../../utils/generatePlan';
import { toJpeg } from 'html-to-image';

export const Plan = () => {
  const navigate = useNavigate();
  const planRef = useRef<HTMLDivElement>(null);
  const { days, books } = useContext(BiblePlanContext);
  const [dots, setDots] = useState(1);
  const [plan, setPlan] = useState<string[]>([]);

  useEffect(() => {
    setPlan(generatePlan(days, books));
  }, [days, books]);

  useEffect(() => {
    if (books.length == 0) {
      navigate('/');
    }
  }, [navigate, books]);

  useEffect(() => {
    const incrementDots = () => {
      setDots(1 + (dots % 3));
    };

    const dotsIntervalID = setInterval(incrementDots, 1000);

    return () => {
      clearInterval(dotsIntervalID);
    };
  }, [dots]);

  const handleDownloadPlan = useCallback(() => {
    if (planRef.current === null) return;

    toJpeg(planRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'a-holy-plan.jpg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [planRef]);

  return (
    <>
      {plan.length == 0 && (
        <LoadingContainer>
          <p>Montando plano{'.'.repeat(dots)}</p>
        </LoadingContainer>
      )}

      {plan.length > 0 && (
        <PlanResultContainer>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <HolyTitle>A Holy Plan</HolyTitle>
          </Link>

          <DownloadButton onClick={handleDownloadPlan}>
            Baixar como imagem
          </DownloadButton>

          <PlanGrid ref={planRef}>
            {plan.map((dayReading, i) => (
              <Fragment key={i}>
                <DayLabel>Dia {i + 1}</DayLabel>
                <DayReading>{dayReading}</DayReading>
              </Fragment>
            ))}
          </PlanGrid>

          <Credits>
            <p>
              Desenvolvido por{' '}
              <a
                href="https://www.instagram.com/edusrmt"
                target="_blank"
                rel="noopener noreferrer"
              >
                Eduardo Sarmento
              </a>
            </p>
          </Credits>
        </PlanResultContainer>
      )}
    </>
  );
};
