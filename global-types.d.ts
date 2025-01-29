type Author = {
  latin: string;
  shavian: string;
  url: string;
};

type Story = {
  title: {
    latin: string;
    shavian: string;
    url: string;
  };
  year: number;
};

type Stories = Record<string, Story>;
