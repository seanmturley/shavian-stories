type Genre = "comedy" | "horror";

type Story = {
  genre: Genre;
  title: {
    latin: string;
    shavian: string;
  };
  year: number;
};

type Stories = Record<string, Story>;

type Author = {
  bio: {
    dates: string;
    about: string;
    link: string;
  };
  name: {
    latin: string;
    shavian: string;
  };
  stories: Stories;
};

type Catalogue = Record<string, Author>;

type TableType = "author" | "library";

type TableRow = {
  author: string;
  authorPath: string;
  genre: Genre;
  storyPath: string;
  title: string;
  year: number;
};

type TableColumn = keyof TableRow;

type BookmarkRef = Record<string, HTMLButtonElement | null>;

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | Promise<never>;

declare module "use-local-storage/types" {
  type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;
}
