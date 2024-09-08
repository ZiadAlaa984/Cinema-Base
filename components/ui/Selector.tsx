'use client'
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';
interface SelectorProps {
  onSelect: (genreId: string) => void; // Callback function to notify parent of selection
}
export function Selector({ onSelect }: SelectorProps)  {
    const [btns, setBtns] = React.useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() { 
            try {
                // Fetch list of genres
                const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcxOTk0ODY4Ny4wNzYzNzksInN1YiI6IjY2NjZlN2M1MjBjNjQ0ZDAyZjE1Y2ZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w39eBIlbJMKUAtNuUIe7jkJwEz6GwPMo8hDzFarLKY4'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();
                setBtns(data.genres);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
    <Select  onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="placeholder:text-white" placeholder="Select a Types" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                    {btns.map((btn,index) => (
                        <SelectItem key={index} value={`${btn.name + '-'} ${btn.id}`}>{btn.name}</SelectItem>
        ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    );
}
