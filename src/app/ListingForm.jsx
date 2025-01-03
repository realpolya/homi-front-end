/* --------------------------------Imports--------------------------------*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import services from "../services/index.js"

import states from "../vars/states.js"
import prop_types from "../vars/prop_types.js"
import propertyTypeLookup from "../vars/prop_lookup.js"

/* --------------------------------Variables--------------------------------*/

const initial = {
    title: "",
    description: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    cancellation_policy: "",
    max_guests: "",
    property_type: "",
    is_active: true,
    cleaning_fee: "",
    price_per_night: "",
    amenities: [],
}

/* --------------------------------Component--------------------------------*/

const ListingForm = () => {

    const [formData, setFormData] = useState(initial);
    const [photos, setPhotos] = useState([{ link: "" }]);
    const [amenities, setAmenities] = useState([])
    const [state, setState] = useState('new')

    const navigate = useNavigate()
    const { listingId } = useParams()

    const fetchAmenities = async () => {
        try {
            setAmenities(await services.getAmenities())
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProperty = async (id) => {
        try {

            const propertyData = await services.getSingleProperty(id)
            const propType = propertyTypeLookup[propertyData.property_type]

            const propData = {
            ...propertyData,
            street: propertyData.address.street,
            city: propertyData.address.city,
            state: propertyData.address.state,
            zip_code: propertyData.address.zip_code,
            property_type: propType,
            amenities: propertyData.amenities,
            }

            setFormData(propData)
            setPhotos(propertyData.photos)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchAmenities()
    }, [])


    useEffect(() => {
        if (listingId) fetchProperty(listingId)
    }, [listingId])


    useEffect(() => {
        if (listingId) setState("edit")
        if (!listingId) setState("new")
    }, [listingId])


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

    };

    const handleCheckboxChange = (amenityId) => {

        const updatedAmenities = formData.amenities.includes(amenityId)
            ? formData.amenities.filter((item) => item.id !== amenityId)
            : [...formData.amenities, amenityId];
        
        setFormData(prev => ({ ...prev, amenities: updatedAmenities }));

    };

    // Handle input change for a specific index
    const handlePhotoChange = (index, value) => {

        const updatedPhotos = [...photos];
        updatedPhotos[index] = { link: value };
        setPhotos(updatedPhotos);

    };

    // Add a new input field
    const addImageInput = () => {

        if (photos.length < 5) {
            setPhotos([...photos, { link: "" }]);
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const updatedFormData = {
            ...formData,
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zip_code: formData.zip_code,
            }
        }

        delete updatedFormData.street
        delete updatedFormData.city
        delete updatedFormData.state
        delete updatedFormData.zip_code

        updatedFormData.property_type = propertyTypeLookup[updatedFormData.property_type]

        updatedFormData.photos = photos

        try {

            // either put/patch or post
            if (state === "new") {
                await services.postProperty(updatedFormData)
                alert("Listing successfully created!")
            } else if (state === "edit") {
                await services.putProperty(listingId, updatedFormData)
                alert("Listing successfully changed!")
            }

        } catch(err) {

            alert(err)

        }

        navigate("/dashboard/host")

    };

    return (
        <main className="flex flex-col justify-center p-2 md:p-6
                lg:p-20 md:mt-72 mt-72 items-center">
            { state === "edit" ? (
                <h1 className="text-left text-2xl md:mt-60 mt-72 text-logoColor">
                    Edit Your Listing
                </h1>) : (
                <h1 className="text-left text-2xl md:mt-60 mt-72 text-logoColor">
                    New Listing
                </h1>
                ) 
            }
            

            <form
            onSubmit={handleSubmit}
            className="w-full max-w-screen-lg md:p-20 p-2 m-8 bg-alternativeColor 
            flex flex-col
            rounded-md shadow-lg text-white"
            >
                <div className="flex flex-col
                md:grid md:grid-cols-2 md:gap-8">

                    {/* Title */}
                    <div className="listing-form-div">
                        <label htmlFor="title" className="block text-sm font-bold w-1/3">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md text-gray-900 bg-white focus:outline-none"
                            placeholder="Enter a descriptive title"
                        />
                    </div>

                    {/* Description */}
                    <div className="listing-form-div">
                    <label htmlFor="description" className="block text-sm font-bold w-1/3">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 h-24 rounded-md bg-white text-gray-900 focus:outline-none"
                        placeholder="Describe the property"
                    ></textarea>
                    </div>

                    {/* State Dropdown */}
                    <div className="listing-form-div">
                        <label htmlFor="propertyType" className="block text-sm font-bold w-1/3">
                        Property Type:
                        </label>
                        <select
                        id="propertyType"
                        name="property_type"
                        value={formData.property_type}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                        >
                        <option value="" disabled>
                            Select a Property Type
                        </option>
                        {prop_types.map((propertyType) => (
                            <option key={propertyType} value={propertyType}>
                            {propertyType}
                            </option>
                        ))}
                        </select>
                    </div>

                    {/* Address Fields */}
                    <div>
                    <h3 className="font-bold mb-2">Address</h3>
                    <div className="listing-form-div">
                        <label htmlFor="street" className="block text-sm font-bold w-1/3">
                        Street:
                        </label>
                        <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Enter street address"
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                        />
                    </div>
                    <div className="listing-form-div">
                        <label htmlFor="city" className="block text-sm font-bold w-1/3">
                        City:
                        </label>
                        <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                        />
                    </div>

                    {/* State Dropdown */}
                    <div className="listing-form-div">
                        
                        <label htmlFor="state" className="block text-sm font-bold w-1/3">
                        State:
                        </label>

                        <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                        >
                            <option value="" disabled>
                                Select a state
                            </option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="listing-form-div">
                        <label htmlFor="zip" className="block text-sm font-bold w-1/3">
                        Zip Code:
                        </label>
                        <input
                        type="text"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        placeholder="Enter Zip Code"
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                        />
                    </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="listing-form-div">
                    <label
                        htmlFor="cancellationPolicy"
                        className="block text-sm font-bold w-1/3"
                    >
                        Cancellation Policy:
                    </label>
                    <select
                        id="cancellationPolicy"
                        name="cancellation_policy"
                        value={formData.cancellation_policy}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                    >
                        <option value="" disabled>
                        Select a cancellation policy
                        </option>
                        <option value="Flexible">
                        Flexible: Full refund 1 day prior
                        </option>
                        <option value="Moderate">
                        Moderate: Full refund 5 days prior
                        </option>
                        <option value="Strict">Strict: Full refund 7 days prior</option>
                    </select>
                    </div>

                    {/* Cleaning Fee */}
                    <div className="listing-form-div">
                    <label htmlFor="cleaningFee" className="block text-sm font-bold w-1/3">
                        Cleaning Fee ($):
                    </label>
                    <input
                        type="number"
                        id="cleaningFee"
                        name="cleaning_fee"
                        value={formData.cleaning_fee}
                        onChange={handleChange}
                        placeholder="Enter cleaning fee"
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                    />
                    </div>

                    {/* Price Per Night */}
                    <div className="listing-form-div">
                    <label htmlFor="pricePerNight" className="block text-sm font-bold w-1/3">
                        Price Per Night ($):
                    </label>
                    <input
                        type="number"
                        id="pricePerNight"
                        name="price_per_night"
                        value={formData.price_per_night}
                        onChange={handleChange}
                        placeholder="Enter price per night"
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                    />
                    </div>

                    {/* Max Guests */}
                    <div className="listing-form-div mb-4">
                    <label htmlFor="maxGuests" className="block text-sm font-bold w-1/3">
                        Max. Guests:
                    </label>
                    <input
                        type="number"
                        id="maxGuests"
                        name="max_guests"
                        value={formData.max_guests}
                        onChange={handleChange}
                        placeholder="Enter maximum number of guests"
                        className="w-full p-2 rounded-md bg-white text-gray-900 focus:outline-none"
                    />
                    </div>

                    {/* Amenities */}
                    <div className="col-span-2 flex justify-center md:w-1/2 w-full">

                        <h3 className="font-bold mb-4 text-center pr-2">Amenities</h3>

                        <div
                        className="overflow-y-auto w-full max-h-64 p-4 bg-gray-100 rounded-lg
                        grid grid-cols-3 gap-4"
                        >
                            {amenities.map((amenity) => (
                                <label
                                    key={amenity.name}
                                    htmlFor={`amenity-${amenity.name}`}
                                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer"
                                >
                                    <input
                                    type="checkbox"
                                    id={`amenity-${amenity.name}`}
                                    value={amenity.id}
                                    checked={formData.amenities.includes(amenity.id)}
                                    onChange={() => handleCheckboxChange(amenity.id)}
                                    className="w-5 h-5 mb-3 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500"
                                    />
                                    <img
                                    src={amenity.image}
                                    alt={amenity.name}
                                    className="w-12 h-12 mb-2"
                                    />
                                    <span className="text-sm font-medium text-gray-900 text-center">
                                    {amenity.name}
                                    </span>
                                </label>
                            ))}
                        </div>

                    </div>

                    <h2>Add Images</h2>

                    {photos.map((photo, index) => (
                        <div key={index}>
                            <label>Image {index + 1} URL: </label>
                            <input
                            type="text"
                            value={photo.link}
                            onChange={(e) => handlePhotoChange(index, e.target.value)}
                            placeholder="Enter image URL"
                            className="text-sm font-medium text-gray-900 text-center"
                            />
                        </div>
                    ))}

                    {photos.length < 5 && (
                        <button type="button" className="form-button" onClick={addImageInput}>
                            Add Image
                        </button>
                    )}

                </div>

                {/* Submit Button */}

                <button
                type="submit"
                className="form-button mb-24"
                >
                    Submit
                </button>


                <div>
                </div>
            </form>

        </main>
    );
};

/* --------------------------------Exports--------------------------------*/

export default ListingForm