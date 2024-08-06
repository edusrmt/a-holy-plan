import { Square, SquareCheckBig } from "lucide-react";
import { ReactNode } from "react";
import { ItemContainer } from "./styles";

interface SelectableItemProps {
  isSelected: boolean;
  toggleFunction: () => void;
  children: ReactNode;
}

export function SelectableItem({
  isSelected,
  toggleFunction,
  children,
}: SelectableItemProps) {
  return (
    <ItemContainer onClick={toggleFunction}>
      {isSelected ? (
        <SquareCheckBig size="1.25rem" />
      ) : (
        <Square size="1.25rem" />
      )}

      {children}
    </ItemContainer>
  );
}
