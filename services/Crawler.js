import request from "request";
import { HtmlAnalyst } from "./HtmlAnalyst.js"
import { idAppender } from "./IdAppender.js"

function getUrlBody(url, method){
    if(!url || !method) throw Error("請傳入url或method") 

    return new Promise((resolve, reject)=>{
        request({
            url: url,
            method: method
        }, (error, res, body) => {
            // 如果有錯誤訊息，或沒有 body(內容)，就 return
            if (error || !body) {
                reject();
            }
            resolve(body)
        });      
    })
}

class Crawler {
    constructor(){
        this.htmlAnalyst = new HtmlAnalyst()
    }

    async pttCrawling(){
        const html = await getUrlBody("https://www.ptt.cc/bbs/Stock/index.html", "GET")
        return idAppender.eachAppendUuid(this.htmlAnalyst.pttAnalyze(html))      
  
    }

    async pttContentCrawling(link){
        console.log("link", link)
        const html = await getUrlBody("https://www.ptt.cc/" + link, "GET")
        return this.htmlAnalyst.pttContentAnalyze(html)      
  
    }

    async momoCrawling(){//未完成
        const html = await getUrlBody("https://www.momoshop.com.tw/category/DgrpCategory.jsp?d_code=4300900207", "GET")
        this.htmlAnalyst.momoAnalyze(html)      
    }
}

export {
    Crawler
}