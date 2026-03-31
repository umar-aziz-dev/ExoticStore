import Policy from "../../Models/Policies.Model.js"
import ApiResponse from "../../Utils/ApiResponse.js"

export const fetchPolicy=async(req,res)=>{
    try {
        const policy = await Policy.find({});
        if(!policy){
            res.status(400).json(
                new ApiResponse(401,null,"No Policy Found")
            )
        }
        res.status(200).json(
            new ApiResponse(201,policy,"Policies Fetched Successfully")
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401,error,"Somethings Wrong in fetching Policy")
        )
    }
}