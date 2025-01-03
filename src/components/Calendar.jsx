/* --------------------------------Imports--------------------------------*/

import { useState, useContext, useEffect } from "react";

import { SingleContext } from "../app/SingleListingBooking.jsx";

/* --------------------------------Component--------------------------------*/

const Calendar = ({ blockedDates, setChosenDates }) => {

    const { pageState, booking } = useContext(SingleContext)

    const [selectedRange, setSelectedRange] = useState({
        start: null,
        end: null,
    });
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {

        if (pageState === "booking" && booking) {
            console.log("booking is ", booking)
            let start = new Date(booking.check_in_date)
            let end = new Date(booking.check_out_date)

            console.log("start is ", start)
            console.log("start is ", new Date(start.getFullYear(), start.getMonth(), start.getDate()))

            setSelectedRange({
                start: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
                end:new Date(end.getFullYear(), end.getMonth(), end.getDate()),
            })
        }

    }, [booking, pageState])

    // Check if the date is before today (and prevent clicking on it)
    const isPastDate = (date) => date && date < today;

    // Check if a date is booked
    const isBooked = (date) => {

        const dateObj = new Date(date)
        const normalizedDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

        const isUnavail = blockedDates.some(blockedDate => {
            const normalizedBlockedDate = new Date(blockedDate.getFullYear(), blockedDate.getMonth(), blockedDate.getDate());
            return normalizedBlockedDate.getTime() === normalizedDate.getTime();
        })

        return isUnavail;
    };

    const getDaysInMonth = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = firstDayOfMonth.getDay();

        // This will help create days for the month
        const days = [];
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(null); // Fills the spaces with blank if it's not part of the days of the week
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i)); // Fill in actual dates
        }
        return days;
    };

    // Check if a date falls within the selected range
    const isInRange = (date) => {
        if (!selectedRange.start || !selectedRange.end) return false;
        return date >= selectedRange.start && date <= selectedRange.end;
    };

    // Handle date clicks
    const handleDateClick = (date) => {
        if (isPastDate(date) || isBooked(date)) return; // Prevent selection for past or booked dates

        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            setSelectedRange({ start: date, end: null });
        } else if (date > selectedRange.start) {
            setSelectedRange({ ...selectedRange, end: date });
            setChosenDates({ start: selectedRange.start, end: date });
        } else {
            setSelectedRange({ start: date, end: null });
        }
    };

    // can go before and after months, but only within the month that you are currently on
    const navigateMonth = (direction) => {
        const newMonth = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + direction,
            1
        );
        setCurrentMonth(newMonth);
    };

    const monthsToDisplay = [
        currentMonth,
        // new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    ];

    return (
    <div className="div-calendar">
        <div className="grid grid-cols-1 gap-8">
        {monthsToDisplay.map((month, index) => {
            const days = getDaysInMonth(month.getFullYear(), month.getMonth());
            return (
            <div key={index}>
                {/* Adjusted Month Header with Buttons */}
                <div className="flex items-center justify-between mb-2 bg-backgroundColor p-2 rounded">
                <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded hover:bg-buttonColor"
                    disabled={currentMonth <= new Date()} // Prevent navigating to past months
                >
                    {"<"}
                </button>
                <h3 className="text-lg font-medium text-textColor">
                    {month.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                    })}
                </h3>
                <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded hover:bg-buttonColor"
                >
                    {">"}
                </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {daysOfWeek.map((day) => (
                        <div
                        key={day}
                        className="text-center font-semibold text-textColor"
                        >
                        {day}
                        </div>
                    ))}
                    {days.map((date, idx) => (
                        <button
                            key={idx}
                            onClick={() =>
                                date &&
                                !isPastDate(date) &&
                                !isBooked(date) &&
                                handleDateClick(date)
                            }
                            disabled={isPastDate(date) || isBooked(date)}

                            className={`p-2 rounded-full w-10 h-10 flex items-center justify-center ${
                                selectedRange.start &&
                                selectedRange.start.toDateString() === date?.toDateString()
                                ? "bg-buttonColor text-white"
                                : selectedRange.end &&
                                    selectedRange.end.toDateString() ===
                                    date?.toDateString()
                                ? "bg-buttonColor text-white"
                                : isInRange(date)
                                ? "bg-buttonColor text-gray-800"
                                : "text-gray-700 hover:bg-gray-100"
                            } ${
                                isPastDate(date) || isBooked(date)
                                ? "cursor-not-allowed text-gray-300 line-through"
                                : ""
                            }`}
                            >
                            {date ? date.getDate() : null}
                        </button>
                    ))}
                </div>
            </div>
            );
        })}
        </div>
    </div>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Calendar
