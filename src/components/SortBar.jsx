import { useState } from 'react';
import api from '../services/sub_services/apiConfig';

function SortBar({ setListings }) {
  const [filterData, setFilterData] = useState('');
  const [sortData, setSortData] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleFilterChange = (e) => {
    setFilterData(e.target.value);
    fetchProperties({ type: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortData(e.target.value);
    fetchProperties({ sort: e.target.value });
  };

  const handleCheckInChange = (e) => setCheckInDate(e.target.value);
  const handleCheckOutChange = (e) => setCheckOutDate(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (checkInDate && checkOutDate) {
      fetchProperties({ start_date: checkInDate, end_date: checkOutDate });
    }
  };

  const fetchProperties = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/properties/?${queryString}`);
    setListings(response.data)
  };

  return (
    <section id="sort-bar-section">
      <div id="date-form-div">
        <form id="date-form" onSubmit={handleSearchSubmit}>
          <input
            required
            type="date"
            name="check_in"
            placeholder="Check In"
            value={checkInDate}
            onChange={handleCheckInChange}
          />
          <input
            required
            type="date"
            name="check_out"
            placeholder="Check Out"
            value={checkOutDate}
            onChange={handleCheckOutChange}
          />
          <button className="search-form-button" type="submit">Search</button>
        </form>
      </div>

      <div id="filter-form-div">
        <form id="filter-form">
          <select id="filter-select" name="filter" onChange={handleFilterChange} value={filterData}>
            <option value="" disabled>---Filter---</option>
            <option value="EN">Entire Place</option>
            <option value="PR">Private Room</option>
            <option value="SH">Shared Room</option>
            <option value="VA">Vacation Home</option>
            <option value="LO">Loft</option>
            <option value="HO">Hostel</option>
            <option value="MA">Mansion</option>
            <option value="VI">Villa</option>
            <option value="CA">Castle</option>
            <option value="LU">Luxury Apartment</option>
          </select>
        </form>
      </div>

      <div>
        <form id="sort-form">
          <select id="sort-select" name="sort" onChange={handleSortChange} value={sortData}>
            <option value="" disabled>---Sort---</option>
            <option value="price">Maximum Price (highest first)</option>
            <option value="guests">By Maximum Number of Guests (most first)</option>
          </select>
        </form>
      </div>
    </section>
  );
}

export default SortBar;