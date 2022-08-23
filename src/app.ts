import express, {NextFunction, Request, Response} from 'express'
import routes from './routes';
import helmet from 'helmet';

const app = express();

app.use(helmet());
//fun lil thing to protect the workings of your app from anyone who makes a request to it

app.get("/", (req, res) => {
    return res.json({
        success: true,
        name: 'how do i typescript',
    })
    //return res.redirect('http://example.com');
});

app.route('/')
.get((req: Request, res: Response) =>{
    return res.send('you am make GET request');
})
.get((req: Request, res: Response) =>{
    return res.send('you am make POST request');
})
.put((req: Request, res: Response) =>{
    return res.send('you am make PUT request');
})
.delete((req: Request, res: Response) =>{
    return res.send('you am make DELETE request');
})

app.use(express.json());

app.get("/health", (req, res) => res.sendStatus(200));
app.get("/ab*cd", (req, res) => res.send("/ab*cd"));
app.get(/abc/, (req, res) => res.send("abc"));
// regular expressions!
// i kinda wanted to just go practice regular expressions for this tbh. wasn't sure how to prove that i looked into it in code form though

// global middleware, as opposed to local middleware which you would call as you define the request (app.all => {})
function handleGetBookOne(req: Request, res: Response, next: NextFunction) {
    console.log(req.params);
    next();
    // apparently when middleware returns a Promise, it calls 'next' (here used with NextFunction) if it rejects or throws an error. neat
};

function handleGetBookTwo(req: Request, res: Response, next: NextFunction) {
    console.log('the second handler');
    return res.send(req.params);
};

app.get('api/books/:authorId/:bookId', [handleGetBookOne, handleGetBookTwo]); 

// app.use(express.urlencoded({extended:true}));


app.listen(3000, () => {
    console.log('listening at localhost 3000');
    routes(app);
    //there's a whole thing about making controller, service, model
    //which is just app structure things and i think the pattern we already follow?
});