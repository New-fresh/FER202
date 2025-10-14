import React, { useMemo, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import HomeCarousel from "../components/Movie/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";
import Filter from "../components/home/Filter";
import AppNavBar from "../components/layout/AppNavBar";
import { movies } from "../data/movies/movies";

export default function HomePage() {
  // --- state điều khiển Filter ---
  const [search, setSearch] = useState("");
  const [yearRange, setYearRange] = useState("all");
  const [sort, setSort] = useState("yearDesc");

  // Gợi ý cho datalist: title + year (unique)
  const suggestions = useMemo(() => {
    const set = new Set();
    movies.forEach(m => {
      set.add(m.title);
      set.add(String(m.year));
    });
    return Array.from(set);
  }, []);

  // Lọc + sắp xếp theo yêu cầu
  const filteredMovies = useMemo(() => {
    const q = search.trim().toLowerCase();

    // 1) filter theo search + year range
    let list = movies.filter(m => {
      const okSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q);
      const okYear =
        yearRange === "all" ||
        (yearRange === "<=2000" && m.year <= 2000) ||
        (yearRange === "2001-2015" && m.year >= 2001 && m.year <= 2015) ||
        (yearRange === ">2015" && m.year > 2015);
      return okSearch && okYear;
    });

    // 2) sort
    const sorters = {
      yearAsc:  (a,b) => a.year - b.year,
      yearDesc: (a,b) => b.year - a.year,
      titleAsc: (a,b) => a.title.localeCompare(b.title),
      titleDesc:(a,b) => b.title.localeCompare(a.title),
      durAsc:   (a,b) => a.duration - b.duration,
      durDesc:  (a,b) => b.duration - a.duration,
    };
    const cmp = sorters[sort];
    return cmp ? [...list].sort(cmp) : list;
  }, [search, yearRange, sort]);

  return (
    <>
      <AppNavBar />
      <div className="container my-4">
        <HomeCarousel />

        <Filter
          search={search} setSearch={setSearch}
          yearRange={yearRange} setYearRange={setYearRange}
          sort={sort} setSort={setSort}
          suggestions={suggestions}
        />

        <h3 className="my-4">🎬 Featured Movies Collections</h3>
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredMovies.map((m) => (
            <Col key={m.id}>
              <MovieCard movie={m} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
