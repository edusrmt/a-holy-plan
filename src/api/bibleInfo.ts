import BookNames from "../data/book_names.json";

type BibleSection =
  | "Pentateuco"
  | "Livros Históricos"
  | "Livros Sapiênciais e Poéticos"
  | "Profetas Maiores"
  | "Profetas Menores"
  | "Evangelhos"
  | "Histórico"
  | "Cartas Paulinas"
  | "Cartas Gerais"
  | "Revelação";

interface BibleBook {
  name: string;
  abbrev: string;
  testament: "old" | "new";
}

export abstract class BibleInfo {
  static books = BookNames as BibleBook[];

  public static otSections: BibleSection[] = [
    "Pentateuco",
    "Livros Históricos",
    "Livros Sapiênciais e Poéticos",
    "Profetas Maiores",
    "Profetas Menores",
  ];

  public static ntSections: BibleSection[] = [
    "Evangelhos",
    "Histórico",
    "Cartas Paulinas",
    "Cartas Gerais",
    "Revelação",
  ];

  public static getBooksFromSections(section: BibleSection): BibleBook[] {
    switch (section) {
      case "Pentateuco":
        return this.books.slice(0, 5);
      case "Livros Históricos":
        return this.books.slice(5, 17);
      case "Livros Sapiênciais e Poéticos":
        return this.books.slice(17, 22);
      case "Profetas Maiores":
        return this.books.slice(22, 27);
      case "Profetas Menores":
        return this.books.slice(27, 39);
      case "Evangelhos":
        return this.books.slice(39, 43);
      case "Histórico":
        return this.books.slice(43, 44);
      case "Cartas Paulinas":
        return this.books.slice(44, 57);
      case "Cartas Gerais":
        return this.books.slice(57, 65);
      case "Revelação":
        return this.books.slice(65, 66);
    }
  }
}
