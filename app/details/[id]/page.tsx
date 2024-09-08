"use client";

import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/Context/ApiContext';
import { ProfileContext } from "@/Context/ProfileContext";
import ContainerWidth from '@/components/ContainerWidth';
import SliderCast from '@/components/Sliders/SliderCast/SliderCast';
import Heading from '@/components/Heading';
import Col from '@/components/Col';
import Detail from '@/components/Detail';
import { ImageLogoType, MovieDetailsType, RecommendationType } from '@/utils/Interface';
import Loading from '@/components/loading/page';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const { RecommendedMovies, MovieDetails, ImageLogo, MovieVideo, videoDetails, setvideoDetails }: any = useContext(ApiContext);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [recommends, setRecommends] = useState<RecommendationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<{ iso_639_1: string; file_path: string } | null>(null); // Adjusted type
  const { movieId, setMovieId }: any = useContext(ProfileContext);

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        if (MovieDetails) {
          const movieData = await MovieDetails(id);
          setMovieDetails(movieData);
        } else {
          throw new Error('MovieDetails function not provided');
        }
      } catch (error: any) {
        setError('Error fetching movie details: ' + (error.message || 'Unknown error'));
      }

      try {

          const videoData = await MovieVideo(id);

          setvideoDetails(videoData?.results[1]?.key);

      } catch (error: any) {
        setError('Error fetching movie video: ' + (error.message || 'Unknown error'));
      }

      try {
        if (ImageLogo) {
          const imageData: ImageLogoType = await ImageLogo(id);
          const englishLogo = imageData.logos.find((logo) => logo.iso_639_1 === 'en');
          setImage(englishLogo || null);
        } else {
          throw new Error('ImageLogo function not provided');
        }
      } catch (error: any) {
        setError('Error fetching movie logo: ' + (error.message || 'Unknown error'));
      }

      try {
        if (RecommendedMovies) {
          const recommendData = await RecommendedMovies(id);
          setRecommends(recommendData.results);
        } else {
          throw new Error('RecommendedMovies function not provided');
        }
      } catch (error: any) {
        setError('Error fetching recommendations: ' + (error.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData(id);
      setMovieId(id);
    } else {
      setError('No movie ID provided');
      setLoading(false);
    }
  }, [id, RecommendedMovies, MovieDetails, ImageLogo, MovieVideo, setMovieId, setvideoDetails]);

  if (loading) return <Loading/>;
  if (error) return <div className="error-message">Error: {error}</div>;

  const backgroundStyle: React.CSSProperties = movieDetails ? {
    background: `radial-gradient(circle, rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0.475)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
  } : {};

  return (
    <div style={backgroundStyle}>
      <ContainerWidth>
        {movieDetails && (
          <Detail movieDetails={movieDetails} videoDetails={videoDetails} image={image} />
        )}
        <div className="sliderCast">
          <Heading text='Movie Cast' />
          <div className='mt-4 flex justify-center items-center'>
            <SliderCast id={id} />
          </div>
        </div>
        <div className="Recommended">
          <Heading text='RECOMMENDATIONS' />
          <div className="grid md:grid-cols-3 py-6 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-4">
            {recommends.length > 0 ? (
              recommends.map(recommend => (
                <Col
                  key={recommend.id}
                  date={recommend.release_date}
                  id={recommend.id}
                  star={recommend.vote_average.toFixed(1)}
                  src={recommend.poster_path}
                  name={recommend.title.split(' ').slice(0, 3).join(' ')}
                />
              ))
            ) : (
              <p className="text-white">No recommendations available.</p>
            )}
          </div>
        </div>
      </ContainerWidth>
    </div>
  );
}
