import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { ApiContext } from '@/Context/ApiContext';
import './styles.css';

// Assuming these types are defined somewhere in your codebase
interface Actor {
  id: number;
  profile_path?: string;
  name: string;
}

interface MovieCastResponse {
  cast: Actor[];
}

export default function SliderCast({ id, kind }: { id: string; kind?: string }) {
    const { MovieCast, SeriesCast }: any = useContext(ApiContext);
    const [cast, setCast] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCast = async () => {
            setLoading(true);
            setError(null);
            try {
                if (kind === 'tv' && SeriesCast) {
                    const seriesCastData: MovieCastResponse = await SeriesCast(id);
                    setCast(seriesCastData.cast || []);
                } else if (MovieCast) {
                    const movieCastData: MovieCastResponse = await MovieCast(id);
                    setCast(movieCastData.cast || []);
                } else {
                    throw new Error('MovieCast or SeriesCast function not provided');
                }
            } catch (error: any) {
                console.error(error);
                setError('Error fetching cast data: ' + (error.message || 'Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCast();
        } else {
            setLoading(false);
        }
    }, [id, kind, MovieCast, SeriesCast]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <Swiper
            slidesPerView={10}
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                480: {  
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 7,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 10,
                    spaceBetween: 40,
                },
            }}
        >
            {cast.length > 0 ? (
                cast.map((actor) => (
                    actor.profile_path && (
                        <SwiperSlide 
                            key={actor.id} 
                            className='rounded-lg overflow-hidden text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 lg:text-sm mBlur borderGlass inline-block text-white font-medium'
                        >
                            <div className="cast-member">
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                                        alt={actor.name}
                                        className="cast-img h-[40px] object-contain"
                                    />
                                ) : (
                                    <div className="no-image">No Image</div>
                                )}
                                <p className="cast-name text-sm mt-1">{actor.name.split(' ').slice(0, 1).join(' ')}</p>
                            </div>
                        </SwiperSlide>
                    )
                ))
            ) : (
                <div>No cast available</div>
            )}
        </Swiper>
    );
}
