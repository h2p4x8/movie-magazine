import { PopularMoviesEntityType } from "@/entities/PopularMoviesEntityType";
import Action from "@/helpers/action";

export const popularMovies = new Action<PopularMoviesEntityType>('movie/popular');