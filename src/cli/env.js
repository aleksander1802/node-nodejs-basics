const parseEnv = () => {
  const port = process.env;
  const rssPrefix = 'RSS_';

  const rssEnvs = Object.keys(port)
    .filter((item) => item.startsWith(rssPrefix))
    .reduce((acc, curr) => {
      acc[curr] = port[curr];
      return acc;
    }, {});

  const rssString = Object.keys(rssEnvs)
    .map((key) => `${key}=${rssEnvs[key]}`)
    .join('; ');

  console.log(rssString);
};

parseEnv();
