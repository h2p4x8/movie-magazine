import * as React from 'react';
import {popularMovies} from "@/helpers/api";
import {PopularMoviesEntityType} from "@/entities/PopularMoviesEntityType";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

async function getMovieList(): Promise<Array<PopularMoviesEntityType>> {
  let res;
  try {
    res = await popularMovies.getList({
      language: 'en-US',
      page: 1,
    });
  } catch (e) {
    //
  }
  return res?.results || [];
}

export default async function HomePage() {
  const moviesData = await getMovieList();
  return (
      <div>
        {!moviesData.length ?
            <div>No movies</div>
            :
              <Grid container spacing={2}>
                {moviesData.map((movie) => (
                    <Grid item xs={4} key={movie.id} >
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={`${process.env.IMAGE_URL}${movie.poster_path}`}
                            title={movie.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h3">
                            {movie.title}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {movie.overview}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                ))}
              </Grid>
        }
      </div>
  );
}
