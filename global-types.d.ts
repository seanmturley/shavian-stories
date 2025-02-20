type Story = {
  title: {
    latin: string;
    shavian: string;
  };
  year: number;
};

type Stories = Record<string, Story>;

type Author = {
  name: {
    latin: string;
    shavian: string;
  };
  stories: Stories;
};

type Library = Record<string, Author>;

type BookmarkRef = Record<string, HTMLDivElement | null>;

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | Promise<never>;
