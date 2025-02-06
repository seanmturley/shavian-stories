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

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | Promise<never>;
