import React, { useEffect, useState } from 'react';
import { Pagination, Select } from 'antd';
import MovieCard from '../Components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../JS/Actions';
import './MoviesList.css';

const { Option, OptGroup } = Select;

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies.length > 0) {
      // Extract unique categories from the movies
      const uniqueCategories = [...new Set(movies.map(movie => movie.category))];
      setCategories(uniqueCategories);
    }
  }, [movies]);

  // Filter movies based on selected categories
  const filteredMovies = selectedCategories.length > 0
    ? movies.filter(movie => selectedCategories.includes(movie.category))
    : movies;

  // Handle category selection
  const handleChange = (value) => {
    setSelectedCategories(value);
  };

  // Grouping categories (in this case we don't have sub-groups, so we only use one group)
  const options = categories.map(category => ({
    label: <span>{category}</span>,
    value: category,
  }));

  // State to manage current page and page size
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  // Calculate the current page data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to the first page when page size changes
  };
  return (
    <div className='bigCont'>

      <div className='filter-container'>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', maxWidth: 400 }}
          placeholder="Select categories"
          onChange={handleChange}
          value={selectedCategories}
        >
          <OptGroup label="Categories">
            {options.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </OptGroup>
        </Select>
      </div>
      <div className='contain'>
      {currentMovies.length > 0 ? (
        currentMovies.map((el, i) => <MovieCard key={i} movie={el} />)
      ) : (
        <p>No movies available</p>
      )}
    </div>
    <div className='pag'>
      <Pagination
        total={filteredMovies.length}
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        showSizeChanger
        pageSizeOptions={[4, 8, 12]}
        showTotal={(total, [start, end]) => `Total ${total} items, Showing ${start}-${end}`}
      />
    </div>
</div>
  );
};

export default MoviesList;
