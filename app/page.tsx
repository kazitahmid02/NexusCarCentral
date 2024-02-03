"use client"
import Image from 'next/image';
import {useEffect,useState} from 'react';
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";

export default function Home() {
  const [allCars, setAllCars] = useState([]); // Changed setallCars to setAllCars
  const [loading, setLoading] = useState(false); // Changed setloading to setLoading
  const [manufacturer, setManufacturer] = useState(""); // Changed setmanufacturer to setManufacturer
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState(""); // Changed setfuel to setFuel
  const [year, setYear] = useState(2022); // Changed setyear to setYear
  const [limit, setLimit] = useState(10); // Changed setlimit to setLimit

  const getCars = async () => {
    setLoading(true); // Changed setloading to setLoading
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Changed setloading to setLoading
    }
  }

  useEffect(() => {
    console.log(fuel, year, limit, manufacturer, model)
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold' style={{ color: '#001f3f' }}>Car Collection</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filter'>
          <SearchBar setManufacturer={setManufacturer} 
           setModel={setModel} />

          <div className='home__filter-container' >
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
