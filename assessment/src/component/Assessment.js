import React, { useEffect, useState } from 'react'
import sortedOrders from '../data';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import timeStringToMinutes from './timeStringToMinutes';
import ConfirmationModal from './ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloudMoon, faMoon } from '@fortawesome/free-solid-svg-icons';


const dosageTime = {
    morning: "6-11",
    afternoon: "11-16",
    evening: "16-20",
    night: "20-24"
};

const image = [
    { morning: <FontAwesomeIcon icon={faSun} className="mb-3 text-2xl" /> },
    { morning: <FontAwesomeIcon icon={faCloudSun} className="mb-3 text-2xl" /> },
    { afternoon: <FontAwesomeIcon icon={faCloudMoon} className="mb-3 text-2xl" /> },
    { night: <FontAwesomeIcon icon={faMoon} className="mb-3 text-2xl" /> }
]

const Assessment = () => {
    const [show, setShow] = useState(false);
    const [medicineData, setMedicineData] = useState(sortedOrders);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        let todayData = medicineData[new Date().toDateString()] || [];
        let groupSelectedData = groupBy(todayData, (element) => element.slot_time);
        let sortedKeys = Object.keys(groupSelectedData).sort((a, b) => timeStringToMinutes(a) - timeStringToMinutes(b));
        let sortedObject = {};
        sortedKeys.forEach(key => {
            sortedObject[key] = groupSelectedData[key];
        });
        setSelectedData(sortedObject)
        setSelectedDate(new Date().toDateString())
    }, []);

    const handleShowMedicine = (data, sDate) => {
        let groupByData = groupBy(data, (element) => element.slot_time)
        let sortedKeys = Object.keys(groupByData).sort((a, b) => timeStringToMinutes(a) - timeStringToMinutes(b));
        let sortedObject = {};
        sortedKeys.forEach(key => {
            sortedObject[key] = groupByData[key];
        });
        setSelectedData(sortedObject);
        setSelectedDate(sDate)
    };

    const findTime = (medicineDate) => {
        let [time, period] = medicineDate.split(" ");
        const [hours, minutes] = time.split(":");
        if (period === "am") {
            let index = Object.values(dosageTime).findIndex((ele) => {
                const [start, end] = ele.split("-");
                if (Number(hours) >= Number(start) && Number(hours) <= Number(end)) {
                    return ele;
                }
            })
            return index;
        } else if (period === "pm") {
            let index = Object.values(dosageTime).findIndex((ele) => {
                const [start, end] = ele.split("-");
                if (Number(hours) === 12) {
                    if (Number(hours) >= Number(start) && Number(hours) <= Number(end)) {
                        return ele;
                    }
                } else {
                    if (Number(hours) + 12 >= Number(start) && Number(hours) + 12 <= Number(end)) {
                        return ele;
                    }
                }
            })
            return index;
        }
    }

    const changeExpiry = (data) => {
        const { id, date } = data;
        let initialData = { ...selectedData };
        const entryToUpdate = selectedData[date].find(entry => entry.id === id);
        if (entryToUpdate) {
            entryToUpdate.isExpired = false;
        }
        setSelectedData(initialData)
        setShow(false);
    }

    return (
        <div>
            <div className='flex justify-center mt-3'>
                {Object.keys(medicineData).map((date, index) => (
                    <button
                        onClick={() => handleShowMedicine(medicineData[date], date)}
                        key={index}
                        className={`${selectedDate === date ? 'bg-green-500 border-green-700 text-white' : 'bg-white border-blue-700 text-blue-700'}
                        border p-2.5 rounded-full mx-2 relative`}
                    >
                        <p className={`${selectedDate === date && "bg-white text-green-600 rounded-full"}  p-3 text-xl`}>{dayjs(date).date()}</p>
                        <p className='py-3'>{dayjs(date).format('MMM')}</p>
                        {medicineData[date].some(ele => ele.isExpired) && (
                            <span className='bg-red-600 w-2.5 left-7 -bottom-2 h-2.5 absolute rounded-full mb-3'></span>
                        )}
                    </button>
                ))}
            </div>
            <div className='mt-4 w-1/2 mx-auto'>
                {Object.keys(selectedData).map((e, i) => (
                    <div key={i}
                        className='p-3 bg-red-50 bg-opacity-75 relative justify-between rounded-md overflow-hidden mb-3 flex'
                    >
                        <div className='flex gap-5'>
                            <div>
                                <img className='w-24 h-24' src="images/image.png" alt="" />
                            </div>
                            <div className='self-end'>
                                <div>
                                    {Object.values(image[findTime(e)])[0]}
                                </div>
                                {selectedData[e].map((data, index) => (
                                    <div key={index} className='overflow-hidden w-full' >
                                        <div>
                                            <p className='text-xl font-semibold'>1×{data.medicine_name}</p>
                                        </div>
                                        {data.isExpired &&
                                            <div onClick={() => { setShow(true); setData({ id: data.id, date: e }); }}
                                                className='absolute right-0 h-full top-0 w-10 z-10 bg-red-500 cursor-pointer flex items-center justify-center'>
                                                <i className="fa-solid fa-check text-white text-2xl "></i>
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=''>
                            <p className='text-xl font-semibold me-9'>{e}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmationModal show={show} setShow={setShow} handleChangeQuantity={changeExpiry} data={data} />
        </div>
    )
}

export default Assessment;