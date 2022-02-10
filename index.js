import { Crawler } from "./services/Crawler.js"
import { server } from "./services/Server.js"
import { idAppender } from "./services/IdAppender.js"

const crawler = new Crawler()
const pttIndex = await crawler.pttCrawling()

server.get("/", (req, res)=>{
    res.render("pttIndex", {pttIndex})
})

server.get("/content", async (req, res)=>{
    const matchElem = idAppender.eachMatchUuid(pttIndex, req.query.uuid)
    if(matchElem){
        const pttContent = await crawler.pttContentCrawling(matchElem.link)
        res.render("pttContent", {pttContent})

    }else{
        res.render("pttIndex", {pttIndex})
    }
    
})



const port = 3000
server.listen(port, () => {
    console.log(`App now listenling on port ${port}`)
})