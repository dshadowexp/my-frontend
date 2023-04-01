import search_icon from '../assets/icons/search-outline.svg';

export default function SearchInput({ value, onChange }) {
    return <div className='search'>
        <img className='img__small' src={search_icon} alt="search" />
        <input 
            name='search'
            value={value}
            onChange={onChange}
            placeholder="Search"
            className="search__input"
        />
    </div>
}