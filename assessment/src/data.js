import { groupBy } from "lodash";

let data = [
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2882,
        "medicine_taken": false,
        "created_at": "2023-11-26T18:30:00.000Z",
        "slot_time": "9:00 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2882,
        "medicine_taken": false,
        "created_at": "2023-11-26T18:30:00.000Z",
        "slot_time": "11:00 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2882,
        "medicine_taken": false,
        "created_at": "2023-11-26T18:30:00.000Z",
        "slot_time": "5:00 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2882,
        "medicine_taken": false,
        "created_at": "2023-11-26T18:30:00.000Z",
        "slot_time": "3:00 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2881,
        "medicine_taken": false,
        "created_at": "2023-11-20T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2883,
        "medicine_taken": false,
        "created_at": "2023-11-22T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2886,
        "medicine_taken": false,
        "created_at": "2023-11-28T18:30:00.000Z",
        "slot_time": "09:55 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2889,
        "medicine_taken": false,
        "created_at": "2023-12-19T18:30:00.000Z",
        "slot_time": "09:55 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2890,
        "medicine_taken": false,
        "created_at": "2023-11-28T18:30:00.000Z",
        "slot_time": "07:55 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2887,
        "medicine_taken": false,
        "created_at": "2023-11-29T18:30:00.000Z",
        "slot_time": "09:55 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2891,
        "medicine_taken": false,
        "created_at": "2023-11-29T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2884,
        "medicine_taken": false,
        "created_at": "2023-12-18T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2888,
        "medicine_taken": false,
        "created_at": "2023-12-18T18:30:00.000Z",
        "slot_time": "09:55 pm",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2892,
        "medicine_taken": false,
        "created_at": "2023-12-18T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2885,
        "medicine_taken": false,
        "created_at": "2023-12-19T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer007",
        "power": "500"
    },
    {
        "prescription_id": 1579130,
        "remarks": "",
        "id": 2893,
        "medicine_taken": false,
        "created_at": "2023-12-19T18:30:00.000Z",
        "slot_time": "07:55 am",
        "dosage": "1",
        "medicine_name": "testmedzaheer006",
        "power": "500"
    }
];

data = data.map(ele => {
    let [time, period] = ele.slot_time.split(" ");
    const [hours, minutes] = time.split(":");
    let currentDate = new Date()
    let result = new Date(ele.created_at) < currentDate;
    if (currentDate.toDateString() === new Date(ele.created_at).toDateString()) {
        let currentHours = currentDate.getHours();
        if (period === "pm") {
            return { ...ele, isExpired: Number(hours) + 12 <= currentHours }
        } else {
            return { ...ele, isExpired: Number(hours) <= currentHours }
        }
    }
    return { ...ele, isExpired: result }
});
// console.log(data)

let groupByDataValue = groupBy(data, (e) => new Date(e["created_at"]).toDateString());

const sortedOrders = {};
Object.keys(groupByDataValue).sort((a, b) => new Date(a) - new Date(b)).forEach(key => {
    sortedOrders[key] = groupByDataValue[key];
});

export default sortedOrders;
// export default data;