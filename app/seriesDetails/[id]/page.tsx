'use client';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '@/Context/ApiContext';
import { ProfileContext } from '@/Context/ProfileContext';
import ContainerWidth from '@/components/ContainerWidth';
import Detail from '@/components/Detail';
import Heading from '@/components/Heading';
import SliderCast from '@/components/Sliders/SliderCast/SliderCast';
import Col from '@/components/Col';
import Loading from '@/components/loading/page';
import Season from '@/components/Season';

export default function SeriesDetails() {
  const { id } = useParams<{ id: string }>();
  const { RecommendedSeries, SeriesDetails, Seasons, ImageLogoSeries, SeriesVideos, videoDetails, setvideoDetails }: any = useContext(ApiContext);
  const { movieId, setMovieId}: any = useContext(ProfileContext);

  const [seriesDetail, setSeriesDetail] = useState<any | null>(null);
  const [recommends, setRecommends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<any>(null); // Adjusted type
  const [seasons, setSeasons] = useState<any[]>([]);
setMovieId(id)
  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        if (SeriesDetails) {
          const movieData = await SeriesDetails(id);
          setSeriesDetail(movieData);
          setSeasons(movieData.seasons)
        } else {
          throw new Error('SeriesDetails function not provided');
        }
      } catch (error: any) {
        setError(`Error fetching series details: ${error.message || 'Unknown error'}`);
        console.error('SeriesDetails fetch error:', error);
      }

      try {

        const videoData = await SeriesVideos(id);
          setvideoDetails(videoData?.results[1]?.key);
       
      } catch (error: any) {
        setError(`Error fetching series videos: ${error.message || 'Unknown error'}`);
        console.error('SeriesVideos fetch error:', error);
      }

      try {
        if (ImageLogoSeries) {
          const imageData = await ImageLogoSeries(id);
          const englishLogo = imageData.logos.find((logo: any) => logo.iso_639_1 === 'en');
          setImage(englishLogo);
        } else {
          throw new Error('ImageLogoSeries function not provided');
        }
      } catch (error: any) {
        setError(`Error fetching series logo: ${error.message || 'Unknown error'}`);
        console.error('ImageLogoSeries fetch error:', error);
      }

      try {
        if (RecommendedSeries) {
          const recommendData = await RecommendedSeries(id);
          setRecommends(recommendData.results);
        } else {
          throw new Error('RecommendedSeries function not provided');
        }
      } catch (error: any) {
        setError(`Error fetching recommendations: ${error.message || 'Unknown error'}`);
        console.error('RecommendedSeries fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData(id);
    } else {
      setError('No series ID provided');
      setLoading(false);
    }
  }, [id, RecommendedSeries, SeriesVideos, SeriesDetails, ImageLogoSeries]);

  if (loading) return <Loading/>;
  if (error) return <div className="error-message">Error: {error}</div>;
  const backgroundStyle:any = seriesDetail ? {
    background: `radial-gradient(circle, rgba(0, 0, 0, 0.473), rgba(0, 0, 0, 0.475)), url(https://image.tmdb.org/t/p/original${seriesDetail.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
  } : {};

  return (
    <div>
      {seriesDetail && (
        <div
          style={backgroundStyle}
        >
          <ContainerWidth>
            <Detail kind={'tv'} videoDetails={videoDetails}   movieDetails={seriesDetail} image={image} />
            <div className="sliderCast">
              <Heading text='Movie Cast' />
              <div className='mt-4 flex justify-center items-center'>
                <SliderCast kind={'tv'} id={id} />
              </div>
            </div>
            {seasons.length > 0 && 
             <div className="Seasons">
              <Heading text='Seasons' />
              <div className="grid md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 grid-cols-2  gap-4 ">
                {seasons.map(season => (
                  <>
                    {season.poster_path && 
                                        <Season
                    key={season.id}

                    date={season.air_date}
                    id={season.id}
                    overlay={season.overview.split(' ').slice(0, 60).join(' ')}
                    star={season.vote_average.toFixed(1)}
                    src={season.poster_path}
                    name={season.name.split(' ').slice(0, 3).join(' ')}
                  />
                  }
                  </>

                ))}
              </div>
            </div>
            }
            <div className="Recommended">
              <Heading text='RECOMMENDATIONS' />
              <div className="grid md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 grid-cols-2  gap-4 ">
                {recommends.length > 0 ? (
                  recommends.map(recommend => (
                    <Col
                      kind={'tv'}
                      key={recommend.id}
                      date={recommend.first_air_date}
                      id={recommend.id}
                      star={recommend.vote_average.toFixed(1)}
                      src={recommend.poster_path}
                      name={recommend.name.split(' ').slice(0, 3).join(' ')}
                    />
                  ))
                ) : (
                  <p className="text-white">No recommendations available.</p>
                )}
              </div>
            </div>
          </ContainerWidth>
        </div>
      )}
    </div>
  );
}
