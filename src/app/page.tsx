import * as React from 'react';

async function getMovieList(): Promise<any> {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    }
  };
  const res = await fetch(url, options);
  return res.json();
}

export default async function HomePage() {
  const moviesData = await getMovieList();
  return (<div>{moviesData.results[0].id}</div>);
}
