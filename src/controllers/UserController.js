import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const user = User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found"});
        const userDto = new UserDto(user);

        return res.status(200).json(userDto);
    } catch (error) {
        
    }
}