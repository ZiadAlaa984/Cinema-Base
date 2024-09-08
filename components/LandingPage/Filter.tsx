'use client';
import React, { useState, useEffect, useContext } from 'react';
import Heading from '../Heading';

import Link from 'next/link';
import { ApiContext } from '@/Context/ApiContext';
import { Button } from '../ui/button';

export default function Filter({ kind }: any) {
  const [btns, setBtns] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { TypeMovie }: any = useContext(ApiContext);

  useEffect(() => {
    async function fetchData() {
      if (TypeMovie) {
        try {
          const res = await TypeMovie(kind);
          setBtns(res.genres); // Ensure `res.genres` is the correct path
        } catch (error: any) {
          console.error('Error fetching genres:', error);
          setError('Error fetching genres. Please try again later.');
        }
      } else {
        console.error('ApiContext or TypeMovie function is not defined.');
        setError('API context or TypeMovie function is not available.');
      }
    }
    fetchData();
  }, [TypeMovie]);

  return (

    <section>
      <Heading text="Choose your type" />
      {error && <div className="error-message">{error}</div>}
      <div className="flex flex-wrap justify-start gap-4 items-center">
        {btns.map((btn) => (
          <Link
            key={btn.id}
            href={`/explore/${btn.name}-${btn.id}${kind ? '-' + kind : ''}`}
            passHref
          >
            <Button variant="outline" className="px-3 py-2 xl:px-12 xl:py-4 text-sm md:text-xl font-medium rounded-full">
              {btn.name}
            </Button>
          </Link>
        ))}
      </div>
    </section>


  );
}
