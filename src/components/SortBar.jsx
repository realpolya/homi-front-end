return (
    <section id="sort-bar-section">

        <div id="sort-filter-div">
          <form id="sort-form" onSubmit={handleSubmit}>
            <select id="sort-select" name="sort" onChange={handleSortChange}>
                  <option value="" disabled selected>---Sort---</option>
                  <option value="price">Maxiumum Price (highest first)</option>
                  <option value="guests">By Maximum Number of Guests (most first)</option>
            </select>
          </form>
          <form id="filter-form">
            <select id="filter-select" name="filter" onChange={handleFilterChange}>
                  <option value="" disabled selected>---Filter---</option>
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

          <form id="sort-filter-form-button" onSubmit={restoreRecipes}>
            <button className="search-form-button" type="submit">Reset</button>
          </form>
        </div>
        
        <div id="search-div">
          <form id="search-form" onSubmit={handleSearchSubmit}>
            <input required 
                    type="text" 
                    placeholder="" 
                    name="search" 
                    value={searchData}
                    onChange={handleSearchChange}/>
            <button className="search-form-button" type="submit">Search</button>
          </form>
        </div>

    </section>
  )