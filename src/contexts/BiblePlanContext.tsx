import { createContext, ReactNode, useState } from "react";

interface BiblePlanContextType {
  days: number;
  books: string[];
  setPlanParams: (duration: number, selectedBooks: string[]) => void;
}

interface BiblePlanProviderProps {
  children: ReactNode;
}

export const BiblePlanContext = createContext({} as BiblePlanContextType);

export const BiblePlanProvider = ({ children }: BiblePlanProviderProps) => {
  const [days, setDays] = useState(1);
  const [books, setBooks] = useState<string[]>([]);

  const setPlanParams = (duration: number, selectedBooks: string[]) => {
    setDays(duration);
    setBooks(selectedBooks);
  };

  return (
    <BiblePlanContext.Provider value={{ days, books, setPlanParams }}>
      {children}
    </BiblePlanContext.Provider>
  );
};
