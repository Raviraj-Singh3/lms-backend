
export const signup = (req, res, next) => {
    const {name, email, password} = req.body;
    console.log(name, email, password);
    return res.status(200).json({
        success: true,
        data: {
            name: name,
        }

    })
}