import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import { MovieProvider } from '../contexts/MovieContext';

const MovieManagerContent = () => (
  <>
    <Header />
    <Container className="mt-3">
      <h1 className="text-center mb-4">🎬 Quản lý Phim</h1>
      <MovieForm />
      <h2 className="mt-4">Danh sách Phim</h2>
      <MovieTable />
    </Container>
  </>
);

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
