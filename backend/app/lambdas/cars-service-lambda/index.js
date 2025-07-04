const mongoose = require('mongoose');
const connectToDatabase = require('./utils/db');
const Car = require('./models/Car');
const Location = require('./models/Location');

exports.handler = async (event) => {
  try {
    await connectToDatabase();

    const path = event.path;
    const method = event.httpMethod;
    const pathParameters = event.pathParameters || {};
    const queryParams = event.queryStringParameters || {};

    // GET /cars/{carId}
    if (method === 'GET' && pathParameters.carId) {
      const carId = new mongoose.Types.ObjectId(pathParameters.carId);
      try {
        const car = await Car.findById(carId);
        if (!car) {
          return {
            statusCode: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Car not found' }),
          };
        }
        let carLocation = await Location.findById(car.carLocationId);
        carLocation = carLocation.locationName;

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            carId: car._id.toString(),
            carRating: car.carRating,
            climateControlOption: car.climateControlOption,
            engineCapacity: car.engineCapacity,
            fuelConsumption: car.fuelConsumption,
            fuelType: car.fuelType,
            gearBoxType: car.gearBoxType,
            images: car.carImages,
            location: carLocation || "Unknown",
            model: car.model,
            passengerCapacity: car.passengerCapacity,
            pricePerDay: car.pricePerDay.toString(),
            serviceRating: car.serviceRating,
            status: car.status,
          }),
        };
      } catch (err) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Invalid carId' }),
        };
      }
    }

    // GET /cars (list with filters & pagination)
    if (method === 'GET' && path === '/cars') {
      const {
        pickupLocationId,
        dropOffLocationId,
        pickupDateTime,
        dropOffDateTime,
        category,
        gearBoxType,
        fuelType,
        minPrice,
        maxPrice,
        page = 1,
        size = 10,
      } = queryParams;

      const filter = {};

      if (pickupLocationId) {
        try {
          filter.carLocationId = new mongoose.Types.ObjectId(pickupLocationId);
        } catch {
          return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Invalid pickupLocationId' }),
          };
        }
      }

      if (category) filter.category = category;
      if (gearBoxType) filter.gearBoxType = gearBoxType;
      if (fuelType) filter.fuelType = fuelType;
      if (minPrice || maxPrice) {
        filter.pricePerDay = {};
        if (minPrice) filter.pricePerDay.$gte = parseFloat(minPrice);
        if (maxPrice) filter.pricePerDay.$lte = parseFloat(maxPrice);
      }

      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(size, 10);

      const totalElements = await Car.countDocuments(filter);
      const totalPages = Math.ceil(totalElements / pageSize);

      const cars = await Car.find(filter)
        .populate('carLocationId')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      const content = cars.map((car) => ({
        carId: car._id,
        carRating: car.carRating,
        imageUrl: car.carImages[0] || null,
        location: car.carLocationId?.locationName || 'Unknown',
        model: car.model,
        pricePerDay: car.pricePerDay.toString(),
        serviceRating: car.serviceRating,
        status: car.status,
      }));

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          currentPage: pageNumber,
          totalElements,
          totalPages,
        }),
      };
    }

    // GET /cars/popular
    if (method === 'GET' && path === '/cars/popular') {
      const { category } = queryParams;
      const filter = {};

      if (category) {
        filter.category = category;
      }

      const cars = await Car.find(filter)
        .sort({ carRating: -1 }) // sort by highest rating
        .limit(10)
        .populate('carLocationId');

      const content = cars.map((car) => ({
        carId: car._id.toString(),
        carRating: car.carRating?.toFixed(1) || null,
        imageUrl: car.carImages?.[0] || null,
        location: car.carLocationId?.locationName || 'Unknown',
        model: car.model,
        pricePerDay: car.pricePerDay?.toString() || null,
        serviceRating: car.serviceRating?.toFixed(1) || null,
        status: car.status,
      }));

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      };
    }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Not Found' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
