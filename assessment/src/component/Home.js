import React, { useEffect, useState } from 'react';
import data from '../data';
import { groupBy, sortBy } from 'lodash';
import dayjs from 'dayjs';

let dosageTime = {
    morning: "7-11",
    afternoon: "11-15",
    evening: "15-19",
    night: "19-22"
};

let image = [
    { morning: <i className="fa-solid fa-sun"></i> },
    { morning: "AfterNoon" },
    { afternoon: "Evening" },
    { night: <i className="fa-solid fa-moon"></i> }
]

const Home = () => {
    const [medicineData, setMedicineData] = useState(data);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        let groupByData = changeGroupByData(medicineData, "created_at");
        setMedicineData(groupByData);           // Set initial Medicine Data

        let toDayData = medicineData.filter(ele => {
            let date = new Date(ele.created_at).toDateString();
            if (date === new Date().toDateString()) {
                return ele;
            }
        })
        let groupSelectedData = changeGroupByData(toDayData, "slot_time");
        setSelectedData(groupSelectedData);         // set initial today date medicine
        setSelectedDate(new Date().toDateString())  // set initial today date
    }, []);

    // to change the value group by 
    const changeGroupByData = (data, value) => {
        let groupByDataValue = groupBy(data,
            (element) => value === "slot_time" ? element[value] : new Date(element[value]).toDateString()
        );
        const sortedOrders = {};
        Object.keys(groupByDataValue).sort((a, b) => new Date(a) - new Date(b)).forEach(key => {
            sortedOrders[key] = groupByDataValue[key];
        });
        return sortedOrders;
    }

    // On click on any button () day
    const handleShowMedicine = (data, sDate) => {
        let groupByData = changeGroupByData(data, "slot_time");
        // sort by time
        let dataArray = Object.entries(groupByData);
        dataArray.sort((a, b) => convertTimeToSortableFormat(a[0]) - convertTimeToSortableFormat(b[0]));
        let sortedData = Object.fromEntries(dataArray);
        console.log(sortedData);
        setSelectedData(sortedData);
        setSelectedDate(sDate);
        // console.log(selectedData);
    };

    // For sorting the values
    function convertTimeToSortableFormat(timeString) {
        const [time, period] = timeString.split(" ");
        const [hours, minutes] = time.split(":");
        const adjustedHours = period === "am" ? parseInt(hours) % 12 : (parseInt(hours) % 12) + 12;
        return adjustedHours * 60 + parseInt(minutes);
    }

    // Find the medicine time for dosage (morning,afternoon,evening,night)
    const findTime = (medicineDate) => {
        console.log(medicineDate)
        let [time, period] = medicineDate.split(" ");
        const [hours, minutes] = time.split(":");
        if (period === "am") {
            let index = Object.values(dosageTime).findIndex((ele) => {
                const [start, end] = ele.split("-");
                // console.log(Number(hours), Number(start))
                if (Number(hours) >= Number(start) && Number(hours) <= Number(end)) {
                    return ele;
                }
            })
            return index;
        } else {
            let index = Object.values(dosageTime).findIndex((ele) => {
                const [start, end] = ele.split("-");
                // console.log(Number(hours) + 12, Number(start))
                if (Number(hours) + 12 >= Number(start) && Number(hours) + 12 <= Number(end)) {
                    return ele;
                }
            })
            return index;
        }
    }

    return (
        <div>
            <div className='flex justify-center'>
                {Object.keys(medicineData).map((date, index) => (
                    <button
                        onClick={() => handleShowMedicine(medicineData[date], date)}
                        key={index}
                        className={`${selectedDate === date ? 'bg-green-500' : 'bg-white'
                            } border border-black bg-green-500 px-6 py-4 rounded-full mx-2 relative`}
                    >
                        <p>{dayjs(date).date()}</p>
                        <p className='py-3'>{dayjs(date).format('MMM')}</p>
                        {dayjs().isBefore(dayjs(date).format('YYYY-MM-DD'), 'day') || (
                            <span className='bg-red-600 w-3 left-9 h-3 absolute rounded-full mb-3'></span>
                        )}
                    </button>
                ))}
            </div>

            <div className='mt-4 w-1/2 mx-auto'>
                {Object.keys(selectedData).map((e, i) => (
                    <div key={i}
                        className='border-gray-500 items-center relative border justify-between rounded-md overflow-hidden mb-3 flex'
                    >
                        <div className='p-3'>
                            {selectedData[e].map((data, index) => (
                                <div key={index}
                                    className='overflow-hidden w-full'
                                >
                                    <div>
                                        <p className='text-xl font-semibold'>1×{data.medicine_name}</p>
                                    </div>
                                    {dayjs().isBefore(dayjs(data.created_at).format('YYYY-MM-DD'), 'day') ||
                                        <div className='absolute right-0 h-full top-0 w-7 z-10 bg-red-500'></div>}
                                </div>
                            ))}
                        </div>
                        <div>
                            {Object.values(image[findTime(e)])[0]}
                        </div>
                        {/* {e === "07:55 am" ? image[0].morning : image[3].night} */}
                        <div className=''>
                            <p className='text-lg me-7'>{e}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
