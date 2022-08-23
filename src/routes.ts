import {Express, Request, Response, NextFunction} from 'express'
function routes(app:Express) {
    
app.post('api/data', (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
});

app.all("api/all", (req: Request, res: Response) => {
    return res.sendStatus(200);
});

async function throwsError() {
    throw new Error("oh nyo");
}

app.get("/error", async(req,res) => {
    try {
        await throwsError();
        res.sendStatus(200);
    } catch (e) {
        res.status(400).send("what did you to do my app");
    }
})
}

export default routes;