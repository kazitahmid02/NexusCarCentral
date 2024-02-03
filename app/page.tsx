import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";

export default function Home() {
  const [allCars, setAllCars] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [manufacturer, setManufacturer] = useState(""); 
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState(""); 
  const [year, setYear] = useState("2022"); // Change to string to match filter values
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: parseInt(year) || 2022, // Parse to int since state is string
        fuel: fuel || '',
        limit: parseInt(limit) || 10, // Parse to int since state is string
        model: model || '',
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold' style={{ color: '#001f3f' }}>Car Collection</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filter'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className='home__filter-container' >
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars.map((car) => (
                <CarCard key={car.id} car={car} />
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
            <p>{allCars.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
