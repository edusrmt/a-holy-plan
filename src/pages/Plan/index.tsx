import { useContext, useEffect, useState, Fragment } from "react";
import { BiblePlanContext } from "../../contexts/BiblePlanContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DayLabel,
  HolyTitle,
  LoadingContainer,
  PlanResultContainer,
  PlanGrid,
  DayReading,
  Credits,
} from "./styles";
import generatePlan from "../../utils/generatePlan";

export const Plan = () => {
  const navigate = useNavigate();
  const { days, books } = useContext(BiblePlanContext);
  const [dots, setDots] = useState(1);
  const [plan, setPlan] = useState<string[]>([]);

  useEffect(() => {
    setPlan(generatePlan(days, books));
  }, [days, books]);

  useEffect(() => {
    if (books.length == 0) {
      navigate("/");
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

  return (
    <>
      {plan.length == 0 && (
        <LoadingContainer>
          <p>Montando plano{".".repeat(dots)}</p>
        </LoadingContainer>
      )}

      {plan.length > 0 && (
        <PlanResultContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <HolyTitle>A Holy Plan</HolyTitle>
          </Link>

          <PlanGrid>
            {plan.map((dayReading, i) => (
              <Fragment key={i}>
                <DayLabel>Dia {i + 1}</DayLabel>
                <DayReading>{dayReading}</DayReading>
              </Fragment>
            ))}
          </PlanGrid>

          <Credits>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://www.linkedin.com/in/edu-sarmento/"
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
