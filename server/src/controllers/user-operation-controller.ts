import {Request, Response} from 'express';
import Restaurant from "../models/restaurant";
const searchRestaurant = async(req:Request, res: Response) => {
    try{
        const city = req.params.city;
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = req.query.selectedCuisines as string || "";
        const sortOption = req.query.sortOption as string || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};
        query["city"] = new RegExp(city, "i");
        const checkForCity = await Restaurant.countDocuments(query);
        if(checkForCity === 0){
            return res.status(404).json( {
                results: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                }
            });
        }
        // set query to return for the selected cuisine option
        if(selectedCuisines){
            const cuisinesArray = selectedCuisines
                .split(",")
                .map((cuisine) =>
                    new RegExp(cuisine, "i"))
            query["cuisines"] = {$all: cuisinesArray}
        }

        // set query to either return name of restaurant of name of cuisine with the search query
        if(searchQuery){
            const searchRegex = new RegExp(searchQuery,"i");
            query["$or"] = [
                {restaurantName: searchRegex},
                {cuisines: {$in: [searchRegex]}}
            ]
        }
        const pageSize = 10;


        const foundRestaurants = await Restaurant
            .find(query)
            .sort({[sortOption]: 1})
            .skip((page-1)*pageSize)
            .limit(pageSize)
            .lean();
        const totalResults = await Restaurant.countDocuments(query);


        const searchResult = {
            results: foundRestaurants,
            pagination: {
                total: totalResults,
                page,
                pages: Math.ceil(totalResults/pageSize),
            }
        }

        return res.status(200).json({...searchResult})
    }catch (e) {
        console.log(e);
        res.status(500).json({message: "Something went wrong"})
    }
}

export default {searchRestaurant};